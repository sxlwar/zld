import {Action} from '@ngrx/store';
import {UserInfo} from '../interfaces/userInfo-interface';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: UserInfo) {

  }
}

export const LOGIN_FAIL = 'LOGIN_FAIL';

export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: UserInfo) {

  }
}

export const REDIRECT_TO = 'REDIRECT_TO';

export class RedirectAction implements Action {
  readonly type = REDIRECT_TO;

  constructor(public payload: string) {
  }
}


export type Actions = LoginSuccessAction | LoginFailAction | RedirectAction;
