import { Action } from '@ngrx/store';

export interface WsRequest {
  command: { path: string };
  parameters: object;
}

export class RequestAction implements Action {
  readonly type: string;

  constructor(public payload: Options) {
  };
}

export interface RequestOption {
  [key: string]: string | number | number[] | string[];
}

/*==================================Data model before enter into app=============================================*/

export interface LoginOptions {
  username: string;
  password: string;
  captcha_code?: string;
  rand_captcha_key?: string;
}

export interface RegisterOptions {
  username: string;
  password: string;
  code: string;
  captcha_code?: string;
  rand_captcha_key?: string;
  real_name?: string;
  company_id?: number;
}

export interface SearchCompanyOptions {
  name: string
}

export interface PhoneVerificationCodeOptions {
  username: string;
  rand_captcha_key?: string;
  captcha_code?: string;
}

export interface ResetPasswordOptions {
  username: string;
  code: string;
  password: string;
  captcha_code?: string;
  random_key?: string;
}

export interface CertificateOptions {
  sid: string;
  realname: string;
  num: string;
  imageface?: string;
  imageback?: string;
}

export interface UploadImageOptions {
  sid: string;
  command: string;
  type: string;
  file: string;
  id?: string | number;
}

/*=================================================Team model======================================================*/

export interface TeamListOptions {
  sid: string;
  project_id?: number;
  name?: string;
  leader_id?: string;
  team_id?: string;
  flag?: number;
}

export interface TeamAddOptions {
  sid: string;
  name: string;
  project_id: number;
  leader_id: number;
  quality_manage_id: number;
}

export interface TeamUpdateOptions {
  sid: string;
  team_id: number;
  name: string;
  leader_id: number;
  quality_manage_id: number;
}

export interface TeamDeleteOptions {
  sid: string;
  team_id: number;
}

/*===============================================Project model======================================================*/

export interface ProjectListOptions {
  sid: string;
  project_id?: number[];
  prime_contract_status?: string;
  sub_contract_status?: string;
  without_sub_contract?: number;
  project_name?: string;
  company_id?: string;
  page?: number;
  limit?: number;
}

/*===========================================Worker contract model======================================================*/

export enum ContractType {
  timer = 1,
  piecer
}

export interface WorkerContractOptions {
  sid: string;
  flag: number;
  limit: number;
  page: number;
  project_id?: number;
  request_status?: string;
  self?: number;
  team_id?: number;
  contract_type?: number;
}

/*===========================================Attendance model=================================================*/

export interface AttendanceResultListOptions {
  sid: string;
  start_day?: string;
  end_day?: string;
  confirm?: string;
  user_id?: string;
  self?: number;
  team_id?: number[];
  page?: number;
  limit?: number;
}

export interface AttendanceInstantListOptions {
  sid: string
  start_day: string
  end_day: string
  page: number;
  limit: number;
  self?: number;
  user_id?: number[];
  identity_num?: string;
  team_id?: number[];
  flag?: number;
  attendance_machine_id?: number;
}

//FIXME: unused;
export interface AttendanceResultConfirmOptions {
  sid: string;
  attendance_result_id: number[];
}

/*===========================================PayBill model======================================================*/

export interface PayBillListOptions {
  sid: string;
  month: string;
  self?: number;
  user_id?: number[];
  team_id?: number[];
  project_id?: number;
  request_id?: number;
  pay_type?: string;
}

export interface ProjectPayProcessListOptions {
  sid: string;
  limit?: number;
  page?: number;
  project_id?: number;
  project_name?: string;
}

export interface ProjectPayBillListOptions {
  sid: string;
  id?: number;
  project_id?: number;
  request_id?: number;
  month?: string; //Actually is year-month ex: '2017-01'
  request_status?: string;
}

export interface PayProcessListOptions {
  sid: string;
  page?: number; //TODO: Limit and page should be imperative parameter, but be set to optional parameters for time reason.
  limit?: number;
  self?: number;
  user_id?: number[];
  team_id?: number[];
  month?: number[]; //Actually is year-month ex: '2017-01'
  project_id?: number[];
  status?: string;
}

/*==========================================Over time model====================================================*/

export interface WorkOvertimeRecordListOptions {
  sid: string;
  request_id?: number;
  project_id?: number;
  start_day?: string;
  end_day?: string;
  request_status?: string;
  user_id?: number[];
  self?: number;
  team_id?: number[];
  page?: number;
  limit?: number;
  history_view?: boolean;
}

/*==========================================Work Piece model====================================================*/

export interface WorkPieceListOptions {
  sid: string;
  history_view?: boolean;
  project_id?: number;
  request_id?: number;
  request_status?: string;
  self?: number;
  user_id?: number;
  work_piece_pay_id?: number;
}

/*=================================================Statistics model==================================================*/

export interface AttendanceResultTeamStatListOptions {
  sid: string;
  team_ids: number[];
  start_day?: string;
  end_day?: string;
}
 
export interface RequestAggregationOptions {
  sid: string;
}

/*=================================================Company user model==================================================*/

export interface CompanyUserListOptions {
  sid: string;
  company_id?: number[];
  group_name?: string;
  limit?: number;
  page?: number;
  user_id?: number;
  username?: string;
}

/*=================================================Attendance machine API model==================================================*/

export enum AttendanceMachineType {
  fixedMachine = '固定式人脸识别考勤机-1',
  mobileMachine = '移动式人脸识别考勤机-1',
  gpsMachine = 'GPS定位考勤机-1'
}

export interface AttendanceMachineListOptions {
  sid: string;
  project_id?: number;
  type?: string;
  page?: number;
  limit?: number;
}

/*=================================================Common API model==================================================*/

export interface BasicInfoListOptions {
  sid: string;
  user_id: number;
}

export type Options = LoginOptions
  & AttendanceMachineListOptions
  & AttendanceInstantListOptions
  & AttendanceResultConfirmOptions
  & AttendanceResultListOptions
  & AttendanceResultTeamStatListOptions
  & BasicInfoListOptions
  & CertificateOptions
  & CompanyUserListOptions
  & PayBillListOptions
  & PayProcessListOptions
  & PhoneVerificationCodeOptions
  & ProjectListOptions
  & ProjectPayBillListOptions
  & ProjectPayProcessListOptions
  & RegisterOptions
  & ResetPasswordOptions
  & SearchCompanyOptions
  & TeamAddOptions
  & TeamDeleteOptions
  & TeamListOptions
  & TeamUpdateOptions
  & UploadImageOptions
  & WorkOvertimeRecordListOptions
  & WorkerContractOptions;
