import * as actions from '../actions/login-action';
import {SHOW_SPECIFIC_INNER_SLIDE, SHOW_SPECIFIC_SLIDE} from '../actions/login-action';

export interface State {
  page: {
    activeIndexOfSlides: number
    activeIndexOfInnerSlides: number
  }
}

export const initialSate: State = {
  page: {
    activeIndexOfSlides: 0,
    activeIndexOfInnerSlides: 0
  }
};

export function reducer(state = initialSate, action: actions.Actions): State {
  switch (action.type) {
    case SHOW_SPECIFIC_SLIDE:
      return {
        page: {
        activeIndexOfSlides: action.payload,
          activeIndexOfInnerSlides: state.page.activeIndexOfInnerSlides,
        }
      };
    case SHOW_SPECIFIC_INNER_SLIDE:
      return {
        page: {
        activeIndexOfSlides: state.page.activeIndexOfSlides,
          activeIndexOfInnerSlides: action.payload,
        }
      };
    default:
      return state;
  }
}

export const getActiveIndexOfSlides = (state: State) => state.page.activeIndexOfSlides;

export const getActiveIndexOfInnerSlides = (state: State) => state.page.activeIndexOfInnerSlides;
