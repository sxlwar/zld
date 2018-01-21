import { ProjectService } from './project-service';
import { WorkerContractOptions, RealTimeStatisticType } from './../../interfaces/request-interface';
import { UserService } from './user-service';
import { selectTimerContractIds, selectPiecerContractIds, selectManageTimerPage, selectManagePiecerPage, selectManageTimerCount, selectManagePiecerCount, selectSelectedWorkers, selectWorkTypeRealTimeStatisticsResponse, selectTeamMembersRealTimeStatisticsResponse } from './../../reducers/index-reducer';
import { IncrementManagementTimerPageAction, IncrementManagementPiecerPageAction, ResetManagementTimerPageAction, ResetManagementPiecerPageAction, ResetWorkerContractsAction, UpdateManagementTimerCountAction, UpdateSelectedWorkersAction, ResetSelectedWorkersAction } from './../../actions/action/worker-action';
import { WorkerContractListResponse, WorkTypeRealTimeStatisticsResponse, TeamMembersRealTimeStatisticsResponse } from './../../interfaces/response-interface';
import { Command } from './../api/command';
import { WorkerContract as contract } from './../api/command';
import { Injectable } from '@angular/core';
import { AppState, selectWorkerContractResponse, selectWorkerContracts, selectWorkerLimit, selectWorkerPage } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProcessorService } from '../api/processor-service';
import { DecrementQueryWorkerContractPageAction, IncrementQueryWorkerContractPageAction, ResetQueryWorkerContractPageAction } from '../../actions/action/worker-action';
import 'rxjs/add/operator/zip';
import { Subscription } from 'rxjs/Subscription';
import { ErrorService } from '../errors/error-service';
import { WorkerContract } from '../../interfaces/response-interface';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/defaultIfEmpty';
import { RequestOption, ContractType } from '../../interfaces/request-interface';
import { uniqBy } from 'lodash';
import { DistinguishableWorkerItem, WorkerItem } from '../../interfaces/worker-interface';

@Injectable()
export class WorkerService {

    constructor(
        public store: Store<AppState>,
        public error: ErrorService,
        public processor: ProcessorService,
        public command: Command,
        public userInfo: UserService,
        public project: ProjectService
    ) {
        this.handleError();
    }

    /*=================================================================API request===========================================================*/

    getWorkerContracts(option: Observable<RequestOption>): Subscription {
        return this.processor.workerContractListProcessor(
            option
                .combineLatest(
                this.userInfo.getSid(),
                this.store.select(selectWorkerLimit),
                this.store.select(selectWorkerPage).distinctUntilChanged(),
                (options, sid, limit, page) => ({ sid, limit, page, ...options }) as WorkerContractOptions // use option parameters first;
                )
        );
    }

    getWorkerContractsOfCurrentProject(): Subscription {
        return this.getWorkerContracts(
            this.project.getCurrentProject().map(project => project.id)
                .withLatestFrom(
                this.getCompleteStatusOption(),
                (project_id, status) => ({ ...status, project_id, limit: 1, page: 1 })
                )
        );
    }

    getWorkTypeRealTimeStatistics(option: Observable<RequestOption> = Observable.empty()): Subscription {
        return this.processor.workTypeRealTimeStatisticsProcessor(
            option.defaultIfEmpty({})
                .withLatestFrom(
                this.userInfo.getSid(),
                this.project.getProjectId(),
                (option, sid, project_id) => ({ ...option, sid, project_id, statistics_type: RealTimeStatisticType.workType })
                )
        );
    }

    getTeamMembersRealTimeStatistics(option: Observable<RequestOption> = Observable.empty()): Subscription {
        return this.processor.teamMembersRealTimeStatisticsProcessor(
            option.defaultIfEmpty({})
                .withLatestFrom(
                this.userInfo.getSid(),
                this.project.getProjectId(),
                (option, sid, project_id) => ({ ...option, sid, project_id, statistics_type: RealTimeStatisticType.team })
                )
        );
    }
    /*=============================================================Data acquisition===========================================================*/

    getWorkerCount(): Observable<number> {
        return this.getWorkerContractResponse().map(res => res.count);
    }

    getWorkerContractResponse(): Observable<WorkerContractListResponse> {
        return this.store.select(selectWorkerContractResponse).filter(value => !!value);
    }

    getAllWorkerContracts(): Observable<WorkerContract[]> {
        return this.store.select(selectWorkerContracts);
    }

