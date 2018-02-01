import { Action } from '@ngrx/store';

import { GroupsListOptions } from './../../interfaces/request-interface';
import { GroupsListResponse } from './../../interfaces/response-interface';

export const GET_GROUP_LIST = 'GET_GROUP_LIST';

export class GetGroupListAction implements Action {
    readonly type = GET_GROUP_LIST;

    constructor(public payload: GroupsListOptions) { }
}

export const GROUP_LIST_FAIL = 'GROUP_LIST_FAIL';

export class GroupListFailAction implements Action {
    readonly type = GROUP_LIST_FAIL;

    constructor(public payload: GroupsListResponse) { }
}

export const GROUP_LIST_SUCCESS = 'GROUP_LIST_SUCCESS';

export class GroupListSuccessAction implements Action {
    readonly type = GROUP_LIST_SUCCESS;

    constructor(public payload: GroupsListResponse) { }
}

export type Actions = GetGroupListAction
    | GroupListFailAction
    | GroupListSuccessAction;
