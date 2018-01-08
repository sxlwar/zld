import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ResponseAction } from '../interfaces/response-interface';
import { CERTIFICATE, CertificateAction, CertificateFailAction, CertificateSuccessAction } from '../actions/action/certificate-action';
import { WebsocketService } from '../services/api/websocket-service';
import { Command } from '../services/api/command';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';

@Injectable()
export class CertificateEffect extends Command {

    @Effect()
    certificate$: Observable<ResponseAction> = this.actions$
        .ofType(CERTIFICATE)
        .mergeMap((action: CertificateAction) => this.ws
            .send(this.updatePersonalIdImage(action.payload))
            .takeUntil(this.actions$.ofType(CERTIFICATE))
            .map(msg => msg.isError ? new CertificateFailAction(msg.data) : new CertificateSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        public actions$: Actions,
        public ws: WebsocketService) {
        super();
    }
}
