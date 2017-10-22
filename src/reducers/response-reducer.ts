import * as action from '../actions/response-action';
import {LOGIN_FAIL, LOGIN_SUCCESS} from '../actions/response-action';

export interface LoginState {
  loginState: boolean;
  captcha?: boolean;
}

export interface State {
  login: LoginState
}

export const initialLoginState: LoginState = {
  loginState: false
};

export const initialState: State = {
  login: initialLoginState
};

export function reducer(state = initialState, action): State {
  return state;
}

export function loginReducer(state = initialLoginState, action: action.Actions): LoginState {
  switch (action.type) {
    case LOGIN_FAIL:
      return {
        loginState: false,
        captcha: false //todo select from store;
      };
    case LOGIN_SUCCESS:
      return {
        loginState: true
      };
    default:
      return state;
  }
}


export const getLoginState = (state: State) => state.login;
