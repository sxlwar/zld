import { QR_LOGIN, QRLoginAction, ScanLoginFailAction, ScanLoginSuccessAction } from './../actions/action/qr-scan-login-action';
import { TipService } from './../services/tip-service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from '../services/api/websocket-service';
import { Observable } from 'rxjs/Observable';
import { Command } from '../services/api/command';
import { ResponseAction } from '../interfaces/response-interface';

@Injectable()
export class QRLoginEffect extends Command {
    @Effect()
    QRLogin$: Observable<ResponseAction> = this.actions$
        .ofType(QR_LOGIN)
        .switchMap((action: QRLoginAction) => this.ws
            .send(this.getQRLogin(action.payload))
            .takeUntil(this.actions$.ofType(QR_LOGIN))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new ScanLoginFailAction(msg.data) : new ScanLoginSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        public actions$: Actions,
        public ws: WebsocketService,
        public tip: TipService
    ) {
        super();
    }
}


