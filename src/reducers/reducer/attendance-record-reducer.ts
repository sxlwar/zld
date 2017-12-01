import { AttendanceInstantListResponse } from "../../interfaces/response-interface";
import * as actions from '../../actions/action/attendance-record-action';

export interface State {
    page: number;
    limit: number;
    response: AttendanceInstantListResponse;
    moreData: boolean;
    maxDate: Date;
}

export const initialState: State = {
    page: 1,
    limit: 20,
    response: {
        count: 0,
        attendance_instants: []
    },
    moreData: true,
    maxDate: new Date()
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.ATTENDANCE_RECORD_FAIL: {
            const response = action.payload;

            return Object.assign({}, state, { response });
        }

        case actions.ATTENDANCE_RECORD_SUCCESS: {
            const response = action.payload;

            return Object.assign({}, state, { response });

        }

        case actions.INCREASE_RECORD_PAGE: {
            return Object.assign({}, state, { page: state.page + 1 });
        }

        case actions.RESET_RECORD_PAGE: {
            return Object.assign({}, state, { page: 1 });
        }

        case actions.TOGGLE_MORE_DATA_FLAG: {
            return Object.assign({}, state, { moreData: action.payload });
        }

        case actions.GET_ATTENDANCE_RECORD:
        default:
            return state;
    }
}

export const getAttendanceResponse = (state: State) => state.response;

export const getAttendanceRecordCount = (state: State) => state.response.count;

export const getAttendanceRecordInstants = (state: State) => state.response.attendance_instants;

export const getAttendanceRecordPage = (state: State) => state.page;

export const getAttendanceRecordLimit = (state: State) => state.limit;

export const getAttendanceRecordMoreData = (state: State) => state.moreData;

export const getAttendanceRecordMaxDate = (state: State) => state.maxDate;