import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    GET_WORK_PIECE,
    GetWorkPieceListAction,
    WorkPieceListFailAction,
    WorkPieceListSuccessAction,
} from '../actions/action/work-piece-action';
import { ResponseAction } from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';

@Injectable()
export class WorkPieceEffect extends Command {
    @Effect()
    workPiece: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORK_PIECE)
        .switchMap((action: GetWorkPieceListAction) => this.ws
            .send(this.getWorkPieceList(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORK_PIECE))
            .map(msg => msg.isError
                ? new WorkPieceListFailAction(msg.data)
                : new WorkPieceListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        )
    constructor(
        private ws: WebsocketService,
        private actions$: Actions
    ) {
        super();
    }
}
