import 'rxjs/add/observable/of';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    ResetErrorResponseAction,
    ResetResetPasswordResponseAction,
    ShowSpecificInnerSlideAction,
    ShowSpecificSlideAction,
    UpdateRandomCodeAction,
} from '../../actions/action/login-action';
import { RegisterUserType } from '../../interfaces/request-interface';
import {
    LoginResponse,
    PhoneVerCodeResponse,
    RegisterResponse,
    ResetPasswordResponse,
} from '../../interfaces/response-interface';
import * as fromRoot from '../../reducers/index-reducer';
import { LoginFormModel, ResetPwdFormModel, SignUpFormModel } from '../api/mapper-service';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import { createRandomCode } from '../utils/util';
import { Company } from './../../interfaces/response-interface';

@Injectable()
export class LoginService {

    constructor(
        private store: Store<fromRoot.AppState>,
        private process: ProcessorService,
        private errorService: ErrorService
    ) {
    }

    /* =========================================================Data acquisition========================================================================= */

    getActiveIndexOfSlides(): Observable<number> {
        return this.store.select(fromRoot.selectActiveIndexOfSlides);
    }

    getActiveIndexOfInnerSlides(): Observable<number> {
        return this.store.select(fromRoot.selectActiveIndexOfInnerSlides).distinctUntilChanged();
    }

    getRandomCode(): Observable<string> {
        return this.store.select(fromRoot.selectRandomCode);
    }

    getSelectedCompany(): Observable<Company> {
        return this.store.select(fromRoot.selectSelectedCompany);
    }

    getLoginInfo(): Observable<LoginResponse> {
        return this.store.select(fromRoot.selectUserInfo);
    }

    getSignUpPhoneVer(): Observable<PhoneVerCodeResponse> {
        return this.store.select(fromRoot.getPhoneVerCode);
    }

    getResetPwdPhoneVer(): Observable<PhoneVerCodeResponse> {
        return this.store.select(fromRoot.getResetPhoneVerCode);
    }

    getRegisterInfo(): Observable<RegisterResponse> {
        return this.store.select(fromRoot.getRegister);
    }

    getResetPasswordInfo(): Observable<ResetPasswordResponse> {
        return this.store.select(fromRoot.getResetPassword);
    }

    /* ===================================================================API Request======================================================================== */

    /**
     * @description
     * These methods used for generate an observable that contains all the information for an api.
     * The form data model is first mapped to the interface data model, then the logic between the data is processed.
     * The data that contains the complete request information is then sent to data services.
     * */
    login(form: Observable<LoginFormModel>): Subscription {
        return this.process.loginProcessor(
            form.map(form => this.process.loginFormMap(form))
                .withLatestFrom(
                this.store.select(fromRoot.selectRandomCode),
                ({ username, password, captcha_code }, random_key) => !!captcha_code
                    ? { username, password, captcha_code, random_key }
                    : { username, password }
                )
        );
    }

    /**
     * TODO NO.1
     * @description 后台把注册和重置密码的手机验证码分成了2个接口，其逻辑和参数完全相同。所以这里分成2个函数处理，getPhoneVerCode处理注册
     * 时的手机验证码，getResetPhoneVerCode处理重置密码时的手机验证码。
     * */
    getPhoneVerCode(form: Observable<SignUpFormModel>): Subscription {
        return this.process.phoneVerificationProcessor(
            form.map(form => this.process.signUpFormMap(form))
                .withLatestFrom(
                this.store.select(fromRoot.selectPhoneVerCodeCaptcha),
                this.store.select(fromRoot.selectRandomCode),
                ({ username, captcha_code }, needImageVerCode, random_key) => needImageVerCode
                    ? { username, captcha_code, random_key }
                    : { username }
                )
        );
    }

    getResetPwdPhoneVerCode(form: Observable<ResetPwdFormModel>): Subscription {
        return this.process.resetPhoneVerificationProcessor(
            form.map(form => this.process.resetPwdForm(form))
                .withLatestFrom(
                this.store.select(fromRoot.selectResetPhoneVerCodeCaptcha),
                this.store.select(fromRoot.selectRandomCode),
                ({ username, captcha_code }, needImageVerCode, random_key) => needImageVerCode
                    ? { username, captcha_code, random_key }
                    : { username }
                )
        );
    }

    signUp(form: Observable<SignUpFormModel>): Subscription {
        return this.process.registerProcessor(
            form.map(form => this.process.signUpFormMap(form))
                .withLatestFrom(
                this.store.select(fromRoot.selectRandomCode),
                this.store.select(fromRoot.selectSelectedCompany),
                ({ username, password, code, real_name, captcha_code, userType }, rand_captcha_key, company) => {
                    const option = { username, password, code };

                    (userType === RegisterUserType.companyUser) && Object.assign(option, { real_name, company_id: company.id })

                    !!captcha_code && Object.assign(option, { captcha_code, rand_captcha_key })

                    return option;
                })
        );
    }

    resetPwd(form: Observable<ResetPwdFormModel>): Subscription {
        return this.process.resetPwdProcessor(
            form.map(form => this.process.resetPwdForm(form))
                .withLatestFrom(this.store.select(fromRoot.selectRandomCode),
                ({ username, password, code, captcha_code }, rand_captcha_key) => !!captcha_code
                    ? { username, password, code, captcha_code, rand_captcha_key }
                    : { username, password, code }
                )
        );
    }

    /* ==================================================================Local state change=========================================================== */

    changeSlidesActive(index: number): void {
        this.store.dispatch(new ShowSpecificSlideAction(index));
    }

    changeInnerSlidesActive(index: number): void {
        this.store.dispatch(new ShowSpecificInnerSlideAction(index));
    }

    updateVerificationImageUrl(source: Observable<boolean>): Subscription {
        return source.filter(value => value)
            .mergeMapTo(createRandomCode())
            .subscribe(code => this.store.dispatch(new UpdateRandomCodeAction(code)));
    }

    resetResetPasswordResponse(): void {
        this.store.dispatch(new ResetResetPasswordResponseAction());
    }

    resetErrorResponse(): void {
        this.store.dispatch(new ResetErrorResponseAction());
    }

    /* =================================================================Error handle================================================================== */

    handleLoginError(): Subscription {
        return this.errorService.handleErrorInSpecific(this.getLoginInfo(), 'LOGIN_FAIL_TIP');
    }

    handleSignPhoneVerCodeError(): Subscription {
        return this.errorService.handleErrorInSpecific(this.getSignUpPhoneVer(), 'PHONE_VERIFICATION_FAIL');
    }

    handleResetPhoneVerCodeError(): Subscription {
        return this.errorService.handleErrorInSpecific(this.getResetPwdPhoneVer(), 'PHONE_VERIFICATION_FAIL');
    }

    handleRegisterError(): Subscription {
        return this.errorService.handleErrorInSpecific(this.getRegisterInfo(), 'REGISTER_FAIL_TIP');
    }

    handleResetPassWordInfoError(): Subscription {
        return this.errorService.handleErrorInSpecific(this.getResetPasswordInfo(), 'RESET_PASSWORD_FAIL_TIP');
    }

}
