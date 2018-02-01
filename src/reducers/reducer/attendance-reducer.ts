import * as actions from '../../actions/action/attendance-action';
import { AttendanceResultListResponse } from '../../interfaces/response-interface';
import { AttendanceResultConfirmOptions } from './../../interfaces/request-interface';
import {
    AttendanceModifyRecordListResponse,
    AttendanceResult,
    AttendanceResultConfirmResponse,
} from './../../interfaces/response-interface';
import { TimeService } from './../../services/utils/time-service';

const timeService = new TimeService();

export interface DatePeriod {
    start: Date;
    end: Date;
}

export interface State {
    limit: number;
    page: number;
    datePeriod: DatePeriod;
    response: AttendanceResultListResponse;
    sortType: number;
    orderType: string;
    attendanceResultConfirmResponse: AttendanceResultConfirmResponse;
    attendanceResultConfirmOptions: AttendanceResultConfirmOptions;
    attendanceModifyRecordListResponse: AttendanceModifyRecordListResponse;
    selectedAttendanceState: number;
    readyToModify: AttendanceResult[];
}

export const initialState: State = {
    limit: 20,
    page: 1,
    datePeriod: {
        start: timeService.getYesterday(),
        end: timeService.getYesterday(),
    },
    response: null,
    sortType: 0,
    orderType: 'asc',
    attendanceResultConfirmResponse: null,
    attendanceResultConfirmOptions: null,
    attendanceModifyRecordListResponse: null,
    selectedAttendanceState: 0,
    readyToModify: null,
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.ATTENDANCE_RESULT_LIST_FAIL:
        case actions.ATTENDANCE_RESULT_LIST_SUCCESS:
            return { ...state, response: action.payload };

        case actions.SET_ATTENDANCE_START_DATE:
        case actions.SET_ATTENDANCE_END_DATE:
            return { ...state, datePeriod: datePeriodReducer(state.datePeriod, action) };

        case actions.SET_QUERY_ATTENDANCE_PAGE:
            return { ...state, page: action.payload };

        case actions.SET_QUERY_ATTENDANCE_LIMIT:
            return Object.assign({}, state, { limit: action.payload });

        case actions.INCREASE_ATTENDANCE_PAGE:
            return { ...state, page: state.page + 1 };

        case actions.RESET_ATTENDANCE_PAGE:
            return { ...state, page: 1 };

        case actions.TOGGLE_SORT_TYPE:
            return { ...state, sortType: action.payload };

        case actions.TOGGLE_ORDER_TYPE:
            return { ...state, orderType: action.payload };

        case actions.RESET_ATTENDANCE_DATA:
            return { ...state, page: 1, response: null, attendanceResultConfirmOptions: { ...state.attendanceResultConfirmOptions, attendance_result_id: [] } };

        case actions.CONFIRM_ATTENDANCE:
            return { ...state, attendanceResultConfirmOptions: action.payload };

        case actions.ATTENDANCE_CONFIRM_FAIL:
        case actions.ATTENDANCE_CONFIRM_SUCCESS:
            return { ...state, attendanceResultConfirmResponse: action.payload };

        case actions.ATTENDANCE_MODIFY_RECORD_LIST_FAIL:
        case actions.ATTENDANCE_MODIFY_RECORD_LIST_SUCCESS:
            return { ...state, attendanceModifyRecordListResponse: action.payload };

        case actions.SET_QUERY_ATTENDANCE_STATE:
            return { ...state, selectedAttendanceState: action.payload };

        case actions.ADD_ATTENDANCES_TO_MODIFY:
            return { ...state, readyToModify: action.payload };

        case actions.RESET_ATTENDANCES_TO_MODIFY:
            return { ...state, readyToModify: [] };

        case actions.REMOVE_ATTENDANCE_FORM_READY_TO_MODIFY:
            return { ...state, readyToModify: state.readyToModify.filter(item => item.id !== action.payload) };

        case actions.GET_ATTENDANCE_MODIFY_RECORD_LIST:
        case actions.GET_QUERY_ATTENDANCE_PAGE:
        case actions.GET_QUERY_ATTENDANCE_LIMIT:
        case actions.GET_ATTENDANCE_RESULT_LIST:
        default:
            return state;
    }
}

export function datePeriodReducer(state = initialState.datePeriod, action: actions.Actions): DatePeriod {
    switch (action.type) {
        case actions.SET_ATTENDANCE_START_DATE:
            return {
                start: new Date(action.payload),
                end: state.end,
            };

        case actions.SET_ATTENDANCE_END_DATE:
            return {
                start: state.start,
                end: new Date(action.payload),
            };

        default:
            return state;
    }
}

export const getAttendanceResultResponse = (state: State) => state.response;

export const getAttendanceResults = (state: State) => state.response.attendance_results;

export const getAttendanceCount = (state: State) => state.response.count;

export const getAttendanceDatePeriod = (state: State) => state.datePeriod;

export const getAttendanceStartDate = (state: DatePeriod) => state.start;

export const getAttendanceEndDate = (state: DatePeriod) => state.end;

export const getAttendancePage = (state: State) => state.page;

export const getAttendanceLimit = (state: State) => state.limit;

export const getAttendanceResultConfirmResponse = (state: State) => state.attendanceResultConfirmResponse;

export const getAttendanceModifyRecordListResponse = (state: State) => state.attendanceModifyRecordListResponse;

export const getSelectedAttendanceState = (state: State) => state.selectedAttendanceState;

export const getSortType = (state: State) => state.sortType;

export const getOrderType = (state: State) => state.orderType;

export const getAttendanceConfirmOptions = (state: State) => state.attendanceResultConfirmOptions;

export const getAttendancesToModify = (state: State) => state.readyToModify;
