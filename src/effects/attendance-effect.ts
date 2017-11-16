//region
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

  constructor(public ws: WebsocketService,
    public actions$: Actions,
  ) {
    super();
  }
}
