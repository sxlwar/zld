import {Action} from '@ngrx/store';
import {TeamListOptions} from '../../interfaces/request-interface';
import {TeamListResponse} from '../../interfaces/response-interface';

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


export type Actions = GetTeamListAction
  | TeamListFailAction
  | TeamListSuccessAction;
