import { GetHistoryLocationListAction, GetProjectAreaListAction } from './../../actions/action/location-action';
import { GetLocationCardListAction, AddLocationCardAction, UpdateLocationCardAction, DeleteLocationCardAction } from './../../actions/action/location-card-action';
import { GetAttendanceCardListAction, AddAttendanceCardAction, UpdateAttendanceCardAction, DeleteAttendanceCardAction } from './../../actions/action/attendance-card-action';
import { GetAttendanceMachineListAction } from './../../actions/action/attendance-machine-action';
import { GetBasicInformationAction, GetPersonalIdListAction, GetWorkerDetailListAction, UpdateWorkerDetailAction, GetHomeInfoListAction, UpdateHomeInfoAction, GetEducationListAction, AddEducationAction, DeleteEducationAction, UpdateEducationAction } from './../../actions/action/personal-action';
import { AddTeamAction, UpdateTeamAction, DeleteTeamAction } from './../../actions/action/team-action';
import { GetCompanyUserListAction } from './../../actions/action/employer-action';
import { GetProjectPayProcessListAction, GetProjectPayBillListAction, GetPayProcessListAction } from './../../actions/action/pay-bill-action';
import { RequestAggregationOptions, ProjectPayProcessListOptions, LoginOptions, PhoneVerificationCodeOptions, RegisterOptions, ResetPasswordOptions, CertificateOptions, UploadImageOptions, WorkerContractOptions, TeamListOptions, AttendanceResultListOptions, AttendanceInstantListOptions, PayBillListOptions, WorkPieceListOptions, WorkOvertimeRecordListOptions, ProjectPayBillListOptions, PayProcessListOptions, CompanyUserListOptions, TeamAddOptions, TeamUpdateOptions, TeamDeleteOptions, BasicInfoListOptions, AttendanceMachineListOptions, AttendanceCardListOptions, AttendanceCardAddOptions, AttendanceCardUpdateOptions, AttendanceCardDeleteOptions, LocationCardListOptions, LocationCardAddOptions, LocationCardUpdateOptions, LocationCardDeleteOptions, HistoryLocationListOptions, ProjectAreaListOptions, PersonalIdListOptions, WorkerDetailListOptions, WorkerDetailUpdateOptions, HomeInfoListOptions, HomeInfoUpdateOptions, EducationListOptions, EducationAddOptions, EducationDeleteOptions, EducationUpdateOptions } from './../../interfaces/request-interface';
import { GetAttendanceResultTeamStatListAction, GetWorkFlowStatisticsAction } from './../../actions/action/statistics-action';
import { AttendanceResultTeamStatListOptions } from './../../interfaces/request-interface';
import { LoginAction, RegisterAction, RegisterPhoneVerCodeAction, ResetPasswordAction, ResetPhoneVerCodeAction } from '../../actions/action/login-action';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectSid } from '../../reducers/index-reducer';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../errors/error-service';
import { Subscription } from 'rxjs/Subscription';
import { MapperService } from './mapper-service';
import { CertificateAction } from '../../actions/action/certificate-action';
import 'rxjs';
import { Command } from './command';
import { UploadService } from './upload-service';
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
//endregion

@Injectable()
export class ProcessorService extends MapperService {

  constructor(
    public store: Store<AppState>,
    public errorService: ErrorService,
    public uploadService: UploadService,
    public command: Command,
    public permission: PermissionService
  ) {
    super();
  }

  loginProcessor(option$: Observable<LoginOptions>): Subscription {
    return option$.subscribe(option => this.store.dispatch(new LoginAction(option)));
  }

  /**
   * FIXME NO.1
   * @description 后台把注册和重置密码的手机验证码分成了2个接口，其逻辑和参数完全相同。所以这里分成2个函数处理，phoneVerificationProcessor
   * 处理注册时的手机验证码，resetPhoneVerificationProcessor处理重置密码时的手机验证码。
   * */
  phoneVerificationProcessor(option$: Observable<PhoneVerificationCodeOptions>): Subscription {
    return option$.subscribe(option => {
      if (option.captcha_code === '') {
        this.errorService.handleUIError('INPUT_IMAGE_VERIFICATION_TIP');
      } else {
        this.store.dispatch(new RegisterPhoneVerCodeAction(option));
      }
    })
  }

  resetPhoneVerificationProcessor(option$: Observable<PhoneVerificationCodeOptions>): Subscription {
    return option$.subscribe(option => {
      if (option.captcha_code === '') {
        this.errorService.handleUIError('INPUT_IMAGE_VERIFICATION_TIP');
      } else {
        this.store.dispatch(new ResetPhoneVerCodeAction(option));
      }
    })
  }

  registerProcessor(option$: Observable<RegisterOptions>): Subscription {
    return option$.subscribe(option => {
      this.store.dispatch(new RegisterAction(option));
    });
  }

