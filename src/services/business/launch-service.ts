import { CreateWorkerContractModifyOptions } from './../../interfaces/request-interface';
import { ResetWorkerContractEditResponseAction } from './../../actions/action/worker-action';
import { WorkerContractFormModel, AttendanceModifyFormModel, LeaveFormModel, OvertimeFormModel, PieceAuditFormModel, WorkerContractModifyFormModel, WorkerContractEditFormModel } from './../api/mapper-service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState, selectAttendanceModifyOptions, selectSignWorkerContractResponse, selectAttendanceModifyResponse, selectSignWorkerContractOptions, selectWorkerContractResponse, selectLeaveResponse, selectOvertimeResponse, selectPieceAuditResponse, selectWorkerContractModifyResponse, selectLeaveOptions, selectOvertimeOptions, selectPieceAuditOptions, selectWorkerContractModifyOptions, selectWorkerContractEditOptions, selectWorkerContractEditResponse, selectTerminateWorkerContractResponse } from './../../reducers/index-reducer';
import { UserService } from './user-service';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { Injectable } from '@angular/core';
import { ResetLaunchResponseAction, ResetTerminateWorkerContractResponseAction } from '../../actions/action/launch-action';

@Injectable()
export class LaunchService {

    constructor(
        private store: Store<AppState>,
        private processor: ProcessorService,
        private error: ErrorService,
        private userInfo: UserService,
    ) {

    }

    /* ====================================================Date acquisition=======================================================*/

    getSignWorkerContractResponse(): Observable<number[]> {
        return this.store.select(selectSignWorkerContractResponse)
            .filter(value => !!value)
            .map(res => res.information.map(item => item.WorkerContract_id));
    }

    getSuccessResponseOfAttendanceModify(): Observable<boolean> {
        return this.store.select(selectAttendanceModifyResponse)
            .filter(value => !!value && !value.errorMessage)
            .mapTo(true);
    }

    getSuccessResponseOfLeave(): Observable<boolean> {
        return this.store.select(selectLeaveResponse)
            .filter(value => !!value && !value.errorMessage)
            .mapTo(true);
    }

    getSuccessResponseOfOvertime(): Observable<boolean> {
        return this.store.select(selectOvertimeResponse)
            .filter(value => !!value && !value.errorMessage)
            .mapTo(true);
    }

    getSuccessResponseOfPieceAudit(): Observable<boolean> {
        return this.store.select(selectPieceAuditResponse)
            .filter(value => !!value && !value.errorMessage)
            .mapTo(true);
    }

    getSuccessResponseOfWorkerContractModify(): Observable<boolean> {
        return this.store.select(selectWorkerContractModifyResponse)
            .filter(value => !!value && !value.errorMessage)
            .mapTo(true);
    }

    getSuccessResponseOfWorkerContractEdit(): Observable<boolean> {
        return this.store.select(selectWorkerContractEditResponse)
            .filter(value => !!value && !value.errorMessage)
            .mapTo(true);
    }

    getSuccessResponseOfWorkerContractTermination(): Observable<number> {
        return this.store.select(selectTerminateWorkerContractResponse)
            .filter(value => !!value && !value.errorMessage)
            .map(res => res.WorkerContract_id);
    }

    /* ====================================================API request=======================================================*/

    createWorkerContract(form: Observable<WorkerContractFormModel>): Subscription {
        return this.processor.createWorkerContractProcessor(
            form.map(form => this.processor.transformWorkerContractForm(form))
                .withLatestFrom(
                this.userInfo.getSid(),
                (form, sid) => ({ ...form, sid })
                )
        );
    }

    createAttendanceModify(form: Observable<AttendanceModifyFormModel>): Subscription {
        return this.processor.createAttendanceModifyProcessor(
            form.map(form => this.processor.transformAttendanceModifyForm(form))
                .withLatestFrom(
                this.userInfo.getSid(),
                (form, sid) => ({ ...form, sid })
                )
        );
    }

