import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WebsocketService} from '../serveices/api/websocket-service';
import {Command} from '../serveices/api/command';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';
import {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  GET_PHONE_VERIFICATION_CODE,
  RESET_PHONE_VERIFICATION_CODE,
  LoginFailAction,
  LoginSuccessAction,
  RegisterPhoneVerCodeFailAction,
  RegisterPhoneVerCodeSuccessAction,
  RegisterFailAction,
  RegisterSuccessAction,
  ResetPasswordFailAction,
  ResetPasswordSuccessAction,
  ResetPhoneVerCodeFailAction,
  ResetPhoneVerCodeSuccessAction
} from '../actions/login-action';
import 'rxjs/add/operator/throttle';
import {RequestAction} from '../interfaces/request-interface';

@Injectable()
export class LoginEffect {
  @Effect()
  login$: Observable<RequestAction> = this.actions$
    .ofType(LOGIN)
    .mergeMap((action: RequestAction) => this.ws
      .send(this.command.login(action.payload))
      .takeUntil(this.actions$.ofType(LOGIN))
      .map(msg => msg.isError ? new LoginFailAction(msg.data) : new LoginSuccessAction(msg.data))
      .catch((msg) => of(msg))
    );

  /**
   * FIXME NO.1
   * @description 后台把注册和重置密码的手机验证码分成了2个接口，其逻辑和参数完全相同。所以这里分成2个函数处理，phoneVerCode$
   * 处理注册时的手机验证码，resetPwdPhoneVerCode$处理重置密码时的手机验证码。
   * */
  @Effect()
  phoneVerCode$: Observable<RequestAction> = this.actions$
    .ofType(GET_PHONE_VERIFICATION_CODE)
    .mergeMap((action: RequestAction) => this.ws
      .send(this.command.phoneVerificationCode(action.payload))
      .takeUntil(this.actions$.ofType(GET_PHONE_VERIFICATION_CODE))
      .map(msg => msg.isError ? new RegisterPhoneVerCodeFailAction(msg.data) : new RegisterPhoneVerCodeSuccessAction(null))
      .catch(msg => of(msg))
    );

  @Effect()
  resetPwdPhoneVerCode$: Observable<RequestAction> = this.actions$
    .ofType(RESET_PHONE_VERIFICATION_CODE)
    .mergeMap((action: RequestAction) => this.ws
      .send(this.command.resetPhoneVerificationCode(action.payload))
      .takeUntil(this.actions$.ofType(RESET_PHONE_VERIFICATION_CODE))
      .map(msg => msg.isError ? new ResetPhoneVerCodeFailAction(msg.data) : new ResetPhoneVerCodeSuccessAction(null))
      .catch(msg => of(msg))
    );

  @Effect()
  register$: Observable<RequestAction> = this.actions$
    .ofType(REGISTER)
    .mergeMap((action: RequestAction) => this.ws
      .send(this.command.register(action.payload))
      .takeUntil(this.actions$.ofType(REGISTER))
      .map(msg => msg.isError ? new RegisterFailAction(msg.data) : new RegisterSuccessAction(msg.data))
      .catch(msg => of(msg))
    );

  @Effect()
  resetPassword$: Observable<RequestAction> = this.actions$
    .ofType(RESET_PASSWORD)
    .mergeMap((action: RequestAction) => this.ws
      .send(this.command.resetPassword(action.payload))
      .takeUntil(this.actions$.ofType(RESET_PASSWORD))
      .map(msg => msg.isError ? new ResetPasswordFailAction(msg.data) : new ResetPasswordSuccessAction(msg.data))
      .catch(msg => of(msg))
    );

  constructor(public actions$: Actions,
              public ws: WebsocketService,
              public command: Command) {
  }

}
