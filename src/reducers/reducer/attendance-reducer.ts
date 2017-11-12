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
  attendanceResultListResponse: AttendanceResultListResponse;
}

export const initialState: State = {
  limit: 10,
  page: 1,
  datePeriod: {
    start: new Date(),
    end: new Date()
  },
  attendanceResultListResponse: {
    count: 0,
    attendance_results: []
  }
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
      const datePeriod = datePeroidReducer(state.datePeriod, action);

      return Object.assign({}, state, { datePeriod });
    }

    case GET_ATTENDANCE_RESULT_LIST:
    default:
      return state;
  }
}

export function datePeroidReducer(state = initialState.datePeriod, action: actions.Actions): DatePeriod {
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

export const getAttendnaceResults = (state: State) => state.attendanceResultListResponse.attendance_results;

export const getAttendanceCount = (state: State) => state.attendanceResultListResponse.count;

export const getAttendanceDatePeriod = (state: State) => state.datePeriod;

export const getAttendanceStartDate = (state: DatePeriod) => state.start;

export const getAttendanceEndDate = (state: DatePeriod) => state.end;
