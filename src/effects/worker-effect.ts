import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {WebsocketService} from '../serveices/api/websocket-service';
import {AppState} from '../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {Command} from '../serveices/api/command';
import {Observable} from 'rxjs/Observable';
import {ResponseAction} from '../interfaces/response-interface';
import {
  GET_WORKER_CONTRACTS,
  GetWorkerContractsAction,
  WorkerContractListFailAction,
  WorkerContractListSuccessAction
} from '../actions/worker-action';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class WorkerEffect extends Command {
  @Effect()
  workerContracts$: Observable<ResponseAction> = this.actions$
    .ofType(GET_WORKER_CONTRACTS)
    .mergeMap((action: GetWorkerContractsAction) => this.ws
      .send(this.getWorkerContractList(action.payload))
      .takeUntil(this.actions$.ofType(GET_WORKER_CONTRACTS))
      .map(msg => msg.isError ? new WorkerContractListFailAction(msg.data) : new WorkerContractListSuccessAction(msg.data))
      .catch(error => of(error))
    );

  constructor(public ws: WebsocketService,
              public store: Store<AppState>,
              private actions$: Actions) {
    super();
  }
}
