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
  [key: string]: string | number | number[] | string[] | boolean;
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
  history_view?: boolean; //文档上描述是true可查看历史人物，搞求不明白是啥东西。
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

/*=================================================Attendance card API model==================================================*/

export interface AttendanceCardListOptions {
  sid: string;
  user_id?: number;
  project_id?: number;
  team_id?: number;
  ic_card_num?: string;
  realname?: string;
  page?: number;
  limit?: number;
}

export interface AttendanceCardForm {
  ic_card_num: string;
  user_id?: number;
  userName?: string;
}

export interface AttendanceCardAddOptions {
  sid: string;
  attendance_card_form: AttendanceCardForm; //这个地方纯属脱了裤子放屁，多加这个字段的意义只有一个就是迷惑API使用者；
}

export interface AttendanceCardUpdateOptions {
  sid: string;
  ic_card_num: string;
  user_id?: number;
  userName?: string;
}

export interface AttendanceCardDeleteOptions {
  sid: string;
  attendance_card_id: number[];
}

/*=================================================Location card API model==================================================*/

export interface LocationCardListOptions {
  sid: string;
  user_ids?: number[];
  dev_id?: number;
  project_id?: number;
  team_id?: number;
  worktype_id?: number;
  realname?: string;
  limit?: number;
  page?: number;
}

export interface LocationCardAddOptions {
  sid: string;
  dev_id: string; //定位卡卡号？
  user_id?: string;
  userName?: string;
}

export interface LocationCardUpdateOptions {
  sid: string;
  dev_id: string; // 定位卡设备号？
  user_id?: string;
  location_card_id?: number; //乱七八糟的，文档中没有这个字段，是从v1的代码中抄上来的, 解绑的时候用。
  userName?: string;
}

export interface LocationCardDeleteOptions {
  sid: string;
  location_card_id: number; //定位卡ID？谁TMD能看的出卡号，设备号，ID是不是一个东西。垃圾文档。响应是number， 请求是string，这个地方是被改成number的。
}

/*=================================================ListHisLoc API model==================================================*/

export interface HistoryLocationListOptions {
  sid: string;
  user_ids?: number[];
  start_time?: string; //文档上写的类型是time，原谅我的才疏学浅，不知道time是啥数据类型。
  time?: string;
  end_time?: string;
  dev_ids?: number[];
  project_id?: number;
  team_ids?: number[];
  worktype_ids?: number;
}

/*=================================================Project area list API model==================================================*/

export interface ProjectAreaListOptions {
  sid: string;
  project_id: number; //projectList返回的工程ID是number类型，文档上这个地方是string，如果必须传string，我只能说日了狗了。
}

/*=================================================Personal information API model==================================================*/

export interface BasicInfoListOptions {
  sid: string;
  user_id: number;
}

export interface PersonalIdListOptions {
  sid: string;
  user_id?: number[];
  self?: number;
}

export interface WorkerDetailListOptions {
  sid: string;
  user_id?: number;
  self?: number;
  page?: number;
  limit?: number;
}

/** 
 * 这是一个极其二逼的API，文档上的参数部分给出的就是WorkerDetailUpdateOptions这种格式，但是真正的格式是示例里给的格式
 * 1、worker_form不更新也要传，否则失败；文档上没有，实测得出的结果；
 * 2、如果address不更新则address_form 不传 否则会验证失败。文档说了这么一句废话，谁TMD的传一个不更新的东西。
 * 3、更新地址和更新工种之间有什么关系，需要把它们耦合在一起。
 * 4、既然N多东西都是必填项，文档上居然都是可选，这不是逗逼么，一天就是在调这种低级错误。
 * {
 *  sid: string;
 *  worker_form: { work_type_id: number[]}
 *  address_form: { province?: string; city?: string; dist?: string; street?: string; detail?: string}
 * }
 * 
 * 这鸟API，让你防不甚防，数据之间又没有很强的关联性，明明可以扁平化处理，非要搞复杂, 就像返回的错误信息一样，一层套一层，难道搞的很复杂看起来就牛X点么
 * 为了保持业务层处理起来简单一些，这个接口没有和后台保持一致，转换任务交给了对应的command服务函数去处理, 同样扁平化处理的还有家庭，工作经历和教育经历;
 * 
 * street和detail这两个字段目前来看基本无法使用，在UI层无法拿到4级地址的数据，那么用户填了以后是传哪个字段，完全可以合并的东西。
 */
