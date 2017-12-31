import { GroupsListResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/group-list-action';

export interface State {
    groupListResponse: GroupsListResponse;
}

export const initialState: State = {
    groupListResponse: null
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.GROUP_LIST_FAIL:
        case actions.GROUP_LIST_SUCCESS:
            return { groupListResponse: action.payload };

        case actions.GET_GROUP_LIST:
        default:
            return state;
    }
}

export const getGroupList = (state: State) => state.groupListResponse;