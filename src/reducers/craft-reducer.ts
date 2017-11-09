import {WorkTypeListResponse} from '../interfaces/response-interface';
import * as actions from '../actions/craft-action';

export const initialState: WorkTypeListResponse = {
  information: []
};

export function reducer(state = initialState, action: actions.Actions): WorkTypeListResponse {
  switch (action.type) {
    case actions.WORK_TYPE_SUCCESS_ACTION:
      return {...action.payload};

    case actions.WORK_TYPE_FAIL_ACTION:
      return {...state, ...action.payload};

    case actions.GET_WORK_TYPE_LIST:
    default:
      return state;
  }
}

export const getWorkType = (state: WorkTypeListResponse) => state.information;
