import { BasicInfoListOptions } from './../../interfaces/request-interface';
//region
import { RequestAggregationOptions, AttendanceResultTeamStatListOptions, WorkOvertimeRecordListOptions, WorkPieceListOptions, PayBillListOptions, AttendanceInstantListOptions, AttendanceResultListOptions, TeamListOptions, WsRequest, LoginOptions, SearchCompanyOptions, PhoneVerificationCodeOptions, RegisterOptions, ResetPasswordOptions, CertificateOptions, ProjectListOptions, WorkerContractOptions, PayProcessListOptions, ProjectPayBillListOptions, ProjectPayProcessListOptions, TeamAddOptions, TeamUpdateOptions, TeamDeleteOptions, CompanyUserListOptions } from './../../interfaces/request-interface';
import { Injectable } from '@angular/core';
import { Permission } from '../../interfaces/permission-interface';
import { CW, EME, LM, MM, PM, PME, QW, SW, TL } from '../config/character';
//endregion

/* =======================================================Interface definition===================================================================== */

/**
 * @description These operations define the action that an interface can perform.
 * */
export enum Operate {
  querying = 'query',
  addition = 'add',
  updates = 'update',
  deletion = 'delete',
  search = 'search'
}

export interface checkFn {
  (arg: number[]): boolean
}

export interface MagicNumberMap {
  [key: string]: number | checkFn;
}

export class Iterator {
  value: MagicNumberMap;

  constructor(value: MagicNumberMap) {
    this.value = value;
  }

  next() {
    return { value: this.value, done: true }
  }
}

export interface ApiUnit {
  operates: Map<string, string[]>;
  permission?: Permission;
  noMagicNumber?: Map<string, Iterator>;
  specialCharacter?: Map<string, Iterator>;
}

/* =======================================================API unit definition===================================================================== */

const login: ApiUnit = {
  operates: new Map([[Operate.querying, ['employee.consumer.Login']]])
};

const company: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['employer.consumer.CompanyList']],
    [Operate.updates, ['employer.consumer.CompanyUpdate']],
    [Operate.addition, ['employer.consumer.CompanyAdd']],
    [Operate.deletion, ['employer.consumer.CompanyDelete']],
    [Operate.search, ['employer.consumer.SearchCompany']]
  ])
};

const phoneVerificationCode: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['employee.consumer.RegPhoneVerifyCode']]
  ])
};

const resetPhoneVerificationCode: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['employee.consumer.ResetPWPhoneVerifyCode']]
  ])
};

const register: ApiUnit = {
  operates: new Map([
    [Operate.addition, ['employee.consumer.EmployeeRegister', 'employee.consumer.WorkerRegister']],
  ])
};

const resetPassword: ApiUnit = {
  operates: new Map([
    [Operate.updates, ['employee.consumer.ResetPassword']]
  ])
};

const updatePersonalIdImage: ApiUnit = {
  operates: new Map([
    [Operate.updates, ['employee.consumer.PersonalIdUpdate']]
  ])
};

const uploadPersonalIdImage: ApiUnit = {
  operates: new Map([
    [Operate.updates, ['personalIdUpdate']]
  ])
};

/* =======================================================Project===================================================================== */

const projectList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['employer.consumer.ProjectList']]
  ]),
  permission: {
    view: [PME, EME, MM, PM, LM, TL, CW, QW, SW],
    opt: []
  }
};

/* =======================================================Work contract===================================================================== */

export enum WorkerContract {
  unexpired = 'unexpired',
  timeTypeContract = 'timeTypeContract',
  pieceTypeContract = 'pieceTypeContract'
}

export const workerContractList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.WorkerContractList']]
  ]),
  noMagicNumber: new Map([
    [WorkerContract.unexpired, new Iterator({ flag: 1 })],
    [WorkerContract.timeTypeContract, new Iterator({ contract_type: 1 })],
    [WorkerContract.pieceTypeContract, new Iterator({ contract_type: 2 })]
  ]),
  permission: {
    view: [PME, EME, MM, PM, LM, TL, CW, QW, SW],
    opt: []
  },
  specialCharacter: new Map([
    [SW, new Iterator({ self: 1 })]
  ])
};

