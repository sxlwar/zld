import { LoginAction, RegisterPhoneVerCodeAction, ResetPhoneVerCodeAction, RegisterAction, ResetPasswordAction } from './../actions/action/login-action';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from '../services/api/websocket-service';
import { Command } from '../services/api/command';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';
import { GET_PHONE_VERIFICATION_CODE, LOGIN, LoginFailAction, LoginSuccessAction, REGISTER, RegisterFailAction, RegisterPhoneVerCodeFailAction, RegisterPhoneVerCodeSuccessAction, RegisterSuccessAction, RESET_PASSWORD, RESET_PHONE_VERIFICATION_CODE, ResetPasswordFailAction, ResetPasswordSuccessAction, ResetPhoneVerCodeFailAction, ResetPhoneVerCodeSuccessAction } from '../actions/action/login-action';
import 'rxjs/add/operator/throttle';
import { ResponseAction } from '../interfaces/response-interface';
import { TipService } from '../services/tip-service';

@Injectable()
export class LoginEffect {
    @Effect()
    login$: Observable<ResponseAction> = this.actions$
        .ofType(LOGIN)
        .mergeMap((action: LoginAction) => this.ws
            .send(this.command.login(action.payload))
            .takeUntil(this.actions$.ofType(LOGIN))
            .map(msg => msg.isError ? new LoginFailAction(msg.data) : new LoginSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    /**
     * FIXME NO.1
     * @description 后台把注册和重置密码的手机验证码分成了2个接口，其逻辑和参数完全相同。所以这里分成2个函数处理，phoneVerCode$
     * 处理注册时的手机验证码，resetPwdPhoneVerCode$处理重置密码时的手机验证码。
     * */
    @Effect()
    phoneVerCode$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PHONE_VERIFICATION_CODE)
        .mergeMap((action: RegisterPhoneVerCodeAction) => this.ws
            .send(this.command.phoneVerificationCode(action.payload))
            .takeUntil(this.actions$.ofType(GET_PHONE_VERIFICATION_CODE))
            .map(msg => msg.isError ? new RegisterPhoneVerCodeFailAction(msg.data) : new RegisterPhoneVerCodeSuccessAction(null))
            .catch(error => Observable.of(error))
        );

    @Effect()
    resetPwdPhoneVerCode$: Observable<ResponseAction> = this.actions$
        .ofType(RESET_PHONE_VERIFICATION_CODE)
        .mergeMap((action: ResetPhoneVerCodeAction) => this.ws
            .send(this.command.resetPhoneVerificationCode(action.payload))
            .takeUntil(this.actions$.ofType(RESET_PHONE_VERIFICATION_CODE))
            .map(msg => msg.isError ? new ResetPhoneVerCodeFailAction(msg.data) : new ResetPhoneVerCodeSuccessAction(null))
            .catch(error => Observable.of(error))
        );

    @Effect()
    register$: Observable<ResponseAction> = this.actions$
        .ofType(REGISTER)
        .mergeMap((action: RegisterAction) => this.ws
            .send(this.command.register(action.payload))
            .takeUntil(this.actions$.ofType(REGISTER))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new RegisterFailAction(msg.data) : new RegisterSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    resetPassword$: Observable<ResponseAction> = this.actions$
        .ofType(RESET_PASSWORD)
        .mergeMap((action: ResetPasswordAction) => this.ws
            .send(this.command.resetPassword(action.payload))
            .takeUntil(this.actions$.ofType(RESET_PASSWORD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new ResetPasswordFailAction(msg.data) : new ResetPasswordSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private actions$: Actions,
        private ws: WebsocketService,
        private command: Command,
        private tip: TipService
    ) {
    }
}
