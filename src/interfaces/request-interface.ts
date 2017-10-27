import {Action} from '@ngrx/store';

export interface WsRequest {
  command: { path: string };
  parameters: object;
}

export class RequestAction implements Action {
  readonly type: string;

  constructor(public payload: Options) {
  };
}

export interface LoginOptions {
  username: string;
  password: string;
  captcha_code?: string;
  rand_captcha_key?: string;
}

export interface RegisterOptions {
  username: string;
  password: string;
  code: string;
  captcha_code?: string;
  rand_captcha_key?: string;
  real_name?: string;
  company_id?: number;
}

export interface PhoneVerificationCodeOptions {
  username: string;
  rand_captcha_key?: string;
  captcha_code?: string;
}


export type Options = LoginOptions
  & RegisterOptions
  & PhoneVerificationCodeOptions;
