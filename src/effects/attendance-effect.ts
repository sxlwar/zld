import { AttendanceConfirmFailAction, AttendanceConfirmSuccessAction, GET_ATTENDANCE_MODIFY_RECORD_LIST, GetAttendanceModifyRecordListAction, AttendanceModifyRecordListFailAction, AttendanceModifyRecordListSuccessAction } from './../actions/action/attendance-action';
import { GET_ATTENDANCE_RESULT_TEAM_STAT, GetAttendanceResultTeamStatListAction, AttendanceResultTeamStatFailAction, AttendanceResultTeamStatSuccessAction } from './../actions/action/statistics-action';
import { GET_ATTENDANCE_RECORD, GetAttendanceRecordAction, AttendanceRecordFailAction, AttendanceRecordSuccessAction } from './../actions/action/attendance-record-action';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from '../services/api/websocket-service';
import { Command } from '../services/api/command';
import { ResponseAction } from '../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { AttendanceResultListFailAction, AttendanceResultListSuccessAction, GET_ATTENDANCE_RESULT_LIST, GetAttendanceResultListAction, CONFIRM_ATTENDANCE, ConfirmAttendanceAction } from '../actions/action/attendance-action';
import { of } from 'rxjs/observable/of';

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
    .mergeMap((action: GetAttendanceRecordAction) => this.ws
      .send(this.getAttendanceInstantList(action.payload))
      .takeUntil(this.actions$.ofType(GET_ATTENDANCE_RECORD))
      .map(msg => msg.isError ? new AttendanceRecordFailAction(msg.data) : new AttendanceRecordSuccessAction(msg.data))
      .catch(error => of(error))
    );

  @Effect()
  attendanceResultTeamStat$: Observable<ResponseAction> = this.actions$
    .ofType(GET_ATTENDANCE_RESULT_TEAM_STAT)
    .switchMap((action: GetAttendanceResultTeamStatListAction) => this.ws
      .send(this.getAttendanceResultTeamStatList(action.payload))
      .takeUntil(this.actions$.ofType(GET_ATTENDANCE_RESULT_TEAM_STAT))
      .map(msg => msg.isError ? new AttendanceResultTeamStatFailAction(msg.data): new AttendanceResultTeamStatSuccessAction(msg.data))
      .catch(error => of(error))
  );

  @Effect()
  attendanceResultConfirm$: Observable<ResponseAction> = this.actions$
    .ofType(CONFIRM_ATTENDANCE)
    .switchMap((action: ConfirmAttendanceAction) => this.ws
      .send(this.getAttendanceResultConfirm(action.payload))
      .takeUntil(this.actions$.ofType(CONFIRM_ATTENDANCE))
      .map(msg => msg.isError ? new AttendanceConfirmFailAction(msg.data): new AttendanceConfirmSuccessAction(msg.data))
      .catch(error => of(error))
  );

  @Effect()
  attendanceModifyRecordList$: Observable<ResponseAction> = this.actions$
    .ofType(GET_ATTENDANCE_MODIFY_RECORD_LIST)
    .switchMap((action: GetAttendanceModifyRecordListAction) => this.ws
      .send(this.getAttendanceModifyRecordList(action.payload))
      .takeUntil(this.actions$.ofType(GET_ATTENDANCE_MODIFY_RECORD_LIST))
      .map(msg => msg.isError ? new AttendanceModifyRecordListFailAction(msg.data): new AttendanceModifyRecordListSuccessAction(msg.data))
      .catch(error => of(error))
  );

  constructor(
    public ws: WebsocketService,
    public actions$: Actions
  ) {
    super();
  }
}
