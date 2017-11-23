import { Action } from '@ngrx/store';

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

  constructor(public payload: any) { }
}

//custom field
export interface ErrorMessage {
  errorMessage: string;
}

/*==================================Data model before enter into app=============================================*/

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

/*=================================================Team model======================================================*/

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
  selected?: boolean;
}

//teamList
export interface TeamListResponse {
  teams: Team[];
  errorMessage?: string;
}

/*===============================================Project model======================================================*/

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
  errorMessage?: string;
}

/*===========================================Worker contract model======================================================*/

export interface TimePay {
  overtime_pay_mount: number;
  contract_id: number;
  content: string;
  time_unit: string;
  probation_pay_mount: number;
  pay_mount: number;
}

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
  errorMessage?: string;
}

/*===========================================Work type model======================================================*/

export interface WorkType {
  id: number;
  danger: number;
  name: string;
}

//workTypeList
export interface WorkTypeListResponse {
  information: WorkType[],
  errorMessage?: string;
}


/*===========================================Attendance model=================================================*/

export interface AmendAttendanceResult {
  id: number;
  reason: string;
  request_id: number;
  result_id: number
  result__status: string;
  on_duty: string;
  off_duty: string;
}

export interface AttendanceResult {
  contract__team__name: string;
  total_gps_area_hour: number;
  total_area_hour: number;
  contract_id: number;
  confirm: number;
  contract__worker__employee__realname: string;
  availability_work_hour: number;
  day: string;
  contract__worker_id: number;
  attend_amend: AmendAttendanceResult[];
  contract__team_id: number;
  id: number;
  contract__worker__username: string;
  selected?: boolean;
}

//attendResultList
export interface AttendanceResultListResponse {
  count: number;
  attendance_results: AttendanceResult[];
  errorMessage?: string;
}

export interface AttendanceInstant {
  user_id: number;
  attendance_machine__type: string;
  similarity: number;
  attendance_machine_id: number;
  type: number;
  capture_image: string;
  day: string;
  screen_image: string;
  time: string;
  user__employee__realname: string;
  attendance_machine__name: string;
  id: number;
}

export enum AttendanceInstantType {
  CAN_NOT_READ,
  IN,
  OUT
}

// attendanceInstantList
export interface AttendanceInstantListResponse {
  count: number;
  attendance_instants: AttendanceInstant[];
  errorMessage?: string;
}

//TODO: unused;
//attendResultList
export interface AttendanceResultConfirmResponse {
  information: string; 
  errorMessage?: string;
}

/*===========================================PayBill model======================================================*/

export interface PayBill {
  contract__team__name: string;
  project_bill__month: string;
  hour_5: number;
  hour_4: number;
  hour_6: number;
  hour_1: number;
  id: number;
  hour_3: number;
  hour_2: number;
  pay_type: string;
  user_id: number;
  contract__worker__employee__realname: string;
  project_bill_id: number;
  amount_3: number;
  project_bill__project__name: string;
  amount_1: number;
  project_bill__project_id: number;
  amount_2: number;
  amount_5: number;
  amount_4: number;
  amount_6: number;
  contract__team_id: number;
}

// payBillList 个人工资对帐单
export interface PayBillListResponse {
  count: number;
  pay_bill: PayBill[];
  errorMessage?: string;
}

export interface ProjectPayBill {
  bill_status: string;
  pay_bill__amount_6__sum: number;
  pay_bill__hour_3__sum: number;
  pay_bill__amount_4__sum: number;
  project__name: string;
  pay_bill__amount_3__sum: number;
  pay_bill__amount_1__sum: number;
  pay_bill__hour_4__sum: number;
  pay_bill__amount_all__sum: number;
  month: string;
  pay_bill__hour_5__sum: number;
  create_time: string;
  pay_bill__amount_5__sum: number;
  modify_time: string;
  pay_bill__hour_2__sum: number;
  pay_bill__hour_6__sum: number;
  project_id: number;
  pay_bill__hour_1__sum: number;
  id: number;
  pay_bill__amount__sum: number;
  pay_bill__amount_2__sum: number;
}

//projectPayBillList 工程工资对帐单
export interface ProjectPayBillListResponse {
  project_pay_bill: ProjectPayBill[];
  errorMessage?: string;
}

