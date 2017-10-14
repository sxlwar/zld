import * as actions from '../actions/tutorial-action';
import {Slide} from '../interfaces/tutorial-interface';

export interface State {
  skipState: boolean,
  welcomeSlides: Slide[]
}

export const initialState: State = {
  skipState: true,
  welcomeSlides: []
};

export function reducer(state = initialState, action: actions.Actions) {
  switch (action.type) {
    case actions.TOGGLE_SKIP: {
      return {
        skipState: action.payload,
        welcomeSlides: state.welcomeSlides
      }
    }

    case actions.ADD_SLIDES: {
      return {
        skipState: state.skipState,
        welcomeSlides: action.payload
      }
    }

    case actions.ADD_SLIDE: {
      return {
        skipState: state.skipState,
        welcomeSlides: [...state.welcomeSlides, action.payload]
      }
    }

    case actions.DELETE_SLIDE:
      return {
        skipState: state.skipState,
        welcomeSlides: state.welcomeSlides.filter((slide: Slide) => slide.title !== action.payload.title)
      }
    default:
      return state;
  }
}


export const getWelcomeSlides = (state: State) => state.welcomeSlides;

export const getSkipState = (state: State) => state.skipState;




