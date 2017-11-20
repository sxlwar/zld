import { AttendanceResultTeamStatListResposne } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/statistics-action';

export interface State {
    attendanceResultTeamStatResponse: AttendanceResultTeamStatListResposne
}

export const initialState: State = {
    attendanceResultTeamStatResponse: {
        attend_result_team_stat_list: []
    } 
}

export function reducer(state = initialState, action: actions.Actions) {
    switch (action.type) {
        case actions.ATTENDANCE_RESULT_TEAM_STAT_FAIL:
            return Object.assign({}, state, { attendanceResultTeamStatResponse: action.payload });

        case actions.ATTENDANCE_RESULT_TEAM_STAT_SUCCESS:
            return Object.assign({}, state, { attendanceResultTeamStatResponse: action.payload });

        case actions.GET_ATTENDANCE_RESULT_TEAM_STAT:
        default:
            return state;
    }
}

export const getAttendanceStatResponse = (state: State) => state.attendanceResultTeamStatResponse;

export const getAttendanceStats = (state: State) => state.attendanceResultTeamStatResponse.attend_result_team_stat_list;
