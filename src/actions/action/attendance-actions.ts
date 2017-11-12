//region
import {Action} from '@ngrx/store';
import {AttendanceResultListResponse} from '../../interfaces/response-interface';
import {AttendanceResultListOptions} from '../../interfaces/request-interface';
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

export const SET_ATTENDANCE_START_DATE = 'SET_ATTENDANCE_START_DATE';

export class SetAttendanceStartDate implements Action {
  readonly type = SET_ATTENDANCE_START_DATE;

  constructor(public payload: string) {
  }
}

export const SET_ATTENDANCE_END_DATE = 'SET_ATTENDANCE_END_DATE';

export class SetAttendanceEndDate implements Action {
  readonly type = SET_ATTENDANCE_END_DATE;

  constructor(public payload: string) {
  }
}

export type Actions = GetAttendanceResultListAction
  | AttendanceResultListFailAction
  | AttendanceResultListSuccessAction
  | SetAttendanceStartDate
  | SetAttendanceEndDate;
