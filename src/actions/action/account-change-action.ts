import { CheckPhoneResponse, ChangePhoneResponse, CheckPhoneVerifyCodeResponse, ChangePhoneVerifyCodeResponse } from './../../interfaces/response-interface';
import { CheckPhoneOptions, ChangePhoneOptions, CheckPhoneVerifyCodeOptions, ChangePhoneVerifyCodeOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

export const CHECK_PHONE_NUMBER = 'CHECK_PHONE_NUMBER';

export class CheckPhoneNumberAction implements Action {
    readonly type = CHECK_PHONE_NUMBER;

    constructor(public payload: CheckPhoneOptions) { }
}

export const CHECK_PHONE_NUMBER_FAIL = 'CHECK_PHONE_NUMBER_FAIL';

export class CheckPhoneNumberFailAction implements Action {
    readonly type = CHECK_PHONE_NUMBER_FAIL;

    constructor(public payload: CheckPhoneResponse) { }
}

export const CHECK_PHONE_NUMBER_SUCCESS = 'CHECK_PHONE_NUMBER_SUCCESS';

export class CheckPhoneNumberSuccessAction implements Action {
    readonly type = CHECK_PHONE_NUMBER_SUCCESS;

    constructor(public payload: CheckPhoneResponse) { }
}

export const CHANGE_PHONE_NUMBER = 'CHANGE_PHONE_NUMBER';

export class ChangePhoneNumberAction implements Action {
    readonly type = CHANGE_PHONE_NUMBER;

    constructor(public payload: ChangePhoneOptions) { }
}

export const CHANGE_PHONE_NUMBER_FAIL = 'CHANGE_PHONE_NUMBER_FAIL';

export class ChangePhoneNumberFailAction implements Action {
    readonly type = CHANGE_PHONE_NUMBER_FAIL;

    constructor(public payload: ChangePhoneResponse) { }
}

export const CHANGE_PHONE_NUMBER_SUCCESS = 'CHANGE_PHONE_NUMBER_SUCCESS';

export class ChangePhoneNumberSuccessAction implements Action {
    readonly type = CHANGE_PHONE_NUMBER_SUCCESS;

    constructor(public payload: ChangePhoneResponse) { }
}

export const CHECK_PHONE_VERIFY = 'CHECK_PHONE_VERIFY';

export class CheckPhoneVerifyAction implements Action {
    readonly type = CHECK_PHONE_VERIFY;

    constructor(public payload: CheckPhoneVerifyCodeOptions) { }
}

export const CHECK_PHONE_VERIFY_FAIL = 'CHECK_PHONE_VERIFY_FAIL';

export class CheckPhoneVerifyFailAction implements Action {
    readonly type = CHECK_PHONE_VERIFY_FAIL;

    constructor(public payload: CheckPhoneVerifyCodeResponse) { }
}

export const CHECK_PHONE_VERIFY_SUCCESS = 'CHECK_PHONE_VERIFY_SUCCESS';

export class CheckPhoneVerifySuccessAction implements Action {
    readonly type = CHECK_PHONE_VERIFY_SUCCESS;

    constructor(public payload: CheckPhoneVerifyCodeResponse) { }
}

export const CHANGE_PHONE_VERIFY = 'CHANGE_PHONE_VERIFY';

export class ChangePhoneVerifyAction implements Action {
    readonly type = CHANGE_PHONE_VERIFY;

    constructor(public payload: ChangePhoneVerifyCodeOptions) { }
}

export const CHANGE_PHONE_VERIFY_FAIL = 'CHANGE_PHONE_VERIFY_FAIL';

export class ChangePhoneVerifyFailAction implements Action {
    readonly type = CHANGE_PHONE_VERIFY_FAIL;

    constructor(public payload: ChangePhoneVerifyCodeResponse) { }
}

export const CHANGE_PHONE_VERIFY_SUCCESS = 'CHANGE_PHONE_VERIFY_SUCCESS';

export class ChangePhoneVerifySuccessAction implements Action {
    readonly type = CHANGE_PHONE_VERIFY_SUCCESS;

    constructor(public payload: ChangePhoneVerifyCodeResponse) { }
}

export const UPDATE_CHECK_RANDOM_CODE = 'UPDATE_CHECK_RANDOM_CODE';

export class UpdateCheckRandomCodeAction implements Action {
    readonly type = UPDATE_CHECK_RANDOM_CODE;

    constructor(public payload: string) {
    };
}

export const UPDATE_CHANGE_RANDOM_CODE = 'UPDATE_CHANGE_RANDOM_CODE';

export class UpdateChangeRandomCodeAction implements Action {
    readonly type = UPDATE_CHANGE_RANDOM_CODE;

    constructor(public payload: string) { };
}

export const RESET_LOCAL_DATA = 'RESET_LOCAL_DATA';

export class ResetLocalDataAction implements Action {
    readonly type = RESET_LOCAL_DATA;

    constructor() { }
}

export type Actions = CheckPhoneNumberAction
    | ChangePhoneNumberAction
    | ChangePhoneNumberFailAction
    | ChangePhoneNumberSuccessAction
    | ChangePhoneVerifyAction
    | ChangePhoneVerifyFailAction
    | ChangePhoneVerifySuccessAction
    | CheckPhoneNumberFailAction
    | CheckPhoneNumberSuccessAction
    | CheckPhoneVerifyAction
    | CheckPhoneVerifyFailAction
    | CheckPhoneVerifySuccessAction
    | ResetLocalDataAction 
    | UpdateChangeRandomCodeAction 
    | UpdateCheckRandomCodeAction;