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
  auth_pass: boolean;
  captcha: boolean;
  face_image: string;
  groups_list: string[];
  realname: string;
  sid: string;
  user_id: number;
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
  id: number;
  leader__employee__realname: string;
  leader_id: number;
  leader_username: string;
  name: string;
  project_id: number;
  project_name: string;
  quality_manage__employee__realname: string;
  quality_manage__username: string;
  quality_manage_id: number;
  selected?: boolean;
}

//teamList
export interface TeamListResponse {
  teams: Team[];
  errorMessage?: string;
}

//teamAdd
export interface TeamAddResponse {
  information: string;
  errorMessage?: string;
}

//teamUpdate
export interface TeamUpdateResponse {
  information: string;
  errorMessage?: string;
}

//teamDelete
export interface TeamDeleteResponse {
  information: string;
  errorMessage?: string;
}

/*===============================================Project model======================================================*/

export interface AttendanceMachine {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  type: string;
}

export interface Project {
  address__city: string;
  address__detail: string;
  address__dist: string;
  address__province: string;
  address__street: string;
  approvals_id: number[];
  attendance_machines: AttendanceMachine[];
  content: string;
  fund_rource: string;
  id: number;
  manager__employee__realname: string;
  manager__username: string;
  manager_id: number;
  name: string;
  prime_contract__first_contracting__name: string;
  prime_contract__first_contracting_id: number;
  prime_contract__owner__name: string;
  prime_contract__owner_id: number;
  prime_contract__plan_finish_day: string;
  prime_contract__plan_start_day: string;
  prime_contract__prime_total_price: number;
  range: string;
  status: string;
  sub_contract__contracting__name: string;
  sub_contract__contracting_id: number;
  sub_contract__labour_manager__employee__realname: string;
  sub_contract__labour_manager__username: string;
  sub_contract__labour_manager_id: number;
  sub_contract__sub_total_price: number;
}

//projectList
export interface ProjectListResponse {
  count: number;
  projects: Project[];
  errorMessage?: string;
}

/*===========================================Worker contract model======================================================*/

export interface TimePay {
  content: string;
  contract_id: number;
  overtime_pay_mount: number;
  pay_mount: number;
  probation_pay_mount: number;
  time_unit: string;
}

export interface WorkerContract {
  additional_content: string;
  afternoon_time_off_duty: string;
  afternoon_time_on_duty: string;
  finish_day: string;
  id: number;
  morning_time_off_duty: string;
  morning_time_on_duty: string;
  pay_day: number;
  probation_month: string;
  request__status: string;
  request_files: any[];
  request_id: number;
  start_day: string;
  team__leader__employee__realname: string;
  team__leader__username: string;
  team__name: string;
  team__project__name: string;
  team__project__sub_contract__contracting__name: string;
  team__project__sub_contract__contracting__phone: string;
  team__project__sub_contract__contracting__user_name: string;
  team__project_id: number;
  team__quality_manage__employee__realname: string;
  team__quality_manage__username: string;
  team_id: number;
  type: string;
  work_time_pay: TimePay[];
  worker__employee__personalIdNum: string;
  worker__employee__realname: string;
  worker__username: string;
  worker_id: number;
  worktype__name: string;
  worktype_id: number;
  year_bonus_day: string;
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
  information: WorkType[];
  errorMessage?: string;
}


/*===========================================Attendance model=================================================*/

export interface AmendAttendanceResult {
  id: number;
  off_duty: string;
  on_duty: string;
  reason: string;
  request_id: number;
  result__status: string;
  result_id: number;
}

export interface AttendanceResult {
  attend_amend: AmendAttendanceResult[];
  availability_work_hour: number;
  confirm: number;
  contract__team__name: string;
  contract__team_id: number;
  contract__worker__employee__realname: string;
  contract__worker__username: string;
  contract__worker_id: number;
  contract_id: number;
  day: string;
  id: number;
  selected?: boolean;
  total_area_hour: number;
  total_gps_area_hour: number;
}

//attendResultList
export interface AttendanceResultListResponse {
  count: number;
  attendance_results: AttendanceResult[];
  errorMessage?: string;
}

