import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ShowSpecificInnerSlideAction, ShowSpecificSlideAction, UpdateRandomCode} from '../../actions/login-action';
import {LoginOptions, RegisterOptions} from '../../interfaces/request-interface';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../reducers/index-reducer';
import {
  getPhoneVerCode,
  getRegister,
  selectPhoneVerCodeCaptcha,
  selectRandomCode,
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
import {TranslateService} from '@ngx-translate/core';
import {LoginResponse} from '../../interfaces/response-interface';
import 'rxjs/add/observable/of';
import {LoginFormModel, MapperService, SignupFormModel} from '../api/mapper-service';
import {ProcessorService} from '../api/processor-service';

@Injectable()
export class LoginService {

  subscriptions: Subscription[] = [];
  updateVerImage$$: Subscription;

  constructor(public store: Store<fromRoot.AppState>,
              public process: ProcessorService,
              public errorService: ErrorService,
              public translate: TranslateService,
              public mapper: MapperService) {
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

  /**
   * @description
   * These methods used for generate an observable to the component
   * and notify the fault processing center to handle the error in this stream.
   * The data that is subscribed here is affected by side effects and needs to be handled with exception, usually case
   * is the network requests.
   * */
  getLoginInfo() {
    const loginInfo$ = this.store.select(selectUserInfo)
      .do((userInfo: LoginResponse) => userInfo.captcha && this.updateVerificationImageUrl());

    const loginError$$ = this.errorService.handleErrorInSpecific(loginInfo$, 'LOGIN_FAIL_TIP');

    this.subscriptions.push(loginError$$);

    return loginInfo$;
  }

  getSignupPhoneVer() {
    const phoneVerCode$ = this.store.select(getPhoneVerCode)
      .do(captcha => captcha && this.updateVerificationImageUrl());

    const phoneVerError$$ = this.errorService.handleErrorInSpecific(phoneVerCode$, 'LOGIN_PHONE_VERIFICATION_FAIL');

    this.subscriptions.push(phoneVerError$$);

    return phoneVerCode$;
  }

  getRegisterInfo() {
    const register$ = this.store.select(getRegister);

    const register$$ = this.errorService.handleErrorInSpecific(register$, 'REGISTER_FAIL_TIP');

    this.subscriptions.push(register$$);

    return register$;
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

  signup(source: SignupFormModel, userType: string): void {

    const {username, password, code} = this.mapper.signupFormMap(source);

    const baseOption$ = Observable.of({username, password, code});

    let randomKey$: Observable<object> = Observable.of({});

    if (source.imageVerification) {
      randomKey$ = this.store.select(selectRandomCode).map(rand_captcha_key => ({rand_captcha_key}));
    }

    let companyUserOption$: Observable<any> = Observable.of({});

    if (userType === 'LOGIN_COMPANY_USER') {
      companyUserOption$ = this.store.select(selectSelectedCompany)
        .map(company => ({company_id: company.id, real_name: source.realname}));
    }

    const register$ = baseOption$.withLatestFrom(randomKey$, companyUserOption$)
      .map(data => data.reduce((acc, cur) => Object.assign(acc, cur)) as RegisterOptions);

    const register$$ = this.process.registerProcessor(register$);

    this.subscriptions.push(register$$);

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
