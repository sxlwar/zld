import { WorkTypeListResponse } from '../../interfaces/response-interface';
import * as actions from '../../actions/action/craft-action';

export interface State {
    workTypeResponse: WorkTypeListResponse;
    selectedWorkTypes: number[];
}

export const initialState: State = {
    workTypeResponse: {
        information: []
    },
    selectedWorkTypes: []
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.WORK_TYPE_FAIL_ACTION:
        case actions.WORK_TYPE_SUCCESS_ACTION:
            return { ...state, workTypeResponse: action.payload }

        case actions.UPDATE_SELECTED_WORK_TYPE:
            return { ...state, selectedWorkTypes: action.payload };

        case actions.GET_WORK_TYPE_LIST:
        default:
            return state;
    }
}

export const getWorkType = (state: State) => state.workTypeResponse.information;

export const getSelectedTypes = (state: State) => state.selectedWorkTypes;

export const getWorkTypeResponse = (state: State) => state.workTypeResponse;
