//region
import { Injectable } from '@angular/core';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ResponseAction } from '../interfaces/response-interface';
import { GET_OVERTIME_RECORD, WorkOvertimeRecordListFailAction, WorkOvertimeRecordListSuccessAction } from '../actions/action/overtime-action';
import { RequestAction } from '../interfaces/request-interface';
import { of } from 'rxjs/observable/of';
//endregion

@Injectable()
export class OvertimeEffect extends Command {
    @Effect()
    overtime: Observable<ResponseAction> = this.actions$
        .ofType(GET_OVERTIME_RECORD)
        .switchMap((action: RequestAction) => this.ws
            .send(this.getWorkOvertimeRecordList(action.payload))
            .takeUntil(this.actions$.ofType(GET_OVERTIME_RECORD))
            .map(msg => msg.isError ? new WorkOvertimeRecordListFailAction(msg.data) : new WorkOvertimeRecordListSuccessAction(msg.data))
            .catch(error => of(error))
        )

    constructor(
        public ws: WebsocketService,
        public actions$: Actions,
    ) {
        super();
    }
}
