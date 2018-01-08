import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as config from './reducer/config-reducer';
import * as tutorial from './reducer/tutorial-reducer';
import * as login from './reducer/login-reducer';
import * as search from './reducer/search-company-reducer';
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
import * as attendanceCard from './reducer/attendance-card-reducer';
import * as locationCard from './reducer/location-card-reducer';
import * as location from './reducer/location-reducer';
import * as bankCard from './reducer/bank-card-reducer';
import * as logout from './reducer/logout-reducer';
import * as QRLogin from './reducer/qr-scan-login-reducer';
import * as workCertificate from './reducer/work-certificate-reducer';
import * as message from './reducer/message-reducer';
import * as nationality from './reducer/nationality-reducer';
import * as group from './reducer/group-list-reducer';
import * as workFlow from './reducer/work-flow-reducer';
import * as leave from './reducer/leave-reducer';
import * as launch from './reducer/launch-reducer';
import * as searchWorker from './reducer/search-worker-reducer';
import * as deleteImages from './reducer/delete-images-reducer';

export interface AppState {
  QRLogin: QRLogin.State;
  attendance: attendance.State;
  attendanceCard: attendanceCard.State;
  attendanceRecord: attendanceRecord.State;
  bankCard: bankCard.State;
  certificate: response.CertificateResponse;
  config: config.State;
  deleteImages: deleteImages.State;
  employer: employer.State;
  group: group.State;
  icons: icons.State;
  launch: launch.State;
  leave: leave.State;
  location: location.State;
  locationCard: locationCard.State;
  loginPage: login.State;
  logout: logout.State;
  machine: machine.State;
  message: message.State;
  nationality: nationality.State;
  overtime: overtime.State;
  payBill: payBill.State;
  personal: personal.State;
  phoneVerCode: response.PhoneVerCodeResponse;
  piece: piece.State;
  project: project.State;
  register: response.RegisterResponse;
  resetPassword: response.ResetPasswordResponse;
  resetPhoneVerCode: response.PhoneVerCodeResponse;
  searchCompany: search.State;
  searchWorker: searchWorker.State;
  statistics: statistics.State;
  team: team.State;
  tutorialPage: tutorial.State;
  uploadState: upload.State;
  userInfo: response.LoginResponse;
  workCertificate: workCertificate.State;
  workFlow: workFlow.State;
  workType: workType.State;
  worker: worker.State;
}

export const reducers: ActionReducerMap<AppState> = {
  QRLogin: QRLogin.reducer,
  attendance: attendance.reducer,
  attendanceCard: attendanceCard.reducer,
  attendanceRecord: attendanceRecord.reducer,
  bankCard: bankCard.reducer,
  certificate: certificate.reducer,
  config: config.reducer,
  deleteImages: deleteImages.reducer,
  employer: employer.reducer,
  group: group.reducer,
  icons: icons.reducer,
  launch: launch.reducer,
  leave: leave.reducer,
  location: location.reducer,
  locationCard: locationCard.reducer,
  loginPage: login.reducer,
  logout: logout.reducer,
  machine: machine.reducer,
  message: message.reducer,
  nationality: nationality.reducer,
  overtime: overtime.reducer,
  payBill: payBill.reducer,
  personal: personal.reducer,
  phoneVerCode: login.registerPhoneVerReducer,
  piece: piece.reducer,
  project: project.reducer,
  register: login.registerReducer,
  resetPassword: login.resetPasswordReducer,
  resetPhoneVerCode: login.resetPwdPhoneVerReducer,
  searchCompany: search.reducer,
  searchWorker: searchWorker.reducer,
  statistics: statistics.reducer,
  team: team.reducer,
  tutorialPage: tutorial.reducer,
  uploadState: upload.reducer,
  userInfo: login.userInfoReducer,
  workCertificate: workCertificate.reducer,
  workFlow: workFlow.reducer,
  workType: workType.reducer,
  worker: worker.reducer,
};

//config
const getConfig = (state: AppState) => state.config;
export const selectButtonText = createSelector(getConfig, config.getBackButtonText);
export const selectPlatformDirection = createSelector(getConfig, config.getPlatFormDirection);

