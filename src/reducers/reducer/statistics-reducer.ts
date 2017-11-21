import { AttendanceResultTeamStatListResponse, RequestAggregationResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/statistics-action';

export interface State {
    attendanceResultTeamStatResponse: AttendanceResultTeamStatListResponse,
    requestAggregationResponse: RequestAggregationResponse
}

export const initialState: State = {
    attendanceResultTeamStatResponse: {
        attend_result_team_stat_list: []
    },
    requestAggregationResponse: {
        request_aggregation: []
    }
}

export function reducer(state = initialState, action: actions.Actions) {
    switch (action.type) {
        case actions.ATTENDANCE_RESULT_TEAM_STAT_FAIL:
        case actions.ATTENDANCE_RESULT_TEAM_STAT_SUCCESS:
            return Object.assign({}, state, { attendanceResultTeamStatResponse: action.payload });

        case actions.WORK_FLOW_STATISTICS_FAIL:
        case actions.WORK_FLOW_STATISTICS_SUCCESS:
            return Object.assign({}, state, { requestAggregationResponse: action.payload })

        case actions.GET_ATTENDANCE_RESULT_TEAM_STAT:
        case actions.GET_WORK_FLOW_STATISTICS:
        default:
            return state;
    }
}

export const getAttendanceStatResponse = (state: State) => state.attendanceResultTeamStatResponse;

export const getAttendanceStats = (state: State) => state.attendanceResultTeamStatResponse.attend_result_team_stat_list;

export const getWorkFlowStatResponse = (state: State) => state.requestAggregationResponse;

export const getWorkFlowStats = (state: State) => state.requestAggregationResponse.request_aggregation;