//region
import { Injectable } from '@angular/core';
import { WebsocketService } from '../services/api/websocket-service';
import { Actions , Effect} from '@ngrx/effects';
import { Command } from '../services/api/command';
import { Observable } from 'rxjs/Observable';
import { ResponseAction } from '../interfaces/response-interface';
import { GET_WORK_PIECE, WorkPieceListSuccessAction, WorkPieceListFailAction } from '../actions/action/work-piece-action';
import { RequestAction } from '../interfaces/request-interface';
import { of } from 'rxjs/observable/of';
//endregion

@Injectable()
export class WorkPieceEffect extends Command {
   @Effect()
   workPiece: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORK_PIECE)
        .switchMap((action: RequestAction) => this.ws
            .send(this.getWorkPieceList(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORK_PIECE))
            .map(msg => msg.isError ? new WorkPieceListFailAction(msg.data): new WorkPieceListSuccessAction(msg.data))
            .catch(error => of(error))
    )
    constructor(
        public ws: WebsocketService,
        public actions$: Actions
    ){
        super();
    }
}
