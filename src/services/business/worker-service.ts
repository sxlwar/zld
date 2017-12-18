//region
import { selectTimerContractIds, selectPiecerContractIds, selectManageTimerPage, selectManagePiecerPage, selectManageTimerCount, selectManagePiecerCount, selectSelectedWorkers } from './../../reducers/index-reducer';
import { IncrementManagementTimerPageAction, IncrementManagementPiecerPageAction, ResetManagementTimerPageAction, ResetManagementPiecerPageAction, ResetWorkerContractsAction, UpdateManagementTimerCountAction, UpdateSelectedWorkersAction } from './../../actions/action/worker-action';
import { WorkerContractListResponse } from './../../interfaces/response-interface';
import { Command } from './../api/command';
import { WorkerContract as contract } from './../api/command';
import { Injectable } from '@angular/core';
import {
  AppState,
  selectSid,
  selectUserId,
  selectWorkerContractResponse,
  selectWorkerContracts,
  selectWorkerLimit,
  selectWorkerPage
} from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProcessorService } from '../api/processor-service';
import {
  DecrementQueryWorkerContractPageAction,
  IncrementQueryWorkerContractPageAction,
  ResetQueryWorkerContractPageAction
} from '../../actions/action/worker-action';
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
//endregion

export interface WorkerItem {
  id: number;
  name: string;
  teamName: string;
  workType: string;
  selected: boolean;
}

@Injectable()
export class WorkerService {
  subscriptions: Subscription[] = [];
  worker$$: Subscription;

  constructor(
    public store: Store<AppState>,
    public error: ErrorService,
    public processor: ProcessorService,
    public command: Command
  ) {
    this.handleError();
  }

  /*====================================The main methods provided by the service===================================*/

  getWorkerCount(option: Observable<RequestOption> = Observable.empty()): Observable<number> {
    this.getWorkerContracts(option);

    return this.store.select(selectWorkerContractResponse).map(res => res.count);
  }

  getWorkerContracts(option: Observable<RequestOption>) {
    const sid$ = this.store.select(selectSid).map(sid => ({ sid }));

    const limit$ = this.store.select(selectWorkerLimit).map(limit => ({ limit }));

    const page$ = this.store.select(selectWorkerPage).map(page => ({ page }));

    const option$ = option.defaultIfEmpty({}).zip(
      sid$,
      limit$,
      page$,
      (option, sid, limit, page) => Object.assign({}, sid, limit, page, option) // Use the fields in the option parameter first.
    );

    const subscription = this.processor.workerContractListProcessor(option$);

    this.subscriptions.push(subscription);
  }

  /*====================================Methods used to get response from server===================================*/

  getWorkerContractResponse(): Observable<WorkerContractListResponse> {
    return this.store.select(selectWorkerContractResponse);
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

        this.getWorkerContracts(option);

        return this.store.select(selectWorkerContractResponse)
          .map(res => res.worker_contract)
          .zip(id, combineFn)
          .mergeMap(contract => {
            if (contract) return Observable.of(contract);
            return Observable.of(null);
          });
      })
  }

  getOwnContract(option: Observable<RequestOption> = Observable.empty()): Observable<WorkerContract> {
    const userId = this.store.select(selectUserId);

    return this.getContractByUserId(userId, option);
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

  setWorkersCountDistinctByPayType(count: Observable<number>, type: number): Subscription {
    return count.subscribe(amount => {
      if (type === ContractType.timer) {
        this.store.dispatch(new UpdateManagementTimerCountAction(amount));
      } else {
        this.store.dispatch(new UpdateManagementTimerCountAction(amount));
      }
    })
  }
  /*====================================Shortcut methods provided by the service===================================*/

  /**
   *@description Page operations:  incrementPage decrementPage resetPage getCurrentPage getLimit
   */
  incrementPage(type?: number) {
    !type && this.store.dispatch(new IncrementQueryWorkerContractPageAction());
    type === ContractType.timer && this.store.dispatch(new IncrementManagementTimerPageAction());
    type === ContractType.piecer && this.store.dispatch(new IncrementManagementPiecerPageAction());
  }

  decrementPage() {
    this.store.dispatch(new DecrementQueryWorkerContractPageAction());
  }

  resetPage(type?: number) {
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
    if (type === ContractType.timer) return this.store.select(selectManageTimerPage).map(page => ({ page }));
    else return this.store.select(selectManagePiecerPage).map(page => ({ page }));
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
  getWorkerItems(options: Observable<number[]>): Observable<WorkerItem[]> {
    return this.getWorkerContractResponse()
      .map(res => res.worker_contract.map(item => ({ id: item.worker_id, name: item.worker__employee__realname, teamName: item.team__name, workType: item.worktype__name, selected: false })))
      .scan((acc, cur) => acc.concat(cur))
      .combineLatest(options)
      .map(([workers, selectedUserIds]) => {
        const result = workers.map(item => ({ ...item, selected: selectedUserIds.indexOf(item.id) !== -1 }));

        return uniqBy(result, 'id');
      });
  }

  /**
   * @description In order to cope with the return of empty response from server before normal response,
   * this stream if only allowed to send out 'false' value;
   */
  getEnableScroll(): Observable<boolean> {
    return this.getWorkerContractResponse()
      .skip(1)
      .map(response => !!response.worker_contract.length)
      .filter(value => !value)
      .startWith(true)
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

  /*==========================================error handle=====================================================*/

  private handleError() {
    const workerContract$ = this.store.select(selectWorkerContractResponse).filter(res => !!res.errorMessage);

    this.worker$$ = this.error.handleErrorInSpecific(workerContract$, 'API_ERROR');
  }

  /*==========================================refuse clean=====================================================*/

  resetWorkContracts() {
    this.store.dispatch(new ResetWorkerContractsAction());
  }

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
