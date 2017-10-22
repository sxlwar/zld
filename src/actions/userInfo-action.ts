import {UserInfo} from '../interfaces/response-interface';
import {Action} from '@ngrx/store';

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export class UpdateUserInfo implements Action {
  readonly type = UPDATE_USER_INFO;

  constructor(public payload: UserInfo) {

  }
}

export const RESET_USER_INFO = 'RESET_USER_INFO';

export class ResetUserInfo implements Action {
  readonly type = RESET_USER_INFO;

  constructor(public payload: any){}
}


export type Actions = UpdateUserInfo | ResetUserInfo;
