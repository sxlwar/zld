import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as config from './config-reducer';
import * as direction from './direction-reducer';
import * as slide from './tutorial-reducer';
import * as login from './login-reducer';
import * as userInfo from './userInfo-reducer'
import {UserInfo} from '../interfaces/response-interface';
import {getAuthPass, getCaptcha, getRealname, getSid, getUserId} from './userInfo-reducer';

export interface AppState {
  backButton: config.State;
  platformDirection: string;
  slide: slide.State;
  login: login.State;
  userInfo: UserInfo;
}

export const reducers: ActionReducerMap<AppState> = {
  backButton: config.reducer,
  platformDirection: direction.reducer,
  slide: slide.reducer,
  login: login.reducer,
  userInfo: userInfo.reducer
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


//userInfo
export const getUserInfo = (state: AppState) => state.userInfo;
export const selectUserInfo = createSelector(getUserInfo, info => info);
export const selectRealname = createSelector(getUserInfo, getRealname);
export const selectCapthca = createSelector(getUserInfo, getCaptcha);
export const selectAuthPass = createSelector(getUserInfo, getAuthPass);
export const selectSid = createSelector(getUserInfo, getSid);
export const selectUserId = createSelector(getUserInfo, getUserId);
