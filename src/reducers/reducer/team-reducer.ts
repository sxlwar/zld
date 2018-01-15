import { TeamAddOptions, TeamDeleteOptions, TeamUpdateOptions } from './../../interfaces/request-interface';
import { TeamListResponse, TeamAddResponse, TeamDeleteResponse, TeamUpdateResponse, Team, Employer } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/team-action';

export interface State {
    teamListResponse: TeamListResponse;
    selectedTeams: number[];
    addTeamResponse: TeamAddResponse;
    deleteTeamResponse: TeamDeleteResponse;
    updateTeamResponse: TeamUpdateResponse;
    addTeamOption: TeamAddOptions;
    deleteTeamOption: TeamDeleteOptions;
    updateTeamOption: TeamUpdateOptions;
}

export const initialState: State = {
    teamListResponse: {
        teams: []
    },
    selectedTeams: [],
    addTeamResponse: null,
    deleteTeamResponse: null,
    updateTeamResponse: null,
    addTeamOption: null,
    deleteTeamOption: null,
    updateTeamOption: null
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

        case actions.ADD_TEAM_SUCCESS: { //TODO: 类似的添加请求只需要后台在添加成功后把生成的ID作为响应返回来就OK。但是这时后台啥也没给，啥也不给就算了，连数据类型都变了。
            const teams = addLocalTeam(state.teamListResponse.teams, state.addTeamOption);

            const teamListResponse = { teams };

            return Object.assign({}, state, { addTeamResponse: action.payload, teamListResponse });
        }

        case actions.DELETE_TEAM_FAIL:
            return Object.assign({}, state, { deleteTeamResponse: action.payload });

        case actions.DELETE_TEAM_SUCCESS: {
            const teams = deleteLocalTeam(state.teamListResponse.teams, state.deleteTeamOption);

            const teamListResponse = { teams };

            return Object.assign({}, state, { deleteTeamResponse: action.payload, teamListResponse });
        }

        case actions.UPDATE_TEAM_FAIL:
        case actions.UPDATE_TEAM_SUCCESS: // Team list can not be updated here because we need a list of employer information.
            return Object.assign({}, state, { updateTeamResponse: action.payload });

        case actions.UPDATE_TEAM_AT_LOCAL: {
            const teams = updateLocalTeam(state.teamListResponse.teams, state.updateTeamOption, action.payload);

            const teamListResponse = { teams };

            return Object.assign({}, state, { updateTeamResponse: action.payload, teamListResponse });
        }

        case actions.ADD_TEAM:
            return Object.assign({}, state, { addTeamOption: action.payload });

        case actions.DELETE_TEAM:
            return Object.assign({}, state, { deleteTeamOption: action.payload });

        case actions.UPDATE_TEAM:
            return Object.assign({}, state, { updateTeamOption: action.payload });

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

export function deleteLocalTeam(source: Team[], option: TeamDeleteOptions): Team[] {
    const { team_id } = option;

    return source.filter(item => item.id !== team_id);
}

export function updateLocalTeam(source: Team[], option: TeamUpdateOptions, employers: Employer[]): Team[] {

    const { team_id, name, leader_id, quality_manage_id } = option;

    const target = source.find(item => item.id === team_id);

    const leader = employers.find(item => item.user_id === leader_id);

    const qualityManager = employers.find(item => item.user_id == quality_manage_id);

    const result = Object.assign({}, target, { name, leader_id, leader__employee__realname: leader.realname, leader_username: leader.user__username, quality_manage_id, quality_manage__employee__realname: qualityManager.realname, quality_manage__username: qualityManager.user__username });

    return source.map(item => {
        if (item.id === team_id) {
            return result;
        } else {
            return item;
        }
    });
}

export const getTeamListResponse = (state: State) => state.teamListResponse;

export const getSelectTeams = (state: State) => state.selectedTeams;

export const getAddTeamResponse = (state: State) => state.addTeamResponse;

export const getDeleteTeamResponse = (state: State) => state.deleteTeamResponse;

export const getUpdateTeamResponse = (state: State) => state.updateTeamResponse;
