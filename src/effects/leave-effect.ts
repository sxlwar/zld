import { GET_LEAVE_RECORD_LIST, GetLeaveRecordListAction, LeaveRecordListFailAction, LeaveRecordListSuccessAction } from './../actions/action/leave-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from './../services/api/websocket-service';
import { Command } from './../services/api/command';
import { Injectable } from '@angular/core';

@Injectable()
export class LeaveEffect extends Command {
    @Effect()
    leaveRecord$$: Observable<ResponseAction> = this.actions$
        .ofType(GET_LEAVE_RECORD_LIST)
        .switchMap((action: GetLeaveRecordListAction) => this.ws
            .send(this.getLeaveRecordList(action.payload))
            .takeUntil(this.actions$.ofType(GET_LEAVE_RECORD_LIST))
            .map(msg => msg.isError ? new LeaveRecordListFailAction(msg.data) : new LeaveRecordListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );
        
    constructor(
        public ws: WebsocketService,
        public actions$: Actions
    ) {
        super();
    }
}