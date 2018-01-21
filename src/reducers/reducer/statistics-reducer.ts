import { AttendanceResultTeamStatListResponse, RequestAggregationResponse, AttendanceStatistics, WorkFlowAggregation, WorkTypeRealTimeStatisticsResponse, TeamMembersRealTimeStatisticsResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/statistics-action';

export interface AttendanceConditions {
    selectedTeams: string[];
    selectedDates: string[];
    statisticList: AttendanceStatistics[];
}
export interface State {
    attendanceConditions: AttendanceConditions;
    attendanceResultTeamStatResponse: AttendanceResultTeamStatListResponse;
    requestAggregationResponse: RequestAggregationResponse;
    workTypeRealTimeStatisticsResponse: WorkTypeRealTimeStatisticsResponse;
    teamMemberRealTimeStatisticsResponse: TeamMembersRealTimeStatisticsResponse;
}

export const initialState: State = {
    attendanceConditions: { selectedTeams: [], selectedDates: [], statisticList: [] },
    attendanceResultTeamStatResponse: {
        attend_result_team_stat_list: []
    },
    requestAggregationResponse: null,
    workTypeRealTimeStatisticsResponse: null,
    teamMemberRealTimeStatisticsResponse: null
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.ATTENDANCE_RESULT_TEAM_STAT_FAIL: {
            const result = Object.assign({}, state, { attendanceResultTeamStatResponse: action.payload });

            result.attendanceConditions.statisticList = [];

            return result;
        }

        case actions.ATTENDANCE_RESULT_TEAM_STAT_SUCCESS: {
            const statisticList = attendanceStatisticListReducer(action.payload.attend_result_team_stat_list, state.attendanceConditions);

            state.attendanceConditions.statisticList = statisticList;

            state.attendanceResultTeamStatResponse = action.payload;

            return { ...state };
        }

        case actions.SHOW_SPECIFIC_ATTENDANCE_STATISTICS_BY_TEAM: {
            const attendanceConditions = Object.assign({}, state.attendanceConditions, { selectedTeams: action.payload });

            const statisticList = attendanceStatisticListReducer(state.attendanceResultTeamStatResponse.attend_result_team_stat_list, attendanceConditions);

            attendanceConditions.statisticList = statisticList;

            return { ...state, attendanceConditions };
        }

        case actions.SHOW_SPECIFIC_ATTENDANCE_STATISTICS_BY_DATE: {
            const attendanceConditions = { ...state.attendanceConditions, selectedDates: action.payload };

            const statisticList = attendanceStatisticListReducer(state.attendanceResultTeamStatResponse.attend_result_team_stat_list, attendanceConditions);

            attendanceConditions.statisticList = statisticList;

            return { ...state, attendanceConditions };
        }

        case actions.WORK_FLOW_STATISTICS_FAIL:
        case actions.WORK_FLOW_STATISTICS_SUCCESS:
            return { ...state, requestAggregationResponse: action.payload };

        case actions.UPDATE_SPECIFIC_WORK_FLOW_STATISTIC:
            return { ...state, requestAggregationResponse: { request_aggregation: updateWorkFlowAggregation(state.requestAggregationResponse.request_aggregation, action.payload) } };

        case actions.WORK_TYPE_REAL_TIME_STATISTICS_FAIL:
        case actions.WORK_TYPE_REAL_TIME_STATISTICS_SUCCESS:
            return { ...state, workTypeRealTimeStatisticsResponse: action.payload };
       
        case actions.TEAM_MEMBERS_REAL_TIME_STATISTICS_FAIL:
        case actions.TEAM_MEMBERS_REAL_TIME_STATISTICS_SUCCESS:
            return { ...state, teamMemberRealTimeStatisticsResponse: action.payload };

        case actions.GET_WORK_TYPE_REAL_TIME_STATISTICS:
        case actions.GET_TEAM_MEMBERS_REAL_TIME_STATISTICS:
        case actions.GET_ATTENDANCE_RESULT_TEAM_STAT:
        case actions.GET_WORK_FLOW_STATISTICS:
        default:
            return state;
    }
}

export function updateWorkFlowAggregation(source: WorkFlowAggregation[], data: { processId: string, count: number }): WorkFlowAggregation[] {
    const index = source.findIndex(item => item.process_id === data.processId);

    if (index !== -1) {
        const result = [...source];

        result[index].process_id__count = result[index].process_id__count - data.count;

        return result;
    } else {
        return source;
    }
}

export function attendanceStatisticListReducer(data: AttendanceStatistics[], condition: AttendanceConditions): AttendanceStatistics[] {
    const { selectedTeams, selectedDates } = condition;

    let result = [...data];

    if (selectedTeams.length) {
        result = result.filter(item => selectedTeams.indexOf(item.team_name) !== -1);
    }

    if (selectedDates.length) {
        result = result.map(item => filterConfirmStatusByDate(item, selectedDates));
    }

    return result;
}


export function filterConfirmStatusByDate(data: AttendanceStatistics, dates: string[]): AttendanceStatistics {
    const status = data.confirm_status;

    const result = dates.reduce((acc, cur) => {
        if (status[cur]) acc[cur] = status[cur];
        return acc;
    }, {});

    return { ...data, confirm_status: result };
}

export const getAttendanceStatResponse = (state: State) => state.attendanceResultTeamStatResponse;

export const getAttendanceStats = (state: State) => state.attendanceResultTeamStatResponse.attend_result_team_stat_list;

export const getWorkFlowStatResponse = (state: State) => state.requestAggregationResponse;

export const getAttendanceStatisticList = (state: State) => state.attendanceConditions.statisticList;

export const getAttendanceSelectedTeams = (state: State) => state.attendanceConditions.selectedDates;

export const getAttendanceSelectedDates = (state: State) => state.attendanceConditions.selectedDates;

export const getWorkTypeStatistics = (state: State) => state.workTypeRealTimeStatisticsResponse;

export const getTeamMembersStatistics = (state: State) => state.teamMemberRealTimeStatisticsResponse;