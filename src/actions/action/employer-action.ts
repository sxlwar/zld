import { Action } from '@ngrx/store';

import { CompanyUserListOptions } from './../../interfaces/request-interface';
import { CompanyUserListResponse } from './../../interfaces/response-interface';

export const GET_COMPANY_USER = 'GET_COMPANY_USER';

export class GetCompanyUserListAction implements Action {
    readonly type = GET_COMPANY_USER;

    constructor(public payload: CompanyUserListOptions) { }
}

export const COMPANY_USER_LIST_FAIL = 'COMPANY_USER_LIST_FAIL';

export class CompanyUserListFailAction implements Action {
    readonly type = COMPANY_USER_LIST_FAIL;

    constructor(public payload: CompanyUserListResponse) { }
}

export const COMPANY_USER_LIST_SUCCESS = 'COMPANY_USER_LIST_SUCCESS';

export class CompanyUserListSuccessAction implements Action {
    readonly type = COMPANY_USER_LIST_SUCCESS;

    constructor(public payload: CompanyUserListResponse) { }
}

export const SET_SELECTED_FOREMAN = 'SET_SELECTED_FOREMAN';

export class SetSelectedForemanAction implements Action {
    readonly type = SET_SELECTED_FOREMAN;

    constructor(public payload: number[]) { }
}

export const SET_SELECT_QUALITY_CLERK = 'SET_SELECT_QUALITY_CLERK';

export class SetSelectedQualityClerkAction implements Action {
    readonly type = SET_SELECT_QUALITY_CLERK;

    constructor(public payload: number[]) { }
}

export type Actions = GetCompanyUserListAction
    | CompanyUserListFailAction
    | CompanyUserListSuccessAction
    | SetSelectedForemanAction
    | SetSelectedQualityClerkAction;
