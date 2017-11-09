//region
import {Injectable} from '@angular/core';
import {
  CertificateOptions,
  LoginOptions,
  PhoneVerificationCodeOptions,
  RegisterOptions,
  ResetPasswordOptions, TeamListOptions,
  UploadImageOptions,
  WorkerContractOptions
} from '../../interfaces/request-interface';
import {Store} from '@ngrx/store';
import {AppState, selectSid} from '../../reducers/index-reducer';
import {
  LoginAction,
  RegisterAction,
  RegisterPhoneVerCodeAction,
  ResetPasswordAction,
  ResetPhoneVerCodeAction
} from '../../actions/login-action';
import {Observable} from 'rxjs/Observable';
import {ErrorService} from '../errors/error-service';
import {Subscription} from 'rxjs/Subscription';
import {MapperService} from './mapper-service';
import {CertificateAction} from '../../actions/certificate-action';
import 'rxjs';
import {Command} from './command';
import {UploadService} from './upload-service';
import {PermissionService} from '../config/permission-service';
import {GetProjectListAction} from '../../actions/project-action';
import {GetWorkerContractsAction} from '../../actions/worker-action';
import {GetWorkTypeListAction} from '../../actions/craft-action';
import {GetTeamListAction} from '../../actions/team-actions';
//endregion

@Injectable()
export class ProcessorService extends MapperService {

  constructor(public store: Store<AppState>,
              public errorService: ErrorService,
              public uploadService: UploadService,
              public command: Command,
              public permission: PermissionService) {
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

    return viewPermission$.zip(sid$, (passed, sid) => passed ? {sid, prime_contract_status: '完成'} : null)
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
      (passed, option1, option2) => passed ? {...option1, ...option2} : null
    )
      .filter(res => !!res)
      .subscribe(option => this.store.dispatch(new GetWorkerContractsAction(option)));
  }

  workTypeListProcessor(): void {
    this.store.dispatch(new GetWorkTypeListAction());
  }

  teamListProcessor(option$: Observable<TeamListOptions>): Subscription {
    const permissionResult = this.permission.comprehensiveValidate(this.command.teamList);

    return permissionResult.filter(res => res.permission.view)
      .zip(option$, (result, option) => Object.assign({}, option, result.option))
      .subscribe(option => {
        this.store.dispatch(new GetTeamListAction(option));
      });
  }
}
