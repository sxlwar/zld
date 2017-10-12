import * as config from '../actions/config-action'
import {ActionReducer, ActionReducerMap, createSelector} from '@ngrx/store';

export interface State {
  buttonText: string
}

export const initialState: State = {
  buttonText: 'Back'
};

/**
 * Todo This function return a string type result, but state is object type. why ??????
 * */
export function reducer(state = initialState, action: config.Actions) {
  switch (action.type) {
    case config.SET_BACK_BUTTON_TEXT:
      return action.payload;
    default:
      return state.buttonText;
  }
}

export const reducers = {
  buttonText: reducer
};

export const getButtonText = (state: State) => state.buttonText;

export const selectButtonText = createSelector(getButtonText, text => text);
