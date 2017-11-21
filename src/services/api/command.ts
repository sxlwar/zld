//region
import { Injectable } from '@angular/core';
import {
  CertificateOptions,
  LoginOptions,
  PhoneVerificationCodeOptions,
  ProjectListOptions,
  RegisterOptions,
  ResetPasswordOptions,
  SearchCompanyOptions,
  WorkerContractOptions,
  WsRequest,
} from '../../interfaces/request-interface';
import { Permission } from '../../interfaces/permission-interface';
import { CW, EME, LM, MM, PM, PME, QW, SW, TL } from '../config/character';
//endregion

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


const projectList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['employer.consumer.ProjectList']]
  ]),
  permission: {
    view: [PME, EME, MM, PM, LM, TL, CW, QW, SW],
    opt: []
  }
};

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

export const workTypeList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['employee.consumer.WorkTypeList']]
  ])
};

export const teamList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.TeamList']]
  ]),
  specialCharacter: new Map([
    [SW, new Iterator({ self: 1 })],
    [TL, new Iterator({ flag: 1 })],
    [LM, new Iterator({ flag: 1 })],
    [PM, new Iterator({ flag: 1 })],
    [MM, new Iterator({ flag: 1 })]
  ])
};

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
  attendanceInstantOnlyDisplay = 'onlyDisplay'
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

export const workPieceList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.WorkPieceList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL, QW],
    opt: []
  }
}

export const workOvertimeRecordList: ApiUnit = {
  operates: new Map([
    [Operate.querying, ['project.consumer.WorkOvertimeRecordList']]
  ]),
  permission: {
    view: [PME, MM, PM, LM, TL],
    opt: []
  }
}

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

@Injectable()
export class Command {

  personalIdList = "employee.consumer.PersonalIdList";
  processCreate = "workflow.consumer.ProcessCreate";
  multiProcessCreate = "workflow.consumer.MultiProcessCreate";

