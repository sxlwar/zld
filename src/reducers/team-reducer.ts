

import {TeamListResponse} from '../interfaces/response-interface';

import * as actions from '../actions/team-actions';
import {GET_TEAM_LIST, TEAM_LIST_FAIL, TEAM_LIST_SUCCESS} from '../actions/team-actions';

export interface State {
  response: TeamListResponse;

}

export const initialState: State = {
  response: {
    teams: []
  }
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case TEAM_LIST_FAIL:
    case TEAM_LIST_SUCCESS:
      const response = action.payload;
      return Object.assign({}, state, {response});

    case GET_TEAM_LIST:
    default:
      return state;
  }
}

export const getTeamListResponse = (state: State) => state.response;