/* =======================================================Work Type===================================================================== */

export const workTypeList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['employee.consumer.WorkTypeList']]
  ])
};

/* ==============================================================Team========================================================================== */

export const teamList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.TeamList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL, QW],
    opt: []
  },
  specialCharacter: new Map([
    [SW, new Iterator({ self: 1 })],
    [TL, new Iterator({ flag: 1 })],
    [LM, new Iterator({ flag: 1 })],
    [PM, new Iterator({ flag: 1 })],
    [MM, new Iterator({ flag: 1 })]
  ])
};

export const teamAdd: ApiUnit = {
  operates: new Map([
    [Operate.addition, ['project.consumer.TeamAdd']]
  ]),
  permission: {
    view: [],
    opt: [PME, PM]
  }
}

export const teamDelete: ApiUnit = {
  operates: new Map([
    [Operate.deletion, ['project.consumer.TeamDelete']]
  ]),
  permission: {
    view: [],
    opt: [PM]
  }
}

export const teamUpdate: ApiUnit = {
  operates: new Map([
    [Operate.updates, ['project.consumer.TeamUpdate']]
  ]),
  permission: {
    view: [],
    opt: [PM]
  }
}

/* =======================================================Attendance===================================================================== */

export enum attendance {
  attendanceOnlyDisplay = 'onlyDisplay',
  unconfirmed = 'unconfirmed',
  confirmed = 'confirmed',
  applyToModify = 'applyToModify',
  allTypes = 'allTypes'
}

export const attendanceList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.AttendResultList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL,],
    opt: []
  },
  noMagicNumber: new Map([
    [attendance.attendanceOnlyDisplay, new Iterator({ flag: 1 })],
    [attendance.unconfirmed, new Iterator({ confirm: 0 })],
    [attendance.confirmed, new Iterator({ confirm: 1 })],
    [attendance.applyToModify, new Iterator({ confirm: 2 })],
    [attendance.allTypes, new Iterator({ confirm: 3 })]
  ]),
  specialCharacter: new Map([
    [SW, new Iterator({ self: 1 })]
  ])
};

export enum attendanceInstant {
  attendanceInstantOnlyDisplay = 'onlyDisplay' //鬼知道文档上的这个字段是干啥的
}

export const attendanceInstantList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.AttendanceInstantList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL, SW],
    opt: []
  },
  noMagicNumber: new Map([
    [attendanceInstant.attendanceInstantOnlyDisplay, new Iterator({ flag: 1 })]
  ]),
  specialCharacter: new Map([
    [SW, new Iterator({ self: 1 })]
  ])
}

export function onlyOwnTeam(ary: number[]): boolean {
  //TODO: 根据传进来的id:number确定这些班组是不是当前用户的班组。
  return true;
}

/* =======================================================Pay Bill===================================================================== */

export const payBillList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.PayBillList']]
  ]),
  permission: {
    view: [PME, EME, PM, LM, TL, SW],
    opt: []
  },
  specialCharacter: new Map([
    [TL, new Iterator({ check: onlyOwnTeam })],
    [SW, new Iterator({ self: 1 })]
  ])
}

export const payProcessList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.PayProcessList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL, SW],
    opt: []
  },
  specialCharacter: new Map([
    [SW, new Iterator({ self: 1 })]
  ])
}

export const projectPayBillList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.ProjectPayBillList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL],
    opt: []
  }
}

export const projectPayProcessList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.ProjectPayProcessList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL],
    opt: []
  }
}
/* =======================================================Work piece===================================================================== */

export const workPieceList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.WorkPieceList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL, QW],
    opt: []
  }
}

/* =======================================================Overtime===================================================================== */

