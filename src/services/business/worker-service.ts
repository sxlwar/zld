//region
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
import { RequestOption } from '../../interfaces/request-interface';
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

  getWorkerCount(option: Observable<{ [key: string]: string | number }> = Observable.empty()): Observable<number> {
    this.getWorkerContracts(option);

    return this.store.select(selectWorkerContractResponse).map(res => res.count);
  }

  getWorkerContracts(option: Observable<{ [key: string]: string | number }>) {
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

  /**
   * @description
   * If there is a repository, use this data directly, if not, we need to get it from the server
   * */
  getContractByUserId(userId: Observable<number>, subOption: Observable<RequestOption> = Observable.empty()): Observable<WorkerContract> {

    const combineFn = (contracts, id) => contracts.find(contract => contract.worker_id === id);

    return this.store.select(selectWorkerContracts)
      .zip(userId, combineFn)
      .mergeMap(contract => {
        if (contract) return Observable.of(contract);

        const option = Observable.of({ limit: 1, page: 1 }).zip(
          userId,
          subOption.defaultIfEmpty({}),
          (option, user_id, subOption) => ({ ...option, user_id, ...subOption })
        );

        this.getWorkerContracts(option);

        return this.store.select(selectWorkerContractResponse)
          .map(res => res.worker_contract)
          .zip(userId, combineFn)
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

  incrementPage() {
    this.store.dispatch(new IncrementQueryWorkerContractPageAction());
  }

  decrementPage() {
    this.store.dispatch(new DecrementQueryWorkerContractPageAction());
  }

  resetPage() {
    this.store.dispatch(new ResetQueryWorkerContractPageAction());
  }

  getUnexpiredOption(): Observable<RequestOption> {
    const result = this.command.workerContractList.noMagicNumber.get(contract.unexpired).value as RequestOption;

    return Observable.of(result);
  }

  getCompleteStatusOption(): Observable<RequestOption> {
    return Observable.of({request_status: '完成'});
  }

  getWorkerContractResponse(): Observable<WorkerContractListResponse> {
    return this.store.select(selectWorkerContractResponse);
  }

  /*==========================================error handle=====================================================*/

  private handleError() {
    const workerContract$ = this.store.select(selectWorkerContractResponse).filter(res => !!res.errorMessage);

    this.worker$$ = this.error.handleErrorInSpecific(workerContract$, 'API_ERROR');
  }

  /*==========================================refuse clean=====================================================*/

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
