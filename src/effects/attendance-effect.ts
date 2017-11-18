//region
import { GET_ATTENDANCE_RECORD, GetAttendanceRecordAction, AttendanceRecordFailAction, AttendanceRecordSuccessAction } from './../actions/action/attendance-record-action';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from '../services/api/websocket-service';
import { Command } from '../services/api/command';
import { ResponseAction } from '../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import {
  AttendanceResultListFailAction,
  AttendanceResultListSuccessAction,
  GET_ATTENDANCE_RESULT_LIST,
  GetAttendanceResultListAction
} from '../actions/action/attendance-action';
import { of } from 'rxjs/observable/of';
//endregion

@Injectable()
export class AttendanceEffect extends Command {
  @Effect()
  attendanceList$: Observable<ResponseAction> = this.actions$
    .ofType(GET_ATTENDANCE_RESULT_LIST)
    .switchMap((action: GetAttendanceResultListAction) => this.ws
      .send(this.getAttendanceList(action.payload))
      .takeUntil(this.actions$.ofType(GET_ATTENDANCE_RESULT_LIST))
      .map(msg => msg.isError ? new AttendanceResultListFailAction(msg.data) : new AttendanceResultListSuccessAction(msg.data))
      .catch(error => of(error))
    );

  @Effect()
  attendanceRecord$: Observable<ResponseAction> = this.actions$
    .ofType(GET_ATTENDANCE_RECORD)
    .switchMap((action: GetAttendanceRecordAction) => this.ws
      .send(this.getAttendanceInstantList(action.payload))
      .takeUntil(this.actions$.ofType(GET_ATTENDANCE_RECORD))
      .map(msg => msg.isError ? new AttendanceRecordFailAction(msg.data) : new AttendanceRecordSuccessAction(msg.data))
      .catch(error => of(error))
    );

  constructor(
    public ws: WebsocketService,
    public actions$: Actions
  ) {
    super();
  }
}