export const workOvertimeRecordList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.WorkOvertimeRecordList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL],
    opt: []
  }
}

/* =======================================================Statistics===================================================================== */

export const attendanceResultTeamStatList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['operation.consumer.AttendResultTeamStatList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL],
    opt: []
  }
}

export const workFlowStatistics: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['workflow.consumer.RequestAggregation']]
  ]),
  permission: {
    view: [PM, LM, TL, SW],
    opt: []
  }
}

/* =========================================================CompanyUser================================================================ */

export const companyUserList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['employer.consumer.CompanyUserList']]
  ]),
  permission: {
    view: [PME, EME, MM, PM],
    opt: []
  }
}

/* ==========================================================Common api================================================================ */

export const basicInfoList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['employee.consumer.BasicInfoList']]
  ]),
  permission: {
    view: [PME, EME, MM, PM, LM, TL, SW, QW, CW],
    opt: []
  }
}

@Injectable()
export class Command {

  amendAttendRecordList = "project.consumer.AmendAttendRecordList";
  attendResultConfirm = "project.consumer.AttendResultConfirm";
  attendanceCardAdd = "employer.consumer.AttendanceCardAdd";
  attendanceCardDelete = "employer.consumer.AttendanceCardDelete";
  attendanceCardList = "employer.consumer.AttendanceCardList";
  attendanceCardUpdate = "employer.consumer.AttendanceCardUpdate";
  attendanceMachineList = "project.consumer.AttendanceMachineList";
  bankInfo = "employee.consumer.BankInfo";
  contractTimeChangeFlowList = "project.consumer.ContractTimeChangeFlowList";
  deleteFiles = "operation.consumer.DeleteFiles";
  educationAdd = "employee.consumer.EducationAdd";
  educationDelete = "employee.consumer.EducationDelete";
  educationList = "employee.consumer.EducationList";
  educationUpdate = "employee.consumer.EducationUpdate";
  groupsList = "employee.consumer.GroupsList";
  homeInfoList = "employee.consumer.HomeInfoList";
  homeInfoUpdate = "employee.consumer.HomeInfoUpdate";
  leaveRecordList = "project.consumer.LeaveRecordList";
  listHisLoc = "project.consumer.ListHisLoc";
  locationCardAdd = "employer.consumer.LocationCardAdd";
  locationCardDelete = "employer.consumer.LocationCardDelete";
  locationCardList = "employer.consumer.LocationCardList";
  locationCardUpdate = "employer.consumer.LocationCardUpdate";
  logout = "employee.consumer.Logout";
  msgTitleDelete = "operation.consumer.MsgTitleDelete";
  msgTitleList = "operation.consumer.MsgTitleList";
  multiProcessCreate = "workflow.consumer.MultiProcessCreate";
  multiTaskUpdate = "workflow.consumer.MultiTaskUpdate";
  myCompanyContractList = "employer.consumer.MyCompanyContractList";
  nationalityList = "employee.consumer.NationalityList";
  paySalary = "project.consumer.PaySalary";
  personalIdList = "employee.consumer.PersonalIdList";
  primeContractList = "employer.consumer.PrimeContractList";
  processCreate = "workflow.consumer.ProcessCreate";
  projectAreaAddUpdate = "project.consumer.ProjectAreaAddUpdate";
  projectAreaDelete = "project.consumer.ProjectAreaDelete";
  projectAreaList = "project.consumer.ProjectAreaList";
  projectPayBillFlowList = "project.consumer.ProjectPayBillFlowList";
  qrLoginForApp = "employee.consumer.QRLoginForApp";
  readMsgContent = "operation.consumer.ReadMsgContent";
  requestList = "workflow.consumer.RequestList";
  searchWorker = "employer.consumer.SearchWorker";
  setBankNoMaster = "employee.consumer.SetBankNoMaster";
  subContractList = "employer.consumer.SubContractList";
  taskUpdate = "workflow.consumer.TaskUpdate";
  unreadMsgCount = "operation.consumer.UnreadMsgCount";
  workCertificateCreate = "employee.consumer.WorkCertificateCreate";
  workCertificateDelete = "employee.consumer.WorkCertificateDelete";
  workCertificateList = "employee.consumer.WorkCertificateList";
  workCertificateUpdate = "employee.consumer.WorkCertificateUpdate";
  workExperienceAdd = "employee.consumer.WorkExperienceAdd";
  workExperienceDelete = "employee.consumer.WorkExperienceDelete";
  workExperienceList = "employee.consumer.WorkExperienceList";
  workExperienceUpdate = "employee.consumer.WorkExperienceUpdate";
  workPlatformExperienceList = "employee.consumer.WorkPlatformExperienceList";
  workTimePayList = "project.consumer.WorkTimePayList";
  workerBankNoAdd = "employee.consumer.WorkerBankNoAdd";
  workerBankNoDelete = "employee.consumer.WorkerBankNoDelete";
  workerBankNoList = "employee.consumer.WorkerBankNoList";
  workerDetailList = "employee.consumer.WorkerDetailList";
  workerDetailUpdate = "employee.consumer.WorkerDetailUpdate";
  workerTimeDutyApplyList = "project.consumer.WorkerTimeDutyApplyList";
  constructor() {
  }

