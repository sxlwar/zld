import { Action } from '@ngrx/store';

import { AttendanceInstantListOptions } from '../../interfaces/request-interface';
import { AttendanceInstantListResponse } from '../../interfaces/response-interface';

/* ======================================================Attendance record response=================================================== */

export const GET_ATTENDANCE_RECORD = 'GET_ATTENDANCE_RECORD';

export class GetAttendanceRecordAction implements Action {
    readonly type = GET_ATTENDANCE_RECORD;

    constructor(public payload: AttendanceInstantListOptions) { };
}

export const ATTENDANCE_RECORD_FAIL = 'ATTENDANCE_RECORD_FAIL';

export class AttendanceRecordFailAction implements Action {
    readonly type = ATTENDANCE_RECORD_FAIL;

    constructor(public payload: AttendanceInstantListResponse) { }
}

export const ATTENDANCE_RECORD_SUCCESS = 'ATTENDANCE_RECORD_SUCCESS';

export class AttendanceRecordSuccessAction implements Action {
    readonly type = ATTENDANCE_RECORD_SUCCESS;

    constructor(public payload: AttendanceInstantListResponse) { }
}

/* ======================================================Attendance record page=================================================== */

export const INCREASE_RECORD_PAGE = 'INCREASE_RECORD_PAGE';

export class IncreaseRecordPageAction implements Action {
    readonly type = INCREASE_RECORD_PAGE;

    constructor() { }
}

export const RESET_RECORD_PAGE = 'RESET_RECORD_PAGE';

export class ResetRecordPageAction implements Action {
    readonly type = RESET_RECORD_PAGE;

    constructor() { }
}

export const GET_ATTENDANCE_RECORD_MAX_DATE = 'GET_ATTENDANCE_RECORD_MAX_DATE';

export class GetAttendanceRecordMaxDateAction implements Action {
    readonly type = GET_ATTENDANCE_RECORD_MAX_DATE;

    constructor() { }
}

/* ============================================================Location attendance record =================================================== */

export const SET_LOCATION_ATTENDANCE_START_DATE = 'SET_LOCATION_ATTENDANCE_START_DATE';

export class SetLocationAttendanceRecordStartDateAction implements Action {
    readonly type = SET_LOCATION_ATTENDANCE_START_DATE;

    constructor(public payload: string) { }
}

export const SET_LOCATION_ATTENDANCE_END_DATE = 'SET_LOCATION_ATTENDANCE_END_TIME';

export class SetLocationAttendanceRecordEndDateAction implements Action {
    readonly type = SET_LOCATION_ATTENDANCE_END_DATE;

    constructor(public payload: string) { }
}

export const SET_LOCATION_ATTENDANCE_USERS = 'SET_LOCATION_ATTENDANCE_USERS';

export class SetLocationAttendanceRecordUsersAction implements Action {
    readonly type = SET_LOCATION_ATTENDANCE_USERS;

    constructor(public payload: number[]) { }
}

export const RESET_RECORD_RESPONSE = 'RESET_RECORD_RESPONSE';

export class ResetRecordResponseAction implements Action {
    readonly type = RESET_RECORD_RESPONSE;

    constructor() { }
}

export type Actions = GetAttendanceRecordAction
    | AttendanceRecordFailAction
    | AttendanceRecordSuccessAction
    | GetAttendanceRecordMaxDateAction
    | IncreaseRecordPageAction
    | ResetRecordPageAction
    | ResetRecordResponseAction
    | SetLocationAttendanceRecordEndDateAction
    | SetLocationAttendanceRecordStartDateAction
    | SetLocationAttendanceRecordUsersAction;