export interface WorkerDetailUpdateOptions {
  sid: string;
  work_type_id?: number[]; // 又TMD是单数但传的是list
  province?: string;
  city?: string;
  dist?: string;
  street?: string;
  detail?: string;
}

export interface HomeInfoListOptions {
  sid: string;
  user_id?: number[];
}

export const homeAddressNameMapBetweenResponseAndRequest = {
  province: "homeaddr__province",
  city: "homeaddr__city",
  dist: "homeaddr__dist",
  detail: "homeaddr__detail",
  street: "homeaddr__street"
}

export const relationShip = [
  '配偶',
  '子女',
  '父母',
  '亲戚',
  '朋友',
  '同事',
  '其它'
]

export interface HomeInfoUpdateOptions {
  sid: string;
  //home_info_form;
  marriage: number; // 0: 未婚 or 1: 已婚  去你奶奶个熊，这TMD不就是一个 true/false, 响应都给boolean，到了请求就成了数字.
  childnum: number;
  marryday: string;
  emergency_contact_name: string;
  emergency_contact_tel: string;
  emergency_contact_relation: string;
  //address_form;
  province: string; //鸟接口看的人想吐，响应的字段名称有前缀 homeaddr__，请求里又没有，home_info_from的字段请求和响应倒是统一，我相信那只是一个巧合。
  city: string;
  dist: string;
  street: string;
  detail: string;
}

export interface EducationListOptions {
  sid: string;
  user_id?: number[];
}

export const degrees = [
  "小学",
  "初中",
  "高中",
  "中技",
  "中专",
  "大专",
  "本科",
  "硕士",
  "博士及以上",
  "MBA"
];

export interface EducationAddOptions {
  sid: string;
  degree: number;  //这个字段和上面的relationShip是一模一样的东西，不同的是后台处理的方式，上面必须传中文，这里又给搞个映射，要让传数字，TMD到底想怎样？后台的代码风格就2个字，垃圾。而且是以1开头，是不是程序员？
  major: string;
  start_date: string;
  finish_date: string;
  school__name: string;
}

export interface EducationUpdateOptions {
  sid: string;
  id: number;
  degree: number;
  major: string;
  start_date: string;
  finish_date: string;
  school__name: string;
}

export interface EducationDeleteOptions {
  sid: string;
  education_id: number;
}

export interface WorkExperienceListOptions {
  sid: string;
  user_id?: number[];
}

export interface WorkExperienceAddOptions {
  company_name: string;
  job: string;
  project_name: string;
  sid: string;
  start: string;
  finish?: string;
}

export interface WorkExperienceDeleteOptions {
  sid: string;
  workexper_id: number;
}

export interface WorkExperienceUpdateOptions {
  company_name: string;
  finish: string;
  id: number;
  job: string;
  project_name: string;
  sid: string;
  start: string;
}

export interface PlatformWorkExperienceListOptions {
  sid: string;
  user_id?: number[];
}

/* ============================================================Bank card model================================================================== */

export interface WorkerBankNoListOptions {
  sid: string;
}

export interface WorkerBankNoAddOptions {
  sid: string;
  num: string;  //真恶心的东西，名字起个num，类型是string，再没有名字可起了？
  phone_num: string;
  user_id: number;
  is_master:boolean; //这都知道加下划线，返回字段的名字为啥就没有那个下划线?
}

export interface WorkerBankNoDeleteOptions {
  sid: string;
  card_id: number; //文档上这里是个string, 响应的字段是number，所以把这里的改了；
}

export enum BankCardSetting {
  cancel = 1,
  setting
}

export interface SetBankNoMasterOptions {
  sid: string;
  bankno_id: number;
  flag: number; // 1 cancel 2 setting; 脑子有泡吧，就是设置是否主卡，true/false就完事了还弄个1,2;
}

export interface BankInfoOptions {
  sid: string;
  num: string;
}

/*=================================================Logout API model==================================================*/

export interface LogoutOptions {
  sid: string;
}

/*=================================================Work flow API model==================================================*/

export enum RequestStatus {
  processing = '处理中',
  completed = '完成',
  canceled = '取消'
}

export enum TaskStatus {
  processing = '处理中',
  completed = '完成'
}

export type Options = LoginOptions
  & AttendanceCardAddOptions
  & AttendanceCardDeleteOptions
  & AttendanceCardListOptions
  & AttendanceCardUpdateOptions
  & AttendanceInstantListOptions
  & AttendanceMachineListOptions
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