    createLeave(form: Observable<LeaveFormModel>): Subscription {
        return this.processor.createLeaveProcessor(
            form.map(form => this.processor.transformLeaveForm(form))
                .withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
                )
        );
    }

    createOvertime(form: Observable<OvertimeFormModel>): Subscription {
        return this.processor.createOvertimeProcessor(
            form.map(form => this.processor.transformOvertimeForm(form))
                .withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
                )
        );
    }

    createPieceAudit(form: Observable<PieceAuditFormModel>): Subscription {
        return this.processor.createPieceAuditProcessor(
            form.map(form => this.processor.transformPieceAuditForm(form))
                .withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
                )
        );
    }

    createWorkerContractModify(form: Observable<WorkerContractModifyFormModel>): Subscription {
        return this.processor.createWorkerContractModifyProcessor(this.getWorkerContractOperateOption(form));
    }

    terminateWorkerContract(option: Observable<WorkerContractModifyFormModel>): Subscription {
        return this.processor.createWorkerContractTerminationProcessor(this.getWorkerContractOperateOption(option));
    }

    private getWorkerContractOperateOption(option: Observable<WorkerContractModifyFormModel>): Observable<CreateWorkerContractModifyOptions> {
        return option.map(option => this.processor.transformWorkerContractModifyForm(option))
            .withLatestFrom(
            this.userInfo.getSid(),
            (option, sid) => ({ ...option, sid })
            );
    }

    editWorkerContract(form: Observable<WorkerContractEditFormModel>): Subscription {
        return this.processor.workerContractEditProcessor(
            form.map(form => this.processor.transformWorkerContractEditForm(form))
                .withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
                )
        );
    }

    uploadWorkerContractAttach(): Subscription {
        return this.processor.uploadWorkerContractAttachProcessor(
            this.store.select(selectSignWorkerContractOptions)
                .filter(value => !!value && !!value.worker_contract.attach.length)
                .mergeMap(option => Observable.from(option.worker_contract.attach))
                .withLatestFrom(
                this.getSignWorkerContractResponse().mergeMap(res => Observable.from(res).first()),
                this.userInfo.getSid(),
                (file, id, sid) => ({ id, file, sid })
                )
        );
    }

    uploadAttendanceModifyAttach(): Subscription {
        return this.processor.uploadAttendanceModifyAttachProcessor(
            this.store.select(selectAttendanceModifyOptions)
                .filter(value => !!value && !!value.attend_amend.attach.length)
                .mergeMap(option => Observable.from(option.attend_amend.attach))
                .withLatestFrom(
                this.store.select(selectAttendanceModifyResponse).filter(value => !!value).map(res => res.information.length > 1 ? JSON.stringify(res.information) : String(res.information[0])),
                this.userInfo.getSid(),
                (file, id, sid) => ({ file, id, sid })
                )
        );
    }

    uploadLeaveAttach(): Subscription {
        return this.processor.uploadLeaveAttachProcessor(
            this.store.select(selectLeaveOptions)
                .filter(value => !!value && !!value.leave.attach.length)
                .mergeMap(option => Observable.from(option.leave.attach))
                .withLatestFrom(
                this.store.select(selectLeaveResponse).filter(value => !!value).map(res => res.request_id),
                this.userInfo.getSid(),
                (file, id, sid) => ({ file, id, sid, type: 'attachment' })
                )
        );
    }

    uploadOvertimeAttach(): Subscription {
        return this.processor.uploadOvertimeAttachProcessor(
            this.store.select(selectOvertimeOptions)
                .filter(value => !!value && !!value.work_over_time.attach.length)
                .mergeMap(option => Observable.from(option.work_over_time.attach))
                .withLatestFrom(
                this.store.select(selectOvertimeResponse).filter(value => !!value).map(res => res.request_id),
                this.userInfo.getSid(),
                (file, id, sid) => ({ file, id, sid, type: 'attachment' })
                )
        );
    }

    uploadPieceAuditAttach(): Subscription {
        return this.processor.uploadPieceAuditAttachProcessor(
            this.store.select(selectPieceAuditOptions)
                .filter(value => !!value && !!value.work_piece_finish_flow.attach.length)
                .mergeMap(option => Observable.from(option.work_piece_finish_flow.attach))
                .withLatestFrom(
                this.store.select(selectPieceAuditResponse).filter(value => !!value).map(res => res.request_id),
                this.userInfo.getSid(),
                (file, id, sid) => ({ file, id, sid, type: 'attachment' })
                )
        );
    }

    uploadWorkerContractModifyAttach(): Subscription {
        return this.processor.uploadWorkerContractModifyAttachProcessor(
            this.store.select(selectWorkerContractModifyOptions)
                .filter(value => !!value && !!value.contract_time_change_flow.attach.length)
                .distinct(value => value)
                .mergeMap(option => Observable.from(option.contract_time_change_flow.attach))
                .withLatestFrom(
                this.store.select(selectWorkerContractModifyResponse).filter(value => !!value).map(res => res.WorkerContract_id),
                this.userInfo.getSid(),
                (file, id, sid) => ({ file, id, sid, type: 'attachment' })
                )
        );
    }

    uploadWorkerContractEditAttach(): Subscription {
        return this.processor.uploadWorkerContractEditAttachProcessor(
            this.store.select(selectWorkerContractEditOptions)
                .filter(value => !!value && !!value.attach && !!value.attach.length)
                .mergeMap(option => Observable.from(option.attach).map(file => ({ file, id: option.contract_id })))
                .withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
                )
        );
    }

    /* ====================================================Local state update=======================================================*/

    resetResponse(response: string): void {
        this.store.dispatch(new ResetLaunchResponseAction(response));
    }

    resetWorkerContractEditResponse(): void {
        this.store.dispatch(new ResetWorkerContractEditResponseAction());
    }

    resetTerminateWorkerContractResponse(): void {
        this.store.dispatch(new ResetTerminateWorkerContractResponseAction());
    }

    /* ====================================================Error handle=======================================================*/

    handleLeaveError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectLeaveResponse), 'API_ERROR');
    }

    handleOvertimeError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectOvertimeResponse), 'API_ERROR');
    }

    handlePieceAuditError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectPieceAuditResponse), 'API_ERROR');
    }

    handleWorkerContractModifyError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectWorkerContractModifyResponse), 'API_ERROR');
    }

    handleWorkerContractError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectWorkerContractResponse), 'API_ERROR');
    }

    handleAttendanceModifyError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectAttendanceModifyResponse), 'API_ERROR');
    }

    handleWorkerContractEditError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectWorkerContractEditResponse), 'API_ERROR');
    }

    handleWorkerContractTerminationError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectTerminateWorkerContractResponse), 'API_ERROR');
    }
}