export interface AttendanceInstant {
  attendance_machine__name: string;
  attendance_machine__type: string;
  attendance_machine_id: number;
  capture_image: string;
  day: string;
  id: number;
  screen_image: string;
  similarity: number;
  time: string;
  type: number;
  user__employee__realname: string;
  user_id: number;
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

/**
 * @description 这部分数据模型混用枚举来处理后台的这些不友好的API，实际中是不建议枚举类型中混用数据类型的。
 * 应该保持枚举字段数据类型的统一。这么处理完全是为了对付超级恶心的以让人看不懂，看不明白为原则的后台字段。
 * key的名称弄点让人看不懂的字段，value的值倒是弄的很直白，直白到直接上中文了。
 * 现实情况是需要一个清楚明白的key来处理数据，value 在UI上的值根本不需要后台管，什么‘处理中’，‘完成’，‘取消’，
 * 可以直接以数字来替代，至于要把0在UI上显示成‘处理中’还是‘正在处理中’这他娘的是前台和产品经理的事情。
 * 这一颠倒真是爽，浪费时间处理这些无聊的东西。另外这里没有像V1中统一在一处理，而是采用了每一个接口都有自己的枚举映射，因为后台这种飘忽不定的
 * 命名风格另人不能相信它不会变，避免到时候牵一发而动全身。
 */
export enum PayBillTime {
  systemAtt = 1,
  systemOvertime,
  systemOverOvertime,
  manualAtt,
  manualOvertime,
  manualOverOvertime,
  pieceActual = '',
  prefix = 'hour_'
}

export enum PayBillAmount {
  systemAtt = 1,
  systemOvertime,
  systemOverOvertime,
  manualAtt,
  manualOvertime,
  manualOverOvertime,
  prefix = 'amount_'
}

export interface PayBill {
  amount_1: number;
  amount_2: number;
  amount_3: number;
  amount_4: number;
  amount_5: number;
  amount_6: number;
  amount: number; // 文档和接口返回中是没有这个字段的，v1代码中却访问了这个字段，赋值给了工件的金额。
  contract__team__name: string;
  contract__team_id: number;
  contract__worker__employee__realname: string;
  hour_1: number;
  hour_2: number;
  hour_3: number;
  hour_4: number;
  hour_5: number;
  hour_6: number;
  id: number;
  pay_type: string;
  project_bill__month: string;
  project_bill__project__name: string;
  project_bill__project_id: number;
  project_bill_id: number;
  user_id: number;
}

// payBillList 个人工资对帐单
export interface PayBillListResponse {
  count: number;
  pay_bill: PayBill[];
  errorMessage?: string;
}

export enum ProjectPayBillTime {
  systemAtt = 1,
  systemOvertime,
  systemOverOvertime,
  manualAtt,
  manualOvertime,
  manualOverOvertime,
  prefix = 'pay_bill__hour_',
  suffix = '__sum'
}

export enum ProjectPayBillAmount {
  systemAtt = 1,
  systemOvertime,
  systemOverOvertime,
  manualAtt,
  manualOvertime,
  manualOverOvertime,
  pieceShouldPay = 'all',
  pieceActualPay = '',
  prefix = 'pay_bill__amount_',
  suffix = '__sum'
}

export interface ProjectPayBill {
  bill_status: string;
  create_time: string;
  id: number;
  modify_time: string;
  month: string;
  pay_bill__amount_1__sum: number;
  pay_bill__amount_2__sum: number;
  pay_bill__amount_3__sum: number;
  pay_bill__amount_4__sum: number;
  pay_bill__amount_5__sum: number;
  pay_bill__amount_6__sum: number;
  pay_bill__amount__sum: number;  // 谁TMD能看出这个字段是和工件有关系。sum不应该是总计么？
  pay_bill__amount_all__sum: number;
  pay_bill__hour_1__sum: number;
  pay_bill__hour_2__sum: number;
  pay_bill__hour_3__sum: number;
  pay_bill__hour_4__sum: number;
  pay_bill__hour_5__sum: number;
  pay_bill__hour_6__sum: number;
  project__name: string;
  project_id: number;
}

//projectPayBillList 工程工资对帐单
export interface ProjectPayBillListResponse {
  project_pay_bill: ProjectPayBill[];
  errorMessage?: string;
}

export interface PayProcess {
  amount: number;
  bank_name: string;
  bank_no: string;
  create_time: string;
  id: number;
  modify_time: string;
  name: string;
  pay_bill__contract__team__name: string;
  pay_bill__contract__worker__employee__realname: string;
  pay_bill__contract__worker__username: string;
  pay_bill__contract__worker_id: number;
  project_pay__project_bill__month: string;
  project_pay__project_bill__project__name: string;
  project_pay__project_bill__project_id: number;
  project_pay_id: number;
  response_code: null;
  response_msg: null;
  status: string;
  tran_id: string;
  tran_time: null;
}

//payProcessList 个人工资发放单
export interface PayProcessListResponse {
  count: number;
  pay_process: PayProcess[]
  errorMessage?: string;
}

export enum PayProcessStatus {
  grantIn = '发放中',
  pendingRelease = "待发放",
  alreadyIssued = "已发放"
}

export interface ProjectPayProcess {
  amount: number;
  amount_paid: number;
  amount_paying: number;
  bankno__num: null;
  create_time: string;
  id: number;
  modify_time: string;
  project_bill__month: string;
  project_bill__project__name: string;
  project_bill__project_id: number;
  project_bill_id: number;
  status: string;
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
  attachment: string;
  contracts: WorkerContract[];
  day: string;
  finish: string;
  id: number;
  reason: string;
  request__status: string;
  request_id: number;
  start: string;
  type: string;
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
  id: number;
  num: number;
  quality_percent: number;
  request_id: number;
  workpieces__contract__worker__employee__realname: string;
  workpieces__contract__worker_id: number;
  workpieces_id: number;
}

export interface WorkPiece {
  contract__worker__employee__realname: string;
  contract__worker_id: number;
  contract_id: number;
  id: number;
  location: string;
  name: string;
  num: number;
  pay_mount: number;
  standard: string;
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
  confirm_status: AttendanceConfirmStatus;
  team_id: number;
  team_name: string;
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

/*=================================================Company user model==================================================*/

export interface Employer {
  birth_date: string,
  company_id: number;
  curraddr: number;
  curraddr__city: string;
  curraddr__detail: string;
  curraddr__dist: string;
  curraddr__province: string;
  curraddr__street: string;
  nationality: string;
  personalIdNum: string;
  realname: string;
  sex: string;
  user__groups__name: string;
  user__username: string;
  user_id: number;
}

export interface CompanyUserListResponse {
  worker: Employer[];
  errorMessage?: string;
}

/*=================================================Common API model==================================================*/
export interface ProjectSimplest {
  id: number;
  name: string;
}

export interface BasicInformation {
  project: ProjectSimplest[];
  phone: number;
  role: string;
  name: string;
  headImg: string;
  company: string;
  worktype: string[];
}

export interface Home {
  emergency_contact_tel: string;
  user_id: number,
  homeaddr__street: string;
  emergency_contact_relation: string;
  homeaddr__detail: string;
  homeaddr__dist: string;
  childnum: number;
  marriage: boolean;
  homeaddr__city: string;
  emergency_contact_name: string;
  homeaddr__province: string;
  marryday: string;
}

export interface Education {
  major: string;
  user_id: number;
  degree: number;
  finish_date: string;
  id: number;
  start_date: string;
  school__name: string;
}

export interface Certificate {
  firstget_date: string;
  score: number;
  usestart_date: string;
  usefinish_date: string;
  level: number;
  mechanism: string;
  imageback: string;
  num: string;
  operation_score: number;
  user_id: number;
  worktype_id: number;
  education: number;
  knowledge_score: number;
  id: number;
  imageface: string;
}

export interface WorkExperience {
  project_name: string;
  user_id: number;
  start: string;
  job: string;
  finish: string;
  company_name: string;
  id: number;
}

export interface PlatformWorkExperience {
  team__project__prime_contract__first_contracting__name: string;
  finish_day: string;
  worktype__name: string;
  team__name: string;
  team__project__name: string;
  start_day: string;
  id: number;
}

export interface PersonalId {
  addr: string;
  user_id: number;
  imageface: string;
  auth_pass: boolean;
  indate: string;
  num: string;
  imageback: string;
  birth_date: string;
  nationality: string;
  hasparsed: boolean;
  sex: string;
  id: number;
  realname: string;
}

/**
 * basicInfoList  
 * 作为一个前后分离的项目，接口字段时有时无，这个接口就是个典型，实测除了basic_info以外其它字段都可能没有,
 * 处理的时候要小心，防止出现XXX is undefined 这种SB错误。
 */
export interface BasicInfoListResponse {
  home_info: Home[];
  edu_info: Education[];
  work_cert_info: Certificate[];
  work_expr_info: WorkExperience[];
  platfrom_work_expr_info: PlatformWorkExperience[];  //后台的单词用的就是错的，不敢改；
  person_id_info: PersonalId[];
  basic_info: BasicInformation;
  errorMessage?: string;
}
/*========================================================================================================*/


//search worker
export interface WorkerResponse {
  age: number;
  cer_status: number;
  code: number;
  company__name: string;
  curraddr__city: string;
  curraddr__dist: string;
  curraddr__province: string;
  realname: string;
  sex: string;
  user__username: string;
  user_id: number;
  userpersonal_idnum: string;
}

export type ErrorResponse = LoginResponse
  | AttendanceInstantListResponse
  | AttendanceResultListResponse
  | AttendanceResultTeamStatListResponse
  | CertificateResponse
  | CompanyUserListResponse
  | MultiProcessCreateResponse
  | PayBillListResponse
  | PhoneVerCodeResponse
  | ProcessCreateResponse
  | ProjectListResponse
  | RegisterResponse
  | RequestAggregationResponse
  | ResetPasswordResponse
  | TaskUpdateResponse
  | TeamAddResponse
  | TeamDeleteResponse
  | TeamListResponse
  | TeamUpdateResponse
  | WorkOvertimeRecordListResponse
  | WorkPieceListResponse
  | WorkTypeListResponse
  | WorkerContractListResponse;
