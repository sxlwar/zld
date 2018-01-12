
export interface WsRequest {
    command: { path: string };
    parameters: object;
}

export interface RequestOption {
    [key: string]: string | number | number[] | string[] | boolean;
}

/*===========================================================Common model options======================================================*/

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


export interface NationalityOptions {

}

export interface GroupsListOptions {
    sid: string;
}

export enum CertificateStatus {
    noCertificate,
    available,
    overdue
}

export interface SearchWorkerOptions {
    sid: string;
    worktype_id?: number;
    group_name?: string;
    nationality?: string;
    personalIdNum?: string;
    username?: string;
    sex?: string;
    age_range?: string; //e.g.: '11-22';
    province?: string;
    realname?: string;
    flag?: string; // 1 下属 2 没有合同或合同过期的
    page?: number;
    limit?: number;
    contract_search?: string; //在创建用工合同的时候搜索使用该参数，该参数值为工种id ，如果有此参数会增加2个字段 userpersonal_idnum和cer_status
    userpersonal_idnum?: string; // 身份证号
    cer_status?: number;
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

export interface EditTimePayOptions extends LaunchTimePayOptions {
    id: number; //垃圾文档，用工合同计时id, 计时下面有个狗屁的ID。
}

export interface EditPiecePayOptions extends LaunchPiecePayOptions {
    id?: number;
}

export interface EditWorkerContractOptions {
    morning_time_on_duty: string;
    morning_time_off_duty: string;
    afternoon_time_on_duty?: string;
    afternoon_time_off_duty?: string;
    finish_day: string;
    pay_day: string;
    additional_content: string;
}

export interface WorkerContractEditOptions {
    sid: string;
    contract_id: number;
    attach?: string[]; // custom field delete in command before request;
    worker_contract: EditWorkerContractOptions;
    work_time_pay?: EditTimePayOptions[];
    work_piece_pay?: EditPiecePayOptions[];
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

export interface AttendanceResultConfirmOptions {
    sid: string;
    attendance_result_id: number[]; // 复数，复数，复数，操！
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
    is_master: boolean; //这都知道加下划线，返回字段的名字为啥就没有那个下划线?
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

/* ================================================Certificate API model========================================== */

export interface CertificateListOptions {
    sid: string;
    user_id?: number[];
}

//注意又是个2B接口，要放到work_certificate_form字段下
export interface CertificateAddOptions { //名字给改了，不知道为什么这个接口的增加就是create,其它的就是add，为了保持统一，改成add
    sid: string;
    worktype_id: number;
    num: string;  //2B名字，其实是证书号。
    firstget_date: string;
    usestart_date: string;
    usefinish_date: string;
    education: string;  // 值必须是degrees中的一个。
    mechanism: string;
    imageface?: string; //这两个字段理应属于此表单，即使它们走的是HTTP。
    imageback?: string;
}

export interface CertificateDeleteOptions {
    sid: string;
    work_certificate_id: number;
}

//一样，是挂在work_certificate_form字段下
export interface CertificateUpdateOptions {
    sid: string;
    id: number;
    worktype_id: number;
    num: string;
    firstget_date: string;
    usestart_date: string;
    usefinish_date: string;
    education: string;
    mechanism: string;
    imageface?: string; //这两个字段理应属于此表单，即使它们走的是HTTP。
    imageback?: string;
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

/** 又是两个2B接口，multiTaskUpdateOptions 和 taskUpdateOptions，格式:
 *  `{
 *    sid: string;
 *    task: {...}; 
 * }` 
 */
export interface MultiTaskUpdateOptions {
    sid: string;
    id: number[]; // task ids;
    approve: number; // 文档上是string,实际传的倒是number；1，通过，0，不通过，这还不就是true/false,又搞这魔鬼数字；
    comment: string;
}

export interface TaskUpdateOptions {
    sid: string;
    id: number;
    approve: number; //同上
    comment: string;
}

export enum WorkFlowStatus {
    cancel = '取消',
    complete = '完成',
    processing = '处理中'
}

export interface ProjectPayBillFlowListOptions {
    sid: string;
    id?: number; //工资单审核流的ID; 这TMD名字就不能起的清楚点?
    project_id?: number;
    request_id?: number; // 工作流ID；
    request_status?: string;  //又TMD得传中文了；workFlowStatus
}

export enum ProcessId {
    sign_prime_contract = '签订总包合同',
    sign_sub_contract = '签订劳务分包合同',
    sign_worker_contract = '签订用工合同',
    prime_contract_time_change = '修改总包合同时间',
    sub_contract_time_change = '修改劳务分包合同时间',
    worker_contract_time_change = '修改用工合同时间',
    amend_worker_attend = '修正工人考勤异常',
    workpiece_finish = '工件完成工作流',
    leave_apply = '请假工作流',
    workovertime_apply = '加班工作流',
    timeduty_apply = '修改出勤时间工作流',
    project_payflow_apply = '项目工资对帐单审核工作流'
}

export enum ProcessIdOptions {
    primaryContract = 'sign_prime_contract',
    subcontract = 'sign_sub_contract',
    workerContract = 'sign_worker_contract',
    primaryContractExpire = 'prime_contract_time_change',
    subcontractExpire = 'sub_contract_time_change',
    workerContractExpire = 'worker_contract_time_change',
    attendanceModify = 'amend_worker_attend',
    pieceAudit = 'workpiece_finish',
    leave = 'leave_apply',
    overtime = 'workovertime_apply',
    duty = 'timeduty_apply',
    projectPayFlow = 'project_payflow_apply'
}

export enum SpecificWorkFlowState {
    launch = 'launch',
    completed = 'complete',
    pending = 'pending'
}

export interface WorkFlowListOptions {  //这名字，果断改了; requestList，这两个单词和工作流有几吧的关系。
    flag?: number; //又是魔鬼参数需要处理
    limit: number;
    page: number;
    process_id?: string; //非常恶心的东西，明明叫ID，传个数字多好，弄个字符串到中方的映射，太TMD奇葩了, 然后返回的request_types再返回一段中文，python难道是中文开发语言？
    request_id?: number; //文档上string
    request_status?: string;
    sid: string;
    user_id?: number;
    user_realname?: string; // 这个字段类型怎么可能是int?  
}

/* ====================================================Leave model============================================= */

export interface LeaveRecordListOptions {
    end_day?: string; // 我操，这居然用的是end，其它地方用的是finish,是不是一个写的代码
    history_view: string;
    limit?: string;
    page?: string;
    project_id?: string; //文档上是必选参数，看了一下v1的参数，根本没有传;
    request_id?: number;
    request_status?: string; //WorkFlowStatus;
    sid: string;
    start_day?: string;
    team_id?: number[]; // 2B字段，复数
    user_id?: number[]; // 2B字段, 复数
}

/* ====================================================Attendance modify model============================================= */

export interface AttendanceModifyRecordListOptions { //名字改了
    end_day?: string; // 我操，这居然用的是end，其它地方用的是finish,是不是一个写的代码
    history_view: string;
    request_id?: number;
    request_status?: string; //WorkFlowStatus;
    sid: string;
    start_day?: string;
    team_id?: number[]; // 2B字段，复数
    user_id?: number[]; // 2B字段, 复数
}

/* ====================================================Message model============================================= */

export interface UnreadMessageCountOptions {
    sid: string;
}

export enum MessageReadTag {
    unread = 1,
    read
}

export enum MessageTag {
    systemNotification = 1,
    missionNotification
}

export interface MessageListOptions { // 名字改了，为毛有title这个词，下面2个也一样
    sid: string;
    page: number;
    limit: number;
    read_tag?: number;
    msg_tag?: number;
}

export interface MessageDeleteOptions {
    sid: string;
    title_ids: number[];  // message ids 这名字起的蛋都碎了。
}

export interface MessageContentOptions {
    sid: string;
    title_id: number;
}

/* ==========================================================Launch options============================================================ */

export interface LaunchTimePayOptions {
    time_unit?: string; // 常量传个毛线； ‘小时’
    pay_mount: number;
    overtime_pay_mount: number;
    content: string;
}

export interface LaunchPiecePayOptions {
    name: string;
    location: string;
    pay_mount: number;
    num: number;
    standard?: string;
}

export enum WorkerContractFormType {
    timePayType = '1',
    pieceType = '2'
}

export interface LaunchWorkerContractOptions {
    team_id: number;
    worktype_id: number;
    worker_id: number[]; //单人的参数没个鸟用，可以直接用多人的传一个ID就行。
    start_day: string;
    finish_day: string;
    pay_day: number;
    morning_time_on_duty: string;
    morning_time_off_duty: string;
    afternoon_time_on_duty?: string;
    afternoon_time_off_duty?: string;
    additional_content?: string;
    attach?: string[];
    formType?: string;
}

export interface LaunchWorkerContractModifyOptions {
    date_after: string;
    contract_id: number;
    attach?: string[];
}

export interface LaunchLeaveOptions {
    type: string; // 这传的又TMD是中文
    start: string;
    finish: string;
    reason: string;
    contracts_id: number[]; // 脑子有泡吧，工人要请假肯定要工人的ID，还能要合同ID？ 什么几吧逻辑。
    attach?: string[];
}

export interface LaunchOvertimeOptions {
    type: string;
    day: string;
    start: string;
    finish: string;
    reason: string;
    contracts_id: number[];
    attach?: string[];
}

export interface LaunchAttendanceModifyOptions {
    result_id: number[]; // 一样的,单人的参数没有卵用， 就是实际是attendance result id ,这名字起的，不看文档谁知道是啥结果的ID, 明明传列表还用个单数，一个字段都定义不好。
    on_duty: string;
    off_duty: string;
    reason: string;
    attach?: string[];
}

export interface LaunchPieceAuditOptions {
    num: number;
    finish_date: string;
    comment: string;
    quality_percent: number;
    work_piece_pay_id: number;
    attach?: string[];
}

//接口名字改了，拆分到各个业务的接口中。
export interface ProcessCreateOptions {
    sid: string;
    //实际是必选参数，性质和command path 一样所以由command服务进行添加；
    flow_name?: string; // 自己起的名字都不一样，其它地方不是叫process_id？
}

export interface MultiProcessCreateOptions extends ProcessCreateOptions {
}

// worker contract process create
export interface CreateWorkerContractOptions extends MultiProcessCreateOptions {
    worker_contract: LaunchWorkerContractOptions;
    work_time_pay?: LaunchTimePayOptions[];
    work_piece_pay?: LaunchPiecePayOptions[];
}

// leave
export interface CreateLeaveOptions extends ProcessCreateOptions {
    leave: LaunchLeaveOptions;
}

// worker contract modify
export interface CreateWorkerContractModifyOptions extends ProcessCreateOptions {
    contract_time_change_flow: LaunchWorkerContractModifyOptions;
}

// overtime 
export interface CreateOvertimeOptions extends ProcessCreateOptions {
    work_over_time: LaunchOvertimeOptions;
}

// piece audit
export interface CreatePieceAuditOptions extends ProcessCreateOptions {
    work_piece_finish_flow: LaunchPieceAuditOptions;
}

//attendance modify
export interface CreateAttendanceModifyOptions extends MultiProcessCreateOptions {
    attend_amend: LaunchAttendanceModifyOptions;
}

/* ==========================================================Image delete options============================================================ */

export interface DeleteImagesOptions { // 名字改了，deleteFiles
    sid: string;
    type: string;
    command: string;
    id?: string;
}

/* ==========================================================Http request options============================================================ */

// query version
export interface VersionOptions {
    version?: string;
}

//qr login
export interface QRLoginOptions {
    sid: string;
    qr_sid: string;
}

export enum ImageFace {
    front = 'imageface',
    back = 'imageback'
}

export interface UploadFileOptions {
    sid: string;
    command?: string;  // This filed is a necessary filed but set as optional here, it would be added at command service before request send.
}

// upload personal id images
export interface UploadPersonalIdImageOptions extends UploadFileOptions {
    type: string; //ImageFace
    file: string;
}

//upload certificate images
export interface UploadCertificateImageOptions extends UploadFileOptions {
    id: number; //certificate id
    type: string; //ImageFace
    file: string;
}

//upload work flow attachment
export interface UploadWorkFlowAttachmentOptions extends UploadFileOptions {
    id: number; //task id
    type: string; // constant 'attachment';
    file: string;
}

//upload leave task attachment
export interface UploadLeaveAttachOptions extends UploadFileOptions {
    id: number; //task id
    type: string; //constant 'attachment';
    file: string;
}

//upload overtime attachment
export interface UploadOvertimeAttachOptions extends UploadFileOptions {
    id: number; //task id
    type: string; //constant 'attachment';
    file: string;
}

export interface UploadWorkerContractAttachOptions extends UploadFileOptions {
    id: number; //worker contract id
    file: string;
}

export interface UploadAttendanceModifyAttachOptions extends UploadFileOptions {
    id: string; //这TMD居然要传字符串；
    file: string;
}

// upload piece audit attachment
export interface UploadPieceAuditAttachOptions extends UploadWorkFlowAttachmentOptions {

}

// upload worker contract modify attachment
export interface UploadWorkerContractModifyAttachOptions extends UploadWorkFlowAttachmentOptions {

}

export type UploadOptions = UploadPersonalIdImageOptions
    | UploadCertificateImageOptions
    | UploadWorkFlowAttachmentOptions
    | UploadLeaveAttachOptions
    | UploadOvertimeAttachOptions
    | UploadPieceAuditAttachOptions
    | UploadWorkerContractModifyAttachOptions;

export type AttachOptions = UploadWorkerContractAttachOptions
    | UploadAttendanceModifyAttachOptions;