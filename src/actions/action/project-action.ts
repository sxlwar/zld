import {Action} from '@ngrx/store';
import {ProjectListOptions} from '../../interfaces/request-interface';
import {ProjectListResponse} from '../../interfaces/response-interface';

export const GET_PROJECT_LIST = 'GET_PROJECT_LIST';

export class GetProjectListAction implements Action {
  readonly type = GET_PROJECT_LIST;

  constructor(public payload: ProjectListOptions) {
  }
}

export const PROJECT_LIST_FAIL = 'PROJECT_LIST_FAIL';

export class ProjectListFailAction implements Action {
  readonly type = PROJECT_LIST_FAIL;

  constructor(public payload: ProjectListResponse) {
  }
}

export const PROJECT_LIST_SUCCESS = 'PROJECT_LIST_SUCCESS';

export class ProjectListSuccessAction implements Action {
  readonly type = PROJECT_LIST_SUCCESS;

  constructor(public payload: ProjectListResponse) {
  }
}

export const SELECT_PROJECT = 'SELECT_PROJECT';

export class SelectProjectAction implements Action {
  readonly type = SELECT_PROJECT;

  constructor(public payload: number){}
}

export const GET_CURRENT_PROJECTS = 'GET_CURRENT_PROJECTS';

export class GetCurrentProjects implements Action {
  readonly type = GET_CURRENT_PROJECTS;

  constructor(){}
}

export type Actions = GetProjectListAction
  | ProjectListFailAction
  | ProjectListSuccessAction
  | GetCurrentProjects
  | SelectProjectAction;
