import { Employer } from './../../interfaces/response-interface';
//region
import { TeamDeleteResponse, TeamUpdateResponse, TeamAddResponse } from './../../interfaces/response-interface';
import { TeamAddOptions, TeamDeleteOptions, TeamUpdateOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';
import { TeamListOptions } from '../../interfaces/request-interface';
import { TeamListResponse } from '../../interfaces/response-interface';
//endregion

/* ======================================Team list actions============================================ */

export const GET_TEAM_LIST = 'GET_TEAM_LIST';

export class GetTeamListAction implements Action {
    readonly type = GET_TEAM_LIST;

    constructor(public payload: TeamListOptions) {
    }
}

export const TEAM_LIST_FAIL = 'TEAM_LIST_FAIL';

export class TeamListFailAction implements Action {
    readonly type = TEAM_LIST_FAIL;

    constructor(public payload: TeamListResponse) {
    }
}

export const TEAM_LIST_SUCCESS = 'TEAM_LIST_SUCCESS';

export class TeamListSuccessAction implements Action {
    readonly type = TEAM_LIST_SUCCESS;

    constructor(public payload: TeamListResponse) {
    }
}

/* ======================================Team select actions============================================ */

export const SET_SELECT_TEAMS = 'SET_SELECT_TEAMS';

export class SetSelectTeamsAction implements Action {
    readonly type = SET_SELECT_TEAMS;

    constructor(public payload: number[]) { }
}

export const GET_SELECT_TEAMS = 'GET_SELECT_TEAMS';

export class GetSelectTeamsAction implements Action {
    readonly type = GET_SELECT_TEAMS;

    constructor() { }
}

/* ======================================Team add actions============================================ */

export const ADD_TEAM = 'ADD_TEAM';

export class AddTeamAction implements Action {
    readonly type = ADD_TEAM;

    constructor(public payload: TeamAddOptions) { }
}

export const ADD_TEAM_FAIL = 'ADD_TEAM_FAIL';

export class AddTeamFailAction implements Action {
    readonly type = ADD_TEAM_FAIL;

    constructor(public payload: TeamAddResponse) { }
}

export const ADD_TEAM_SUCCESS = 'ADD_TEAM_SUCCESS';

export class AddTeamSuccessAction implements Action {
    readonly type = ADD_TEAM_SUCCESS;

    constructor(public payload: TeamAddResponse) { }
}

/* ======================================Team delete actions============================================ */

export const DELETE_TEAM = 'DELETE_TEAM';

export class DeleteTeamAction implements Action {
    readonly type = DELETE_TEAM;

    constructor(public payload: TeamDeleteOptions) { }
}

export const DELETE_TEAM_FAIL = 'DELETE_TEAM_FAIL';

export class DeleteTeamFailAction implements Action {
    readonly type = DELETE_TEAM_FAIL;

    constructor(public payload: TeamDeleteResponse) { }
}

export const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS';

export class DeleteTeamSuccessAction implements Action {
    readonly type = DELETE_TEAM_SUCCESS;

    constructor(public payload: TeamDeleteResponse) { }
}

/* ======================================Team update actions============================================ */

export const UPDATE_TEAM = 'UPDATE_TEAM';

export class UpdateTeamAction implements Action {
    readonly type = UPDATE_TEAM;

    constructor(public payload: TeamUpdateOptions) { }
}

export const UPDATE_TEAM_FAIL = 'UPDATE_TEAM_FAIL';

export class UpdateTeamFailAction implements Action {
    readonly type = UPDATE_TEAM_FAIL;

    constructor(public payload: TeamUpdateResponse) { }
}

export const UPDATE_TEAM_SUCCESS = 'UPDATE_TEAM_SUCCESS';

export class UpdateTeamSuccessAction implements Action {
    readonly type = UPDATE_TEAM_SUCCESS;

    constructor(public payload: TeamUpdateResponse) { }
}

/**
 * @description This action is used to update team list locally to avoid sending network request again.
 */
export const UPDATE_TEAM_AT_LOCAL = 'UPDATE_TEAM_AT_LOCAL';

export class UpdateTeamAtLocalAction implements Action {
    readonly type = UPDATE_TEAM_AT_LOCAL;

    constructor(public payload: Employer[]) { }
}

export type Actions = GetTeamListAction
    | AddTeamAction
    | AddTeamFailAction
    | AddTeamSuccessAction
    | DeleteTeamAction
    | DeleteTeamFailAction
    | DeleteTeamSuccessAction
    | GetSelectTeamsAction
    | SetSelectTeamsAction
    | TeamListFailAction
    | TeamListSuccessAction
    | UpdateTeamAction
    | UpdateTeamAtLocalAction
    | UpdateTeamFailAction
    | UpdateTeamSuccessAction;

