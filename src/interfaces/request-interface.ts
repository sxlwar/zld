import {Action} from '@ngrx/store';

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
  [key: string]: string | number | number[] | string [];
}

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

export interface TeamListOptions {
  sid: string;
  project_id?: number;
  name?: string;
  leader_id?: string;
  team_id?: string;
  flag?: number;
}

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

export interface WorkerContractOptions {
  sid: string;
  flag: number;
  limit: number;
  page: number;
  project_id?: string;
  request_status?: string;
  self?: number;
  team_id?: number;
}


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

export interface RequestAggregationOptions {
  sid: string;
}

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

export interface WorkPieceListOptions {
  sid: string;
  project_id?: number;
  user_id?: number;
  self?: number;
  request_id?: number;
  request_status?: string;
  work_piece_pay_id?: number;
  history_view?: boolean;
}

export interface AttendanceResultTeamStatListOptions {
  sid: string;
  team_ids: number[];
  start_day?: string;
  end_day?: string;
}

export type Options = LoginOptions
  & RegisterOptions
  & SearchCompanyOptions
  & PhoneVerificationCodeOptions
  & ResetPasswordOptions
  & CertificateOptions
  & UploadImageOptions
  & TeamListOptions
  & ProjectListOptions
  & WorkerContractOptions
  & AttendanceResultListOptions
  & AttendanceInstantListOptions
  & PayBillListOptions
  & WorkOvertimeRecordListOptions
  & AttendanceResultTeamStatListOptions;
