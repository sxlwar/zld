import * as config from '../actions/config-action'

export interface State {
  backButtonText: string
}

export const initialState: State = {
  backButtonText: 'Back'
};

export function reducer(state = initialState, action: config.Actions) {
  switch (action.type) {
    case config.SET_BACK_BUTTON_TEXT:
      return {
        backButtonText: action.payload
      };
    default:
      return state;
  }
}

export const getBackButtonText = (state: State) => state.backButtonText;
