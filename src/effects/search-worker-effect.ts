import { SEARCH_WORKER, SearchWorkerAction, SearchWorkerFailAction, SearchWorkerSuccessAction } from './../actions/action/search-worker-action';
import { Observable } from 'rxjs/Observable';
import { ResponseAction } from './../interfaces/response-interface';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from './../services/api/websocket-service';
import { Command } from './../services/api/command';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchWorkerEffect extends Command {
    @Effect()
    searchWorker$: Observable<ResponseAction> = this.actions$
        .ofType(SEARCH_WORKER)
        .switchMap((action: SearchWorkerAction) => this.ws
            .send(this.getSearchWorker(action.payload))
            .takeUntil(this.actions$.ofType(SEARCH_WORKER))
            .map(msg => msg.isError ? new SearchWorkerFailAction(msg.data) : new SearchWorkerSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions
    ) {
        super();
    }
}