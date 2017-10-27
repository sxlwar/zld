import * as config from '../actions/config-action'

export interface State {
  backButtonText: string;
  defaultDirection: string;
}

export const initialState: State = {
  backButtonText: 'Back',
  defaultDirection: 'ltr',
};

export function reducer(state = initialState, action: config.Actions) {
  switch (action.type) {
    case config.SET_BACK_BUTTON_TEXT:
      return Object.assign({}, state, {backButtonText: action.payload});
    case config.SET_PLATFORM_DIRECTION:
      return Object.assign({}, state, {defaultDirection: action.payload});
    default:
      return state;
  }
}

export const getBackButtonText = (state: State) => state.backButtonText;

export const getPlatFormDirection = (state: State) => state.defaultDirection;