/*==============================================Pages selectors====================================================*/

//tutorialPage
const getTutorialPage = (state: AppState) => state.tutorialPage;
export const selectSkipState = createSelector(getTutorialPage, tutorial.getSkipState);
export const selectTutorialSlides = createSelector(getTutorialPage, tutorial.getTutorialSlides);

//loginPage
const getLoginPage = (state: AppState) => state.loginPage;
export const selectActiveIndexOfSlides = createSelector(getLoginPage, login.getActiveIndexOfSlides);
export const selectActiveIndexOfInnerSlides = createSelector(getLoginPage, login.getActiveIndexOfInnerSlides);
export const selectLoginForm = createSelector(getLoginPage, login.getLoginForm);
export const selectLoginVerificationImage = createSelector(getLoginPage, login.getLoginVerificationImage);
export const selectRandomCode = createSelector(getLoginPage, login.getRandomCode);

/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Server response selectors Start<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

//search company
const getSearchCompany = (state: AppState) => state.searchCompany;
export const selectSearchCompanyResponse = createSelector(getSearchCompany, search.getSearchCompanyResponse);
export const selectSearchQuery = createSelector(getSearchCompany, search.getQuery);
export const selectSearchLoading = createSelector(getSearchCompany, search.getLoading);
export const selectSelectedCompany = createSelector(getSearchCompany, search.getSelectedCompany);

//userInfo  from: login api
const getUserInfo = (state: AppState) => state.userInfo;
export const selectUserInfo = createSelector(getUserInfo, info => info);
export const selectRealName = createSelector(getUserInfo, login.getRealName);
export const selectCapthca = createSelector(getUserInfo, login.getCaptcha);
export const selectAuthPass = createSelector(getUserInfo, login.getAuthPass);
export const selectSid = createSelector(getUserInfo, login.getSid);
export const selectUserId = createSelector(getUserInfo, login.getUserId);
export const selectGroupList = createSelector(getUserInfo, login.getGroupList);

// group
const getGroup = (state: AppState) => state.group;
export const getGroupListResponse = createSelector(getGroup, group.getGroupList);

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
const getProject = (state: AppState) => state.project;
export const selectSelectedProject = createSelector(getProject, project.getSelectedProject);
export const selectProjects = createSelector(getProject, project.getProjects);
export const selectErrorMessage = createSelector(getProject, project.getErrorMessage);

//worker contract list
const getWorkerContracts = (state: AppState) => state.worker;
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
export const selectSelectedWorkers = createSelector(getWorkerContracts, worker.getSelectedWorkers);
export const selectWorkerContractEditResponse = createSelector(getWorkerContracts, worker.getContractEditResponse);

//work type list
const getWorkType = (state: AppState) => state.workType;
export const selectWorkTypeResponse = createSelector(getWorkType, workType.getWorkTypeResponse);
export const selectWorkTypeList = createSelector(getWorkType, workType.getWorkType);
export const selectSelectedWorkTypes = createSelector(getWorkType, workType.getSelectedTypes);

//team api: teamList addTeam deleteTeam updateTeam; 
const getTeam = (state: AppState) => state.team;
export const selectTeamResponse = createSelector(getTeam, team.getTeamListResponse);
export const selectSelectedTeams = createSelector(getTeam, team.getSelectTeams);
export const selectAddTeamResponse = createSelector(getTeam, team.getAddTeamResponse);
export const selectDeleteTeamResponse = createSelector(getTeam, team.getDeleteTeamResponse);
export const selectUpdateTeamResponse = createSelector(getTeam, team.getUpdateTeamResponse);

