import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/zip';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { InfiniteScroll } from 'ionic-angular';
import { uniqBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    DecrementQueryWorkerContractPageAction,
    IncrementQueryWorkerContractPageAction,
    ResetQueryWorkerContractPageAction,
} from '../../actions/action/worker-action';
import { ContractType, RequestOption } from '../../interfaces/request-interface';
import { WorkerContract } from '../../interfaces/response-interface';
import { DistinguishableWorkerItem, FindFn, TransformToObservableFn, WorkerItem } from '../../interfaces/worker-interface';
import {
    AppState,
    selectWorkerContractResponse,
    selectWorkerContracts,
    selectWorkerLimit,
    selectWorkerPage,
} from '../../reducers/index-reducer';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import {
    IncrementManagementPiecerPageAction,
    IncrementManagementTimerPageAction,
    ResetManagementPiecerPageAction,
    ResetManagementTimerPageAction,
    ResetSelectedWorkersAction,
    ResetWorkerContractsAction,
    TerminateWorkerContractAtLocalAction,
    UpdateManagementPiecerCountAction,
    UpdateManagementTimerCountAction,
    UpdateSelectedWorkersAction,
} from './../../actions/action/worker-action';
import { RealTimeStatisticType, WorkerContractOptions } from './../../interfaces/request-interface';
import {
    TeamMembersRealTimeStatisticsResponse,
    WorkerContractListResponse,
    WorkTypeRealTimeStatisticsResponse,
} from './../../interfaces/response-interface';
import {
    selectManagePiecerCount,
    selectManagePiecerPage,
    selectManageTimerCount,
    selectManageTimerPage,
    selectPiecerContractIds,
    selectSelectedWorkers,
    selectTeamMembersRealTimeStatisticsResponse,
    selectTimerContractIds,
    selectWorkTypeRealTimeStatisticsResponse,
} from './../../reducers/index-reducer';
import { Command, WorkerContract as contract } from './../api/command';
import { ProjectService } from './project-service';
import { UserService } from './user-service';

@Injectable()
export class WorkerService {
    constructor(
        private store: Store<AppState>,
        private error: ErrorService,
        private processor: ProcessorService,
        private command: Command,
        private userInfo: UserService,
        private project: ProjectService
    ) {
    }

    /*=================================================================API request===========================================================*/

    getWorkerContracts(option: Observable<RequestOption>): Subscription {
        return this.processor.workerContractListProcessor(
            option.combineLatest(
                this.userInfo.getSid(),
                this.store.select(selectWorkerLimit),
                this.store.select(selectWorkerPage).distinctUntilChanged(),
                (options, sid, limit, page) => ({ sid, limit, page, ...options } as WorkerContractOptions) // use option parameters first;
            )
        );
    }

    getWorkerContractsOfCurrentProject(): Subscription {
        return this.getWorkerContracts(
            this.project.getCurrentProject()
                .map(project => project.id)
                .withLatestFrom(
                this.getCompleteStatusOption(),
                (project_id, status) => ({ ...status, project_id, limit: 1, page: 1 })
                )
        );
    }

    getWorkTypeRealTimeStatistics(option: Observable<RequestOption> = Observable.empty()): Subscription {
        return this.processor.workTypeRealTimeStatisticsProcessor(
            option
                .defaultIfEmpty({})
                .withLatestFrom(
                this.userInfo.getSid(),
                this.project.getProjectId(),
                (option, sid, project_id) => ({
                    ...option,
                    sid,
                    project_id,
                    statistics_type: RealTimeStatisticType.workType,
                }))
        );
    }

    getTeamMembersRealTimeStatistics(option: Observable<RequestOption> = Observable.empty()): Subscription {
        return this.processor.teamMembersRealTimeStatisticsProcessor(
            option.defaultIfEmpty({})
                .withLatestFrom(
                this.userInfo.getSid(),
                this.project.getProjectId(),
                (option, sid, project_id) => ({ ...option, sid, project_id, statistics_type: RealTimeStatisticType.team }))
        )
    }

    getNextPage(infiniteScroll: InfiniteScroll, type?: number): Subscription {
        this.incrementPage(type);

        return this.getWorkerContractResponse()
            .skip(1)
            .subscribe(_ => infiniteScroll.complete());
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
        return this.getContractById(userId, subOption, this.findContractById('worker_id'));
    }

