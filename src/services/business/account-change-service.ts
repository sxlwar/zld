import { ChangeAccountFormModel } from './../api/mapper-service';
import { ENV } from '@app/env';
import { UpdateCheckRandomCodeAction, UpdateChangeRandomCodeAction, ResetLocalDataAction } from './../../actions/action/account-change-action';
import { UserService } from './user-service';
import { CheckPhoneOptions } from './../../interfaces/request-interface';
import { Subscription } from 'rxjs/Subscription';
import { CheckPhoneResponse, ChangePhoneVerifyCodeResponse, CheckPhoneVerifyCodeResponse, ChangePhoneResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, selectCheckPhoneResponse, selectChangePhoneVerifyResponse, selectCheckPhoneVerifyResponse, selectChangePhoneResponse, selectAccountChangeCheckRandomCode, selectAccountChangeChangeRandomCode, selectChangePhoneOptions } from './../../reducers/index-reducer';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { Injectable } from '@angular/core';
import { createRandomCode } from '../utils/util';

@Injectable()
export class AccountChangeService {
    constructor(
        private store: Store<AppState>,
        private processor: ProcessorService,
        private error: ErrorService,
        private userInfo: UserService
    ) { }

    /* =============================================================Data acquisition======================================================= */

    getCheckPhoneResponse(): Observable<CheckPhoneResponse> {
        return this.store.select(selectCheckPhoneResponse).filter(value => !!value);
    }

    getChangePhoneVerifyResponse(): Observable<ChangePhoneVerifyCodeResponse> {
        return this.store.select(selectChangePhoneVerifyResponse).filter(value => !!value);
    }

    getCheckPhoneVerifyResponse(): Observable<CheckPhoneVerifyCodeResponse> {
        return this.store.select(selectCheckPhoneVerifyResponse).filter(value => !!value);
    }

    getChangePhoneResponse(): Observable<ChangePhoneResponse> {
        return this.store.select(selectChangePhoneResponse).filter(value => !!value);
    }

    getChangePhoneSuccessResponse(): Observable<ChangePhoneResponse> {
        return this.getChangePhoneResponse().filter(value => !value.errorMessage);
    }

    getCheckRandomCode(): Observable<string> {
        return this.store.select(selectAccountChangeCheckRandomCode);
    }

    getChangeRandomCode(): Observable<string> {
        return this.store.select(selectAccountChangeChangeRandomCode);
    }

    getCheckPhoneVerifyUrl(): Observable<string> {
        return this.getImageVerificationUrl(this.getCheckRandomCode());
    }

    getChangePhoneVerifyUrl(): Observable<string> {
        return this.getImageVerificationUrl(this.getChangeRandomCode());
    }

    getImageVerificationUrl(code: Observable<string>): Observable<string> {
        return code.map(code => `http://${ENV.DOMAIN}/check_captcha/${code}`);
    }

    getAccount(): Observable<string> {
        return this.userInfo.getAccount();
    }

    /* =============================================================API request======================================================= */

    checkPhone(option: Observable<CheckPhoneOptions>): Subscription {
        return this.processor.checkPhoneProcessor(option);
    }

    changePhone(option: Observable<ChangeAccountFormModel>): Subscription {
        return this.processor.changePhoneProcessor(
            option.map(value => this.processor.transformChangeAccountForm(value))
                .withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid }))
        );
    }

    checkPhoneVerify(phone: Observable<string>, imageVerification: Observable<string>): Subscription {
        return this.processor.checkPhoneVerifyProcessor(
            phone.withLatestFrom(
                this.userInfo.getSid(),
                imageVerification.zip(this.getCheckRandomCode(), (captcha_code, rand_captcha_key) => !!captcha_code ? { rand_captcha_key, captcha_code } : {}),
                (username, sid, option) => ({ ...option, sid, username })
            )
        );
    }

    changePhoneVerify(phone: Observable<string>, imageVerification: Observable<string>): Subscription {
        return this.processor.changePhoneVerifyProcessor(
            phone.withLatestFrom(
                this.userInfo.getSid(),
                imageVerification.zip(this.getChangeRandomCode(), (captcha_code, rand_captcha_key) => !!captcha_code ? { rand_captcha_key, captcha_code } : {}),
                (username, sid, option) => ({ ...option, sid, username })
            )
        );
    }

    /* =============================================================Local state change======================================================= */

    updateCheckRandomCode(source: Observable<boolean>): Subscription {
        return source.merge(this.getChangePhoneVerifyResponse().map(res => res.captcha))
            .filter(value => !!value)
            .mergeMapTo(createRandomCode())
            .subscribe(code => this.store.dispatch(new UpdateCheckRandomCodeAction(code)));
    }

    updateChangeRandomCode(source: Observable<boolean>): Subscription {
        return source.merge(this.getCheckPhoneVerifyResponse().map(res => res.captcha))
            .filter(value => value)
            .mergeMapTo(createRandomCode())
            .subscribe(code => this.store.dispatch(new UpdateChangeRandomCodeAction(code)));
    }

    resetLocalData(): void {
        this.store.dispatch(new ResetLocalDataAction());
    }

    updateAccount(): Subscription {
        return this.store.select(selectChangePhoneOptions)
            .filter(value => !!value)
            .zip(this.getChangePhoneSuccessResponse(), (option, _) => option.new_username)
            .subscribe(account => this.userInfo.updateAccount(account));
    }

    /* =============================================================Error handler======================================================= */

    handleError(): Subscription[] {
        return [
            this.error.handleErrorInSpecific(this.getChangePhoneResponse(), 'API_ERROR'),
            this.error.handleErrorInSpecific(this.getChangePhoneVerifyResponse(), 'API_ERROR'),
            this.error.handleErrorInSpecific(this.getCheckPhoneResponse(), 'API_ERROR'),
            this.error.handleErrorInSpecific(this.getCheckPhoneVerifyResponse(), 'API_ERROR'),
        ];
    }
}