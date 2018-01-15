import { LocationRecordOptions } from './../../interfaces/location-attendance-record-interface';
import { AttendanceInstantListResponse } from "../../interfaces/response-interface";
import * as actions from '../../actions/action/attendance-record-action';
import { TimeService } from '../../services/utils/time-service';

const timeService = new TimeService();

export interface State {
    page: number;
    limit: number;
    response: AttendanceInstantListResponse;
    maxDate: Date;
    locationAttendanceOptions: LocationRecordOptions
}

export const initialState: State = {
    page: 1,
    limit: 20,
    response: {
        count: 0,
        attendance_instants: []
    },
    maxDate: new Date(),
    locationAttendanceOptions: {
        startDate: '',
        endDate: timeService.getDate(new Date(), true),
        userIds: []
    }
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.ATTENDANCE_RECORD_FAIL: 
        case actions.ATTENDANCE_RECORD_SUCCESS:
            return { ...state, response: action.payload };

        case actions.INCREASE_RECORD_PAGE:
            return { ...state, page: state.page + 1 };

        case actions.RESET_RECORD_PAGE:
            return { ...state, page: 1 };

        case actions.SET_LOCATION_ATTENDANCE_END_DATE: {
            return { ...state, locationAttendanceOptions: { ...state.locationAttendanceOptions, endDate: action.payload } };
        }

        case actions.SET_LOCATION_ATTENDANCE_START_DATE: {
            return { ...state, locationAttendanceOptions: { ...state.locationAttendanceOptions, startDate: action.payload } };
        }

        case actions.SET_LOCATION_ATTENDANCE_USERS: {
            return { ...state, locationAttendanceOptions: { ...state.locationAttendanceOptions, userIds: action.payload } };
        }

        case actions.GET_ATTENDANCE_RECORD:
        default:
            return state;
    }
}

export const getAttendanceResponse = (state: State) => state.response;

export const getAttendanceRecordInstants = (state: State) => state.response.attendance_instants;

export const getAttendanceRecordPage = (state: State) => state.page;

export const getAttendanceRecordLimit = (state: State) => state.limit;

export const getAttendanceRecordMaxDate = (state: State) => state.maxDate;

export const getLocationAttendanceRecordOptions = (state: State) => state.locationAttendanceOptions;