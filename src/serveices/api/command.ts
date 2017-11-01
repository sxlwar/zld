import {Injectable} from '@angular/core';
import {
  CertificateOptions,
  LoginOptions,
  PhoneVerificationCodeOptions, RegisterOptions, ResetPasswordOptions,
  SearchCompanyOptions,
  WsRequest
} from '../../interfaces/request-interface';

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

export interface ApiUnit {
  operates: Map<string, string[]>;
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


@Injectable()
export class Command {

  personalIdList = "employee.consumer.PersonalIdList";
  processCreate = "workflow.consumer.ProcessCreate";
  multiProcessCreate = "workflow.consumer.MultiProcessCreate";
  workerContractList = "project.consumer.WorkerContractList";
  workPieceList = "project.consumer.WorkPieceList";
  // personalIdUpdate = "employee.consumer.PersonalIdUpdate";
  teamList = "project.consumer.TeamList";
  workerDetailList = "employee.consumer.WorkerDetailList";
  workerDetailUpdate = "employee.consumer.WorkerDetailUpdate";
  attendResultList = "project.consumer.AttendResultList";
  requestList = "workflow.consumer.RequestList";
  projectPayBillList = "project.consumer.ProjectPayBillList";
  attendanceInstantList = "project.consumer.AttendanceInstantList";
  projectList = "employer.consumer.ProjectList";
  workTimePayList = "project.consumer.WorkTimePayList";
  projectPayProcessList = "project.consumer.ProjectPayProcessList";
  workerBankNoList = "employee.consumer.WorkerBankNoList";
  workerBankNoAdd = "employee.consumer.WorkerBankNoAdd";
  workerBankNoDelete = "employee.consumer.WorkerBankNoDelete";
  amendAttendRecordList = "project.consumer.AmendAttendRecordList";
  leaveRecordList = "project.consumer.LeaveRecordList";
  workOvertimeRecordList = "project.consumer.WorkOvertimeRecordList";
  attendResultConfirm = "project.consumer.AttendResultConfirm";
  paySalary = "project.consumer.PaySalary";
  taskUpdate = "workflow.consumer.TaskUpdate";
  multiTaskUpdate = "workflow.consumer.MultiTaskUpdate";
  payProcessList = "project.consumer.PayProcessList";
  payBillList = "project.consumer.PayBillList";
  workCertificateList = "employee.consumer.WorkCertificateList";
  workTypeList = "employee.consumer.WorkTypeList";
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
  requestAggregation = "workflow.consumer.RequestAggregation";
  attendResultTeamStatList = "operation.consumer.AttendResultTeamStatList";
  constructor(){
  }


  private getFullParameter(path: string, parameters: object): WsRequest {
    return {command: {path}, parameters}
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
   * FIXME NO.1
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

  get uploadPersonalIdImage(): string {
    return uploadPersonalIdImage.operates.get(Operate.updates)[0];
  }
}