    /**
     * @description
     * If there is a repository, use this data directly, if not, we need to get it from the server
     * */
    getContractByUserId(userId: Observable<number>, subOption: Observable<RequestOption> = Observable.empty()): Observable<WorkerContract> {
        return this.getContractById(userId, subOption, 'worker_id')
    }

    getContractById(id: Observable<number>, subOption: Observable<RequestOption> = Observable.empty(), idType = 'id'): Observable<WorkerContract> {
        const combineFn = (contracts, id) => contracts.find(contract => contract[idType] === id);

        return this.store.select(selectWorkerContracts)
            .zip(id, combineFn)
            .mergeMap(contract => {
                if (contract) return Observable.of(contract);

                const option = Observable.of({ limit: 1, page: 1 }).zip(
                    id,
                    subOption.defaultIfEmpty({}),
                    (option, user_id, subOption) => ({ ...option, user_id, ...subOption })
                );

                const subscription = this.getWorkerContracts(option);

                return this.getWorkerContractResponse()
                    .do(_ => subscription.unsubscribe())
                    .map(res => res.worker_contract)
                    .zip(id, combineFn)
                    .mergeMap(contract => !!contract ? Observable.of(contract) : Observable.of(null));
            })
    }

    getOwnContract(option: Observable<RequestOption> = Observable.empty()): Observable<WorkerContract> {
        return this.getContractByUserId(this.userInfo.getUserId(), option);
    }

    getWorkersByPayType(type: number): Observable<WorkerContract[]> {
        const contracts = this.store.select(selectWorkerContracts);

        const projectFun = (contracts, ids) => contracts.filter(item => ids.indexOf(item.id) !== -1);

        if (type === ContractType.timer) {
            return contracts.combineLatest(this.store.select(selectTimerContractIds), projectFun);
        } else {
            return contracts.combineLatest(this.store.select(selectPiecerContractIds), projectFun);
        }
    }

    getWorkersCountByPayType(type: number): Observable<number> {
        if (type === ContractType.timer) {
            return this.store.select(selectManageTimerCount);
        } else {
            return this.store.select(selectManagePiecerCount);
        }
    }

    haveMoreDataOfSpecificPayTypeContract(type: number): Observable<boolean> {
        const page = type === ContractType.timer ? this.store.select(selectManageTimerPage) : this.store.select(selectManagePiecerPage);

        return this.getWorkersCountByPayType(type)
            .combineLatest(
            this.store.select(selectWorkerLimit),
            page,
            (count, limit, page) => limit * page < count
            );
    }

    /**
     * @description Request option methods: getUnexpiredOption  getCompleteStatusOption getContractTypeOption
     */
    getUnexpiredOption(): Observable<RequestOption> {
        const result = this.command.workerContractList.noMagicNumber.get(contract.unexpired).value as RequestOption;

        return Observable.of(result);
    }

    getCompleteStatusOption(): Observable<RequestOption> {
        return Observable.of({ request_status: '完成' });
    }

    getContractTypeOption(type: string): Observable<RequestOption> {
        return Observable.of({ contract_type: ContractType[type] });
    }

    getManagementPage(type: number): Observable<RequestOption> {
        return type === ContractType.timer ? this.store.select(selectManageTimerPage).map(page => ({ page })) : this.store.select(selectManagePiecerPage).map(page => ({ page }));
    }

    getNoLocationCardWorker(): Observable<RequestOption> {
        return Observable.of({ no_location_card: true });
    }

    haveRestWorkers(): Observable<boolean> {
        return this.getCurrentPage()
            .skip(1)
            .distinctUntilChanged()
            .combineLatest(this.getLimit(), this.getWorkerContractResponse().map(item => item.count).distinctUntilChanged())
            .map(([page, limit, count]) => Math.ceil(count / limit) + 1 >= page)
            .filter(result => !!result);
    }

    /**
     * 
     * @param options userIds
     * @description Set selected property by userIds that passed in, 
     * selected should be true if the item's worker_id is contained in userIds, otherwise is false;
     */
    getWorkerItems(options: Observable<number[]>): Observable<DistinguishableWorkerItem[]> {
        return this.getWorkerContractResponse()
            .map(res => res.worker_contract.map(item => ({ id: item.worker_id, name: item.worker__employee__realname, teamName: item.team__name, workType: item.worktype__name, workTypeId: item.worktype_id, selected: false })))
            .scan((acc, cur) => acc.concat(cur))
            .combineLatest(options)
            .map(([workers, selectedUserIds]) => {
                const result = workers.map(item => ({ ...item, selected: selectedUserIds.indexOf(item.id) !== -1 }));

                return uniqBy(result, 'id');
            });
    }

