import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as config from './config-reducer';
import * as direction from './direction-reducer';
import * as slide from './tutorial-reducer';
import * as login from './login-reducer';

export interface AppState {
  backButton: config.State;
  platformDirection: string;
  slide: slide.State;
  login: login.State;
}

export const reducers: ActionReducerMap<AppState> = {
  backButton: config.reducer,
  platformDirection: direction.reducer,
  slide: slide.reducer,
  login: login.reducer
};

//back button
export const getBackButton = (state: AppState) => state.backButton;
export const selectButtonText = createSelector(getBackButton, config.getBackButtonText);

//platform direction
export const getPlatformDirection = (state: AppState) => state.platformDirection;
export const selectPlatformDirection = createSelector(getPlatformDirection, dir => dir);

//tutorial
export const getSlide = (state: AppState) => state.slide;
export const selectSkipState = createSelector(getSlide, slide.getSkipState);
export const selectWelcomeSlides = createSelector(getSlide, slide.getWelcomeSlides);

//login
export const getLogin = (state: AppState) => state.login;
export const selectActiveIndexOfSlides = createSelector(getLogin, login.getActiveIndexOfSlides);
export const selectActiveIndexOfInnerSlides = createSelector(getLogin, login.getActiveIndexOfInnerSlides);
