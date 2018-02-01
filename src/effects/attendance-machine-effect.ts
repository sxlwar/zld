import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    AttendanceMachineListFailAction,
    AttendanceMachineListSuccessAction,
    GET_ATTENDANCE_MACHINE_LIST,
    GetAttendanceMachineListAction,
} from './../actions/action/attendance-machine-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Command } from './../services/api/command';
import { WebsocketService } from './../services/api/websocket-service';

@Injectable()
export class AttendanceMachineEffect extends Command {

    @Effect()
    machineList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_ATTENDANCE_MACHINE_LIST)
        .switchMap((action: GetAttendanceMachineListAction) => this.ws
            .send(this.getAttendanceMachineList(action.payload))
            .takeUntil(this.actions$.ofType(GET_ATTENDANCE_MACHINE_LIST))
            .map(msg => msg.isError
                ? new AttendanceMachineListFailAction(msg.data)
                : new AttendanceMachineListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions
    ) {
        super();
    }
}
