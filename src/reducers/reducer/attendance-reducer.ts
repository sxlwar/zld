import { AttendanceResultConfirmOptions } from './../../interfaces/request-interface';
import { AttendanceResultConfirmResponse, AttendanceModifyRecordListResponse } from './../../interfaces/response-interface';
import { AttendanceResultListResponse, AttendanceResult } from '../../interfaces/response-interface';
import * as actions from '../../actions/action/attendance-action';
import { uniqBy } from 'lodash';

export interface DatePeriod {
  start: Date;
  end: Date;
}

export interface State {
  limit: number;
  page: number;
  datePeriod: DatePeriod;
  selected: number[];
  allSelected: boolean;
  response: AttendanceResultListResponse;
  data: AttendanceResult[];
  rank: number;
  attendanceResultConfirmResponse: AttendanceResultConfirmResponse;
  attendanceResultConfirmOptions: AttendanceResultConfirmOptions;
  attendanceModifyRecordListResponse: AttendanceModifyRecordListResponse;
}

export const initialState: State = {
  limit: 20,
  page: 1,
  datePeriod: {
    start: new Date(),
    end: new Date()
  },
  response: null,
  selected: [],
  allSelected: false,
  data: [],
  rank: 1,
  attendanceResultConfirmResponse: null,
  attendanceResultConfirmOptions: null,
  attendanceModifyRecordListResponse: null
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ATTENDANCE_RESULT_LIST_FAIL:
      return Object.assign({}, state, {
        response: action.payload
      });

    case actions.ATTENDANCE_RESULT_LIST_SUCCESS: {
      const data = state.data.concat(action.payload.attendance_results);

      return Object.assign({}, state, {
        response: action.payload,
        data: uniqBy(data, 'id')
      });
    }

    case actions.SET_ATTENDANCE_START_DATE:
    case actions.SET_ATTENDANCE_END_DATE: {
      const datePeriod = datePeriodReducer(state.datePeriod, action);

      return Object.assign({}, state, { datePeriod });
    }

    case actions.SET_QUERY_ATTENDANCE_PAGE:
      return Object.assign({}, state, { page: action.payload });

    case actions.SET_QUERY_ATTENDANCE_LIMIT:
      return Object.assign({}, state, { limit: action.payload });

    case actions.ADD_SELECTED_ATTENDANCE: {
      const selected = state.selected.concat([action.payload]);

      const allSelected = selected.length === state.data.length;

      return Object.assign({}, state, { selected, allSelected });
    }

    case actions.REMOVE_SELECTED_ATTENDANCE: {
      const selected = state.selected.filter(item => item !== action.payload);

      return Object.assign({}, state, { selected, allSelected: false });
    }

    case actions.TOGGLE_ALL_SELECTED_ATTENDANCE: {
      const selected = action.payload ? state.response.attendance_results.map(item => item.id) : [];

      state.data.forEach(item => item.selected = action.payload);

      return Object.assign({}, state, { selected, allSelected: action.payload });
    }

    case actions.INCREASE_ATTENDANCE_PAGE: {
      return Object.assign({}, state, { page: state.page + 1 });
    }

    case actions.RESET_ATTENDANCE_PAGE: {
      return Object.assign({}, state, { page: 1 });
    }

    case actions.SORT_ATTENDANCE: {
      const key = action.payload;

      state.data.sort((att1, att2) => {
        if (att1[key] > att2[key]) return state.rank;
        if (att1[key] < att2[key]) return -state.rank;
        return 0;
      });

      return { ...state };
    }

    case actions.TOGGLE_SORT_TYPE: {
      return Object.assign({}, state, { rank: action.payload });
    }

    case actions.CONFIRM_ATTENDANCE:
      return { ...state, attendanceResultConfirmOptions: action.payload };

    case actions.ATTENDANCE_CONFIRM_FAIL:
    case actions.ATTENDANCE_CONFIRM_SUCCESS:
      return { ...state, attendanceResultConfirmResponse: action.payload };

    case actions.ATTENDANCE_MODIFY_RECORD_LIST_FAIL:
    case actions.ATTENDANCE_MODIFY_RECORD_LIST_SUCCESS:
      return { ...state, attendanceModifyRecordListResponse: action.payload };

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
        end: state.end
      };

    case actions.SET_ATTENDANCE_END_DATE:
      return {
        start: state.start,
        end: new Date(action.payload)
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

export const getAllSelected = (state: State) => state.allSelected;

export const getSelectedAttendanceIds = (state: State) => state.selected;

export const getAttendanceData = (state: State) => state.data;

export const getAttendanceResultConfirmResponse = (state: State) => state.attendanceResultConfirmResponse;

export const getAttendanceModifyRecordListResponse = (state: State) => state.attendanceModifyRecordListResponse;