//attendance result list && attendance result confirm;
const getAttendance = (state: AppState) => state.attendance;
export const selectAttendanceResponse = createSelector(getAttendance, attendance.getAttendanceResultResponse);
export const selectAttendanceCount = createSelector(getAttendance, attendance.getAttendanceCount);
export const selectAttendanceDatePeriod = createSelector(getAttendance, attendance.getAttendanceDatePeriod);
export const selectAttendanceDateStart = createSelector(selectAttendanceDatePeriod, attendance.getAttendanceStartDate);
export const selectAttendanceDateEnd = createSelector(selectAttendanceDatePeriod, attendance.getAttendanceEndDate);
export const selectAttendancePage = createSelector(getAttendance, attendance.getAttendancePage);
export const selectAttendanceLimit = createSelector(getAttendance, attendance.getAttendanceLimit);
export const selectSelectedAttendanceIds = createSelector(getAttendance, attendance.getSelectedAttendanceIds);
export const selectAttendanceAllSelected = createSelector(getAttendance, attendance.getAllSelected);
export const selectAttendanceData = createSelector(getAttendance, attendance.getAttendanceData);
export const selectAttendanceResultConfirmResponse = createSelector(getAttendance, attendance.getAttendanceResultConfirmResponse);
export const selectAttendanceModifyRecordListResponse = createSelector(getAttendance, attendance.getAttendanceModifyRecordListResponse);

//attendance instant list
const getAttendanceRecord = (state: AppState) => state.attendanceRecord;
export const selectAttendanceRecordResponse = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceResponse);
export const selectAttendanceRecordCount = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordCount);
export const selectAttendanceRecordInstant = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordInstants);
export const selectAttendanceRecordPage = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordPage);
export const selectAttendanceRecordLimit = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordLimit);
export const selectAttendanceRecordMoreData = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordMoreData);
export const selectAttendanceRecordMaxDate = createSelector(getAttendanceRecord, attendanceRecord.getAttendanceRecordMaxDate);
export const selectLocationAttendanceOptions = createSelector(getAttendanceRecord, attendanceRecord.getLocationAttendanceRecordOptions);

//pay bill list
const getPayBill = (state: AppState) => state.payBill;
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
const getOvertime = (state: AppState) => state.overtime;
export const selectOvertimeRecordResponse = createSelector(getOvertime, overtime.getOvertimeRecordResponse);
export const selectOvertimeRecordCount = createSelector(getOvertime, overtime.getOvertimeRecordCount);
export const selectOvertimeRecord = createSelector(getOvertime, overtime.getOvertimeRecord);

//work piece 
const getWorkPiece = (state: AppState) => state.piece;
export const selectWorkPieceResponse = createSelector(getWorkPiece, piece.getPieceResponse);
export const selectWorkPieces = createSelector(getWorkPiece, piece.getPieces);
export const selectWorkPieceFinishFlow = createSelector(getWorkPiece, piece.getPieceFinishFlow);

//attendance result stat team stat list && request aggregation list
const getStatistics = (state: AppState) => state.statistics;
export const selectAttendanceStatisticsResponse = createSelector(getStatistics, statistics.getAttendanceStatResponse);
export const selectAttendanceStatistics = createSelector(getStatistics, statistics.getAttendanceStats);
export const selectAttendanceStatisticList = createSelector(getStatistics, statistics.getAttendanceStatisticList);
export const selectWorkFlowStatisticsResponse = createSelector(getStatistics, statistics.getWorkFlowStatResponse);

//company user list
const getEmployer = (state: AppState) => state.employer;
export const selectCompanyUserResponse = createSelector(getEmployer, employer.getCompanyUserResponse);
export const selectCompanyUsers = createSelector(getEmployer, employer.getCompanyUsers);
export const selectSelectedForemen = createSelector(getEmployer, employer.getSelectedForemen);
export const selectSelectedQualityClerks = createSelector(getEmployer, employer.getSelectedQualityClerks);