  resetPwdProcessor(option$: Observable<ResetPasswordOptions>): Subscription {
    return option$.subscribe(option => {
      this.store.dispatch(new ResetPasswordAction(option));
    })
  }

  certificateProcessor(option$: Observable<CertificateOptions>, image$: Observable<UploadImageOptions>): Subscription {
    return this.uploadService.uploadImagesProcessor(image$, this.command.uploadPersonalIdImage)
      .map(responses => responses.every(res => {
        const result = JSON.parse(res.response);
        return res.responseCode === 200 && result.code === 1000;
      }))
      .withLatestFrom(option$)
      .subscribe(ary => {
        const [uploadSuccess, option] = ary;

        if (uploadSuccess) {
          this.store.dispatch(new CertificateAction(option));
        }
      });
  }

  projectListProcessor(): Subscription {
    const viewPermission$ = this.permission.apiPermissionValidate(this.command.projectList).map(result => result.view);

    const sid$ = this.store.select(selectSid);

    return viewPermission$.zip(sid$, (passed, sid) => passed ? { sid, prime_contract_status: '完成' } : null)
      .filter(res => !!res)
      .subscribe(option => this.store.dispatch(new GetProjectListAction(option)));
  }

  workerContractListProcessor(option$: Observable<WorkerContractOptions>): Subscription {
    const viewPermission$ = this.permission
      .apiPermissionValidate(this.command.workerContractList)
      .map(result => result.view);

    const specialOption$ = this.permission.specialOptionValidate(this.command.workerContractList);

    return viewPermission$.zip(
      specialOption$,
      option$,
      (passed, option1, option2) => passed ? { ...option1, ...option2 } : null
    )
      .filter(res => !!res)
      .subscribe(option => this.store.dispatch(new GetWorkerContractsAction(option)));
  }

  workTypeListProcessor(): void {
    this.store.dispatch(new GetWorkTypeListAction());
  }

  teamListProcessor(option$: Observable<TeamListOptions>): Subscription {
    return this.permission.comprehensiveValidate(this.command.teamList)
      .filter(res => res.permission.opt || res.permission.view)
      .zip(option$, (result, option) => ({ ...result.option, ...option }))
      .subscribe(option => {
        this.store.dispatch(new GetTeamListAction(option));
      });
  }

  attendanceListProcessor(option$: Observable<AttendanceResultListOptions>): Subscription {
    return this.permission.comprehensiveValidate(this.command.attendanceList)
      .filter(res => res.permission.view)
      .zip(option$, (result, option) => ({ ...result.option, ...option }))
      .subscribe(option => {
        this.store.dispatch(new GetAttendanceResultListAction(option));
      })
  }

  attendanceRecordListProcessor(option$: Observable<AttendanceInstantListOptions>): Subscription {
    return this.permission.comprehensiveValidate(this.command.attendanceInstantList)
      .filter(res => res.permission.view)
      .combineLatest(option$, (result, option) => ({ ...result.option, ...option }))
      .subscribe(option => this.store.dispatch(new GetAttendanceRecordAction(option)));
  }

  payBillListProcessor(option$: Observable<PayBillListOptions>): Subscription {
    return this.permission.comprehensiveValidate(this.command.payBillList)
      .filter(res => res.permission.view)
      .zip(option$, (result, option) => ({ ...result.option, ...option }))
      .subscribe(option => this.store.dispatch(new GetPayBillListAction(option)));
  }

