//region
import {Action} from '@ngrx/store';
import {AttendanceResultListResponse} from '../interfaces/response-interface';
import {AttendanceResultListOptions} from '../interfaces/request-interface';
//endregion

export const GET_ATTENDANCE_RESULT_LIST = 'GET_ATTENDANCE_RESULT_LIST';

export class GetAttendanceResultListAction implements Action {
  readonly type = GET_ATTENDANCE_RESULT_LIST;

  constructor(public payload: AttendanceResultListOptions) {
  }
}

export const ATTENDANCE_RESULT_LIST_FAIL = 'ATTENDANCE_RESULT_LIST_FAIL';

export class AttendanceResultListFailAction implements Action {
  readonly type = ATTENDANCE_RESULT_LIST_FAIL;

  constructor(public payload: AttendanceResultListResponse) {
  }
}

export const ATTENDANCE_RESULT_LIST_SUCCESS = 'ATTENDANCE_RESULT_LIST_SUCCESS';

export class AttendanceResultListSuccessAction implements Action {
  readonly type = ATTENDANCE_RESULT_LIST_SUCCESS;

  constructor(public payload: AttendanceResultListResponse) {
  }
}

export type Actions = GetAttendanceResultListAction
  | AttendanceResultListFailAction
  | AttendanceResultListSuccessAction;