    /**
     * @description In order to cope with the return of empty response from server before normal response,
     * this stream is only allowed to send out 'false' value;
     * @deprecated Read to remove in next version;
     */
    getEnableScroll(): Observable<boolean> {
        return this.getWorkerContractResponse()
            .skip(1)
            .map(response => !!response.worker_contract.length)
            .filter(value => !value)
            .startWith(true)
    }

    getHaveMoreData(): Observable<boolean> {
        return this.getWorkerCount()
            .combineLatest(
            this.store.select(selectWorkerLimit),
            this.getCurrentPage(),
            (count, limit, page) => limit * page < count
            );
    }

    getNextPage(infiniteScroll): Subscription {
        this.incrementPage();

        return this.getWorkerContractResponse().subscribe(response => infiniteScroll.complete());
    }

    updateSelectedWorkers(userIds: number[]): void {
        this.store.dispatch(new UpdateSelectedWorkersAction(userIds));
    }

    getSelectedWorkers(): Observable<number[]> {
        return this.store.select(selectSelectedWorkers);
    }

    getSelectedWorkersContainsSpecificId(idKey: string): Observable<WorkerItem[]> {
        return this.getSelectedWorkers()
            .combineLatest(this.getAllWorkerContracts())
            .map(([userIds, workers]) => workers.filter(item => userIds.indexOf(item.worker_id) !== -1)
                .map(item => ({ id: item[idKey], name: item.worker__employee__realname }))
            );
    }

    getSelectedWorkersContainsWorkerId(): Observable<WorkerItem[]> {
        return this.getSelectedWorkersContainsSpecificId('worker_id');
    }

    getSelectWorkersContainsContractId(): Observable<WorkerItem[]> {
        return this.getSelectedWorkersContainsSpecificId('id');
    }

    getWorkTypeRealTimeStatisticsResponse(): Observable<WorkTypeRealTimeStatisticsResponse> {
        return this.store.select(selectWorkTypeRealTimeStatisticsResponse).filter(value => !!value && !value.errorMessage);
    }

    getTeamMembersStatisticsResponse(): Observable<TeamMembersRealTimeStatisticsResponse> {
        return this.store.select(selectTeamMembersRealTimeStatisticsResponse).filter(value => !!value && !value.errorMessage);
    }

    /*===============================================================Locale state update=========================================================*/

    setWorkersCountDistinctByPayType(count: Observable<number>, type: Observable<number>): Subscription {
        return count
            .combineLatest(type)
            .subscribe(([amount, type]) => {
                if (type === ContractType.timer) {
                    this.store.dispatch(new UpdateManagementTimerCountAction(amount));
                } else {
                    this.store.dispatch(new UpdateManagementTimerCountAction(amount));
                }
            })
    }

    /**
     *@description Page operations:  incrementPage decrementPage resetPage getCurrentPage getLimit
     */
    incrementPage(type?: number): void {
        !type && this.store.dispatch(new IncrementQueryWorkerContractPageAction());
        type === ContractType.timer && this.store.dispatch(new IncrementManagementTimerPageAction());
        type === ContractType.piecer && this.store.dispatch(new IncrementManagementPiecerPageAction());
    }

    decrementPage(): void {
        this.store.dispatch(new DecrementQueryWorkerContractPageAction());
    }

    resetPage(type?: number): void {
        !type && this.store.dispatch(new ResetQueryWorkerContractPageAction());
        type === ContractType.timer && this.store.dispatch(new ResetManagementTimerPageAction());
        type === ContractType.piecer && this.store.dispatch(new ResetManagementPiecerPageAction());
    }

    getCurrentPage(): Observable<number> {
        return this.store.select(selectWorkerPage);
    }

    getLimit(): Observable<number> {
        return this.store.select(selectWorkerLimit);
    }

    resetSelectedWorkers(): void {
        this.store.dispatch(new ResetSelectedWorkersAction());
    }

    resetWorkContracts() {
        this.store.dispatch(new ResetWorkerContractsAction());
    }

    /*==========================================error handle=====================================================*/

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectWorkerContractResponse), 'API_ERROR');
    }

    handlerWorkTypeRealTimeStatisticsError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectWorkTypeRealTimeStatisticsResponse), 'API_ERROR');
    }

    handlerTeamMembersRealTimeStatisticsError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectTeamMembersRealTimeStatisticsResponse), 'API_ERROR');
    }
}
