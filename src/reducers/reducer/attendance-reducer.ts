//region
import { AttendanceResultListResponse } from '../../interfaces/response-interface';
import * as actions from '../../actions/action/attendance-actions';
import {
  ATTENDANCE_RESULT_LIST_FAIL, ATTENDANCE_RESULT_LIST_SUCCESS,
  GET_ATTENDANCE_RESULT_LIST
} from '../../actions/action/attendance-actions';
//endregion

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
  attendanceResultListResponse: AttendanceResultListResponse;
}

export const initialState: State = {
  limit: 20,
  page: 1,
  datePeriod: {
    start: new Date(),
    end: new Date()
  },
  attendanceResultListResponse: {
    count: 0,
    attendance_results: []
  },
  selected: [],
  allSelected: false
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case ATTENDANCE_RESULT_LIST_FAIL:
      return Object.assign({}, state, {
        attendanceResultListResponse: action.payload
      });

    case ATTENDANCE_RESULT_LIST_SUCCESS:
      return Object.assign({}, state, {
        attendanceResultListResponse: action.payload
      });

    case actions.SET_ATTENDANCE_START_DATE:
    case actions.SET_ATTENDANCE_END_DATE: {
      const datePeriod = datePeriodReducer(state.datePeriod, action);

      return Object.assign({}, state, { datePeriod });
    }

    case actions.SET_QUERY_ATTENDANCE_PAGE:
      return Object.assign({}, state, {page: action.payload});

    case actions.SET_QUERY_ATTENDANCE_LIMIT:
      return Object.assign({}, state, {limit: action.payload});

    case actions.ADD_SELECTED_ATTENDANCE:{
      const selected = state.selected.concat([action.payload]);

      const allSelected = selected.length === state.attendanceResultListResponse.attendance_results.length;
      
      return Object.assign({}, state, {selected, allSelected});
    }

    case actions.REMOVE_SELECTED_ATTENDANCE: {
      const selected = state.selected.filter(item => item !== action.payload);

      return Object.assign({}, state, {selected, allSelected: false});
    }

    case actions.TOGGLE_ALL_SELECTED_ATTENDANCE: {
      const selected = action.payload ? state.attendanceResultListResponse.attendance_results.map(item => item.id) : [];

      return Object.assign({}, state, {selected, allSelected: action.payload});
    }

    case actions.GET_QUERY_ATTENDANCE_PAGE:
    case actions.GET_QUERY_ATTENDANCE_LIMIT:
    case GET_ATTENDANCE_RESULT_LIST:
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

export const getAttendanceResultResponse = (state: State) => state.attendanceResultListResponse;

export const getAttendanceResults = (state: State) => state.attendanceResultListResponse.attendance_results;

export const getAttendanceCount = (state: State) => state.attendanceResultListResponse.count;

export const getAttendanceDatePeriod = (state: State) => state.datePeriod;

export const getAttendanceStartDate = (state: DatePeriod) => state.start;

export const getAttendanceEndDate = (state: DatePeriod) => state.end;

export const getAttendancePage = (state: State) => state.page;

export const getAttendanceLimit = (state: State) => state.limit;

export const getAllSelected = (state: State) => state.allSelected;

export const getSelectedAttendanceIds = (state: State) => state.selected;
