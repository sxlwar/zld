import { CheckPhoneNumberAction, ChangePhoneNumberAction, CheckPhoneVerifyAction, ChangePhoneVerifyAction } from './../../actions/action/account-change-action';
import { UploadPersonalIdImageAction } from './../../actions/action/certificate-action';
import { SearchCompanyAction } from './../../actions/action/search-company-action';
import { EditWorkerContractAction } from './../../actions/action/worker-action';
import { DeleteImagesAction } from './../../actions/action/delete-images-action';
import { SearchWorkerAction } from './../../actions/action/search-worker-action';
import { CreateWorkerContractAction, CreateWorkerContractModifyAction, CreateLeaveAction, CreateOvertimeAction, CreatePieceAuditAction, CreateAttendanceModifyAction, UploadWorkerContractAttachAction, UploadAttendanceModifyAttachAction, UploadLeaveAttachAction, UploadOvertimeAttachAction, UploadPieceAuditAttachAction, UploadWorkerContractModifyAttachAction } from './../../actions/action/launch-action';
import { GetLeaveRecordListAction } from './../../actions/action/leave-action';
import { GetWorkFlowListAction, GetProjectPayBillFlowListAction, UpdateMultiTaskAction, UpdateTaskAction } from './../../actions/action/work-flow-action';
import { GetGroupListAction } from './../../actions/action/group-list-action';
import { ConfirmAttendanceAction, GetAttendanceModifyRecordListAction } from './../../actions/action/attendance-action';
import { GetNationalityAction } from './../../actions/action/nationality-action';
import { GetMessageListAction, GetMessageContentAction, DeleteMessageAction, GetUnreadMessageCountAction } from './../../actions/action/message-action';
import { GetCertificateListAction, AddCertificateAction, DeleteCertificateAction, UpdateCertificateAction, UploadCertificateImageAction } from './../../actions/action/work-certificate-action';
import { QRLoginAction } from './../../actions/action/qr-scan-login-action';
import { LogoutAction } from './../../actions/action/logout-action';
import { GetBankCardListAction, GetBankInformationAction, AddBankCardAction, DeleteBankCardAction, SetMasterBankCardAction } from './../../actions/action/bank-card-action';
import { GetHistoryLocationListAction, GetProjectAreaListAction } from './../../actions/action/location-action';
import { GetLocationCardListAction, AddLocationCardAction, UpdateLocationCardAction, DeleteLocationCardAction } from './../../actions/action/location-card-action';
import { GetAttendanceCardListAction, AddAttendanceCardAction, UpdateAttendanceCardAction, DeleteAttendanceCardAction } from './../../actions/action/attendance-card-action';
import { GetAttendanceMachineListAction } from './../../actions/action/attendance-machine-action';
import { GetBasicInformationAction, GetPersonalIdListAction, GetWorkerDetailListAction, UpdateWorkerDetailAction, GetHomeInfoListAction, UpdateHomeInfoAction, GetEducationListAction, AddEducationAction, DeleteEducationAction, UpdateEducationAction, GetWorkExperienceListAction, AddWorkExperienceAction, DeleteWorkExperienceAction, UpdateWorkExperienceAction, GetPlatformWorkExperienceListAction } from './../../actions/action/personal-action';
import { AddTeamAction, UpdateTeamAction, DeleteTeamAction } from './../../actions/action/team-action';
import { GetCompanyUserListAction } from './../../actions/action/employer-action';
import { GetProjectPayProcessListAction, GetProjectPayBillListAction, GetPayProcessListAction } from './../../actions/action/pay-bill-action';
import { RequestAggregationOptions, ProjectPayProcessListOptions, LoginOptions, PhoneVerificationCodeOptions, RegisterOptions, ResetPasswordOptions, CertificateOptions, UploadPersonalIdImageOptions, WorkerContractOptions, TeamListOptions, AttendanceResultListOptions, AttendanceInstantListOptions, PayBillListOptions, WorkPieceListOptions, WorkOvertimeRecordListOptions, ProjectPayBillListOptions, CompanyUserListOptions, TeamAddOptions, TeamUpdateOptions, TeamDeleteOptions, BasicInfoListOptions, AttendanceMachineListOptions, AttendanceCardListOptions, AttendanceCardAddOptions, AttendanceCardUpdateOptions, AttendanceCardDeleteOptions, LocationCardListOptions, LocationCardAddOptions, LocationCardUpdateOptions, LocationCardDeleteOptions, HistoryLocationListOptions, ProjectAreaListOptions, PersonalIdListOptions, WorkerDetailListOptions, WorkerDetailUpdateOptions, HomeInfoListOptions, HomeInfoUpdateOptions, EducationListOptions, EducationAddOptions, EducationDeleteOptions, EducationUpdateOptions, WorkExperienceListOptions, WorkExperienceAddOptions, WorkExperienceDeleteOptions, WorkExperienceUpdateOptions, PlatformWorkExperienceListOptions, WorkerBankNoListOptions, BankInfoOptions, WorkerBankNoAddOptions, WorkerBankNoDeleteOptions, SetBankNoMasterOptions, LogoutOptions, QRLoginOptions, CertificateListOptions, CertificateAddOptions, CertificateDeleteOptions, CertificateUpdateOptions, UploadCertificateImageOptions, MessageListOptions, MessageContentOptions, MessageDeleteOptions, UnreadMessageCountOptions, AttendanceResultConfirmOptions, GroupsListOptions, WorkFlowListOptions, ProjectPayBillFlowListOptions, MultiTaskUpdateOptions, TaskUpdateOptions, LeaveRecordListOptions, AttendanceModifyRecordListOptions, CreateWorkerContractOptions, CreateWorkerContractModifyOptions, CreateLeaveOptions, CreateOvertimeOptions, CreatePieceAuditOptions, CreateAttendanceModifyOptions, DeleteImagesOptions, SearchWorkerOptions, WorkerContractEditOptions, SearchCompanyOptions, PayProcessListOptions, UploadWorkerContractAttachOptions, UploadAttendanceModifyAttachOptions, UploadLeaveAttachOptions, UploadOvertimeAttachOptions, UploadPieceAuditAttachOptions, UploadWorkerContractModifyAttachOptions, ProjectListOptions, WorkTypeRealTimeStatisticsOptions, TeamMembersRealTimeStatisticsOptions, CheckPhoneOptions, CheckPhoneVerifyCodeOptions, ChangePhoneVerifyCodeOptions, ChangePhoneOptions } from './../../interfaces/request-interface';
import { GetAttendanceResultTeamStatListAction, GetWorkFlowStatisticsAction, GetWorkTypeRealTimeStatisticsAction, GetTeamMembersRealTimeStatisticsAction } from './../../actions/action/statistics-action';
import { AttendanceResultTeamStatListOptions } from './../../interfaces/request-interface';
import { LoginAction, RegisterAction, RegisterPhoneVerCodeAction, ResetPasswordAction, ResetPhoneVerCodeAction } from '../../actions/action/login-action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index-reducer';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../errors/error-service';
import { Subscription } from 'rxjs/Subscription';
import { MapperService } from './mapper-service';
import { CertificateAction } from '../../actions/action/certificate-action';
import 'rxjs';
import { Command } from './command';
import { PermissionService } from '../config/permission-service';
import { GetProjectListAction } from '../../actions/action/project-action';
import { GetWorkerContractsAction } from '../../actions/action/worker-action';
import { GetWorkTypeListAction } from '../../actions/action/craft-action';
import { GetTeamListAction } from '../../actions/action/team-action';
import { GetAttendanceResultListAction } from '../../actions/action/attendance-action';
import { GetAttendanceRecordAction } from '../../actions/action/attendance-record-action';
import { GetPayBillListAction } from '../../actions/action/pay-bill-action';
import { GetWorkPieceListAction } from '../../actions/action/work-piece-action';
import { GetWorkOvertimeRecordAction } from '../../actions/action/overtime-action';