//basic info list & personal related api
const getPersonal = (state: AppState) => state.personal;
export const selectBasicInfoListResponse = createSelector(getPersonal, personal.getBasicInfoListResponse);
export const selectHomeInformation = createSelector(getPersonal, personal.getHomeInformation);
export const selectBasicInformation = createSelector(getPersonal, personal.getBasicInformation);
export const selectWorkExperience = createSelector(getPersonal, personal.getWorkExperience);
export const selectPlatformWorkExperience = createSelector(getPersonal, personal.getPlatformExperience);
export const selectPersonalIdInformation = createSelector(getPersonal, personal.getPersonalIdInformation);
export const selectWorkCertification = createSelector(getPersonal, personal.getWorkCertification);
export const selectPersonalIdResponse = createSelector(getPersonal, personal.getPersonalIdListResponse);
export const selectWorkerDetailResponse = createSelector(getPersonal, personal.getWorkerDetailListResponse);
export const selectWorkerDetailUpdateResponse = createSelector(getPersonal, personal.getWorkerDetailUpdateResponse);
export const selectWorkerDetailUpdateOptions = createSelector(getPersonal, personal.getWorkerDetailUpdateOptions);
export const selectHomeInfoListResponse = createSelector(getPersonal, personal.getHomeInfoResponse);
export const selectHomeInfoUpdateResponse = createSelector(getPersonal, personal.getHomeInfoUpdateResponse);
export const selectHomeInfoUpdateOptions = createSelector(getPersonal, personal.getHomeInfoUpdateOptions);
export const selectEducationListResponse = createSelector(getPersonal, personal.getEducationListResponse);
export const selectWorkExperienceListResponse = createSelector(getPersonal, personal.getWorkExperienceResponse);
export const selectPlatformWorkExperienceResponse = createSelector(getPersonal, personal.getPlatformWorkExperienceResponse);

//attendance machine list 
const getMachines = (state: AppState) => state.machine;
export const selectMachineListResponse = createSelector(getMachines, machine.getMachineListResponse);
export const selectMachines = createSelector(getMachines, machine.getAttendanceMachines);
export const selectMachineCount = createSelector(getMachines, machine.getAttendanceCount);

//attendance card list
const getAttendanceCard = (state: AppState) => state.attendanceCard;
export const selectAttendanceCardResponse = createSelector(getAttendanceCard, attendanceCard.getAttendanceCardListResponse);
export const selectAttendanceCards = createSelector(getAttendanceCard, attendanceCard.getAttendanceCards);
export const selectAttendanceCardPage = createSelector(getAttendanceCard, attendanceCard.getAttendanceCardPage);
export const selectAttendanceCardLimit = createSelector(getAttendanceCard, attendanceCard.getAttendanceCardLimit);
export const selectAttendanceCardAddOptions = createSelector(getAttendanceCard, attendanceCard.getAttendanceCardAddOptions);
export const selectAttendanceCardUpdateOptions = createSelector(getAttendanceCard, attendanceCard.getAttendanceCardUpdateOptions);
export const selectAttendanceCardAddResponse = createSelector(getAttendanceCard, attendanceCard.getAttendanceCardAddResponse);
export const selectAttendanceCardUpdateResponse = createSelector(getAttendanceCard, attendanceCard.getAttendanceCardUpdateResponse);
export const selectAttendanceCardDeleteResponse = createSelector(getAttendanceCard, attendanceCard.getAttendanceCardDeleteResponse);
export const selectAttendanceCardOrderOptions = createSelector(getAttendanceCard, attendanceCard.getOrderOptions);
export const selectAttendanceCardBindingOptions = createSelector(getAttendanceCard, attendanceCard.getBindingStateOptions);

//location card
const getLocationCard = (state: AppState) => state.locationCard;
export const selectLocationCardListResponse = createSelector(getLocationCard, locationCard.getCardAddResponse);
export const selectLocationCardAddResponse = createSelector(getLocationCard, locationCard.getCardAddResponse);
export const selectLocationCardUpdateResponse = createSelector(getLocationCard, locationCard.getCardUpdateResponse);
export const selectLocationCardDeleteResponse = createSelector(getLocationCard, locationCard.getCardDeleteResponse);
export const selectLocationCards = createSelector(getLocationCard, locationCard.getCards);
export const selectLocationCardCount = createSelector(getLocationCard, locationCard.getCardCount);
export const selectLocationCardAddOptions = createSelector(getLocationCard, locationCard.getAddOptions);
export const selectLocationCardUpdateOptions = createSelector(getLocationCard, locationCard.getUpdateOptions);
export const selectLocationCardDeleteOptions = createSelector(getLocationCard, locationCard.getDeleteOptions);
export const selectLocationCardOrderOptions = createSelector(getLocationCard, locationCard.getOrderOptions);
export const selectLocationCardDeviceOptions = createSelector(getLocationCard, locationCard.getDeviceStateOptions);
export const selectLocationCardBindingOptions = createSelector(getLocationCard, locationCard.getBindingStateOptions);
export const selectLocationCardTeamStateOptions = createSelector(getLocationCard, locationCard.getTeamStateOptions);

