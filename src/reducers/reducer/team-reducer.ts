import { TeamAddOptions } from './../../interfaces/request-interface';
import { TeamListResponse, TeamAddResponse, TeamDeleteResponse, TeamUpdateResponse, Team } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/team-action';

export interface State {
  teamListResponse: TeamListResponse;
  selectedTeams: number[];
  addTeamResponse: TeamAddResponse;
  deleteTeamResponse: TeamDeleteResponse;
  updateTeamResponse: TeamUpdateResponse;
  addTeamOption: TeamAddOptions;
}

export const initialState: State = {
  teamListResponse: {
    teams: []
  },
  selectedTeams: [],
  addTeamResponse: null,
  deleteTeamResponse: null,
  updateTeamResponse: null,
  addTeamOption: null
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.TEAM_LIST_FAIL:
    case actions.TEAM_LIST_SUCCESS:
      return Object.assign({}, state, { teamListResponse: action.payload });

    case actions.SET_SELECT_TEAMS:
      return Object.assign({}, state, { selectedTeams: action.payload });

    case actions.ADD_TEAM_FAIL:
      return Object.assign({}, state, { addTeamResponse: action.payload });

    case actions.ADD_TEAM_SUCCESS: { //TODO: 类似的添加请求只需要后台在添加成功后把生成的ID作为响应返回来就OK。
      const teams = addLocalTeam(state.teamListResponse.teams, state.addTeamOption);

      const teamListResponse = { teams };

      return Object.assign({}, state, { addTeamResponse: action.payload, teamListResponse });
    }

    case actions.DELETE_TEAM_FAIL:
    case actions.DELETE_TEAM_SUCCESS:
      return Object.assign({}, state, { deleteTeamResponse: action.payload });

    case actions.UPDATE_TEAM_FAIL:
    case actions.UPDATE_TEAM_SUCCESS:
      return Object.assign({}, state, { updateTeamResponse: action.payload });

    case actions.ADD_TEAM:
      return Object.assign({}, state, { addTeamOption: action.payload });

    case actions.DELETE_TEAM:
    case actions.UPDATE_TEAM:
    case actions.GET_SELECT_TEAMS:
    case actions.GET_TEAM_LIST:
    default:
      return state;
  }
}

export function addLocalTeam(source: Team[], option: TeamAddOptions): Team[] {
  const { name, project_id, leader_id, quality_manage_id } = option;

  const leader = source.find(item => item.leader_id === leader_id)

  const { leader__employee__realname, leader_username } = leader;

  const qualityManager = source.find(item => item.quality_manage_id === quality_manage_id);

  const { quality_manage__employee__realname, quality_manage__username } = qualityManager;

  const project_name = source.find(item => item.project_id === project_id).project_name;

  const team: Team = { id: null, name, project_id, project_name, leader_id, leader__employee__realname, leader_username, quality_manage_id, quality_manage__employee__realname, quality_manage__username };

  return [...source, team];
}

export const getTeamListResponse = (state: State) => state.teamListResponse;

export const getSelectTeams = (state: State) => state.selectedTeams;

export const getAddTeamResponse = (state: State) => state.addTeamResponse;

export const getDeleteTeamResponse = (state: State) => state.deleteTeamResponse;

export const getUpdateTeamResponse = (state: State) => state.updateTeamResponse;
