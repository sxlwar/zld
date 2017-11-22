//region
import { Action } from '@ngrx/store';
import { AttendanceResultListResponse } from '../../interfaces/response-interface';
import { AttendanceResultListOptions } from '../../interfaces/request-interface';
//endregion

/*==========================================Attendance query======================================================= */

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

/* =============================================Attendance date=================================================== */

export const SET_ATTENDANCE_START_DATE = 'SET_ATTENDANCE_START_DATE';

export class SetAttendanceStartDateAction implements Action {
  readonly type = SET_ATTENDANCE_START_DATE;

  constructor(public payload: string) {
  }
}

export const SET_ATTENDANCE_END_DATE = 'SET_ATTENDANCE_END_DATE';

export class SetAttendanceEndDateAction implements Action {
  readonly type = SET_ATTENDANCE_END_DATE;

  constructor(public payload: string) {
  }
}

/* ======================================Attendance query page=================================================== */

export const SET_QUERY_ATTENDANCE_PAGE = 'SET_QUERY_ATTENDANCE_PAGE';

export class SetQueryAttendancePageAction implements Action {
  readonly type = SET_QUERY_ATTENDANCE_PAGE;

  constructor(public payload: number) {
  }
}

export const GET_QUERY_ATTENDANCE_PAGE = 'GET_QUERY_ATTENDANCE_PAGE';

export class GetQueryAttendancePageAction implements Action {
  readonly type = GET_QUERY_ATTENDANCE_PAGE;

  constructor() {
  }
}

/* ==========================================Attendance limit==================================================== */

export const SET_QUERY_ATTENDANCE_LIMIT = 'SET_QUERY_ATTENDANCE_LIMIT';

export class SetQueryAttendanceLimitAction implements Action {
  readonly type = SET_QUERY_ATTENDANCE_LIMIT;

  constructor(public payload: number) {
  }
}

export const GET_QUERY_ATTENDANCE_LIMIT = 'GET_QUERY_ATTENDANCE_LIMIT';

export class GetQueryAttendanceLimitAction implements Action {
  readonly type = GET_QUERY_ATTENDANCE_LIMIT;

  constructor(public payload: number) {
  }
}

/* ==========================================Attendance selected==================================================== */

export const ADD_SELECTED_ATTENDANCE = 'ADD_SELECTED_ATTENDANCE';

export class AddSelectedAttendanceAction implements Action {
  readonly type = ADD_SELECTED_ATTENDANCE;

  constructor(public payload: number) {
  }
}

export const REMOVE_SELECTED_ATTENDANCE = 'REMOVE_SELECTED_ATTENDANCE';

export class RemoveSelectedAttendanceAction implements Action {
  readonly type = REMOVE_SELECTED_ATTENDANCE;

  constructor(public payload: number) {
  }
}

export const TOGGLE_ALL_SELECTED_ATTENDANCE = 'TOGGLE_ALL_SELECTED_ATTENDANCE';

export class ToggleAllSelectedAction implements Action {
  readonly type = TOGGLE_ALL_SELECTED_ATTENDANCE;

  constructor(public payload: boolean) {
  }
}

/* ================================================Attendance page================================================*/

export const INCREASE_ATTENDANCE_PAGE = 'INCREASE_ATTENDANCE_PAGE';

export class IncreaseAttendancePageAction implements Action {
  readonly type = 'INCREASE_ATTENDANCE_PAGE';

  constructor() {
  }
}

export const RESET_ATTENDANCE_PAGE = 'RESET_ATTENDANCE_PAGE';

export class ResetAttendancePageAction implements Action {
  readonly type = RESET_ATTENDANCE_PAGE;

  constructor() {
  };
}

/* ================================================Attendance sort================================================*/

export const SORT_ATTENDANCE = 'SORT_ATTENDANCE';

export class SortAttendanceAction implements Action {
  readonly type = SORT_ATTENDANCE;

  constructor(public payload: string) {
  }
}

export const TOGGLE_SORT_TYPE = 'TOGGLE_SORT_TYPE';

export class ToggleAttendanceSortTypeAction implements Action {
  readonly type = TOGGLE_SORT_TYPE;

  constructor(public payload: number) {
  }
}

export type Actions = GetAttendanceResultListAction
  | AttendanceResultListFailAction
  | AttendanceResultListSuccessAction
  | SetAttendanceStartDateAction
  | SetAttendanceEndDateAction
  | SetQueryAttendancePageAction
  | GetQueryAttendancePageAction
  | SetQueryAttendanceLimitAction
  | GetQueryAttendanceLimitAction
  | AddSelectedAttendanceAction
  | RemoveSelectedAttendanceAction
  | ToggleAllSelectedAction
  | IncreaseAttendancePageAction
  | ResetAttendancePageAction
  | SortAttendanceAction
  | ToggleAttendanceSortTypeAction;
