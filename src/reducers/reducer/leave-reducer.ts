import { LeaveRecordListResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/leave-action';

export interface State {
    leaveRecordResponse: LeaveRecordListResponse;
}

export const initialState: State = {
    leaveRecordResponse: null
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.LEAVE_RECORD_LIST_FAIL:
        case actions.LEAVE_RECORD_LIST_SUCCESS:
            return { ...state, leaveRecordResponse: action.payload };

        case actions.GET_LEAVE_RECORD_LIST:
        default:
            return state;
    }
}

export const getLeaveResponse = (state: State) => state.leaveRecordResponse;