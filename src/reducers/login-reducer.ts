import * as actions from '../actions/login-action';
import {SHOW_SPECIFIC_INNER_SLIDE, SHOW_SPECIFIC_SLIDE} from '../actions/login-action';

export interface State {
  activeIndexOfSlides: number
  activeIndexOfInnerSlides: number
}

export const initialSate: State = {
  activeIndexOfSlides: 0,
  activeIndexOfInnerSlides: 0
};

export function reducer(state = initialSate, action: actions.Actions): State {
  switch (action.type) {
    case SHOW_SPECIFIC_SLIDE:
      return{
        activeIndexOfSlides: action.payload,
        activeIndexOfInnerSlides: state.activeIndexOfInnerSlides
      };
    case SHOW_SPECIFIC_INNER_SLIDE:
      return {
        activeIndexOfSlides: state.activeIndexOfSlides,
        activeIndexOfInnerSlides: action.payload
      };
    default:
      return state;
  }
}

export const getActiveIndexOfSlides = (state: State) => state.activeIndexOfSlides;

export const getActiveIndexOfInnerSlides = (state: State) => state.activeIndexOfInnerSlides;
