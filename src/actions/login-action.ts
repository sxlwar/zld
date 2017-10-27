import {Action} from '@ngrx/store';
import {LoginOptions, PhoneVerificationCodeOptions, RegisterOptions} from '../interfaces/request-interface';
import {RegisterResponse, LoginResponse} from '../interfaces/response-interface';

/*====================================================SLIDES ACTIONS===============================================*/

export const SHOW_SPECIFIC_SLIDE = 'SHOW_SPECIFIC_SLIDE';

export const SHOW_SPECIFIC_INNER_SLIDE = 'SHOW_SPECIFIC_INNER_SLIDE';

export class ShowSpecificSlideAction implements Action {
  readonly type = SHOW_SPECIFIC_SLIDE;

  constructor(public payload: number) {
  }
}

export class ShowSpecificInnerSlideAction implements Action {
  readonly type = SHOW_SPECIFIC_INNER_SLIDE;

  constructor(public payload: number) {
  }
}

/*====================================================Login actions===============================================*/

export const LOGIN = 'LOGIN';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: LoginOptions) {
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: LoginResponse) {
  }
}

export const LOGIN_FAIL = 'LOGIN_FAIL';

export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: { captcha: boolean }) {
  }
}

/*===================================Image verification code actions===============================================*/

export const UPDATE_VERIFICATION_IMAGE = 'UPDATE_VERIFICATION_IMAGE';

export class UpdateVerificationImageAction implements Action {
  readonly type = UPDATE_VERIFICATION_IMAGE;

  constructor(public payload: string) {
  };
}

export const UPDATE_RANDOM_CODE = 'UPDATE_RANDOM_CODE';

export class UpdateRandomCode implements Action {
  readonly type = UPDATE_RANDOM_CODE;

  constructor(public payload: string) {
  };
}

/*=========================================Phone verification actions===============================================*/

export const GET_PHONE_VERIFICATION_CODE = 'GET_PHONE_VERIFICATION_CODE';

export class GetPhoneVerCodeAction {
  readonly type = GET_PHONE_VERIFICATION_CODE;

  constructor(public payload: PhoneVerificationCodeOptions) {
  }
}

export const PHONE_VERIFICATION_CODE_FAIL = 'PHONE_VERIFICATION_CODE_FAIL';

export class PhoneVerCodeFailAction {
  readonly type = PHONE_VERIFICATION_CODE_FAIL;

  constructor(public payload: { captcha: boolean }) {
  }
}

export const PHONE_VERIFICATION_CODE_SUCCESS = 'PHONE_VERIFICATION_CODE_SUCCESS';

export class PhoneVerCodeSuccessAction {
  readonly type = PHONE_VERIFICATION_CODE_SUCCESS;

  constructor(public payload: null) {
  }
}

/*===============================================register actions=====================================================*/

export const REGISTER = 'REGISTER';

export class RegisterAction {
  readonly type = REGISTER;

  constructor(public payload: RegisterOptions) {
  };
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export class RegisterSuccessAction {
  readonly type = REGISTER_SUCCESS;

  constructor(public payload: RegisterResponse) {
  };
}

export const REGISTER_FAIL = 'REGISTER_FAIL';

export class RegisterFailAction {
  readonly type = REGISTER_FAIL;

  constructor(public payload: RegisterResponse) {
  }
}

export type Actions = ShowSpecificSlideAction
  | ShowSpecificInnerSlideAction
  | LoginAction
  | LoginFailAction
  | LoginSuccessAction
  | UpdateVerificationImageAction
  | UpdateRandomCode
  | GetPhoneVerCodeAction
  | PhoneVerCodeFailAction
  | PhoneVerCodeSuccessAction
  | RegisterAction
  | RegisterFailAction
  | RegisterSuccessAction;
