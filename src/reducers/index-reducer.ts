import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as config from './config-reducer';
import * as tutorial from './tutorial-reducer';
import * as login from './login-reducer';
import * as search from './search-reducer';
import * as phoneVerCode from './verification-code-reducer';
import {RegisterResponse, LoginResponse} from '../interfaces/response-interface';

export interface AppState {
  config: config.State;
  tutorialPage: tutorial.State;
  loginPage: login.State;
  userInfo: LoginResponse;
  search: search.State;
  phoneVerCode: phoneVerCode.State;
  register: RegisterResponse
}

export const reducers: ActionReducerMap<AppState> = {
  config: config.reducer,
  tutorialPage: tutorial.reducer,
  loginPage: login.reducer,
  userInfo: login.userInfoReducer,
  search: search.reducer,
  phoneVerCode: phoneVerCode.reducer,
  register: login.registerReducer
};

//config
export const getConfig = (state: AppState) => state.config;
export const selectButtonText = createSelector(getConfig, config.getBackButtonText);
export const selectPlatformDirection = createSelector(getConfig, config.getPlatFormDirection);

/*==============================================Pages selectors====================================================*/

//tutorialPage
export const getTutorialPage = (state: AppState) => state.tutorialPage;
export const selectSkipState = createSelector(getTutorialPage, tutorial.getSkipState);
export const selectTutorialSlides = createSelector(getTutorialPage, tutorial.getTutorialSlides);

//loginPage
export const getLoginPage = (state: AppState) => state.loginPage;
export const selectActiveIndexOfSlides = createSelector(getLoginPage, login.getActiveIndexOfSlides);
export const selectActiveIndexOfInnerSlides = createSelector(getLoginPage, login.getActiveIndexOfInnerSlides);
export const selectLoginForm = createSelector(getLoginPage, login.getLoginForm);
export const selectLoginVerificationImage = createSelector(getLoginPage, login.getLoginVerificationImage);
export const selectRandomCode = createSelector(getLoginPage, login.getRandomCode);


/*==============================================search selectors====================================================*/

//search e.g: search company , search worker
export const getSearchState = (state: AppState) => state.search;
export const selectSearchCompanies = createSelector(getSearchState, search.getCompanies);
export const selectSearchQuery = createSelector(getSearchState, search.getQuery);
export const selectSearchLoading = createSelector(getSearchState, search.getLoading);
export const selectSelectedCompany = createSelector(getSearchState, search.getSelectedCompany);

/*===========================================Server response selectors===========================================*/

//userInfo  from: login api
export const getUserInfo = (state: AppState) => state.userInfo;
export const selectUserInfo = createSelector(getUserInfo, info => info);
export const selectRealname = createSelector(getUserInfo, login.getRealname);
export const selectCapthca = createSelector(getUserInfo, login.getCaptcha);
export const selectAuthPass = createSelector(getUserInfo, login.getAuthPass);
export const selectSid = createSelector(getUserInfo, login.getSid);
export const selectUserId = createSelector(getUserInfo, login.getUserId);


//phone verification code
export const getPhoneVerCode = (state: AppState) => state.phoneVerCode;
export const selectPhoneVerCodeCaptcha = createSelector(getPhoneVerCode, phoneVerCode.getPhoneVerCaptcha);

//register
export const getRegister = (state: AppState) => state.register;
export const selectRegisterUserId = createSelector(getRegister, login.getRegisterUserId);
