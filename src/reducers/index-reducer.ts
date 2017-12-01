//region
import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as config from './reducer/config-reducer';
import * as tutorial from './reducer/tutorial-reducer';
import * as login from './reducer/login-reducer';
import * as search from './reducer/search-reducer';
import * as upload from './reducer/upload-reducer';
import * as certificate from './reducer/certificate-reducer';
import * as response from '../interfaces/response-interface';
import * as icons from './reducer/icons-reducer';
import * as project from './reducer/project-reducer';
import * as worker from './reducer/worker-reducer';
import * as workType from './reducer/craft-reducer';
import * as team from './reducer/team-reducer';
import * as attendance from './reducer/attendance-reducer';
import * as attendanceRecord from './reducer/attendance-record-reducer';
import * as payBill from './reducer/pay-bill-reducer';
import * as overtime from './reducer/overtime-reducer';
import * as piece from './reducer/work-piece-reducer';
import * as statistics from './reducer/statistics-reducer';
import * as employer from './reducer/employer-reducer';
import * as personal from './reducer/personal-reducer';
import * as machine from './reducer/attendance-machine-reducer';
//endregion

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
  icons: icons.State,
  project: project.State,
  worker: worker.State,
  workType: response.WorkTypeListResponse,
  team: team.State,
  attendance: attendance.State,
  attendanceRecord: attendanceRecord.State,
  payBill: payBill.State,
  overtime: overtime.State,
  piece: piece.State,
  statistics: statistics.State,
  employer: employer.State,
  personal: personal.State,
  machine: machine.State,
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
  icons: icons.reducer,
  project: project.reducer,
  worker: worker.reducer,
  workType: workType.reducer,
  team: team.reducer,
  attendance: attendance.reducer,
  attendanceRecord: attendanceRecord.reducer,
  payBill: payBill.reducer,
  overtime: overtime.reducer,
  piece: piece.reducer,
  statistics: statistics.reducer,
  employer: employer.reducer,
  personal: personal.reducer,
  machine: machine.reducer,
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


/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Server response selectors Start<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

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
export const selectGroupList = createSelector(getUserInfo, login.getGroupList);


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
export const getResetPassword = (state: AppState) => state.resetPassword;
export const selectResetPasswordId = createSelector(getResetPassword, login.getResetPasswordUserId);

//certificate
export const getCertificate = (state: AppState) => state.certificate;
export const selectCertificateResult = createSelector(getCertificate, certificate.getAuthPass);

//project list
export const getProject = (state: AppState) => state.project;
export const selectSelectedProject = createSelector(getProject, project.getSelectedProject);
export const selectProjects = createSelector(getProject, project.getProjects);
export const selectErrorMessage = createSelector(getProject, project.getErrorMessage);

//worker contract list
export const getWorkerContracts = (state: AppState) => state.worker;
export const selectWorkerPage = createSelector(getWorkerContracts, worker.getWorkerContractPage);
export const selectWorkerLimit = createSelector(getWorkerContracts, worker.getWorkerContractLimit);
export const selectWorkerContracts = createSelector(getWorkerContracts, worker.getWorkerContracts);
export const selectWorkerContractResponse = createSelector(getWorkerContracts, worker.getWorkerContractResponse);
export const selectTimerContractIds = createSelector(getWorkerContracts, worker.getTimerContracts);
export const selectPiecerContractIds = createSelector(getWorkerContracts, worker.getPiecerContracts);
export const selectManageTimerPage = createSelector(getWorkerContracts, worker.getTimerPage);
export const selectManagePiecerPage = createSelector(getWorkerContracts, worker.getPiecerPage);
export const selectManageTimerCount = createSelector(getWorkerContracts, worker.getTimerCount);
export const selectManagePiecerCount = createSelector(getWorkerContracts, worker.getPiecerCount);

//work type list
export const getWorkType = (state: AppState) => state.workType;
export const selectWorkTypeList = createSelector(getWorkType, workType.getWorkType);

//team api: teamList addTeam deleteTeam updateTeam; 
export const getTeam = (state: AppState) => state.team;
export const selectTeamResponse = createSelector(getTeam, team.getTeamListResponse);
export const selectSelectedTeams = createSelector(getTeam, team.getSelectTeams);
export const selectAddTeamResponse = createSelector(getTeam, team.getAddTeamResponse);
export const selectDeleteTeamResponse = createSelector(getTeam, team.getDeleteTeamResponse);
export const selectUpdateTeamResponse = createSelector(getTeam, team.getUpdateTeamResponse);

//attendance result list
export const getAttendance = (state: AppState) => state.attendance;
export const selectAttendanceResponse = createSelector(getAttendance, attendance.getAttendanceResultResponse);
export const selectAttendanceList = createSelector(getAttendance, attendance.getAttendanceResults);
export const selectAttendanceCount = createSelector(getAttendance, attendance.getAttendanceCount);
export const selectAttendanceDatePeriod = createSelector(getAttendance, attendance.getAttendanceDatePeriod);
export const selectAttendanceDateStart = createSelector(selectAttendanceDatePeriod, attendance.getAttendanceStartDate);
export const selectAttendanceDateEnd = createSelector(selectAttendanceDatePeriod, attendance.getAttendanceEndDate);
export const selectAttendancePage = createSelector(getAttendance, attendance.getAttendancePage);
export const selectAttendanceLimit = createSelector(getAttendance, attendance.getAttendanceLimit);
export const selectSelectedAttendanceIds = createSelector(getAttendance, attendance.getSelectedAttendanceIds);
export const selectAttendanceAllSelected = createSelector(getAttendance, attendance.getAllSelected);
export const selectAttendanceData = createSelector(getAttendance, attendance.getAttendanceData);

