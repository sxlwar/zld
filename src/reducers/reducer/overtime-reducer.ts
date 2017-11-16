//region
import { WorkOvertimeRecordListResponse } from '../../interfaces/response-interface';
import * as actions from '../../actions/action/overtime-action';
//endregion


export interface State {
    page: number;
    limit: number;
    response: WorkOvertimeRecordListResponse;
}

export const initialState: State = {
    page: 1,
    limit: 20,
    response: {
        work_overtimes: [],
        count: 0
    }
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.OVERTIME_RECORD_FAIL: {
            const response = action.payload;

            return Object.assign({}, state, { response });
        }

        case actions.OVERTIME_RECORD_SUCCESS: {
            const response = action.payload;

            return Object.assign({}, state, { response });
        }

        case actions.GET_OVERTIME_RECORD:
        default:
            return state;
    }
}

export const getOvertimeRecordResponse = (state: State) => state.response;

export const getOvertimeRecordCount = (state: State) => state.response.count;

export const getOvertimeRecord = (state: State) => state.response.work_overtimes;