export interface PayProcess {
  status: string;
  bank_name: string;
  modify_time: string;
  pay_bill__contract__worker__username: string;
  project_pay__project_bill__month: string;
  tran_id: string;
  response_msg: null;
  tran_time: null;
  pay_bill__contract__team__name: string;
  name: string;
  response_code: null;
  pay_bill__contract__worker__employee__realname: string;
  amount: number;
  pay_bill__contract__worker_id: number;
  create_time: string;
  project_pay__project_bill__project_id: number;
  project_pay__project_bill__project__name: string;
  id: number;
  project_pay_id: number;
  bank_no: string;
}

//payProcessList 个人工资发放单
export interface PayProcessListResponse {
  count: number;
  pay_process: PayProcess[]
  errorMessage?: string;
}

export interface ProjectPayProcess {
  status: string;
  amount_paying: number;
  project_bill_id: number;
  amount_paid: number;
  project_bill__project_id: number;
  project_bill__project__name: string;
  amount: number;
  create_time: string;
  modify_time: string;
  bankno__num: null;
  project_bill__month: string;
  id: number;
}

//projectPayProcessList 工程工资发放单 
export interface ProjectPayProcessListResponse {
  project_pay_process: ProjectPayProcess[]
  count: number;
  errorMessage?: string;
}

/*==========================================Over time model====================================================*/

export interface WorkerContract {
  worker__employee__realname: string;
  id: number;
  team__name: string;
}

export interface Overtime {
  finish: string;
  contracts: WorkerContract[];
  request__status: string;
  day: string;
  start: string;
  reason: string;
  attachment: string;
  request_id: number;
  type: string;
  id: number;
}

// WorkOvertimeRecordList
export interface WorkOvertimeRecordListResponse {
  count: number;
  work_overtimes: Overtime[];
  errorMessage?: string;
}

/*==========================================Work Piece model====================================================*/

export interface WorkPieceFinish {
  comment: string;
  finish_date: string;
  workpieces_id: number;
  workpieces__contract__worker_id: number;
  num: number;
  quality_percent: number;
  request_id: number;
  workpieces__contract__worker__employee__realname: string;
  id: number;
}

export interface WorkPiece {
  name: string;
  contract__worker__employee__realname: string;
  id: number;
  contract__worker_id: number;
  num: number;
  location: string;
  standard: string;
  pay_mount: number;
  contract_id: number;
}

// WorkPieceList
export interface WorkPieceListResponse {
  work_piece_finish_flow: WorkPieceFinish[];
  work_piece_pay: WorkPiece[];
  errorMessage?: string;
}

/*============================================Launch model==================================================*/

export interface ProcessCreateResponse {
  
}

export interface MultiProcessCreateResponse {

}

export interface TaskUpdateResponse {

}

/*=================================================Statistics model==================================================*/

export interface AttendanceStatus {
  amend_count: number;
  confirm_count: number;
  unconfirm_count: number;
}

export interface AttendanceConfirmStatus {
  [date: string]: AttendanceStatus;
}

export interface AttendanceStatistics {
  team_name: string;
  team_id: number;
  confirm_status: AttendanceConfirmStatus;
}

//attendResultTeamStatList
export interface AttendanceResultTeamStatListResponse {
  attend_result_team_stat_list: AttendanceStatistics[];
  errorMessage?: string;
} 

export interface WorkFlowAggregation {
  process_id__count: number;
  process_id: string;
}

//requestAggregation
export interface RequestAggregationResponse {
  request_aggregation: WorkFlowAggregation[];
  errorMessage?: string;
}

/*========================================================================================================*/


//search worker
export interface WorkerResponse {
  user__username: string
  user_id: number
  realname: string
  age: number
  sex: string
  cer_status: number
  company__name: string
  curraddr__province: string
  curraddr__dist: string
  userpersonal_idnum: string
  curraddr__city: string
  code: number
}

export type ErrorResponse = LoginResponse
  | PhoneVerCodeResponse
  | RegisterResponse
  | ResetPasswordResponse
  | CertificateResponse
  | TeamListResponse
  | ProjectListResponse
  | WorkerContractListResponse
  | WorkTypeListResponse
  | AttendanceResultListResponse
  | AttendanceInstantListResponse
  | PayBillListResponse
  | WorkOvertimeRecordListResponse
  | WorkPieceListResponse
  | RequestAggregationResponse
  | AttendanceResultTeamStatListResponse
  | ProcessCreateResponse
  | MultiProcessCreateResponse
  | TaskUpdateResponse;
