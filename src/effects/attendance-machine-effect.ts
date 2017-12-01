import { GET_ATTENDANCE_MACHINE_LIST, GetAttendanceMachineListAction, AttendanceMachineListFailAction, AttendanceMachineListSuccessAction } from './../actions/action/attendance-machine-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from './../services/api/websocket-service';
import { Command } from './../services/api/command';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AttendanceMachineEffect extends Command {
    
    @Effect()
    machineList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_ATTENDANCE_MACHINE_LIST)
        .switchMap((action: GetAttendanceMachineListAction) => this.ws
            .send(this.getAttendanceMachineList(action.payload))
            .takeUntil(this.actions$.ofType(GET_ATTENDANCE_MACHINE_LIST))
            .map(msg => msg.isError ? new AttendanceMachineListFailAction(msg.data) : new AttendanceMachineListSuccessAction(msg.data))
            .catch(error => of(error))
        )
        
    constructor(
        public ws: WebsocketService,
        public actions$: Actions
    ) {
        super();
    }
}