@Injectable()
export class ProcessorService extends MapperService {

    constructor(
        private store: Store<AppState>,
        private errorService: ErrorService,
        private command: Command,
        private permission: PermissionService
    ) {
        super();
    }

    loginProcessor(option: Observable<LoginOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new LoginAction(option)));
    }

    /**
     * FIXME NO.1
     * @description 后台把注册和重置密码的手机验证码分成了2个接口，其逻辑和参数完全相同。所以这里分成2个函数处理，phoneVerificationProcessor
     * 处理注册时的手机验证码，resetPhoneVerificationProcessor处理重置密码时的手机验证码。
     * */
    phoneVerificationProcessor(option: Observable<PhoneVerificationCodeOptions>): Subscription {
        return option.subscribe(option => {
            if (option.captcha_code === '') {
                this.errorService.handleUIError('INPUT_IMAGE_VERIFICATION_TIP');
            } else {
                this.store.dispatch(new RegisterPhoneVerCodeAction(option));
            }
        })
    }

    resetPhoneVerificationProcessor(option: Observable<PhoneVerificationCodeOptions>): Subscription {
        return option.subscribe(option => {
            if (option.captcha_code === '') {
                this.errorService.handleUIError('INPUT_IMAGE_VERIFICATION_TIP');
            } else {
                this.store.dispatch(new ResetPhoneVerCodeAction(option));
            }
        })
    }

    registerProcessor(option: Observable<RegisterOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new RegisterAction(option)));
    }

    resetPwdProcessor(option: Observable<ResetPasswordOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new ResetPasswordAction(option)));
    }

    searchCompanyProcessor(option: Observable<SearchCompanyOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new SearchCompanyAction(option)));
    }

    uploadPersonalIdImagesProcessor(option: Observable<UploadPersonalIdImageOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new UploadPersonalIdImageAction(option)));
    }

    certificateProcessor(option: Observable<CertificateOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new CertificateAction(option)));
    }

    projectListProcessor(options$: Observable<ProjectListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.projectList)
            .filter(result => result.view)
            .mergeMapTo(options$)
            .subscribe(option => this.store.dispatch(new GetProjectListAction(option)));
    }

    workerContractListProcessor(option: Observable<WorkerContractOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.workerContractList)
            .filter(result => result.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetWorkerContractsAction(option)));
    }

    workTypeListProcessor(): void {
        this.store.dispatch(new GetWorkTypeListAction());
    }

    teamListProcessor(option: Observable<TeamListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.teamList)
            .filter(res => res.permission.opt || res.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetTeamListAction(option)));
    }

    attendanceListProcessor(option: Observable<AttendanceResultListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.attendanceList)
            .filter(res => res.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetAttendanceResultListAction(option)));
    }

    attendanceRecordListProcessor(option: Observable<AttendanceInstantListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.attendanceInstantList)
            .filter(res => res.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetAttendanceRecordAction(option)));
    }

    payBillListProcessor(option: Observable<PayBillListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.payBillList)
            .filter(res => res.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetPayBillListAction(option)));
    }

    workPieceListProcessor(option: Observable<WorkPieceListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.workPieceList)
            .filter(result => result.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetWorkPieceListAction(option)));
    }

    workOvertimeRecordListProcessor(option: Observable<WorkOvertimeRecordListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.workOvertimeRecordList)
            .filter(result => result.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetWorkOvertimeRecordAction(option)));
    }

    attendanceResultTeamStatListProcessor(option: Observable<AttendanceResultTeamStatListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.attendanceResultTeamStatList)
            .filter(result => result.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetAttendanceResultTeamStatListAction(option)));
    }

    workFlowStatisticsProcessor(option: Observable<RequestAggregationOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.workFlowStatistics)
            .filter(result => result.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetWorkFlowStatisticsAction(option)));
    }

    projectPayProcessProcessor(option: Observable<ProjectPayProcessListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.projectPayProcessList)
            .filter(result => result.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetProjectPayProcessListAction(option)));
    }

    projectPayBillProcessor(option: Observable<ProjectPayBillListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.projectPayBillList)
            .filter(result => result.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetProjectPayBillListAction(option)));
    }

    payProcessProcessor(option: Observable<PayProcessListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.payProcessList)
            .filter(result => result.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetPayProcessListAction(option)));
    }

    companyUserListProcessor(option: Observable<CompanyUserListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.companyUserList)
            .filter(result => result.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetCompanyUserListAction(option)));
    }

    teamAddProcessor(option: Observable<TeamAddOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.teamAdd)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new AddTeamAction(option)));
    }

    teamUpdateProcessor(option: Observable<TeamUpdateOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.teamUpdate)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new UpdateTeamAction(option)));
    }

    teamDeleteProcessor(option: Observable<TeamDeleteOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.teamDelete)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new DeleteTeamAction(option)));
    }

    basicInfoListProcessor(option: Observable<BasicInfoListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.basicInfoList)
            .filter(value => value.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetBasicInformationAction(option)));
    }

    attendanceMachineListProcessor(option: Observable<AttendanceMachineListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.attendanceMachineList)
            .filter(value => value.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetAttendanceMachineListAction(option)));
    }

    attendanceCardListProcessor(option: Observable<AttendanceCardListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.attendanceCardList)
            .filter(value => value.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetAttendanceCardListAction(option)));
    }

    attendanceCardAddProcessor(option: Observable<AttendanceCardAddOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.attendanceCardAdd)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new AddAttendanceCardAction(option)));
    }

    attendanceCardUpdateProcessor(option: Observable<AttendanceCardUpdateOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.attendanceCardUpdate)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new UpdateAttendanceCardAction(option)));
    }

    attendanceCardDeleteProcessor(option: Observable<AttendanceCardDeleteOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.attendanceCardDelete)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new DeleteAttendanceCardAction(option)));
    }

    locationCardListProcessor(option: Observable<LocationCardListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.locationCardList)
            .filter(value => value.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetLocationCardListAction(option)));
    }

    locationCardAddProcessor(option: Observable<LocationCardAddOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.locationCardAdd)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new AddLocationCardAction(option)));
    }

    locationCardUpdateProcessor(option: Observable<LocationCardUpdateOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.locationCardUpdate)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new UpdateLocationCardAction(option)));
    }

    locationCardDeleteProcessor(option: Observable<LocationCardDeleteOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.locationCardDelete)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new DeleteLocationCardAction(option)));
    }

    historyLocationListProcessor(option: Observable<HistoryLocationListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.historyLocationList)
            .filter(value => value.permission.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetHistoryLocationListAction(option)));
    }

    projectAreaListProcessor(option: Observable<ProjectAreaListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.projectAreaList)
            .filter(value => value.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetProjectAreaListAction(option)));
    }

    personalIdListProcessor(option: Observable<PersonalIdListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.personalIdList)
            .do(v => console.log(v))
            .filter(value => value.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetPersonalIdListAction(option)));
    }

    workerDetailListProcessor(option: Observable<WorkerDetailListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.workerDetailList)
            .filter(value => value.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetWorkerDetailListAction(option)));
    }

    workerDetailUpdateProcessor(option: Observable<WorkerDetailUpdateOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.workerDetailUpdate)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new UpdateWorkerDetailAction(option)));
    }

    homeInfoListProcessor(option: Observable<HomeInfoListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.homeInfoList)
            .filter(value => value.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetHomeInfoListAction(option)));
    }

    homeInfoUpdateProcessor(option: Observable<HomeInfoUpdateOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.homeInfoUpdate)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new UpdateHomeInfoAction(option)));
    }

    educationListProcessor(option: Observable<EducationListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.educationList)
            .filter(value => value.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetEducationListAction(option)));
    }

    educationAddProcessor(option: Observable<EducationAddOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.educationAdd)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new AddEducationAction(option)));
    }

    educationDeleteProcessor(option: Observable<EducationDeleteOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.educationDelete)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new DeleteEducationAction(option)));
    }

    educationUpdateProcessor(option: Observable<EducationUpdateOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.educationUpdate)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new UpdateEducationAction(option)));
    }

    workExperienceListProcessor(option: Observable<WorkExperienceListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.workExperienceList)
            .filter(value => value.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetWorkExperienceListAction(option)));
    }

    workExperienceAddProcessor(option: Observable<WorkExperienceAddOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.workExperienceAdd)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new AddWorkExperienceAction(option)));
    }

    workExperienceDeleteProcessor(option: Observable<WorkExperienceDeleteOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.workExperienceDelete)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new DeleteWorkExperienceAction(option)));
    }

    workExperienceUpdateProcessor(option: Observable<WorkExperienceUpdateOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.workExperienceUpdate)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new UpdateWorkExperienceAction(option)));
    }

    platformWorkExperienceListProcessor(option: Observable<PlatformWorkExperienceListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.platformWorkExperienceList)
            .filter(value => value.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetPlatformWorkExperienceListAction(option)));
    }

    bankCardListProcessor(option: Observable<WorkerBankNoListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.workerBankNoList)
            .filter(value => value.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetBankCardListAction(option)));
    }

    bankInformationProcessor(option: Observable<BankInfoOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.bankInfo)
            .filter(value => value.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetBankInformationAction(option)));
    }

    bankCardAddProcessor(option: Observable<WorkerBankNoAddOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.workerBankNoAdd)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new AddBankCardAction(option)))
    }

    bankCardDeleteProcessor(option: Observable<WorkerBankNoDeleteOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.workerBankNoDelete)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new DeleteBankCardAction(option)));
    }

    setMasterBankCardProcessor(option: Observable<SetBankNoMasterOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.setBankNoMaster)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new SetMasterBankCardAction(option)));
    }

    logoutProcessor(option: Observable<LogoutOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new LogoutAction(option)));
    }

    qrLoginProcessor(option: Observable<QRLoginOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new QRLoginAction(option)));
    }

    certificateListProcessor(option: Observable<CertificateListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.certificateList)
            .filter(value => value.permission.view)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetCertificateListAction(option)));
    }

    certificateAddProcessor(option: Observable<CertificateAddOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.certificateAdd)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new AddCertificateAction(option)));
    }

    certificateDeleteProcessor(option: Observable<CertificateDeleteOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.certificateDelete)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new DeleteCertificateAction(option)));
    }

    certificateUpdateProcessor(option: Observable<CertificateUpdateOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.certificateUpdate)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new UpdateCertificateAction(option)));
    }

    certificateImageUploadProcessor(option: Observable<UploadCertificateImageOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new UploadCertificateImageAction(option)));
    }

    messageListProcessor(option: Observable<MessageListOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new GetMessageListAction(option)));
    }

    messageContentProcessor(option: Observable<MessageContentOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new GetMessageContentAction(option)));
    }

    messageDeleteProcessor(option: Observable<MessageDeleteOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new DeleteMessageAction(option)));
    }

    unreadMessageCountProcessor(option: Observable<UnreadMessageCountOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new GetUnreadMessageCountAction(option)));
    }

    nationalityProcessor(): void {
        this.store.dispatch(new GetNationalityAction());
    }

    attendanceResultConfirmProcessor(option: Observable<AttendanceResultConfirmOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new ConfirmAttendanceAction(option)));
    }

    groupListProcessor(option: Observable<GroupsListOptions>): Subscription {
        return this.permission.specialOptionValidate(this.command.groupsList)
            .combineLatest(option, (result, option) => ({ ...result, ...option }))
            .subscribe(option => this.store.dispatch(new GetGroupListAction(option)));
    }

    workFlowListProcessor(option: Observable<WorkFlowListOptions>): Subscription {
        return this.permission.comprehensiveValidate(this.command.workFlowList)
            .combineLatest(option, (result, option) => ({ ...result.option, ...option }))
            .subscribe(option => this.store.dispatch(new GetWorkFlowListAction(option)));
    }

    projectPayBillFlowListProcessor(option: Observable<ProjectPayBillFlowListOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new GetProjectPayBillFlowListAction(option)));
    }

    multiTaskUpdateProcessor(option: Observable<MultiTaskUpdateOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new UpdateMultiTaskAction(option)));
    }

    /**
     * FIXME: unused;
     */
    taskUpdateProcessor(option: Observable<TaskUpdateOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new UpdateTaskAction(option)));
    }

    leaveRecordListProcessor(option: Observable<LeaveRecordListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.leaveRecordList)
            .filter(value => value.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetLeaveRecordListAction(option)));
    }

    attendanceModifyRecordListProcessor(option: Observable<AttendanceModifyRecordListOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.attendanceModifyRecordList)
            .filter(value => value.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetAttendanceModifyRecordListAction(option)));
    }

    multiProcessCreateProcessor(): Observable<boolean> {
        return this.permission.apiPermissionValidate(this.command.multiProcessCreate)
            .map(value => value.opt)
            .filter(value => !!value);
    }

    processCreateProcessor(): Observable<boolean> {
        return this.permission.apiPermissionValidate(this.command.processCreate)
            .map(value => value.opt)
            .filter(value => !!value);
    }

    createWorkerContractProcessor(option: Observable<CreateWorkerContractOptions>): Subscription {
        return this.multiProcessCreateProcessor()
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new CreateWorkerContractAction(option)));
    }

    createWorkerContractModifyProcessor(option: Observable<CreateWorkerContractModifyOptions>): Subscription {
        return this.processCreateProcessor()
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new CreateWorkerContractModifyAction(option)));
    }

    createLeaveProcessor(option: Observable<CreateLeaveOptions>): Subscription {
        return this.processCreateProcessor()
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new CreateLeaveAction(option)));
    }

    createOvertimeProcessor(option: Observable<CreateOvertimeOptions>): Subscription {
        return this.processCreateProcessor()
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new CreateOvertimeAction(option)));
    }

    createPieceAuditProcessor(option: Observable<CreatePieceAuditOptions>): Subscription {
        return this.processCreateProcessor()
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new CreatePieceAuditAction(option)));
    }

    createAttendanceModifyProcessor(option: Observable<CreateAttendanceModifyOptions>): Subscription {
        return this.multiProcessCreateProcessor()
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new CreateAttendanceModifyAction(option)));
    }

    deleteImagesProcessor(option: Observable<DeleteImagesOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new DeleteImagesAction(option)));
    }

    searchWorkerProcessor(option: Observable<SearchWorkerOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.searchWorker)
            .filter(value => value.view)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new SearchWorkerAction(option)));
    }

    workerContractEditProcessor(option: Observable<WorkerContractEditOptions>): Subscription {
        return this.permission.apiPermissionValidate(this.command.workerContractEdit)
            .filter(value => value.opt)
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new EditWorkerContractAction(option)));
    }

    uploadWorkerContractAttachProcessor(option: Observable<UploadWorkerContractAttachOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new UploadWorkerContractAttachAction(option)));
    }

    uploadAttendanceModifyAttachProcessor(option: Observable<UploadAttendanceModifyAttachOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new UploadAttendanceModifyAttachAction(option)));
    }

    uploadLeaveAttachProcessor(option: Observable<UploadLeaveAttachOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new UploadLeaveAttachAction(option)));
    }

    uploadOvertimeAttachProcessor(option: Observable<UploadOvertimeAttachOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new UploadOvertimeAttachAction(option)));
    }

    uploadPieceAuditAttachProcessor(option: Observable<UploadPieceAuditAttachOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new UploadPieceAuditAttachAction(option)));
    }

    uploadWorkerContractModifyAttachProcessor(option: Observable<UploadWorkerContractModifyAttachOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new UploadWorkerContractModifyAttachAction(option)));
    }

    uploadWorkerContractEditAttachProcessor(option: Observable<UploadWorkerContractAttachOptions>): Subscription {
        return this.uploadWorkerContractAttachProcessor(option);
    }

    workTypeRealTimeStatisticsProcessor(option: Observable<WorkTypeRealTimeStatisticsOptions>): Subscription {
        return this.realTimeStatisticsProcessor()
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetWorkTypeRealTimeStatisticsAction(option)));
    }

    teamMembersRealTimeStatisticsProcessor(option: Observable<TeamMembersRealTimeStatisticsOptions>): Subscription {
        return this.realTimeStatisticsProcessor()
            .mergeMapTo(option)
            .subscribe(option => this.store.dispatch(new GetTeamMembersRealTimeStatisticsAction(option)));
    }

    private realTimeStatisticsProcessor(): Observable<boolean> {
        return this.permission.apiPermissionValidate(this.command.attendanceResultTeamStatList)
            .filter(value => value.view)
            .mapTo(true);
    }

    changePhoneProcessor(option: Observable<ChangePhoneOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new ChangePhoneNumberAction(option)));
    }

    changePhoneVerifyProcessor(option: Observable<ChangePhoneVerifyCodeOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new ChangePhoneVerifyAction(option)));
    }

    checkPhoneProcessor(option: Observable<CheckPhoneOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new CheckPhoneNumberAction(option)));
    }

    checkPhoneVerifyProcessor(option: Observable<CheckPhoneVerifyCodeOptions>): Subscription {
        return option.subscribe(option => this.store.dispatch(new CheckPhoneVerifyAction(option)))
    }

}
