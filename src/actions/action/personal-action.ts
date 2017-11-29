import { BasicInfoListResponse } from './../../interfaces/response-interface';
import { BasicInfoListOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

export const GET_BASIC_INFORMATION = 'GET_BASIC_INFORMATION';

export class GetBasicInformationAction implements Action {
    readonly type = GET_BASIC_INFORMATION;

    constructor(public payload: BasicInfoListOptions) { }
}

export const BASIC_INFORMATION_FAIL = 'BASIC_INFORMATION_FAIL';

export class BasicInfoListFailAction implements Action {
    readonly type = BASIC_INFORMATION_FAIL;

    constructor(public payload: BasicInfoListResponse) { }
}

export const BASIC_INFORMATION_SUCCESS = 'BASIC_INFORMATION_SUCCESS';

export class BasicInfoListSuccessAction implements Action {
    readonly type = BASIC_INFORMATION_SUCCESS;

    constructor(public payload: BasicInfoListResponse) { }
}

export type Actions = GetBasicInformationAction
    | BasicInfoListSuccessAction
    | BasicInfoListFailAction;