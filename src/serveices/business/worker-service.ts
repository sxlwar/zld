import {Injectable} from '@angular/core';
import {
  AppState,
  selectSid,
  selectUserId,
  selectWorkerContractResponse,
  selectWorkerContracts,
  selectWorkerLimit,
  selectWorkerPage
} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ProcessorService} from '../api/processor-service';
import {
  DecrementQueryWorkerContractPageAction,
  IncrementQueryWorkerContractPageAction,
  ResetQueryWorkerContractPageAction
} from '../../actions/worker-action';
import 'rxjs/add/operator/zip';
import {Subscription} from 'rxjs/Subscription';
import {ErrorService} from '../errors/error-service';
import {WorkerContract} from '../../interfaces/response-interface';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/defaultIfEmpty';

@Injectable()
export class WorkerService {
  subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>,
              public error: ErrorService,
              public processor: ProcessorService) {
    this.handleError();
  }

  /*====================================The main methods provided by the service===================================*/

  getWorkerCount(option: Observable<{[key: string]: string | number }> = Observable.empty()): Observable<number> {
    this.getWorkerContracts(option);

    return this.store.select(selectWorkerContractResponse).map(res => res.count);
  }

  getWorkerContracts(option: Observable<{ [key: string]: string | number }> ) {
    const sid$ = this.store.select(selectSid).map(sid => ({sid}));

    const limit$ = this.store.select(selectWorkerLimit).map(limit => ({limit}));

    const page$ = this.store.select(selectWorkerPage).map(page => ({page}));

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
  getContractByUserId(id$: Observable<number>): Observable<WorkerContract> {
    return this.store.select(selectWorkerContracts)
      .zip(id$, (contracts, id) => contracts.find(contract => contract.worker_id === id))
      .mergeMap(contract => {
        if (contract) return Observable.of(contract);

        const option = Observable.of({limit: 1, page: 1}).zip(id$, (option, user_id) => ({...option, user_id}));

        this.getWorkerContracts(option);

        return this.store.select(selectWorkerContractResponse)
          .mergeMap(data => {
            if(!data.worker_contract.length) return Observable.of(null);
            return Observable.from(data.worker_contract).first();
          });
      })
  }

  getOwnContract(): Observable<WorkerContract> {
    const userId = this.store.select(selectUserId);

    return this.getContractByUserId(userId);
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

  /*==========================================error handle=====================================================*/

  private handleError() {
    const workerContract$ = this.store.select(selectWorkerContractResponse).filter(res => !!res.errorMessage);

    const subscription = this.error.handleErrorInSpecific(workerContract$, 'API_ERROR');

    this.subscriptions.push(subscription);
  }

  /*==========================================refuse clean=====================================================*/

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
