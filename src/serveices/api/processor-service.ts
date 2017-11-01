import {Injectable} from '@angular/core';
import {
  CertificateOptions,
  LoginOptions,
  PhoneVerificationCodeOptions,
  RegisterOptions,
  ResetPasswordOptions,
  UploadImageOptions
} from '../../interfaces/request-interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index-reducer';
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
import {Loading, LoadingController} from 'ionic-angular';
import {HttpService} from './http-service';
import {Command} from './command';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ProcessorService extends MapperService {
  loading: Loading;

  constructor(public store: Store<AppState>,
              public errorService: ErrorService,
              public loadingCtrl: LoadingController,
              public http: HttpService,
              public command: Command,
              public translate: TranslateService) {
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
    this.presentLoading();

    return this.uploadImagesProcessor(image$, this.command.uploadPersonalIdImage)
      .withLatestFrom(option$)
      .subscribe(ary => {
        const [uploadSuccess, option] = ary;

        this.dismissLoading();

        if (uploadSuccess) {
          this.store.dispatch(new CertificateAction(option));
        }else {
          const errorMessage = this.translate.get('CER_WAIT_THEN_UPLOAD').map(errorMessage => ({errorMessage}));
          this.errorService.handleErrorInSpecific(errorMessage, 'UPLOAD_FAIL_TIP');
        }
      });
  }

  /**
   * @description Used for upload multi images.
   * */
  uploadImagesProcessor(source: Observable<UploadImageOptions>, command: string): Observable<boolean> {
    return source
      .reduce((acc, cur) => {
        acc.push(cur);
        return acc;
      }, [])
      .map(options => options.map((option) => this.http
        .upload(Observable
          .of(option)
          .map(partition => Object.assign(partition, {command}))
        ))
      )
      .mergeMap(imageObs => {
        return Observable.forkJoin(imageObs)
          .map(responses => responses.every(res => {
              const result = JSON.parse(res.response);
              return res.responseCode === 200 && result.code === 1000;
            })
          )
      });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      duration: 3000,
      spinner: 'dots',
      content: '图片上传中,请稍侯'
    });

    this.loading.present().then(() => {
    })
  }

  dismissLoading() {
    if (this.loading) this.loading.dismiss().then(() => {
    });
  }

}
