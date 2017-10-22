import {Action} from '@ngrx/store';
import {UserInfo} from '../interfaces/response-interface';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';


export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: UserInfo) {
  }
}

export const LOGIN_FAIL = 'LOGIN_FAIL';

export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payloda: boolean){}
}


export type Actions = LoginSuccessAction | LoginFailAction;
