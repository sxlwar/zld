import { TipService } from './../services/tip-service';
import { EDIT_WORKER_CONTRACT, EditWorkerContractAction, EditWorkerContractFailAction, EditWorkerContractSuccessAction } from './../actions/action/worker-action';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from '../services/api/websocket-service';
import { Command } from '../services/api/command';
import { Observable } from 'rxjs/Observable';
import { ResponseAction } from '../interfaces/response-interface';
import { GET_WORKER_CONTRACTS, GetWorkerContractsAction, WorkerContractListFailAction, WorkerContractListSuccessAction } from '../actions/action/worker-action';

@Injectable()
export class WorkerEffect extends Command {
    @Effect()
    workerContracts$: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORKER_CONTRACTS)
        .switchMap((action: GetWorkerContractsAction) => this.ws
            .send(this.getWorkerContractList(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORKER_CONTRACTS))
            .map(msg => msg.isError ? new WorkerContractListFailAction(msg.data) : new WorkerContractListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    workerContractEdit$: Observable<ResponseAction> = this.actions$
        .ofType(EDIT_WORKER_CONTRACT)
        .switchMap((action: EditWorkerContractAction) => this.ws
            .send(this.getWorkerContractEdit(action.payload))
            .takeUntil(this.actions$.ofType(EDIT_WORKER_CONTRACT))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new EditWorkerContractFailAction(msg.data) : new EditWorkerContractSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        public ws: WebsocketService,
        private tip: TipService,
        private actions$: Actions
    ) {
        super();
    }
}
