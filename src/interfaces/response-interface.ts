
import {Action} from '@ngrx/store';

export interface WsResponse {
  code: number;
  command: { path: string };
  data: any;
  msg: string;
  isError: boolean
  detail?: any;
}

export class ResponseAction implements Action {
  readonly type: string;

  constructor(public payload: any) {}
}

//custom field
export interface ErrorMessage {
  errorMessage: string;
}

//login
export interface LoginResponse {
  realname: string;
  sid: string;
  user_id: number;
  auth_pass: boolean;
  captcha: boolean;
  groups_list: string[];
  face_image: string;
  errorMessage?: string;
}

//search company
export interface Company {
  name: string;
  id: number;
}

//phone verification code
export interface PhoneVerCodeResponse {
  captcha?: boolean;
  errorMessage?: string;
}

//register
export interface RegisterResponse {
  user_id: number;
  errorMessage?: string;
}

//reset password
export interface ResetPasswordResponse {
  user_id: number;
  errorMessage?: string;
}

//certificate
export interface CertificateResponse {
  auth_pass: boolean;
  errorMessage?: string;
}

//search worker
export interface WorkerResponse {
  user__username:	string
  user_id:	number
  realname:	string
  age:	number
  sex:	string
  cer_status:	number
  company__name:	string
  curraddr__province:	string
  curraddr__dist:	string
  userpersonal_idnum:	string
  curraddr__city:	string
  code:	number
}

export interface Team {
  leader_id: string;
  name: string;
  leader_username: string;
  quality_manage__username: string;
  quality_manage__employee__realname: string;
  quality_manage_id: number;
  leader__employee__realname: string;
  project_id: number;
  id: number;
  project_name: string;
}

//teamList
export interface TeamListResponse {
  teams: Team[];
  errorMessage?: string;
}

export interface AttendanceMachine {
  latitude: number;
  type: string;
  id: number;
  longitude: number;
  name: string;
}

export interface Project {
  prime_contract__first_contracting__name: string;
  sub_contract__labour_manager_id: number;
  attendance_machines: AttendanceMachine[];
  address__city: string;
  sub_contract__labour_manager__username: string;
  id: number;
  prime_contract__owner_id: number;
  prime_contract__first_contracting_id: number;
  content: string;
  address__dist: string;
  approvals_id: number[];
  manager_id: number;
  manager__username: string;
  status: string;
  prime_contract__prime_total_price: number;
  prime_contract__owner__name: string;
  address__detail: string;
  address__street: string;
  sub_contract__contracting_id: number;
  sub_contract__contracting__name: string;
  fund_rource: string;
  sub_contract__sub_total_price: number;
  name: string;
  address__province: string;
  prime_contract__plan_start_day: string;
  range: string;
  manager__employee__realname: string;
  sub_contract__labour_manager__employee__realname: string;
  prime_contract__plan_finish_day: string
}

//projectList
export interface ProjectListResponse {
  count: number;
  projects: Project[];
  errorMessage: string;
}

//time pay
export interface TimePay {
  overtime_pay_mount: number;
  contract_id: number;
  content: string;
  time_unit: string;
  probation_pay_mount: number;
  pay_mount: number;
}

//workerContract
export interface WorkerContract {
  request_files: any[];
  worker__employee__personalIdNum: string;
  team__quality_manage__employee__realname: string;
  team__project__sub_contract__contracting__name: string;
  worker_id: number;
  work_time_pay: TimePay[];
  morning_time_on_duty: string;
  id: number;
  worker__employee__realname: string;
  pay_day: number;
  finish_day: string;
  afternoon_time_on_duty: string;
  worktype__name: string;
  request__status: string;
  team__project__sub_contract__contracting__user_name: string;
  team__project__name: string;
  afternoon_time_off_duty: string;
  worktype_id: number;
  type: string;
  start_day: string;
  team__quality_manage__username: string;
  year_bonus_day: string;
  probation_month: string;
  team__project__sub_contract__contracting__phone: string;
  additional_content: string;
  team__project_id: number;
  team__name: string;
  team__leader__username: string;
  team_id: number;
  team__leader__employee__realname: string;
  request_id: number;
  morning_time_off_duty: string;
  worker__username: string;
}

//workerContractList
export interface WorkerContractListResponse {
  count: number;
  worker_contract: WorkerContract[];
  errorMessage: string;
}


export type ErrorResponse = LoginResponse
  | PhoneVerCodeResponse
  | RegisterResponse
  | ResetPasswordResponse
  | CertificateResponse
  | TeamListResponse
  | ProjectListResponse
  | WorkerContractListResponse;