    getContractById(id: Observable<number>, subOption: Observable<RequestOption> = Observable.empty(), combineFn: FindFn<number, WorkerContract> = this.findContractById('id')): Observable<WorkerContract> {
        return id.withLatestFrom(
            this.getAllWorkerContracts(),
            combineFn
        )
            .distinctUntilChanged()
            .mergeMap(this.getContractFromServeWhenLocalEmpty(id, combineFn, subOption));
    }

    getContractByIdReactContractsChange(id: Observable<number>, subOption: Observable<RequestOption> = Observable.empty(), combineFn: FindFn<number, WorkerContract> = this.findContractById('id')): Observable<WorkerContract> {
        return id.combineLatest(this.getAllWorkerContracts(), combineFn)
            .distinctUntilChanged()
            .mergeMap(this.getContractFromServeWhenLocalEmpty(id, combineFn, subOption));
    }

    private getContractFromServeWhenLocalEmpty(id: Observable<number>, combineFn, subOption: Observable<RequestOption> = Observable.empty()): TransformToObservableFn<WorkerContract> {
        return (contract: WorkerContract) => {
            if (contract) return Observable.of(contract);

            const option = id.withLatestFrom(
                Observable.of({ limit: 1, page: 1 }),
                subOption.defaultIfEmpty({}),
                (user_id, option, subOption) => ({ ...option, user_id, ...subOption })
            );

            const subscription = this.getWorkerContracts(option);

            return id.combineLatest(
                this.getWorkerContractResponse().do(_ => subscription.unsubscribe()).map(res => res.worker_contract),
                combineFn
            )
                .mergeMap(contract => (!!contract ? Observable.of(contract) : Observable.of(null)));
        };
    }

    private findContractById(idType = 'id'): FindFn<number, WorkerContract> {
        return (id, contracts) => contracts.find(contract => contract[idType] === id);
    }

    getOwnContract(option: Observable<RequestOption> = Observable.empty()): Observable<WorkerContract> {
        return this.getContractByUserId(this.userInfo.getUserId(), option);
    }

    getWorkersByPayType(type: number): Observable<WorkerContract[]> {
        return this.store.select(selectWorkerContracts)
            .combineLatest(
            this.store.select(type === ContractType.timer ? selectTimerContractIds : selectPiecerContractIds),
            (contracts, ids) => contracts.filter(item => ids.indexOf(item.id) !== -1)
            );
    }

    getWorkersCountByPayType(type: number): Observable<number> {
        return this.store.select(type === ContractType.timer ? selectManageTimerCount : selectManagePiecerCount);
    }

    haveMoreDataOfSpecificPayTypeContract(type: number): Observable<boolean> {
        return this.getWorkersCountByPayType(type)
            .combineLatest(
            this.store.select(selectWorkerLimit),
            this.store.select(type === ContractType.timer ? selectManageTimerPage : selectManagePiecerPage),
            (count, limit, page) => limit * page < count
            );
    }

    /**
     * @description Request option methods: getUnexpiredOption  getCompleteStatusOption getContractTypeOption
     */
    getUnexpiredOption(): Observable<RequestOption> {
        return Observable.of(this.command.workerContractList.noMagicNumber.get(contract.unexpired).value as RequestOption);
    }

    getCompleteStatusOption(): Observable<RequestOption> {
        return Observable.of({ request_status: '完成' });
    }

    getContractTypeOption(type: Observable<string>): Observable<RequestOption> {
        return type.map(type => ({ contract_type: ContractType[type] }));
    }

    getManagementPage(type: string): Observable<RequestOption> {
        return this.store.select(type === ContractType[1] ? selectManageTimerPage : selectManageTimerPage).map(page => ({ page }));
    }

    getNoLocationCardWorker(): Observable<RequestOption> {
        return Observable.of({ no_location_card: true });
    }