  private getFullParameter(path: string, parameters: object): WsRequest {
    return { command: { path }, parameters }
  }

  /**
   * @description APIs before entry into the app: login, searchCompany, phoneVerificationCode, resetPhoneVerificationCode, register, resetPassword, updatePersonalIdImage.
   */
  login(option: LoginOptions): WsRequest {
    const path = login.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  searchCompany(option: SearchCompanyOptions): WsRequest {
    const path = company.operates.get(Operate.search)[0];

    return this.getFullParameter(path, option);
  }

  /**
   * FIXME: NO.1
   * @description 后台把注册和重置密码的手机验证码分成了2个接口，其逻辑和参数完全相同。所以这里分成2个函数处理，phoneVerificationCode
   * 处理注册时的手机验证码，resetPhoneVerificationCode处理重置密码时的手机验证码。
   * */
  phoneVerificationCode(option: PhoneVerificationCodeOptions): WsRequest {
    const path = phoneVerificationCode.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  resetPhoneVerificationCode(option: PhoneVerificationCodeOptions): WsRequest {
    const path = resetPhoneVerificationCode.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  register(option: RegisterOptions): WsRequest {
    const index = option.company_id ? 0 : 1;

    const path = register.operates.get(Operate.addition)[index];

    return this.getFullParameter(path, option);
  }

  resetPassword(option: ResetPasswordOptions): WsRequest {
    const path = resetPassword.operates.get(Operate.updates)[0];

    return this.getFullParameter(path, option);
  }

  updatePersonalIdImage(option: CertificateOptions): WsRequest {
    const path = updatePersonalIdImage.operates.get(Operate.updates)[0];

    return this.getFullParameter(path, option);
  }

  /**
   * @description Project API: getProjectList;
   */
  getProjectList(option: ProjectListOptions): WsRequest {
    const path = projectList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  /**
   * @description Contract related API: getWorkerContractList;
   */
  getWorkerContractList(option: WorkerContractOptions, ...magicNumberNames: string[]): WsRequest {
    const path = workerContractList.operates.get(Operate.querying)[0];

    const magicOption = magicNumberNames.reduce((acc, cur) => {
      const param = workerContractList.noMagicNumber.get(cur);
      return { ...acc, ...param };
    }, {});

    return this.getFullParameter(path, { ...option, ...magicOption });
  }

  /**
   * @description WorkType API: getWorkTypeList;
   */
  getWorkTypeList(): WsRequest {
    const path = workTypeList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, {});
  }

  /**
   * @description team API: getTeamList, getTeamAdd, getTeamUpdate, getTeamDelete;
   */
  getTeamList(option: TeamListOptions): WsRequest {
    const path = teamList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getTeamAdd(option: TeamAddOptions): WsRequest {
    const path = teamAdd.operates.get(Operate.addition)[0];

    return this.getFullParameter(path, option);
  }

  getTeamUpdate(option: TeamUpdateOptions): WsRequest {
    const path = teamUpdate.operates.get(Operate.updates)[0];

    return this.getFullParameter(path, option);
  }

  getTeamDelete(option: TeamDeleteOptions): WsRequest {
    const path = teamDelete.operates.get(Operate.deletion)[0];

    return this.getFullParameter(path, option);
  }

  /**
   * @description Attendance API: getAttendanceList, getAttendanceInstantList;
   */
  getAttendanceList(option: AttendanceResultListOptions): WsRequest {
    const path = attendanceList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getAttendanceInstantList(option: AttendanceInstantListOptions): WsRequest {
    const path = attendanceInstantList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  /**
   * @description Salary related API: getPayBillList, getPayProcessList, getProjectPayBillList, getProjectPayProcessList;
   */
  getPayBillList(option: PayBillListOptions): WsRequest {
    const path = payBillList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getPayProcessList(option: PayProcessListOptions): WsRequest {
    const path = payProcessList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getProjectPayBillList(option: ProjectPayBillListOptions) {
    const path = projectPayBillList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getProjectPayProcessList(option: ProjectPayProcessListOptions) {
    const path = projectPayProcessList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  /**
   * @description Work piece API: getWorkerPieceList;
   */
  getWorkPieceList(option: WorkPieceListOptions): WsRequest {
    const path = workPieceList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  /**
   * @description Overtime API: getWorkOvertimeRecordList;
   */
  getWorkOvertimeRecordList(option: WorkOvertimeRecordListOptions): WsRequest {
    const path = workOvertimeRecordList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  /**
   * @description Statistics related API: getAttendanceResultTeamStatList, getWorkFlowStatistics;
   */
  getAttendanceResultTeamStatList(option: AttendanceResultTeamStatListOptions): WsRequest {
    const path = attendanceResultTeamStatList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getWorkFlowStatistics(option: RequestAggregationOptions): WsRequest {
    const path = workFlowStatistics.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }
  
  /**
   * @description Company user API: getCompanyUser;
   */
  getCompanyUserList(option: CompanyUserListOptions): WsRequest {
    const path = companyUserList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  /**
   * @description Common API: getBasicInfo;
   */
  getBasicInfoList(option: BasicInfoListOptions): WsRequest {
    const path = basicInfoList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  /**
   * @description API unit interfaces for external module referring.
   */
  get uploadPersonalIdImage(): string {
    return uploadPersonalIdImage.operates.get(Operate.updates)[0];
  }

  get projectList() {
    return projectList;
  }

  get workerContractList() {
    return workerContractList;
  }

  get teamList() {
    return teamList;
  }

  get attendanceList() {
    return attendanceList;
  }

  get attendanceInstantList() {
    return attendanceInstantList;
  }

  get payBillList() {
    return payBillList;
  }

  get workPieceList() {
    return workPieceList;
  }

  get workOvertimeRecordList() {
    return workOvertimeRecordList;
  }

  get attendanceResultTeamStatList() {
    return attendanceResultTeamStatList;
  }

  get workFlowStatistics() {
    return workFlowStatistics;
  }

  get payProcessList() {
    return payProcessList;
  }

  get projectPayBillList() {
    return projectPayBillList;
  }

  get projectPayProcessList() {
    return projectPayProcessList;
  }

  get teamAdd() {
    return teamAdd;
  }

  get teamUpdate() {
    return teamUpdate;
  }

  get teamDelete() {
    return teamDelete;
  }

  get companyUserList() {
    return companyUserList;
  }

  get basicInfoList() {
    return basicInfoList;
  }
}
