import { Action } from "@ngrx/store";
import { AttendanceInstantListOptions } from "../../interfaces/request-interface";
import { AttendanceInstantListResponse } from "../../interfaces/response-interface";

/* ======================================================Attendance record response=================================================== */

export const GET_ATTENDANCE_RECORD = 'GET_ATTENDANCE_RECORD';

export class GetAttendanceRecordAction implements Action {
    readonly type =GET_ATTENDANCE_RECORD;
    
    constructor(public payload: AttendanceInstantListOptions){};
}

export const ATTENDANCE_RECORD_FAIL = 'ATTENDANCE_RECORD_FAIL';

export class AttendanceRecordFailAction implements Action {
    readonly type =  ATTENDANCE_RECORD_FAIL;

    constructor(public payload: AttendanceInstantListResponse){}
}

export const ATTENDANCE_RECORD_SUCCESS = 'ATTENDANCE_RECORD_SUCCESS';

export class AttendanceRecordSuccessAction implements Action {
    readonly type = ATTENDANCE_RECORD_SUCCESS;

    constructor(public payload: AttendanceInstantListResponse){}
}

/* ======================================================Attendance record page=================================================== */

export const INCREASE_RECORD_PAGE = 'INCREASE_RECORD_PAGE';

export class IncreaseRecordPageAction implements Action {
    readonly type = INCREASE_RECORD_PAGE;

    constructor(){}
}

export const RESET_RECORD_PAGE = 'RESET_RECORD_PAGE';

export class ResetRecordPageAction implements Action {
    readonly type = RESET_RECORD_PAGE;

    constructor(){}
}

export type Actions = GetAttendanceRecordAction
| AttendanceRecordFailAction
| AttendanceRecordSuccessAction
| IncreaseRecordPageAction
| ResetRecordPageAction;