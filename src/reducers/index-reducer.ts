import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as config from './config-reducer';
import * as direction from './direction-reducer';
import * as slide from './tutorial-reducer';

export interface AppState {
  backButton: config.State;
  platformDirection: string;
  slide: slide.State;
}

export const reducers: ActionReducerMap<AppState> = {
  backButton: config.reducer,
  platformDirection: direction.reducer,
  slide: slide.reducer
};

export const getBackButton = (state: AppState) => state.backButton;

export const selectButtonText = createSelector(getBackButton, config.getBackButtonText);


export const getPlatformDirection = (state: AppState) => state.platformDirection;

export const selectPlatformDirection = createSelector(getPlatformDirection, dir => dir);


export const getSlide = (state: AppState) => state.slide;

export const selectSkipState = createSelector(getSlide, slide.getSkipState);
export const selectWelcomeSlides = createSelector(getSlide, slide.getWelcomeSlides);