  workerDetailList = "employee.consumer.WorkerDetailList";
  workerDetailUpdate = "employee.consumer.WorkerDetailUpdate";
  requestList = "workflow.consumer.RequestList";
  projectPayBillList = "project.consumer.ProjectPayBillList";
  workTimePayList = "project.consumer.WorkTimePayList";
  projectPayProcessList = "project.consumer.ProjectPayProcessList";
  workerBankNoList = "employee.consumer.WorkerBankNoList";
  workerBankNoAdd = "employee.consumer.WorkerBankNoAdd";
  workerBankNoDelete = "employee.consumer.WorkerBankNoDelete";
  amendAttendRecordList = "project.consumer.AmendAttendRecordList";
  leaveRecordList = "project.consumer.LeaveRecordList";
  attendResultConfirm = "project.consumer.AttendResultConfirm";
  paySalary = "project.consumer.PaySalary";
  taskUpdate = "workflow.consumer.TaskUpdate";
  multiTaskUpdate = "workflow.consumer.MultiTaskUpdate";
  payProcessList = "project.consumer.PayProcessList";
  workCertificateList = "employee.consumer.WorkCertificateList";
  nationalityList = "employee.consumer.NationalityList";
  groupsList = "employee.consumer.GroupsList";
  workCertificateDelete = "employee.consumer.WorkCertificateDelete";
  workCertificateCreate = "employee.consumer.WorkCertificateCreate";
  workCertificateUpdate = "employee.consumer.WorkCertificateUpdate";
  homeInfoList = "employee.consumer.HomeInfoList";
  homeInfoUpdate = "employee.consumer.HomeInfoUpdate";
  educationList = "employee.consumer.EducationList";
  educationDelete = "employee.consumer.EducationDelete";
  educationUpdate = "employee.consumer.EducationUpdate";
  educationAdd = "employee.consumer.EducationAdd";
  workExperienceList = "employee.consumer.WorkExperienceList";
  workExperienceDelete = "employee.consumer.WorkExperienceDelete";
  workExperienceUpdate = "employee.consumer.WorkExperienceUpdate";
  workExperienceAdd = "employee.consumer.WorkExperienceAdd";
  myCompanyContractList = "employer.consumer.MyCompanyContractList";
  subContractList = "employer.consumer.SubContractList";
  attendanceMachineList = "project.consumer.AttendanceMachineList";
  logout = "employee.consumer.Logout";
  searchWorker = "employer.consumer.SearchWorker";
  companyUserList = "employer.consumer.CompanyUserList";
  primeContractList = "employer.consumer.PrimeContractList";
  listHisLoc = "project.consumer.ListHisLoc";
  projectAreaAddUpdate = "project.consumer.ProjectAreaAddUpdate";
  projectAreaList = "project.consumer.ProjectAreaList";
  projectAreaDelete = "project.consumer.ProjectAreaDelete";
  teamAdd = "project.consumer.TeamAdd";
  teamUpdate = "project.consumer.TeamUpdate";
  teamDelete = "project.consumer.TeamDelete";
  locationCardList = "employer.consumer.LocationCardList";
  locationCardAdd = "employer.consumer.LocationCardAdd";
  locationCardDelete = "employer.consumer.LocationCardDelete";
  locationCardUpdate = "employer.consumer.LocationCardUpdate";
  attendanceCardList = "employer.consumer.AttendanceCardList";
  attendanceCardAdd = "employer.consumer.AttendanceCardAdd";
  attendanceCardDelete = "employer.consumer.AttendanceCardDelete";
  attendanceCardUpdate = "employer.consumer.AttendanceCardUpdate";
  projectPayBillFlowList = "project.consumer.ProjectPayBillFlowList";
  workPlatformExperienceList = "employee.consumer.WorkPlatformExperienceList";
  deleteFiles = "operation.consumer.DeleteFiles";
  qrLoginForApp = "employee.consumer.QRLoginForApp";
  bankInfo = "employee.consumer.BankInfo";
  setBankNoMaster = "employee.consumer.SetBankNoMaster";
  workerTimeDutyApplyList = "project.consumer.WorkerTimeDutyApplyList";
  contractTimeChangeFlowList = "project.consumer.ContractTimeChangeFlowList";
  msgTitleList = "operation.consumer.MsgTitleList";
  unreadMsgCount = "operation.consumer.UnreadMsgCount";
  msgTitleDelete = "operation.consumer.MsgTitleDelete";
  readMsgContent = "operation.consumer.ReadMsgContent";
  basicInfoList = "employee.consumer.BasicInfoList";
  constructor() {
  }

  private getFullParameter(path: string, parameters: object): WsRequest {
    return { command: { path }, parameters }
  }

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

  getProjectList(option: ProjectListOptions): WsRequest {
    const path = projectList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getWorkerContractList(option: WorkerContractOptions, ...magicNumberNames: string[]): WsRequest {
    const path = workerContractList.operates.get(Operate.querying)[0];

    const magicOption = magicNumberNames.reduce((acc, cur) => {
      const param = workerContractList.noMagicNumber.get(cur);
      return { ...acc, ...param };
    }, {});

    return this.getFullParameter(path, { ...option, ...magicOption });
  }

  getWorkTypeList(): WsRequest {
    const path = workTypeList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, {});
  }

  getTeamList(option): WsRequest {
    const path = teamList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getAttendanceList(option): WsRequest {
    const path = attendanceList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getAttendanceInstantList(option): WsRequest {
    const path = attendanceInstantList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getPayBillList(option): WsRequest {
    const path = payBillList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getWorkPieceList(option): WsRequest {
    const path = workPieceList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getWorkOvertimeRecordList(option): WsRequest {
    const path = workOvertimeRecordList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getAttendanceResultTeamStatList(option): WsRequest {
    const path = attendanceResultTeamStatList.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

  getWorkFlowStatistics(option): WsRequest {
    const path = workFlowStatistics.operates.get(Operate.querying)[0];

    return this.getFullParameter(path, option);
  }

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
}
