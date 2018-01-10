import { HttpService } from './../services/api/http-service';
import { CREATE_WORKER_CONTRACT, CreateWorkerContractAction, CreateWorkerContractFailAction, CreateWorkerContractSuccessAction, CREATE_WORKER_CONTRACT_MODIFY, CreateWorkerContractModifyAction, CreateWorkerContractModifyFailAction, CreateWorkerContractModifySuccessAction, CREATE_LEAVE, CreateLeaveAction, CreateLeaveSuccessAction, CreateLeaveFailAction, CREATE_OVERTIME, CreateOvertimeAction, CreateOvertimeFailAction, CreateOvertimeSuccessAction, CREATE_PIECE_AUDIT, CreatePieceAuditAction, CreatePieceAuditFailAction, CreatePieceAuditSuccessAction, CREATE_ATTENDANCE_MODIFY, CreateAttendanceModifyAction, CreateAttendanceModifyFailAction, CreateAttendanceModifySuccessAction, UPLOAD_WORKER_CONTRACT_ATTACH, UploadWorkerContractAttachAction, UploadWorkerContractAttachFailAction, UploadWorkerContractAttachSuccessAction, UPLOAD_ATTENDANCE_MODIFY_ATTACH, UploadAttendanceModifyAttachAction, UploadAttendanceModifyAttachFailAction, UploadAttendanceModifyAttachSuccessAction } from './../actions/action/launch-action';
import { Observable } from 'rxjs/Observable';
import { ResponseAction } from './../interfaces/response-interface';
import { TipService } from './../services/tip-service';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from './../services/api/websocket-service';
import { Injectable } from '@angular/core';
import { Command } from '../services/api/command';

@Injectable()
export class LaunchEffect extends Command {
    @Effect()
    launchWorkerContract$: Observable<ResponseAction> = this.actions$
        .ofType(CREATE_WORKER_CONTRACT)
        .switchMap((action: CreateWorkerContractAction) => this.ws
            .send(this.getCreateWorkerContract(action.payload))
            .takeUntil(this.actions$.ofType(CREATE_WORKER_CONTRACT))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new CreateWorkerContractFailAction(msg.data) : new CreateWorkerContractSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    launchWorkerContractModify$: Observable<ResponseAction> = this.actions$
        .ofType(CREATE_WORKER_CONTRACT_MODIFY)
        .switchMap((action: CreateWorkerContractModifyAction) => this.ws
            .send(this.getCreateWorkerContractModify(action.payload))
            .takeUntil(this.actions$.ofType(CREATE_WORKER_CONTRACT_MODIFY))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new CreateWorkerContractModifyFailAction(msg.data) : new CreateWorkerContractModifySuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    launchLeave$: Observable<ResponseAction> = this.actions$
        .ofType(CREATE_LEAVE)
        .switchMap((action: CreateLeaveAction) => this.ws
            .send(this.getCreateLeave(action.payload))
            .takeUntil(this.actions$.ofType(CREATE_LEAVE))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new CreateLeaveFailAction(msg.data) : new CreateLeaveSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    launchOvertime$: Observable<ResponseAction> = this.actions$
        .ofType(CREATE_OVERTIME)
        .switchMap((action: CreateOvertimeAction) => this.ws
            .send(this.getCreateOvertime(action.payload))
            .takeUntil(this.actions$.ofType(CREATE_OVERTIME))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new CreateOvertimeFailAction(msg.data) : new CreateOvertimeSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    launchPieceAudit$: Observable<ResponseAction> = this.actions$
        .ofType(CREATE_PIECE_AUDIT)
        .switchMap((action: CreatePieceAuditAction) => this.ws
            .send(this.getCreatePieceAudit(action.payload))
            .takeUntil(this.actions$.ofType(CREATE_PIECE_AUDIT))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new CreatePieceAuditFailAction(msg.data) : new CreatePieceAuditSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    launchAttendanceModify$: Observable<ResponseAction> = this.actions$
        .ofType(CREATE_ATTENDANCE_MODIFY)
        .switchMap((action: CreateAttendanceModifyAction) => this.ws
            .send(this.getCreateAttendanceModify(action.payload))
            .takeUntil(this.actions$.ofType(CREATE_ATTENDANCE_MODIFY))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new CreateAttendanceModifyFailAction(msg.data) : new CreateAttendanceModifySuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    uploadWorkerContractAttach$: Observable<ResponseAction> = this.actions$
        .ofType(UPLOAD_WORKER_CONTRACT_ATTACH)
        .mergeMap((action: UploadWorkerContractAttachAction) => this.http
            .uploadAttach(this.getUploadWorkerContractAttach(action.payload))
            .map(res => res.responseCode === 200 ? new UploadWorkerContractAttachFailAction(JSON.parse(res.response)) : new UploadWorkerContractAttachSuccessAction(JSON.parse(res.response)))
            .catch(error => Observable.of(error))
        );

    @Effect()
    uploadAttendanceModifyAttach$: Observable<ResponseAction> = this.actions$
        .ofType(UPLOAD_ATTENDANCE_MODIFY_ATTACH)
        .mergeMap((action: UploadAttendanceModifyAttachAction) => this.http
            .uploadAttach(this.getUploadAttendanceModifyAttach(action.payload))
            .map(res => res.responseCode === 200 ? new UploadAttendanceModifyAttachFailAction(JSON.parse(res.response)) : new UploadAttendanceModifyAttachSuccessAction(JSON.parse(res.response)))
            .catch(error => Observable.of(error))
        );

    constructor(
        public ws: WebsocketService,
        public http: HttpService,
        public actions$: Actions,
        public tip: TipService
    ) {
        super();
    }
}