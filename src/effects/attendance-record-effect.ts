//region
import { Injectable } from "@angular/core";
import { Command } from "../services/api/command";
import { Effect } from "@ngrx/effects/src/effects_metadata";
import { WebsocketService } from "../services/api/websocket-service";
import { Actions } from "@ngrx/effects/src/actions";
import { Observable } from "rxjs/Observable";
import { ResponseAction } from "../interfaces/response-interface";
import { GET_ATTENDANCE_RECORD, AttendanceRecordFailAction, AttendanceRecordSuccessAction } from "../actions/action/attendance-record-action";
import { RequestAction } from "../interfaces/request-interface";
import { of } from 'rxjs/Observable/of';
//endregion

@Injectable()
export class AttendanceRecordEffect extends Command {
    @Effect()
    attendanceRecord: Observable<ResponseAction> = this.actions$
        .ofType(GET_ATTENDANCE_RECORD)
        .switchMap((action: RequestAction) => this.ws
            .send(this.getAttendanceInstantList(action.payload))
            .takeUntil(this.actions$.ofType(GET_ATTENDANCE_RECORD))
            .map(msg => msg.isError ? new AttendanceRecordFailAction(msg.data) : new AttendanceRecordSuccessAction(msg.data))
            .catch(error => of(error))
        );

    constructor(
        public ws: WebsocketService,
        public actions$: Actions,
    ) {
        super();
    }
}
