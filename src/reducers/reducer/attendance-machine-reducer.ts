import { AttendanceMachineListResponse } from './../../interfaces/response-interface';
import * as actions from './../../actions/action/attendance-machine-action';

export interface State {
    response: AttendanceMachineListResponse;
}

export const initialState: State = {
    response: {
        count: 0,
        attendance_machines: []
    },
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.ATTENDANCE_MACHINE_LIST_FAIL:
        case actions.ATTENDANCE_MACHINE_LIST_SUCCESS:
            return Object.assign({}, state, { response: action.payload });

        case actions.GET_ATTENDANCE_MACHINE_LIST:
        default:
            return state;

    }
}

export const getMachineListResponse = (state: State) => state.response;

export const getAttendanceCount = (state: State) => state.response.count;

export const getAttendanceMachines = (state: State) => state.response.attendance_machines;
