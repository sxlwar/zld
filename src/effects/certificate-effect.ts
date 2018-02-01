import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    CERTIFICATE,
    CertificateAction,
    CertificateFailAction,
    CertificateSuccessAction,
} from '../actions/action/certificate-action';
import { ResponseAction } from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';
import {
    UPLOAD_PERSONAL_ID_IMAGE,
    UploadPersonalIdImageAction,
    UploadPersonalIdImageFailAction,
    UploadPersonalIdImageSuccessAction,
} from './../actions/action/certificate-action';
import { HttpService } from './../services/api/http-service';

@Injectable()
export class CertificateEffect extends Command {

    @Effect()
    certificate$: Observable<ResponseAction> = this.actions$
        .ofType(CERTIFICATE)
        .mergeMap((action: CertificateAction) => this.ws
            .send(this.updatePersonalIdImage(action.payload))
            .takeUntil(this.actions$.ofType(CERTIFICATE))
            .map(msg => msg.isError
                ? new CertificateFailAction(msg.data)
                : new CertificateSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );


    @Effect()
    uploadPersonalIdImage$: Observable<ResponseAction> = this.actions$
        .ofType(UPLOAD_PERSONAL_ID_IMAGE)
        .mergeMap((action: UploadPersonalIdImageAction) => this.http
            .upload(Observable.of(this.uploadPersonalIdImage(action.payload)))
            .map(res => res.responseCode !== 200
                ? new UploadPersonalIdImageFailAction(JSON.parse(res.response))
                : new UploadPersonalIdImageSuccessAction(JSON.parse(res.response)))
            .catch(error => Observable.of(error))
        )

    constructor(
        private actions$: Actions,
        private ws: WebsocketService,
        private http: HttpService
    ) {
        super();
    }
}
