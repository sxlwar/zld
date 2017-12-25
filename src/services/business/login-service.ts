import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ShowSpecificInnerSlideAction, ShowSpecificSlideAction, UpdateRandomCode, ResetSidAction} from '../../actions/action/login-action';
import {LoginOptions, RegisterOptions} from '../../interfaces/request-interface';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../reducers/index-reducer';
import {
  getPhoneVerCode,
  getRegister,
  getResetPassword,
  getResetPhoneVerCode,
  selectPhoneVerCodeCaptcha,
  selectRandomCode,
  selectResetPhoneVerCodeCaptcha,
  selectSelectedCompany,
  selectUserInfo
} from '../../reducers/index-reducer';
import 'rxjs/add/operator/distinctUntilChanged';
import {ENV} from '@app/env';
import {pickBy, random} from 'lodash';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/zip'
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import {Subscription} from 'rxjs/Subscription';
import {ErrorService} from '../errors/error-service';
import {
  LoginResponse, PhoneVerCodeResponse, RegisterResponse,
  ResetPasswordResponse
} from '../../interfaces/response-interface';
import 'rxjs/add/observable/of';
import {LoginFormModel, MapperService, ResetPwdFormModel, SignupFormModel} from '../api/mapper-service';
import {ProcessorService} from '../api/processor-service';

@Injectable()
export class LoginService {

  subscriptions: Subscription[] = [];
  updateVerImage$$: Subscription;

  constructor(public store: Store<fromRoot.AppState>,
              public process: ProcessorService,
              public errorService: ErrorService,
              public mapper: MapperService) {
    this.handleError();
  }

  /**
   * @description
   * These methods are used for change the state of the UI, which has no side effects.
   * */
  changeSlidesActive(index: number) {
    this.store.dispatch(new ShowSpecificSlideAction(index));
  }

  changeInnerSlidesActive(index: number) {
    this.store.dispatch(new ShowSpecificInnerSlideAction(index));
  }

  updateVerificationImageUrl() {
    if (this.updateVerImage$$) this.updateVerImage$$.unsubscribe();

    this.updateVerImage$$ = Observable.range(1, 5)
      .map(_ => random(1, 26).toString(36))
      .reduce((acc, cur) => acc + cur)
      .subscribe(code => this.store.dispatch(new UpdateRandomCode(code)));

    this.subscriptions.push(this.updateVerImage$$);
  }

  resetSid(): void {
    this.store.dispatch(new ResetSidAction());
  }

  /*=============================================No Side effect===================================================*/

  /**
   * @description
   * These methods used for generate an observable to the component and. They are not affected by side effects.
   * */
  getActiveIndexOfSlides() {
    return this.store.select(fromRoot.selectActiveIndexOfSlides);
  }

  getActiveIndexOfInnerSlides() {
    return this.store.select(fromRoot.selectActiveIndexOfInnerSlides).distinctUntilChanged();
  }

  getVerificationImageUrl() {
    return this.store.select(selectRandomCode).map(randomCode => `http://${ENV.DOMAIN}/check_captcha/${randomCode}`);
  }

  getSelectedCompany() {
    return this.store.select(selectSelectedCompany);
  }

  /*==============================================Side effect===================================================*/

  getLoginInfo(): Observable<LoginResponse> {
    return this.store.select(selectUserInfo);
  }

  getSignupPhoneVer():Observable<PhoneVerCodeResponse> {
    return this.store.select(getPhoneVerCode);
  }

  getResetPwdPhoneVer(): Observable<PhoneVerCodeResponse> {
    return this.store.select(getResetPhoneVerCode);
  }

  getRegisterInfo(): Observable<RegisterResponse> {
    return this.store.select(getRegister);
  }

  getResetPasswordInfo(): Observable<ResetPasswordResponse> {
    return this.store.select(getResetPassword);
  }

  /*==============================================Request handle===================================================*/

  /**
   * @description
   * These methods used for generate an observable that contains all the information for an api.
   * The form data model is first mapped to the interface data model, then the logic between the data is processed.
   * The data that contains the complete request information is then sent to data services.
   * */
  login(source: LoginFormModel) {
    const option: LoginOptions = this.mapper.loginFormMap(source);

    let login$$;

    if (option.captcha_code) {
      const source$ = Observable.zip(
        this.store.select(selectRandomCode).map(code => ({random_key: code})),
        Observable.of(option)
      ).map(values => values.reduce((acc, cur) => Object.assign(acc, cur)));

      login$$ = this.process.loginProcessor(source$ as Observable<LoginOptions>);
    } else {
      login$$ = this.process.loginProcessor(Observable.of(pickBy(option, value => !!value)))
    }

    this.subscriptions.push(login$$);
  }

