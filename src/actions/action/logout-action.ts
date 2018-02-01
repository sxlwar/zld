import { Action } from '@ngrx/store';

import { LogoutOptions } from './../../interfaces/request-interface';
import { LogoutResponse } from './../../interfaces/response-interface';

export const LOGOUT = 'LOGOUT';

export class LogoutAction implements Action {
    readonly type = LOGOUT;

    constructor(public payload: LogoutOptions) { }
}

export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export class LogoutFailAction implements Action {
    readonly type = LOGOUT_FAIL;

    constructor(public payload: LogoutResponse) { }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export class LogoutSuccessAction implements Action {
    readonly type = LOGOUT_SUCCESS;

    constructor(public payload: LogoutResponse) { }
}

export const RESET_LOGOUT_RESPONSE = 'RESET_LOGOUT_RESPONSE';

export class ResetLogoutResponseAction implements Action {
    readonly type = RESET_LOGOUT_RESPONSE;

    constructor() { }
}

export type Actions = LogoutAction
    | LogoutFailAction
    | LogoutSuccessAction
    | ResetLogoutResponseAction;
