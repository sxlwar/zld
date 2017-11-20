import { AttendanceResultTeamStatListResposne } from './../../interfaces/response-interface';
import { AttendanceResultTeamStatListOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';
export const GET_ATTENDANCE_RESULT_TEAM_STAT = 'GET_ATTENDANCE_RESULT_TEAM_STAT';

export class GetAttendanceResultTeamStatListAction implements Action {
    readonly type = GET_ATTENDANCE_RESULT_TEAM_STAT;

    constructor(public payload: AttendanceResultTeamStatListOptions){}
}

export const ATTENDANCE_RESULT_TEAM_STAT_FAIL = 'ATTENDANCE_RESULT_TEAM_STAT_FAIL';

export class AttendanceResultTeamStatFailAction implements Action {
    readonly type = ATTENDANCE_RESULT_TEAM_STAT_FAIL;

    constructor(public payload: AttendanceResultTeamStatListResposne){}
}

export const ATTENDANCE_RESULT_TEAM_STAT_SUCCESS = 'ATTENDANCE_RESULT_TEAM_STAT_SUCCESS';

export class AttendanceResultTeamStatSuccessAction implements Action {
    readonly type = ATTENDANCE_RESULT_TEAM_STAT_SUCCESS;

    constructor(public payload: AttendanceResultTeamStatListResposne) {}
}


export type Actions = GetAttendanceResultTeamStatListAction
    | AttendanceResultTeamStatFailAction
    | AttendanceResultTeamStatSuccessAction;