//attendance instant list
export const getAttendanceRecord = (state: AppState) => state.attendanceRecord;
export const selectAttendanceRecordResponse = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceResponse);
export const selectAttendanceRecordCount = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordCount);
export const selectAttendanceRecordInstant = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordInstants);
export const selectAttendanceRecordPage = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordPage);
export const selectAttendanceRecordLimit = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordLimit);
export const selectAttendanceRecordMoreData = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordMoreData);
export const selectAttendanceRecordMaxDate = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordMaxDate);

//pay bill list
export const getPayBill = (state: AppState) => state.payBill;
export const selectPayBillListResponse = createSelector(getPayBill, payBill.getPayBillResponse);
export const selectPayBillListCount = createSelector(getPayBill, payBill.getPayBillCount);
export const selectPayBillList = createSelector(getPayBill, payBill.getPayBillList);

//pay process list
export const selectPayProcessResponse = createSelector(getPayBill, payBill.getPayBillResponse);
export const selectPayProcessCount = createSelector(getPayBill, payBill.getPayProcessCount);
export const selectPayProcessList = createSelector(getPayBill, payBill.getPayProcessList);

//project bill list
export const selectProjectBillResponse = createSelector(getPayBill, payBill.getProjectBillResponse);
export const selectProjectBillList = createSelector(getPayBill, payBill.getProjectBillList);

//project process list
export const selectProjectProcessResponse = createSelector(getPayBill, payBill.getProjectProcessResponse);
export const selectProjectProcessCount = createSelector(getPayBill, payBill.getProjectProcessCount);
export const selectProjectProcessList = createSelector(getPayBill, payBill.getProjectProcessList);
export const selectProjectProcessSelectedStatus = createSelector(getPayBill, payBill.getSelectedProjectPayProcessStatus);

//overtime record list
export const getOvertime = (state: AppState) => state.overtime;
export const selectOvertimeRecordResponse = createSelector(getOvertime, overtime.getOvertimeRecordResponse);
export const selectOvertimeRecordCount = createSelector(getOvertime, overtime.getOvertimeRecordCount);
export const selectOvertimeRecord = createSelector(getOvertime, overtime.getOvertimeRecord);

//work piece 
export const getWorkPiece = (state: AppState) => state.piece;
export const selectWorkPieceResponse = createSelector(getWorkPiece, piece.getPieceResponse);
export const selectWorkPiecePay = createSelector(getWorkPiece, piece.getPiecePay);
export const selectWorkPieceFinishFlow = createSelector(getWorkPiece, piece.getPieceFinishFlow);

//attendance result stat team stat list 
export const getStatistics = (state: AppState) => state.statistics;
export const selectAttendanceStatisticsResponse = createSelector(getStatistics, statistics.getAttendanceStatResponse);
export const selectAttendanceStatistics = createSelector(getStatistics, statistics.getAttendanceStats);
export const selectAttendanceStatisticList = createSelector(getStatistics, statistics.getAttendanceStatisticList);

//request aggregation list
export const selectWorkFlowStatisticsResponse = createSelector(getStatistics, statistics.getWorkFlowStatResponse);
export const selectWorkFlowStatistics = createSelector(getStatistics, statistics.getWorkFlowStats);

//company user list
export const getEmployer = (state: AppState) => state.employer;
export const selectCompanyUserResponse = createSelector(getEmployer, employer.getCompanyUserResponse);
export const selectCompanyUsers = createSelector(getEmployer, employer.getCompanyUsers);
export const selectSelectedForemen = createSelector(getEmployer, employer.getSelectedForemen);
export const selectSelectedQualityClerks = createSelector(getEmployer, employer.getSelectedQualityClerks);

//basic info list
export const getPersonal = (state: AppState) => state.personal;
export const selectBasicInfoListResponse = createSelector(getPersonal, personal.getBasicInfoListResponse);
export const selectHomeInformation = createSelector(getPersonal, personal.getHomeInformation);
export const selectBasicInformation = createSelector(getPersonal, personal.getBasicInformation);
export const selectWorkExperience = createSelector(getPersonal, personal.getWorkExperience);
export const selectPlatformWorkExperience = createSelector(getPersonal, personal.getPlatformExperience);
export const selectPersonalIdInformation = createSelector(getPersonal, personal.getPersonalIdInformation);
export const selectWorkCertification = createSelector(getPersonal, personal.getWorkCertification);

//attendance machine list 
export const getMachines = (state: AppState) => state.machine;
export const selectMachineListResponse = createSelector(getMachines, machine.getMachineListResponse);
export const selectMachines = createSelector(getMachines, machine.getAttendanceMachines);
export const selectMachineCount = createSelector(getMachines, machine.getAttendanceCount);

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Server response selector end>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

/*================================================HTTP===========================================================*/

//upload
export const getUploadState = (state: AppState) => state.uploadState;
export const selectUploadingState = createSelector(getUploadState, upload.getUploadingState);
export const selectUploadedState = createSelector(getUploadState, upload.getUploadedState);
export const selectUploadResult = createSelector(getUploadState, upload.getUploadResult);

/*================================================Icons with permission===========================================*/

export const getIconsState = (state: AppState) => state.icons;
export const selectIcon = (path: string | string[]) => createSelector(getIconsState, icons.getSpecificIcon(path));
