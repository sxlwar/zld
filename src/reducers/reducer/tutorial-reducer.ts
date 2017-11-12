import * as actions from '../../actions/action/tutorial-action';
import {Slide} from '../../interfaces/tutorial-interface';

export interface State {
  skipState: boolean;
  welcomeSlides: Slide[];
  defaultDirection: string;
}

export const initialState: State = {
  skipState: true,
  welcomeSlides: [],
  defaultDirection: 'ltr'
};

export function reducer(state = initialState, action: actions.Actions) {
  switch (action.type) {
    case actions.TOGGLE_SKIP: {
      return {
        skipState: action.payload,
        welcomeSlides: state.welcomeSlides,
        defaultDirection: state.defaultDirection
      }
    }

    case actions.ADD_SLIDES: {
      return {
        skipState: state.skipState,
        welcomeSlides: action.payload,
        defaultDirection: state.defaultDirection
      }
    }

    case actions.ADD_SLIDE: {
      return {
        skipState: state.skipState,
        welcomeSlides: [...state.welcomeSlides, action.payload],
        defaultDirection: state.defaultDirection
      }
    }

    case actions.DELETE_SLIDE:
      return {
        skipState: state.skipState,
        welcomeSlides: state.welcomeSlides.filter((slide: Slide) => slide.title !== action.payload.title),
        defaultDirection: state.defaultDirection
      }
    default:
      return state;
  }
}


export const getTutorialSlides = (state: State) => state.welcomeSlides;

export const getSkipState = (state: State) => state.skipState;




