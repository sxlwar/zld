import { AttendanceModifyRecordListResponse } from './../../interfaces/response-interface';
import { AttendanceModifyRecordListOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';
import { AttendanceResultListResponse, AttendanceResultConfirmResponse } from '../../interfaces/response-interface';
import { AttendanceResultListOptions, AttendanceResultConfirmOptions } from '../../interfaces/request-interface';

/*==========================================Attendance query======================================================= */

export const GET_ATTENDANCE_RESULT_LIST = 'GET_ATTENDANCE_RESULT_LIST';

export class GetAttendanceResultListAction implements Action {
  readonly type = GET_ATTENDANCE_RESULT_LIST;

  constructor(public payload: AttendanceResultListOptions) { }
}

export const ATTENDANCE_RESULT_LIST_FAIL = 'ATTENDANCE_RESULT_LIST_FAIL';

export class AttendanceResultListFailAction implements Action {
  readonly type = ATTENDANCE_RESULT_LIST_FAIL;

  constructor(public payload: AttendanceResultListResponse) { }
}

export const ATTENDANCE_RESULT_LIST_SUCCESS = 'ATTENDANCE_RESULT_LIST_SUCCESS';

export class AttendanceResultListSuccessAction implements Action {
  readonly type = ATTENDANCE_RESULT_LIST_SUCCESS;

  constructor(public payload: AttendanceResultListResponse) { }
}

/* =============================================Attendance date=================================================== */

export const SET_ATTENDANCE_START_DATE = 'SET_ATTENDANCE_START_DATE';

export class SetAttendanceStartDateAction implements Action {
  readonly type = SET_ATTENDANCE_START_DATE;

  constructor(public payload: string) { }
}

export const SET_ATTENDANCE_END_DATE = 'SET_ATTENDANCE_END_DATE';

export class SetAttendanceEndDateAction implements Action {
  readonly type = SET_ATTENDANCE_END_DATE;

  constructor(public payload: string) { }
}

/* ======================================Attendance query page=================================================== */

export const SET_QUERY_ATTENDANCE_PAGE = 'SET_QUERY_ATTENDANCE_PAGE';

export class SetQueryAttendancePageAction implements Action {
  readonly type = SET_QUERY_ATTENDANCE_PAGE;

  constructor(public payload: number) { }
}

export const GET_QUERY_ATTENDANCE_PAGE = 'GET_QUERY_ATTENDANCE_PAGE';

export class GetQueryAttendancePageAction implements Action {
  readonly type = GET_QUERY_ATTENDANCE_PAGE;

  constructor() { }
}

/* ==========================================Attendance limit==================================================== */

export const SET_QUERY_ATTENDANCE_LIMIT = 'SET_QUERY_ATTENDANCE_LIMIT';

export class SetQueryAttendanceLimitAction implements Action {
  readonly type = SET_QUERY_ATTENDANCE_LIMIT;

  constructor(public payload: number) { }
}

export const GET_QUERY_ATTENDANCE_LIMIT = 'GET_QUERY_ATTENDANCE_LIMIT';

export class GetQueryAttendanceLimitAction implements Action {
  readonly type = GET_QUERY_ATTENDANCE_LIMIT;

  constructor(public payload: number) { }
}

/* ================================================Attendance page================================================*/

export const INCREASE_ATTENDANCE_PAGE = 'INCREASE_ATTENDANCE_PAGE';

export class IncreaseAttendancePageAction implements Action {
  readonly type = 'INCREASE_ATTENDANCE_PAGE';

  constructor() { }
}

export const RESET_ATTENDANCE_PAGE = 'RESET_ATTENDANCE_PAGE';

export class ResetAttendancePageAction implements Action {
  readonly type = RESET_ATTENDANCE_PAGE;

  constructor() { };
}

/* ================================================Attendance sort================================================*/

export const TOGGLE_SORT_TYPE = 'TOGGLE_SORT_TYPE';

export class ToggleAttendanceSortTypeAction implements Action {
  readonly type = TOGGLE_SORT_TYPE;

  constructor(public payload: number) { }
}

export const TOGGLE_ORDER_TYPE = 'TOGGLE_ORDER_TYPE';

export class ToggleOrderTypeAction implements Action {
  readonly type = TOGGLE_ORDER_TYPE;

  constructor(public payload: string) { }
}

export const RESET_ATTENDANCE_DATA = 'RESET_ATTENDANCE_DATA';

export class ResetAttendanceDataAction implements Action {
  readonly type = RESET_ATTENDANCE_DATA;

  constructor() { }
}

/* ============================================Attendance confirm=================================================== */

export const CONFIRM_ATTENDANCE = 'CONFIRM_ATTENDANCE';

export class ConfirmAttendanceAction implements Action {
  readonly type = CONFIRM_ATTENDANCE;

  constructor(public payload: AttendanceResultConfirmOptions) { }
}

export const ATTENDANCE_CONFIRM_FAIL = 'ATTENDANCE_CONFIRM_FAIL';

export class AttendanceConfirmFailAction implements Action {
  readonly type = ATTENDANCE_CONFIRM_FAIL;

  constructor(public payload: AttendanceResultConfirmResponse) { }
}

export const ATTENDANCE_CONFIRM_SUCCESS = 'ATTENDANCE_CONFIRM_SUCCESS';

export class AttendanceConfirmSuccessAction implements Action {
  readonly type = ATTENDANCE_CONFIRM_SUCCESS;

  constructor(public payload: AttendanceResultConfirmResponse) { }
}

/* ============================================Attendance modify=================================================== */

export const GET_ATTENDANCE_MODIFY_RECORD_LIST = 'GET_ATTENDANCE_MODIFY_RECORD_LIST';

export class GetAttendanceModifyRecordListAction implements Action {
  readonly type = GET_ATTENDANCE_MODIFY_RECORD_LIST;

  constructor(public payload: AttendanceModifyRecordListOptions) { }
}

export const ATTENDANCE_MODIFY_RECORD_LIST_FAIL = 'ATTENDANCE_MODIFY_RECORD_LIST_FAIL';

export class AttendanceModifyRecordListFailAction implements Action {
  readonly type = ATTENDANCE_MODIFY_RECORD_LIST_FAIL;

  constructor(public payload: AttendanceModifyRecordListResponse) { }
}

export const ATTENDANCE_MODIFY_RECORD_LIST_SUCCESS = 'ATTENDANCE_MODIFY_RECORD_LIST_SUCCESS';

export class AttendanceModifyRecordListSuccessAction implements Action {
  readonly type = ATTENDANCE_MODIFY_RECORD_LIST_SUCCESS;

  constructor(public payload: AttendanceModifyRecordListResponse) { }
}

export const SET_QUERY_ATTENDANCE_STATE = 'SET_QUERY_ATTENDANCE_STATE';

export class SetQueryAttendanceStateAction implements Action {
  readonly type = SET_QUERY_ATTENDANCE_STATE;

  constructor(public payload: number) { }
}

export type Actions = GetAttendanceResultListAction
  | AttendanceConfirmFailAction
  | AttendanceConfirmSuccessAction
  | AttendanceModifyRecordListFailAction
  | AttendanceModifyRecordListSuccessAction
  | AttendanceResultListFailAction
  | AttendanceResultListSuccessAction
  | ConfirmAttendanceAction
  | GetAttendanceModifyRecordListAction
  | GetQueryAttendanceLimitAction
  | GetQueryAttendancePageAction
  | IncreaseAttendancePageAction
  | ResetAttendancePageAction
  | ResetAttendanceDataAction
  | SetAttendanceEndDateAction
  | SetAttendanceStartDateAction
  | SetQueryAttendanceLimitAction
  | SetQueryAttendancePageAction
  | ToggleOrderTypeAction
  | ToggleAttendanceSortTypeAction
  | SetQueryAttendanceStateAction;