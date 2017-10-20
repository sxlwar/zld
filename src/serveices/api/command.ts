import {Injectable} from '@angular/core';

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

/**
 * @description This object defines the interface interactions that the service must process.
 * */
export enum Processor {
  login = 'login',
  register = 'register',
  resetPwd = 'resetPwd',
  company = 'company'
}

export interface ApiUnit {
  name: string;
  operates: Map<string, string[]>;
}

const login: ApiUnit = {
  name: Processor.login,
  operates: new Map([[Operate.querying, ['employee.consumer.Login']]])
};

const company: ApiUnit = {
  name: Processor.company,
  operates: new Map([
    [Operate.querying, ['employer.consumer.CompanyList']],
    [Operate.updates, ['employer.consumer.CompanyUpdate']],
    [Operate.addition, ['employer.consumer.CompanyAdd']],
    [Operate.deletion, ['employer.consumer.CompanyDelete']],
    [Operate.search, ['employer.consumer.SearchCompany']]
  ])
};

const register: ApiUnit = {
  name: Processor.register,
  operates: new Map([
    [Operate.addition, ['employee.consumer.EmployeeRegister', 'employee.consumer.WorkerRegister']],
  ])
};

const resetPwd: ApiUnit = {
  name: Processor.resetPwd,
  operates: new Map([
    [Operate.addition, ['employee.consumer.ResetPassword']]
  ])
};


// export const login = 'employee.consumer.Login';
@Injectable()
export abstract class CommandService {

  login = login;

  abstract loginProcessor(): void;

  resetPwd = resetPwd;

  abstract resetPwdProcessor(): void;

  register = register;

  abstract registerProcessor(): void;

  compnay = company;

  abstract companyProcessor(): void;

  resetPWPhoneVerifyCode = "employee.consumer.ResetPWPhoneVerifyCode";
  resetPassword = "employee.consumer.ResetPassword";
  regPhoneVerifyCode = "employee.consumer.RegPhoneVerifyCode";
  personalIdList = "employee.consumer.PersonalIdList";
  searchCompany = "employer.consumer.SearchCompany";
  processCreate = "workflow.consumer.ProcessCreate";
  multiProcessCreate = "workflow.consumer.MultiProcessCreate";
  workerContractList = "project.consumer.WorkerContractList";
  workPieceList = "project.consumer.WorkPieceList";
  personalIdUpdate = "employee.consumer.PersonalIdUpdate";
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

  getPath({operation, processorName}): string[] {
    const apiUnit: ApiUnit = this[processorName];
    return apiUnit.operates.get(operation);
  }
}