  /**
   * TODO NO.1
   * @description 后台把注册和重置密码的手机验证码分成了2个接口，其逻辑和参数完全相同。所以这里分成2个函数处理，getPhoneVerCode处理注册
   * 时的手机验证码，getResetPhoneVerCode处理重置密码时的手机验证码。
   * */
  getPhoneVerCode(source: SignupFormModel) {

    const {username, captcha_code} = this.mapper.signupFormMap(source);

    const phoneVerCode$ = this.store.select(selectPhoneVerCodeCaptcha)
      .switchMap((needImageVerCode: boolean) => {
        if (needImageVerCode) {
          return this.store.select(selectRandomCode)
            .map(value => ({username, captcha_code, random_key: value}))
        }
        return Observable.of({username});
      });

    const phoneVer$$ = this.process.phoneVerificationProcessor(phoneVerCode$);

    this.subscriptions.push(phoneVer$$);
  }

  getResetPwdPhoneVerCode(source: ResetPwdFormModel) {
    const {username, captcha_code} = this.mapper.resetPwdForm(source);

    const phoneVerCode$ = this.store.select(selectResetPhoneVerCodeCaptcha)
      .switchMap((needImageVerCode: boolean) => {
        if (needImageVerCode) {
          return this.store.select(selectRandomCode)
            .map(value => ({username, captcha_code, random_key: value}))
        }
        return Observable.of({username});
      });

    const phoneVer$$ = this.process.resetPhoneVerificationProcessor(phoneVerCode$);

    this.subscriptions.push(phoneVer$$);
  }

  signup(source: SignupFormModel, userType: string): void {

    const {username, password, code} = this.mapper.signupFormMap(source);

    const baseOption$ = Observable.of({username, password, code});

    let randomKey$: Observable<object> = Observable.of({});

    if (source.imageVerification) {
      randomKey$ = this.store.select(selectRandomCode).map(rand_captcha_key => ({rand_captcha_key}));
    }

    let companyUserOption$: Observable<any> = Observable.of({});

    if (userType === 'REGISTER_COMPANY_USER') {
      companyUserOption$ = this.store.select(selectSelectedCompany)
        .map(company => ({company_id: company.id, real_name: source.realname}));
    }

    const register$ = baseOption$.withLatestFrom(randomKey$, companyUserOption$)
      .map(data => data.reduce((acc, cur) => Object.assign(acc, cur)) as RegisterOptions);

    const register$$ = this.process.registerProcessor(register$);

    this.subscriptions.push(register$$);

  }

  resetPwd(source: ResetPwdFormModel): void {
    const {username, password, code} = this.mapper.resetPwdForm(source);

    const resetPwd$$ = this.process.resetPwdProcessor(Observable.of({username, password, code}));

    this.subscriptions.push(resetPwd$$);
  }

  /*=========================================error handle========================================================*/

  private handleError() {
    const login$$ = this.handleLoginError();

    const signupPhoneVerCode$$ = this.handleSignPhoneVerCodeError();

    const resetPhoneVerCode$$ = this.handleResetPhoneVerCodeError();

    const register$$ = this.handleRegisterError();

    const resetPassword$$ = this.handleResetPassWordInfoError();

    this.subscriptions = this.subscriptions.concat([login$$, signupPhoneVerCode$$, resetPhoneVerCode$$, register$$, resetPassword$$]);
  }

  private handleLoginError(): Subscription{
    return this.errorService.handleErrorInSpecific(
      this.getLoginInfo().do((userInfo: LoginResponse) => userInfo.captcha && this.updateVerificationImageUrl()),
      'LOGIN_FAIL_TIP'
    );
  }

  private handleSignPhoneVerCodeError(): Subscription {
    return this.errorService
      .handleErrorInSpecific(
        this.getSignupPhoneVer().do((data: PhoneVerCodeResponse) => data.captcha && this.updateVerificationImageUrl()),
        'PHONE_VERIFICATION_FAIL'
      );
  }

  private handleResetPhoneVerCodeError(): Subscription {
    return this.errorService.handleErrorInSpecific(
      this.getResetPwdPhoneVer().do((captcha: PhoneVerCodeResponse) => captcha && this.updateVerificationImageUrl()),
      'PHONE_VERIFICATION_FAIL'
    );
  }

  private handleRegisterError(): Subscription {
    return this.errorService.handleErrorInSpecific(this.getRegisterInfo(), 'REGISTER_FAIL_TIP');
  }

  private handleResetPassWordInfoError(): Subscription {
    return this.errorService.handleErrorInSpecific(this.getResetPasswordInfo(), 'RESET_PASSWORD_FAIL_TIP');
  }

  /*=============================================refuse cleaning====================================================*/

  /**
   * @description
   * This method used for cancel all the subscription when component dismissed.
   * */
  unSubscribe() {
    this.subscriptions.forEach(unSub => unSub.unsubscribe());
  }
}