//history location list && project area list
const getLocation = (state: AppState) => state.location;
export const selectHistoryLocationResponse = createSelector(getLocation, location.getHistoryLocationResponse);
export const selectProjectAreaResponse = createSelector(getLocation, location.getProjectAreaResponse);
export const selectHistoryLocationOptions = createSelector(getLocation, location.getHistoryLocationOptions);
export const selectMaxEndTimeOptions = createSelector(getLocation, location.getMaxEndTime);
export const selectTrajectoryOptions = createSelector(getLocation, location.getTrajectoryOptions);
export const selectTrajectoryMaxEndTimeOption = createSelector(getLocation, location.getTrajectoryMaxEndTime);
export const selectTrajectoryPlayWorkers = createSelector(getLocation, location.getPlayWorkers);
export const selectTrajectories = createSelector(getLocation, location.getTrajectories);
export const selectTrajectoryPlayState = createSelector(getLocation, location.getPlayState);
export const selectTrajectoryRateState = createSelector(getLocation, location.getRateState);
export const selectTrajectoryIndexes = createSelector(getLocation, location.getSelectedIndexes);

//bank card related 
const getBankCard = (state: AppState) => state.bankCard;
export const selectBankcardList = createSelector(getBankCard, bankCard.getBankcardListResponse);
export const selectBankInfo = createSelector(getBankCard, bankCard.getBankInfoResponse);
export const selectBankcardAddResponse = createSelector(getBankCard, bankCard.getBankcardAddResponse);
export const selectBankcardDeleteResponse = createSelector(getBankCard, bankCard.getBankcardDeleteResponse);
export const selectSetMasterCardResponse = createSelector(getBankCard, bankCard.getSetMasterResponse);

//logout
const getLogout = (state: AppState) => state.logout;
export const selectLogoutResponse = createSelector(getLogout, logout.getLogoutResponse);

//qr login
const getQRLogin = (state: AppState) => state.QRLogin;
export const selectQRCode = createSelector(getQRLogin, QRLogin.getQRCode);
export const selectQRLoginResponse = createSelector(getQRLogin, QRLogin.getQRLoginResponse);

//work certificate 
const getWorkCertificate = (state: AppState) => state.workCertificate;
export const selectCertificateListResponse = createSelector(getWorkCertificate, workCertificate.getListResponse);
export const selectCertificateAddResponse = createSelector(getWorkCertificate, workCertificate.getAddResponse);
export const selectCertificateDeleteResponse = createSelector(getWorkCertificate, workCertificate.getDeleteResponse);
export const selectCertificateUpdateResponse = createSelector(getWorkCertificate, workCertificate.getUpdateResponse);
export const selectCertificateUploadResponse = createSelector(getWorkCertificate, workCertificate.getUploadResponse);
export const selectCertificateAddOptions = createSelector(getWorkCertificate, workCertificate.getAddOptions);
export const selectCertificateDeleteOptions = createSelector(getWorkCertificate, workCertificate.getDeleteOptions);
export const selectCertificateUpdateOptions = createSelector(getWorkCertificate, workCertificate.getUpdateOptions);

//message
const getMessage = (state: AppState) => state.message;
export const selectMessageListResponse = createSelector(getMessage, message.getMessages);
export const selectMessageContentResponse = createSelector(getMessage, message.getMessageContent);
export const selectMessageDeleteResponse = createSelector(getMessage, message.getMessageDelete);
export const selectUnreadMessageCountResponse = createSelector(getMessage, message.getUnreadMessageCount);
export const selectMessageLimit = createSelector(getMessage, message.getMessageLimit);
export const selectUnreadMessagePage = createSelector(getMessage, message.getUnreadMessagePage);
export const selectReadMessagePage = createSelector(getMessage, message.getReadMessagePage);
export const selectReadMessages = createSelector(getMessage, message.getReadMessages);
export const selectUnreadMessages = createSelector(getMessage, message.getUnreadMessages);
export const selectReadCount = createSelector(getMessage, message.getReadCount);
export const selectUnreadMessageTimeOrder = createSelector(getMessage, message.getUnreadTimeOrder);
export const selectReadMessageTimeOrder = createSelector(getMessage, message.getReadTimeOrder);
export const selectUnreadMessageSelectedType = createSelector(getMessage, message.getUnreadSelectedType);
export const selectReadMessageSelectedType = createSelector(getMessage, message.getReadSelectedType);

