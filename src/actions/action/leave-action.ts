import { Action } from '@ngrx/store';

import { LeaveRecordListOptions } from './../../interfaces/request-interface';
import { LeaveRecordListResponse } from './../../interfaces/response-interface';

export const GET_LEAVE_RECORD_LIST = 'GET_LEAVE_RECORD_LIST';

export class GetLeaveRecordListAction implements Action {
    readonly type = GET_LEAVE_RECORD_LIST;

    constructor(public payload: LeaveRecordListOptions) { }
}

export const LEAVE_RECORD_LIST_FAIL = 'LEAVE_RECORD_LIST_FAIL';

export class LeaveRecordListFailAction implements Action {
    readonly type = LEAVE_RECORD_LIST_FAIL;

    constructor(public payload: LeaveRecordListResponse) { }
}

export const LEAVE_RECORD_LIST_SUCCESS = 'LEAVE_RECORD_LIST_SUCCESS';

export class LeaveRecordListSuccessAction implements Action {
    readonly type = LEAVE_RECORD_LIST_SUCCESS;

    constructor(public payload: LeaveRecordListResponse) { }
}

export type Actions = GetLeaveRecordListAction
    | LeaveRecordListFailAction
    | LeaveRecordListSuccessAction;
