//region
import { selectTimerContractIds, selectPiecerContractIds, selectManageTimerPage, selectManagePiecerPage, selectManageTimerCount, selectManagePiecerCount } from './../../reducers/index-reducer';
import { IncrementManagementTimerPageAction, IncrementManagementPiecerPageAction, ResetManagementTimerPageAction, ResetManagementPiecerPageAction, ResetWorkerContractsAction, UpdateManagementTimerCountAction } from './../../actions/action/worker-action';
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
//endregion

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
      if(type === ContractType.timer){
        this.store.dispatch(new UpdateManagementTimerCountAction(amount));
      } else {
        this.store.dispatch(new UpdateManagementTimerCountAction(amount));
      }
    })
  }
  /*====================================Shortcut methods provided by the service===================================*/

  /**
   *@description Page operations:  incrementPage decrementPage resetPage 
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
