import { Action } from '@ngrx/store';
import {
    LoginOptions, PhoneVerificationCodeOptions, RegisterOptions,
    ResetPasswordOptions
} from '../../interfaces/request-interface';
import {
    RegisterResponse, LoginResponse, ResetPasswordResponse,
    PhoneVerCodeResponse
} from '../../interfaces/response-interface';

/*====================================================SLIDES ACTIONS===============================================*/

export const SHOW_SPECIFIC_SLIDE = 'SHOW_SPECIFIC_SLIDE';

export const SHOW_SPECIFIC_INNER_SLIDE = 'SHOW_SPECIFIC_INNER_SLIDE';

export class ShowSpecificSlideAction implements Action {
    readonly type = SHOW_SPECIFIC_SLIDE;

    constructor(public payload: number) { }
}

export class ShowSpecificInnerSlideAction implements Action {
    readonly type = SHOW_SPECIFIC_INNER_SLIDE;

    constructor(public payload: number) { }
}

/*====================================================Login actions===============================================*/

export const LOGIN = 'LOGIN';

export class LoginAction implements Action {
    readonly type = LOGIN;

    constructor(public payload: LoginOptions) { }
}

export const LOGIN_FAIL = 'LOGIN_FAIL';

export class LoginFailAction implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: { captcha: boolean }) {
    }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export class LoginSuccessAction implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: LoginResponse) { }
}

/*===================================Image verification code actions===============================================*/

export const UPDATE_RANDOM_CODE = 'UPDATE_RANDOM_CODE';

export class UpdateRandomCodeAction implements Action {
    readonly type = UPDATE_RANDOM_CODE;

    constructor(public payload: string) {
    };
}

/*=========================================Register phone verification actions===============================================*/

export const GET_PHONE_VERIFICATION_CODE = 'GET_PHONE_VERIFICATION_CODE';

export class RegisterPhoneVerCodeAction {
    readonly type = GET_PHONE_VERIFICATION_CODE;

    constructor(public payload: PhoneVerificationCodeOptions) { }
}

export const PHONE_VERIFICATION_CODE_FAIL = 'PHONE_VERIFICATION_CODE_FAIL';

export class RegisterPhoneVerCodeFailAction {
    readonly type = PHONE_VERIFICATION_CODE_FAIL;

    constructor(public payload: PhoneVerCodeResponse) { }
}

export const PHONE_VERIFICATION_CODE_SUCCESS = 'PHONE_VERIFICATION_CODE_SUCCESS';

export class RegisterPhoneVerCodeSuccessAction {
    readonly type = PHONE_VERIFICATION_CODE_SUCCESS;

    constructor(public payload: PhoneVerCodeResponse) { }
}

/*===============================================register actions==================================================*/

export const REGISTER = 'REGISTER';

export class RegisterAction {
    readonly type = REGISTER;

    constructor(public payload: RegisterOptions) { };
}

export const REGISTER_FAIL = 'REGISTER_FAIL';

export class RegisterFailAction {
    readonly type = REGISTER_FAIL;

    constructor(public payload: RegisterResponse) { }
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export class RegisterSuccessAction {
    readonly type = REGISTER_SUCCESS;

    constructor(public payload: RegisterResponse) { };
}

/*=============================================Reset password=======================================================*/

export const RESET_PASSWORD = 'RESET_PASSWORD';

export class ResetPasswordAction {
    readonly type = RESET_PASSWORD;

    constructor(public payload: ResetPasswordOptions) { }
}

export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';

export class ResetPasswordFailAction {
    readonly type = RESET_PASSWORD_FAIL;

    constructor(public payload: ResetPasswordResponse) { }
}

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

export class ResetPasswordSuccessAction {
    readonly type = RESET_PASSWORD_SUCCESS;

    constructor(public payload: ResetPasswordResponse) { }
}

/*=============================================Reset password phone verification code=======================================================*/

export const RESET_PHONE_VERIFICATION_CODE = 'RESET_PHONE_VERIFICATION_CODE';

export class ResetPhoneVerCodeAction {
    readonly type = RESET_PHONE_VERIFICATION_CODE;

    constructor(public payload: PhoneVerificationCodeOptions) { }
}

export const RESET_PHONE_VERIFICATION_CODE_FAIL = 'RESET_PHONE_VERIFICATION_CODE_FAIL';

export class ResetPhoneVerCodeFailAction {
    readonly type = RESET_PHONE_VERIFICATION_CODE_FAIL;

    constructor(public payload: PhoneVerCodeResponse) { }
}

export const RESET_PHONE_VERIFICATION_CODE_SUCCESS = 'RESET_PHONE_VERIFICATION_CODE_SUCCESS';

export class ResetPhoneVerCodeSuccessAction {
    readonly type = RESET_PHONE_VERIFICATION_CODE_SUCCESS;

    constructor(public payload: PhoneVerCodeResponse) { }
}

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

export class UpdateAccountAction {
    readonly type = UPDATE_ACCOUNT;

    constructor(public payload: string) { }
}

/* ==============================================Clean data=============================================== */

export const RESET_SID = 'RESET_SID';

export class ResetSidAction implements Action {
    readonly type = RESET_SID;

    constructor() { }
}

export type Actions = ShowSpecificSlideAction
    | ShowSpecificInnerSlideAction
    | LoginAction
    | LoginFailAction
    | LoginSuccessAction
    | UpdateRandomCodeAction
    | UpdateAccountAction
    | RegisterPhoneVerCodeAction
    | RegisterPhoneVerCodeFailAction
    | RegisterPhoneVerCodeSuccessAction
    | RegisterAction
    | RegisterFailAction
    | RegisterSuccessAction
    | ResetPasswordAction
    | ResetPasswordFailAction
    | ResetPasswordSuccessAction
    | ResetPhoneVerCodeAction
    | ResetPhoneVerCodeFailAction
    | ResetPhoneVerCodeSuccessAction
    | ResetSidAction;
