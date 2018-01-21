import { AttendanceResultTeamStatListResponse, RequestAggregationResponse, WorkTypeRealTimeStatisticsResponse, TeamMembersRealTimeStatisticsResponse } from './../../interfaces/response-interface';
import { AttendanceResultTeamStatListOptions, RequestAggregationOptions, WorkTypeRealTimeStatisticsOptions, TeamMembersRealTimeStatisticsOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

/* ===============================================Attendance by team================================================ */

export const GET_ATTENDANCE_RESULT_TEAM_STAT = 'GET_ATTENDANCE_RESULT_TEAM_STAT';

export class GetAttendanceResultTeamStatListAction implements Action {
    readonly type = GET_ATTENDANCE_RESULT_TEAM_STAT;

    constructor(public payload: AttendanceResultTeamStatListOptions) { }
}

export const ATTENDANCE_RESULT_TEAM_STAT_FAIL = 'ATTENDANCE_RESULT_TEAM_STAT_FAIL';

export class AttendanceResultTeamStatFailAction implements Action {
    readonly type = ATTENDANCE_RESULT_TEAM_STAT_FAIL;

    constructor(public payload: AttendanceResultTeamStatListResponse) { }
}

export const ATTENDANCE_RESULT_TEAM_STAT_SUCCESS = 'ATTENDANCE_RESULT_TEAM_STAT_SUCCESS';

export class AttendanceResultTeamStatSuccessAction implements Action {
    readonly type = ATTENDANCE_RESULT_TEAM_STAT_SUCCESS;

    constructor(public payload: AttendanceResultTeamStatListResponse) { }
}

/* ===============================================Work flow statistics================================================ */

export const GET_WORK_FLOW_STATISTICS = 'GET_WORK_FLOW_STATISTICS';

export class GetWorkFlowStatisticsAction implements Action {
    readonly type = GET_WORK_FLOW_STATISTICS;

    constructor(public payload: RequestAggregationOptions) { }
}

export const WORK_FLOW_STATISTICS_FAIL = 'WORK_FLOW_STATISTICS_FAIL';

export class WorkFlowStatisticsFailAction implements Action {
    readonly type = WORK_FLOW_STATISTICS_FAIL;

    constructor(public payload: RequestAggregationResponse) { }
}

export const WORK_FLOW_STATISTICS_SUCCESS = 'WORK_FLOW_STATISTICS_SUCCESS';

export class WorkFlowStatisticsSuccessAction implements Action {
    readonly type = WORK_FLOW_STATISTICS_SUCCESS;

    constructor(public payload: RequestAggregationResponse) { }
}

export const UPDATE_SPECIFIC_WORK_FLOW_STATISTIC = 'UPDATE_SPECIFIC_WORK_FLOW_STATISTIC';

export class UpdateSpecificWorkFlowStatisticAtLocalAction implements Action {
    readonly type = UPDATE_SPECIFIC_WORK_FLOW_STATISTIC;

    constructor(public payload: { processId: string, count: number }) { }
}

/* ===============================================Real time statistic======================================================== */

export const GET_WORK_TYPE_REAL_TIME_STATISTICS = 'GET_WORK_TYPE_REAL_TIME_STATISTICS';

export class GetWorkTypeRealTimeStatisticsAction implements Action {
    readonly type = GET_WORK_TYPE_REAL_TIME_STATISTICS;

    constructor(public payload: WorkTypeRealTimeStatisticsOptions) { }
}

export const WORK_TYPE_REAL_TIME_STATISTICS_FAIL = 'WORK_TYPE_REAL_TIME_STATISTICS_FAIL';

export class WorkTypeRealTimeStatisticsFailAction implements Action {
    readonly type = WORK_TYPE_REAL_TIME_STATISTICS_FAIL;

    constructor(public payload: WorkTypeRealTimeStatisticsResponse) { }
}

export const WORK_TYPE_REAL_TIME_STATISTICS_SUCCESS = 'WORK_TYPE_REAL_TIME_STATISTICS_SUCCESS';

export class WorkTypeRealTimeStatisticsSuccessAction implements Action {
    readonly type = WORK_TYPE_REAL_TIME_STATISTICS_SUCCESS;

    constructor(public payload: WorkTypeRealTimeStatisticsResponse) { }
}

export const GET_TEAM_MEMBERS_REAL_TIME_STATISTICS = 'GET_TEAM_MEMBERS_REAL_TIME_STATISTICS';

export class GetTeamMembersRealTimeStatisticsAction implements Action {
    readonly type = GET_TEAM_MEMBERS_REAL_TIME_STATISTICS;

    constructor(public payload: TeamMembersRealTimeStatisticsOptions) { }
}

export const TEAM_MEMBERS_REAL_TIME_STATISTICS_FAIL = 'TEAM_MEMBERS_REAL_TIME_STATISTICS_FAIL';

export class TeamMembersRealTimeStatisticsFailAction implements Action {
    readonly type = TEAM_MEMBERS_REAL_TIME_STATISTICS_FAIL;

    constructor(public payload: TeamMembersRealTimeStatisticsResponse) { }
}

export const TEAM_MEMBERS_REAL_TIME_STATISTICS_SUCCESS = 'TEAM_MEMBERS_REAL_TIME_STATISTICS_SUCCESS';

export class TeamMembersRealTimeStatisticsSuccessAction implements Action {
    readonly type = TEAM_MEMBERS_REAL_TIME_STATISTICS_SUCCESS;

    constructor(public payload: TeamMembersRealTimeStatisticsResponse) { }
}

/* ===============================================Data condition======================================================== */

export const SHOW_SPECIFIC_ATTENDANCE_STATISTICS_BY_TEAM = 'SHOW_SPECIFIC_ATTENDANCE_STATISTICS_BY_TEAM';

export class ShowSpecificAttendanceStatisticsByTeam implements Action {
    readonly type = SHOW_SPECIFIC_ATTENDANCE_STATISTICS_BY_TEAM;

    constructor(public payload: string[]) { }
}

export const SHOW_SPECIFIC_ATTENDANCE_STATISTICS_BY_DATE = 'SHOW_SPECIFIC_ATTENDANCE_STATISTICS_BY_DATE';

export class ShowSpecificAttendanceStatisticsByDate implements Action {
    readonly type = SHOW_SPECIFIC_ATTENDANCE_STATISTICS_BY_DATE;

    constructor(public payload: string[]) { }
}


export type Actions = GetAttendanceResultTeamStatListAction
    | AttendanceResultTeamStatFailAction
    | AttendanceResultTeamStatSuccessAction
    | GetTeamMembersRealTimeStatisticsAction
    | GetWorkFlowStatisticsAction
    | GetWorkTypeRealTimeStatisticsAction
    | ShowSpecificAttendanceStatisticsByDate
    | ShowSpecificAttendanceStatisticsByTeam
    | TeamMembersRealTimeStatisticsFailAction
    | TeamMembersRealTimeStatisticsSuccessAction
    | UpdateSpecificWorkFlowStatisticAtLocalAction
    | WorkFlowStatisticsFailAction
    | WorkFlowStatisticsSuccessAction
    | WorkTypeRealTimeStatisticsFailAction
    | WorkTypeRealTimeStatisticsSuccessAction;