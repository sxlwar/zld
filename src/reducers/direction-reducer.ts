import * as actions from '../actions/tutorial-action';

export const defaultDirection = 'ltr';

export function reducer(state = defaultDirection, action: actions.Actions) {
  switch (action.type) {
    case actions.SET_PLATFORM_DIRECTION:
      return action.payload;
    default:
      return state;
  }
}
