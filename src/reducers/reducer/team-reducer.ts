import { TeamListResponse } from '../../interfaces/response-interface';
import * as actions from '../../actions/action/team-action';

export interface State {
  response: TeamListResponse;
  selectedTeams: number[]
}

export const initialState: State = {
  response: {
    teams: []
  },
  selectedTeams: []
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.TEAM_LIST_FAIL:
    case actions.TEAM_LIST_SUCCESS:
      return Object.assign({}, state, { response: action.payload });

    case actions.SET_SELECT_TEAMS:
      return Object.assign({}, state, { selectedTeams: action.payload });

    case actions.GET_SELECT_TEAMS:
    case actions.GET_TEAM_LIST:
    default:
      return state;
  }
}

export const getTeamListResponse = (state: State) => state.response;

export const getSelectTeams = (state: State) => state.selectedTeams;
