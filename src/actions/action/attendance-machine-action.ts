import { AttendanceMachineListResponse } from './../../interfaces/response-interface';
import { AttendanceMachineListOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

export const GET_ATTENDANCE_MACHINE_LIST = 'GET_ATTENDANCE_MACHINE_LIST';

export class GetAttendanceMachineListAction implements Action {
    readonly type = GET_ATTENDANCE_MACHINE_LIST;

    constructor(public payload: AttendanceMachineListOptions) { }
}

export const ATTENDANCE_MACHINE_LIST_FAIL = 'ATTENDANCE_MACHINE_LIST_FAIL';

export class AttendanceMachineListFailAction implements Action {
    readonly type = ATTENDANCE_MACHINE_LIST_FAIL;

    constructor(public payload: AttendanceMachineListResponse) { }
}

export const ATTENDANCE_MACHINE_LIST_SUCCESS = 'ATTENDANCE_MACHINE_LIST_SUCCESS';

export class AttendanceMachineListSuccessAction implements Action {
    readonly type = ATTENDANCE_MACHINE_LIST_SUCCESS;

    constructor(public payload: AttendanceMachineListResponse) { }
}

export type Actions = GetAttendanceMachineListAction
    | AttendanceMachineListFailAction
    | AttendanceMachineListSuccessAction;
    