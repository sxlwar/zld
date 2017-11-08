import {Injectable} from '@angular/core';
import {
  AppState,
  selectSid,
  selectWorkerContractResponse,
  selectWorkerLimit,
  selectWorkerPage
} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ProcessorService} from '../api/processor-service';
import {
  DecrementQueryWorkerContractPageAction,
  IncrementQueryWorkerContractPageAction, ResetQueryWorkerContractPageAction
} from '../../actions/worker-action';
import 'rxjs/add/operator/zip';
import {Subscription} from 'rxjs/Subscription';
import {ErrorService} from '../errors/error-service';

@Injectable()
export class WorkerService {
  subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>,
              public error: ErrorService,
              public processor: ProcessorService) {
  }

  getWorkerCount(option?: Observable<{[key: string]: any }>): Observable<number> {

    this.getWorkerContracts(option);

    const workerContract$ =  this.store.select(selectWorkerContractResponse);

    const subscription = this.error.handleErrorInSpecific(workerContract$,  'API_ERROR');

    this.subscriptions.push(subscription);

    return workerContract$.map(res => res.count);
  }

  getWorkerContracts(option?: Observable<{[key: string]: any }>) {
    const sid$ = this.store.select(selectSid).map(sid => ({sid}));

    const limit$ = this.store.select(selectWorkerLimit).map(limit => ({limit}));

    const page$ = this.store.select(selectWorkerPage).map(page => ({page}));

    const option$ = option.zip(
      sid$,
      limit$,
      page$,
      (option, sid, limit, page) => Object.assign({}, option, sid, limit, page)
    );

    const subscription = this.processor.workerContractListProcessor(option$);

    this.subscriptions.push(subscription);
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

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
