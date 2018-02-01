import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ResponseAction } from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';
import {
    CHANGE_PHONE_NUMBER,
    CHANGE_PHONE_VERIFY,
    ChangePhoneNumberAction,
    ChangePhoneNumberFailAction,
    ChangePhoneNumberSuccessAction,
    ChangePhoneVerifyAction,
    ChangePhoneVerifyFailAction,
    ChangePhoneVerifySuccessAction,
    CHECK_PHONE_NUMBER,
    CHECK_PHONE_VERIFY,
    CheckPhoneNumberAction,
    CheckPhoneNumberFailAction,
    CheckPhoneNumberSuccessAction,
    CheckPhoneVerifyAction,
    CheckPhoneVerifyFailAction,
    CheckPhoneVerifySuccessAction,
} from './../actions/action/account-change-action';
import { TipService } from './../services/tip-service';

@Injectable()
export class AccountChangeEffect extends Command {
    @Effect()
    checkPhone$: Observable<ResponseAction> = this.actions$
        .ofType(CHECK_PHONE_NUMBER)
        .switchMap((action: CheckPhoneNumberAction) => this.ws
            .send(this.getCheckPhone(action.payload))
            .takeUntil(this.actions$.ofType(CHECK_PHONE_NUMBER))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new CheckPhoneNumberFailAction(msg.data)
                : new CheckPhoneNumberSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    checkPhoneVerify$: Observable<ResponseAction> = this.actions$
        .ofType(CHECK_PHONE_VERIFY)
        .switchMap((action: CheckPhoneVerifyAction) => this.ws
            .send(this.getCheckPhoneVerify(action.payload))
            .takeUntil(this.actions$.ofType(CHECK_PHONE_VERIFY))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new CheckPhoneVerifyFailAction(msg.data)
                : new CheckPhoneVerifySuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    changePhone$: Observable<ResponseAction> = this.actions$
        .ofType(CHANGE_PHONE_NUMBER)
        .switchMap((action: ChangePhoneNumberAction) => this.ws
            .send(this.getChangePhone(action.payload))
            .takeUntil(this.actions$.ofType(CHANGE_PHONE_NUMBER))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new ChangePhoneNumberFailAction(msg.data)
                : new ChangePhoneNumberSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    changePhoneVerify$: Observable<ResponseAction> = this.actions$
        .ofType(CHANGE_PHONE_VERIFY)
        .switchMap((action: ChangePhoneVerifyAction) => this.ws
            .send(this.getChangePhoneVerify(action.payload))
            .takeUntil(this.actions$.ofType(CHANGE_PHONE_VERIFY))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new ChangePhoneVerifyFailAction(msg.data)
                : new ChangePhoneVerifySuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions,
        private tip: TipService
    ) {
        super();
    }
}
