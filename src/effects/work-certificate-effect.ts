import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ResponseAction } from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';
import {
    ADD_CERTIFICATE,
    AddCertificateAction,
    CertificateAddFailAction,
    CertificateAddSuccessAction,
    CertificateDeleteFailAction,
    CertificateDeleteSuccessAction,
    CertificateImageUploadFailAction,
    CertificateImageUploadSuccessAction,
    CertificateListFailAction,
    CertificateListSuccessAction,
    CertificateUpdateFailAction,
    CertificateUpdateSuccessAction,
    DELETE_CERTIFICATE,
    DeleteCertificateAction,
    GET_CERTIFICATE_LIST,
    GetCertificateListAction,
    UPDATE_CERTIFICATE,
    UpdateCertificateAction,
    UPLOAD_CERTIFICATE_IMAGE,
    UploadCertificateImageAction,
} from './../actions/action/work-certificate-action';
import { HttpService } from './../services/api/http-service';
import { TipService } from './../services/tip-service';

@Injectable()
export class WorkCertificateEffect extends Command {
    @Effect()
    certificateList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_CERTIFICATE_LIST)
        .mergeMap((action: GetCertificateListAction) => this.ws
            .send(this.getCertificateList(action.payload))
            .takeUntil(this.actions$.ofType(GET_CERTIFICATE_LIST))
            .map(msg => msg.isError
                ? new CertificateListFailAction(msg.data)
                : new CertificateListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    addCertificate$: Observable<ResponseAction> = this.actions$
        .ofType(ADD_CERTIFICATE)
        .switchMap((action: AddCertificateAction) => this.ws
            .send(this.getCertificateAdd(action.payload))
            .takeUntil(this.actions$.ofType(ADD_CERTIFICATE))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new CertificateAddFailAction(msg.data)
                : new CertificateAddSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    deleteCertificate$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_CERTIFICATE)
        .switchMap((action: DeleteCertificateAction) => this.ws
            .send(this.getCertificateDelete(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_CERTIFICATE))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new CertificateDeleteFailAction(msg.data)
                : new CertificateDeleteSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    updateCertificate$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_CERTIFICATE)
        .switchMap((action: UpdateCertificateAction) => this.ws
            .send(this.getCertificateUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_CERTIFICATE))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new CertificateUpdateFailAction(msg.data)
                : new CertificateUpdateSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    uploadCertificateImage$: Observable<ResponseAction> = this.actions$
        .ofType(UPLOAD_CERTIFICATE_IMAGE)
        .mergeMap((action: UploadCertificateImageAction) => this.http
            .transferFileObservable(this.getCertificateImageUpload(action.payload))
            .map(res => res.responseCode === 200
                ? new CertificateImageUploadSuccessAction(JSON.parse(res.response))
                : new CertificateImageUploadFailAction(JSON.parse(res.response)))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions,
        private tip: TipService,
        private http: HttpService
    ) {
        super();
    }
}