  workPieceListProcessor(option$: Observable<WorkPieceListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.workPieceList)
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetWorkPieceListAction(option)));
  }

  workOvertimeRecordListProcessor(option$: Observable<WorkOvertimeRecordListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.workOvertimeRecordList)
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetWorkOvertimeRecordAction(option)));
  }

  attendanceResultTeamStatListProcessor(option$: Observable<AttendanceResultTeamStatListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.attendanceResultTeamStatList)
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetAttendanceResultTeamStatListAction(option)));
  }

  workFlowStatisticsProcessor(option$: Observable<RequestAggregationOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.workFlowStatistics)
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetWorkFlowStatisticsAction(option)));
  }

  projectPayProcessProcessor(option$: Observable<ProjectPayProcessListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.projectPayProcessList)
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetProjectPayProcessListAction(option)));
  }

  projectPayBillProcessor(option$: Observable<ProjectPayBillListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.projectPayBillList)
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetProjectPayBillListAction(option)));
  }

  payProcessProcessor(option$: Observable<PayProcessListOptions>): Subscription {
    return this.permission.comprehensiveValidate(this.command.payProcessList)
      .filter(result => result.permission.view)
      .zip(option$, (result, option) => ({ ...result.option, ...option }))
      .subscribe(option => this.store.dispatch(new GetPayProcessListAction(option)));
  }

  companyUserListProcessor(option$: Observable<CompanyUserListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.companyUserList)
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetCompanyUserListAction(option)));
  }

  teamAddProcessor(option$: Observable<TeamAddOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.teamAdd)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new AddTeamAction(option)));
  }

  teamUpdateProcessor(option$: Observable<TeamUpdateOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.teamUpdate)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new UpdateTeamAction(option)));
  }

  teamDeleteProcessor(option$: Observable<TeamDeleteOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.teamDelete)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new DeleteTeamAction(option)));
  }

  basicInfoListProcessor(option$: Observable<BasicInfoListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.basicInfoList)
      .filter(value => value.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetBasicInformationAction(option)));
  }

  attendanceMachineListProcessor(option$: Observable<AttendanceMachineListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.attendanceMachineList)
      .filter(value => value.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetAttendanceMachineListAction(option)));
  }

  attendanceCardListProcessor(option$: Observable<AttendanceCardListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.attendanceCardList)
      .filter(value => value.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetAttendanceCardListAction(option)));
  }

  attendanceCardAddProcessor(option$: Observable<AttendanceCardAddOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.attendanceCardAdd)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new AddAttendanceCardAction(option)));
  }

  attendanceCardUpdateProcessor(option$: Observable<AttendanceCardUpdateOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.attendanceCardUpdate)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new UpdateAttendanceCardAction(option)));
  }

  attendanceCardDeleteProcessor(option$: Observable<AttendanceCardDeleteOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.attendanceCardDelete)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new DeleteAttendanceCardAction(option)));
  }

  locationCardListProcessor(option$: Observable<LocationCardListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.locationCardList)
      .filter(value => value.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetLocationCardListAction(option)));
  }

  locationCardAddProcessor(option$: Observable<LocationCardAddOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.locationCardAdd)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new AddLocationCardAction(option)));
  }

  locationCardUpdateProcessor(option$: Observable<LocationCardUpdateOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.locationCardUpdate)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new UpdateLocationCardAction(option)));
  }

  locationCardDeleteProcessor(option$: Observable<LocationCardDeleteOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.locationCardDelete)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new DeleteLocationCardAction(option)));
  }

  historyLocationListProcessor(option$: Observable<HistoryLocationListOptions>): Subscription {
    return this.permission.comprehensiveValidate(this.command.historyLocationList)
      .filter(value => value.permission.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetHistoryLocationListAction(option)));
  }

  projectAreaListProcessor(option$: Observable<ProjectAreaListOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.projectAreaList)
      .filter(value => value.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetProjectAreaListAction(option)));
  }

  personalIdListProcessor(option$: Observable<PersonalIdListOptions>): Subscription {
    return this.permission.comprehensiveValidate(this.command.personalIdList)
      .filter(value => value.permission.view)
      .combineLatest(option$, (result, option) => Object.assign({}, result.option, option))
      .subscribe(option => this.store.dispatch(new GetPersonalIdListAction(option)));
  }

  workerDetailListProcessor(option$: Observable<WorkerDetailListOptions>): Subscription {
    return this.permission.comprehensiveValidate(this.command.workerDetailList)
      .filter(value => value.permission.view)
      .combineLatest(option$, (result, option) => ({ ...result.option, ...option }))
      .subscribe(option => this.store.dispatch(new GetWorkerDetailListAction(option)));
  }

  workerDetailUpdateProcessor(option$: Observable<WorkerDetailUpdateOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.workerDetailUpdate)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new UpdateWorkerDetailAction(option)));
  }

  homeInfoListProcessor(option$: Observable<HomeInfoListOptions>): Subscription {
    return this.permission.comprehensiveValidate(this.command.homeInfoList)
      .filter(value => value.permission.view)
      .combineLatest(option$, (result, option) => ({ ...result.option, ...option }))
      .subscribe(option => this.store.dispatch(new GetHomeInfoListAction(option)));
  }

  homeInfoUpdateProcessor(option$: Observable<HomeInfoUpdateOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.homeInfoUpdate)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new UpdateHomeInfoAction(option)));
  }

  educationListProcessor(option$: Observable<EducationListOptions>): Subscription {
    return this.permission.comprehensiveValidate(this.command.educationList)
      .filter(value => value.permission.view)
      .combineLatest(option$, (result, option) => ({ ...result.option, ...option }))
      .subscribe(option => this.store.dispatch(new GetEducationListAction(option)));
  }

  educationAddProcessor(option$: Observable<EducationAddOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.educationAdd)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new AddEducationAction(option)));
  }

  educationDeleteProcessor(option$: Observable<EducationDeleteOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.educationDelete)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new DeleteEducationAction(option)));
  }

  educationUpdateProcessor(option$: Observable<EducationUpdateOptions>): Subscription {
    return this.permission.apiPermissionValidate(this.command.educationUpdate)
      .filter(value => value.opt)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new UpdateEducationAction(option)));
  }
}