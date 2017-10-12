import * as actions from '../actions/slide-action';

export function showSkipReducer(state = true, action: actions.Actions) {
  switch (action.type) {
    case actions.SHOW_SKIP:
      return true;
    case actions.HIDE_SKIP:
      return false;
    default:
      return state;
  }
}

export function slideReducer(state = [], action: actions.Actions) {
  switch (action.type) {
    case actions.ADD_SLIDES:
      return action.payload;

    //TODO Add a new slide;
    case actions.ADD_SLIDE:
      return state;

    //TODO Remove a slide from store.
    case actions.DELETE_SLIDE:
      return state;

    default:
      return state;
  }
}


export function platformDirectionReducer(state = 'ltr', action: actions.Actions) {
  switch (action.type) {
    case actions.SET_PLATFORM_DIRECTION:
      return action.payload;

    default:
      return state;
  }
}
