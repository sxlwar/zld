import {Action} from '@ngrx/store';
import {WorkTypeListResponse} from '../../interfaces/response-interface';

export const GET_WORK_TYPE_LIST = 'GET_WORK_TYPE_LIST';

export class GetWorkTypeListAction implements Action {
  readonly type = GET_WORK_TYPE_LIST;

  constructor() {
  }
}

export const WORK_TYPE_FAIL_ACTION = 'WORK_TYPE_FAIL_ACTION';

export class WorkTypeListFailAction implements Action {
  readonly type = WORK_TYPE_FAIL_ACTION;

  constructor(public payload: WorkTypeListResponse) {
  }
}

export const WORK_TYPE_SUCCESS_ACTION = 'WORK_TYPE_SUCCESS_ACTION';

export class WorkTypeListSuccessAction implements Action {
  readonly type = WORK_TYPE_SUCCESS_ACTION;

  constructor(public payload: WorkTypeListResponse) {
  }
}


export type Actions = GetWorkTypeListAction
  | WorkTypeListFailAction
  | WorkTypeListSuccessAction;