//nationality
const getNationality = (state: AppState) => state.nationality;
export const selectNationalityResponse = createSelector(getNationality, nationality.getNationalityResponse);

//work flow
const getWorkFlow = (state: AppState) => state.workFlow;
export const selectWorkFlowListResponse = createSelector(getWorkFlow, workFlow.getWorkFlowListResponse);
export const selectProjectPayBillFlowListResponse = createSelector(getWorkFlow, workFlow.getProjectPayBillFlowListResponse);
export const selectMultiTaskUpdateResponse = createSelector(getWorkFlow, workFlow.getMultiTaskUpdateResponse);
export const selectTaskUpdateResponse = createSelector(getWorkFlow, workFlow.getTaskUpdateResponse);
export const selectWorkFlowLimit = createSelector(getWorkFlow, workFlow.getLimit);
export const selectPayrollPage = createSelector(getWorkFlow, workFlow.getPayrollPage);
export const selectLeavePage = createSelector(getWorkFlow, workFlow.getLeavePage);
export const selectOvertimePage = createSelector(getWorkFlow, workFlow.getOvertimePage);
export const selectPieceAuditPage = createSelector(getWorkFlow, workFlow.getPieceAuditPage);
export const selectAttendanceModifyPage = createSelector(getWorkFlow, workFlow.getAttendanceModifyPage);
export const selectIStartedPage = createSelector(getWorkFlow, workFlow.getIStartedPage);
export const selectICompletedPage = createSelector(getWorkFlow, workFlow.getICompletedPage);
export const selectMultiTaskUpdateOptions = createSelector(getWorkFlow, workFlow.getMultiTaskUpdateOptions);
export const selectTaskUpdateOptions = createSelector(getWorkFlow, workFlow.getTaskUpdateOptions);
export const selectScreeningCondition = createSelector(getWorkFlow, workFlow.getScreeningCondition);

//leave record list
const getLeave = (state: AppState) => state.leave;
export const selectLeaveRecordListResponse = createSelector(getLeave, leave.getLeaveResponse);

//multi process create
const getLaunch = (state: AppState) => state.launch;
export const selectMultiProcessResponse = createSelector(getLaunch, launch.getMultiProcessResponse);
export const selectWorkerContractOptions = createSelector(getLaunch, launch.getWorkerContractOptions);
export const selectProcessResponse = createSelector(getLaunch, launch.getProcessCreateResponse);

// search worker
const getSearchWorker = (state: AppState) => state.searchWorker;
export const selectSearchWorkerResponse = createSelector(getSearchWorker, searchWorker.getSearchWorkerResponse);
export const selectSelectedWorkersFromSearch = createSelector(getSearchWorker, searchWorker.getSelectedWorkers);
export const selectSearchWorkerContent = createSelector(getSearchWorker, searchWorker.getQuery);
export const selectSearchWorkerCondition = createSelector(getSearchWorker, searchWorker.getQueryCondition);

// delete images
const getDeleteImages = (state: AppState) => state.deleteImages;
export const selectDeleteImagesResponse = createSelector(getDeleteImages, deleteImages.getDeleteImagesResponse);

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Server response selector end>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

/*================================================HTTP===========================================================*/

//upload
const getUploadState = (state: AppState) => state.uploadState;
export const selectUploadingState = createSelector(getUploadState, upload.getUploadingState);
export const selectUploadedState = createSelector(getUploadState, upload.getUploadedState);
export const selectUploadResult = createSelector(getUploadState, upload.getUploadResult);

/*================================================Icons with permission===========================================*/

export const getIconsState = (state: AppState) => state.icons;
export const selectIcon = (path: string | string[]) => createSelector(getIconsState, icons.getSpecificIcon(path));
