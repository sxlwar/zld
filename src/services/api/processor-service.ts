import { GetProjectPayProcessListAction, GetProjectPayBillListAction, GetPayProcessListAction } from './../../actions/action/pay-bill-action';
import { RequestAggregationOptions, ProjectPayProcessListOptions, LoginOptions, PhoneVerificationCodeOptions, RegisterOptions, ResetPasswordOptions, CertificateOptions, UploadImageOptions, WorkerContractOptions, TeamListOptions, AttendanceResultListOptions, AttendanceInstantListOptions, PayBillListOptions, WorkPieceListOptions, WorkOvertimeRecordListOptions, ProjectPayBillListOptions, PayProcessListOptions } from './../../interfaces/request-interface';
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
    const permissionResult = this.permission.comprehensiveValidate(this.command.teamList);

    return permissionResult
      .filter(res => res.permission.opt || res.permission.view)
      .zip(option$, (result, option) => Object.assign({}, option, result.option))
      .subscribe(option => {
        this.store.dispatch(new GetTeamListAction(option));
      });
  }

  attendanceListProcessor(option$: Observable<AttendanceResultListOptions>): Subscription {
    const permissionResult = this.permission.comprehensiveValidate(this.command.attendanceList);

    return permissionResult
      .filter(res => res.permission.view)
      .zip(option$, (result, option) => Object.assign({}, option, result.option))
      .subscribe(option => {
        this.store.dispatch(new GetAttendanceResultListAction(option));
      })
  }

  attendanceRecordListProcessor(option$: Observable<AttendanceInstantListOptions>): Subscription {
    const permissionResult = this.permission.comprehensiveValidate(this.command.attendanceInstantList);

    return permissionResult
      .filter(res => res.permission.view)
      .zip(option$, (result, option) => Object.assign({}, option, result.option))
      .subscribe(option => this.store.dispatch(new GetAttendanceRecordAction(option)));
  }

  payBillListProcessor(option$: Observable<PayBillListOptions>): Subscription {
    const permissionResult = this.permission.comprehensiveValidate(this.command.payBillList);

    return permissionResult
      .filter(res => res.permission.view)
      .zip(option$, (result, option) => Object.assign({}, option, result.option))
      .subscribe(option => this.store.dispatch(new GetPayBillListAction(option)));
  }

  workPieceListProcessor(option$: Observable<WorkPieceListOptions>): Subscription {
    const permissionResult = this.permission.apiPermissionValidate(this.command.workPieceList);

    return permissionResult
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetWorkPieceListAction(option)));
  }

  workOvertimeRecordListProcessor(option$: Observable<WorkOvertimeRecordListOptions>): Subscription {
    const permissionResult = this.permission.apiPermissionValidate(this.command.workOvertimeRecordList);

    return permissionResult
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetWorkOvertimeRecordAction(option)));
  }

  attendanceResultTeamStatListProcessor(option$: Observable<AttendanceResultTeamStatListOptions>): Subscription {
    const permissionResult = this.permission.apiPermissionValidate(this.command.attendanceResultTeamStatList);

    return permissionResult
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetAttendanceResultTeamStatListAction(option)));
  }

  workFlowStatisticsProcessor(option$: Observable<RequestAggregationOptions>): Subscription {
    const permissionResult = this.permission.apiPermissionValidate(this.command.workFlowStatistics);

    return permissionResult
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetWorkFlowStatisticsAction(option)));
  }

  projectPayProcessProcessor(option$: Observable<ProjectPayProcessListOptions>): Subscription {
    const permissionResult = this.permission.apiPermissionValidate(this.command.projectPayProcessList);

    return permissionResult
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetProjectPayProcessListAction(option)));
  }

  projectPayBillProcessor(option$: Observable<ProjectPayBillListOptions>): Subscription {
    const permissionResult = this.permission.apiPermissionValidate(this.command.projectPayBillList);

    return permissionResult
      .filter(result => result.view)
      .mergeMapTo(option$)
      .subscribe(option => this.store.dispatch(new GetProjectPayBillListAction(option)));
  }

  payProcessProcessor(option$: Observable<PayProcessListOptions>): Subscription {
    const permissionResult = this.permission.comprehensiveValidate(this.command.payProcessList);

    return permissionResult
      .filter(result => result.permission.view)
      .zip(option$, (result, option) => Object.assign({}, result.option, option))
      .subscribe(option => this.store.dispatch(new GetPayProcessListAction(option)));
  }
}
