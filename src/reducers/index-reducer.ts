import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as config from './config-reducer';
import * as tutorial from './tutorial-reducer';
import * as login from './login-reducer';
import * as search from './search-reducer';
import * as upload from './upload-reducer';
import * as certificate from './certificate-reducer';
import * as response from '../interfaces/response-interface';

export interface AppState {
  config: config.State;
  tutorialPage: tutorial.State;
  loginPage: login.State;
  userInfo: response.LoginResponse;
  search: search.State;
  phoneVerCode: response.PhoneVerCodeResponse;
  register: response.RegisterResponse;
  resetPhoneVerCode: response.PhoneVerCodeResponse;
  resetPassword: response.ResetPasswordResponse;
  uploadState: upload.State;
  certificate: response.CertificateResponse;
}

export const reducers: ActionReducerMap<AppState> = {
  config: config.reducer,
  tutorialPage: tutorial.reducer,
  loginPage: login.reducer,
  userInfo: login.userInfoReducer,
  search: search.reducer,
  phoneVerCode: login.registerPhoneVerReducer,
  register: login.registerReducer,
  resetPhoneVerCode: login.resetPwdPhoneVerReducer,
  resetPassword: login.resetPasswordReducer,
  uploadState: upload.reducer,
  certificate: certificate.reducer,
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


/*===========================================Server response selectors===========================================*/

//search e.g: search company , search worker
export const getSearchState = (state: AppState) => state.search;
export const selectSearchCompanies = createSelector(getSearchState, search.getCompanies);
export const selectSearchQuery = createSelector(getSearchState, search.getQuery);
export const selectSearchLoading = createSelector(getSearchState, search.getLoading);
export const selectSelectedCompany = createSelector(getSearchState, search.getSelectedCompany);

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
export const selectPhoneVerCodeCaptcha = createSelector(getPhoneVerCode, login.getRegisterPhoneVerCaptcha);

//reset password verification code
export const getResetPhoneVerCode = (state: AppState) => state.resetPhoneVerCode;
export const selectResetPhoneVerCodeCaptcha = createSelector(getResetPhoneVerCode, login.getResetPhoneVerCaptcha);

//register
export const getRegister = (state: AppState) => state.register;
export const selectRegisterUserId = createSelector(getRegister, login.getRegisterUserId);

//reset password
export const getResetPassword =(state: AppState) => state.resetPassword;
export const selectResetPasswordId = createSelector(getResetPassword, login.getResetPasswordUserId);

//certificate
export const getCertificate = (state: AppState) => state.certificate;
export const selectCertificateResult = createSelector(getCertificate, certificate.getAuthPass);

/*================================================HTTP===========================================================*/

//upload
export const getUploadState = (state: AppState) => state.uploadState;
export const selectUploadingState = createSelector(getUploadState, upload.getUploadingState);
export const selectUploadedState = createSelector(getUploadState, upload.getUploadedState);
export const selectUploadResult = createSelector(getUploadState, upload.getUploadResult);
