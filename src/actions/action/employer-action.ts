import { CompanyUserListResponse } from './../../interfaces/response-interface';
import { CompanyUserListOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

export const GET_COMPANY_USER = 'GET_COMPANY_USER';

export class GetCompanyUserListAction implements Action {
    readonly type = GET_COMPANY_USER;

    constructor(public payload: CompanyUserListOptions) { }
}

export const COMPANY_USER_LIST_FAIL = 'COMPANY_USER_LIST_FAIL';

export class CompanyUserListFaiAction implements Action {
    readonly type = COMPANY_USER_LIST_FAIL;

    constructor(public payload: CompanyUserListResponse) { }
}

export const COMPANY_USER_LIST_SUCCESS = 'COMPANY_USER_LIST_SUCCESS';

export class CompanyUserListSuccessAction implements Action {
    readonly type = COMPANY_USER_LIST_SUCCESS;

    constructor(public payload: CompanyUserListResponse) { }
}

export type Actions = GetCompanyUserListAction
    | CompanyUserListFaiAction
    | CompanyUserListSuccessAction;