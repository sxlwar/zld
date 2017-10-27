
import * as actions from '../actions/login-action';

export interface State {
  captcha: boolean;
}

export const initialPhoneVerCode: State = {
  captcha: false
};

export function reducer(state = initialPhoneVerCode, action: actions.Actions) {
  switch (action.type) {
    case actions.PHONE_VERIFICATION_CODE_FAIL:
      return action.payload;

    case actions.PHONE_VERIFICATION_CODE_SUCCESS:
    default:
      return initialPhoneVerCode;
  }
}

export const getPhoneVerCaptcha = (state: State) => state.captcha;