    haveRestWorkers(): Observable<boolean> {
        return this.getCurrentPage()
            .skip(1)
            .distinctUntilChanged()
            .combineLatest(
            this.getLimit(),
            this.getWorkerContractResponse().map(item => item.count).distinctUntilChanged()
            )
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
            .map(res => res.worker_contract.map(item => ({
                id: item.worker_id,
                name: item.worker__employee__realname,
                teamName: item.team__name,
                workType: item.worktype__name,
                workTypeId: item.worktype_id,
                selected: false,
            })))
            .scan((acc, cur) => acc.concat(cur))
            .combineLatest(options)
            .map(([workers, selectedUserIds]) => uniqBy(workers.map(item => ({ ...item, selected: selectedUserIds.indexOf(item.id) !== -1 })), 'id')
            );
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
            .startWith(true);
    }

    getHaveMoreData(): Observable<boolean> {
        return this.getWorkerCount().combineLatest(
            this.store.select(selectWorkerLimit),
            this.getCurrentPage(),
            (count, limit, page) => limit * page < count
        );
    }

    getSelectedWorkers(): Observable<number[]> {
        return this.store.select(selectSelectedWorkers);
    }

    getSelectedWorkersContainsSpecificId(idKey: string): Observable<WorkerItem[]> {
        return this.getSelectedWorkers()
            .combineLatest(this.getAllWorkerContracts())
            .map(([userIds, workers]) => workers.filter(item => userIds.indexOf(item.worker_id) !== -1).map(item => ({ id: item[idKey], name: item.worker__employee__realname })));
    }

    getSelectedWorkersContainsWorkerId(): Observable<WorkerItem[]> {
        return this.getSelectedWorkersContainsSpecificId('worker_id');
    }

    getSelectWorkersContainsContractId(): Observable<WorkerItem[]> {
        return this.getSelectedWorkersContainsSpecificId('id');
    }

    getWorkTypeRealTimeStatisticsResponse(): Observable<WorkTypeRealTimeStatisticsResponse> {
        return this.store.select(selectWorkTypeRealTimeStatisticsResponse)
            .filter(value => !!value && !value.errorMessage);
    }

    getTeamMembersStatisticsResponse(): Observable<TeamMembersRealTimeStatisticsResponse> {
        return this.store.select(selectTeamMembersRealTimeStatisticsResponse)
            .filter(value => !!value && !value.errorMessage);
    }

    getCurrentPage(): Observable<number> {
        return this.store.select(selectWorkerPage);
    }

    getLimit(): Observable<number> {
        return this.store.select(selectWorkerLimit);
    }

    /*===============================================================Locale state update=========================================================*/

    setWorkersCountDistinctByPayType(type: Observable<string>): Subscription {
        return this.getWorkerCount()
            .withLatestFrom(type)
            .subscribe(([amount, type]) => this.store.dispatch(type === ContractType[1] ? new UpdateManagementTimerCountAction(amount) : new UpdateManagementPiecerCountAction(amount)));
    }

    /**
     *@description Page operations:  incrementPage decrementPage resetPage getCurrentPage getLimit
     */
    incrementPage(type?: number): void {
        if (!type) {
            this.store.dispatch(new IncrementQueryWorkerContractPageAction());
        } else {
            this.store.dispatch(type === ContractType.timer ? new IncrementManagementTimerPageAction() : new IncrementManagementPiecerPageAction());
        }
    }

    decrementPage(): void {
        this.store.dispatch(new DecrementQueryWorkerContractPageAction());
    }

    resetPage(type?: number): void {
        if (!type) {
            this.store.dispatch(new ResetQueryWorkerContractPageAction());
        } else {
            this.store.dispatch(type === ContractType.timer ? new ResetManagementTimerPageAction() : new ResetManagementPiecerPageAction());
        }
    }

    updateSelectedWorkers(userIds: number[]): void {
        this.store.dispatch(new UpdateSelectedWorkersAction(userIds));
    }

    resetSelectedWorkers(): void {
        this.store.dispatch(new ResetSelectedWorkersAction());
    }

    resetWorkContracts(): void {
        this.store.dispatch(new ResetWorkerContractsAction());
    }

    terminateWorkerContract(contractId: Observable<number>): Subscription {
        return contractId.subscribe(id => this.store.dispatch(new TerminateWorkerContractAtLocalAction(id)));
    }

    /*==========================================error handle=====================================================*/

    handleError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectWorkerContractResponse));
    }

    handlerWorkTypeRealTimeStatisticsError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectWorkTypeRealTimeStatisticsResponse));
    }

    handlerTeamMembersRealTimeStatisticsError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectTeamMembersRealTimeStatisticsResponse));
    }
}
