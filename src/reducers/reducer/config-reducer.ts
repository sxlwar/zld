import * as config from '../../actions/action/config-action'

export interface State {
  defaultDirection: string;
}

export const initialState: State = {
  defaultDirection: 'ltr',
};

export function reducer(state = initialState, action: config.Actions) {
  switch (action.type) {

    case config.SET_PLATFORM_DIRECTION:
      return Object.assign({}, state, {defaultDirection: action.payload});

    default:
      return state;
  }
}

export const getPlatFormDirection = (state: State) => state.defaultDirection;
