import { TeamListResponse, TeamAddResponse, TeamDeleteResponse, TeamUpdateResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/team-action';

export interface State {
  teamListResponse: TeamListResponse;
  selectedTeams: number[];
  addTeamResponse: TeamAddResponse;
  deleteTeamResponse: TeamDeleteResponse;
  updateTeamResponse: TeamUpdateResponse;
}

export const initialState: State = {
  teamListResponse: {
    teams: []
  },
  selectedTeams: [],
  addTeamResponse: null,
  deleteTeamResponse: null,
  updateTeamResponse: null
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.TEAM_LIST_FAIL:
    case actions.TEAM_LIST_SUCCESS:
      return Object.assign({}, state, { teamListResponse: action.payload });

    case actions.SET_SELECT_TEAMS:
      return Object.assign({}, state, { selectedTeams: action.payload });

    case actions.ADD_TEAM_FAIL:
    case actions.ADD_TEAM_SUCCESS:
      return Object.assign({}, state, { addTeamResponse: action.payload });

    case actions.DELETE_TEAM_FAIL:
    case actions.DELETE_TEAM_SUCCESS:
      return Object.assign({}, state, { deleteTeamResponse: action.payload });

    case actions.UPDATE_TEAM_FAIL:
    case actions.UPDATE_TEAM_SUCCESS:
      return Object.assign({}, state, { updateTeamResponse: action.payload });

    case actions.ADD_TEAM:
    case actions.DELETE_TEAM:
    case actions.UPDATE_TEAM:
    case actions.GET_SELECT_TEAMS:
    case actions.GET_TEAM_LIST:
    default:
      return state;
  }
}

export const getTeamListResponse = (state: State) => state.teamListResponse;

export const getSelectTeams = (state: State) => state.selectedTeams;

export const getAddTeamResponse = (state: State) => state.addTeamResponse;

export const getDeleteTeamResponse = (state: State) => state.deleteTeamResponse;

export const getUpdateTeamResponse = (state: State) => state.updateTeamResponse;
