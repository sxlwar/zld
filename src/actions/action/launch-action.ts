import { MultiProcessCreateResponse, ProcessCreateResponse, UploadWorkerContractAttachResponse } from './../../interfaces/response-interface';
import { CreateWorkerContractOptions, CreateWorkerContractModifyOptions, CreateLeaveOptions, CreateOvertimeOptions, CreatePieceAuditOptions, CreateAttendanceModifyOptions, UploadWorkerContractAttachOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

export const CREATE_WORKER_CONTRACT = 'CREATE_WORKER_CONTRACT';

export class CreateWorkerContractAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT;

    constructor(public payload: CreateWorkerContractOptions) { }
}

export const CREATE_WORKER_CONTRACT_FAIL = 'CREATE_WORKER_CONTRACT_FAIL';

export class CreateWorkerContractFailAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT_FAIL;

    constructor(public payload: MultiProcessCreateResponse) { }
}

export const CREATE_WORKER_CONTRACT_SUCCESS = 'CREATE_WORKER_CONTRACT_SUCCESS';

export class CreateWorkerContractSuccessAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT_SUCCESS;

    constructor(public payload: MultiProcessCreateResponse) { }
}

export const CREATE_WORKER_CONTRACT_MODIFY = 'CREATE_WORKER_CONTRACT_MODIFY';

export class CreateWorkerContractModifyAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT_MODIFY;

    constructor(public payload: CreateWorkerContractModifyOptions) { }
}

export const CREATE_WORKER_CONTRACT_MODIFY_FAIL = 'CREATE_WORKER_CONTRACT_MODIFY_FAIL';

export class CreateWorkerContractModifyFailAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT_MODIFY_FAIL;

    constructor(public payload: ProcessCreateResponse) { }
}

export const CREATE_WORKER_CONTRACT_MODIFY_SUCCESS = 'CREATE_WORKER_CONTRACT_MODIFY_SUCCESS';

export class CreateWorkerContractModifySuccessAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT_MODIFY_SUCCESS;

    constructor(public payload: ProcessCreateResponse) { }
}

export const CREATE_LEAVE = 'CREATE_LEAVE';

export class CreateLeaveAction implements Action {
    readonly type = CREATE_LEAVE;

    constructor(public payload: CreateLeaveOptions) { }
}

export const CREATE_LEAVE_FAIL = 'CREATE_LEAVE_FAIL';

export class CreateLeaveFailAction implements Action {
    readonly type = CREATE_LEAVE_FAIL;

    constructor(public payload: ProcessCreateResponse) { }
}

export const CREATE_LEAVE_SUCCESS = 'CREATE_LEAVE_SUCCESS';

export class CreateLeaveSuccessAction implements Action {
    readonly type = CREATE_LEAVE_SUCCESS;

    constructor(public payload: ProcessCreateResponse) { }
}

export const CREATE_OVERTIME = 'CREATE_OVERTIME';

export class CreateOvertimeAction implements Action {
    readonly type = CREATE_OVERTIME;

    constructor(public payload: CreateOvertimeOptions) { }
}

export const CREATE_OVERTIME_FAIL = 'CREATE_OVERTIME_FAIL';

export class CreateOvertimeFailAction implements Action {
    readonly type = CREATE_OVERTIME_FAIL;

    constructor(public payload: ProcessCreateResponse) { }
}

export const CREATE_OVERTIME_SUCCESS = 'CREATE_OVERTIME_SUCCESS';

export class CreateOvertimeSuccessAction implements Action {
    readonly type = CREATE_OVERTIME_SUCCESS;

    constructor(public payload: ProcessCreateResponse) { }
}

export const CREATE_PIECE_AUDIT = 'CREATE_PIECE_AUDIT';

export class CreatePieceAuditAction implements Action {
    readonly type = CREATE_PIECE_AUDIT;

    constructor(public payload: CreatePieceAuditOptions) { }
}

export const CREATE_PIECE_AUDIT_FAIL = 'CREATE_PIECE_AUDIT_FAIL';

export class CreatePieceAuditFailAction implements Action {
    readonly type = CREATE_PIECE_AUDIT_FAIL;

    constructor(public payload: ProcessCreateResponse) { }
}

export const CREATE_PIECE_AUDIT_SUCCESS = 'CREATE_PIECE_AUDIT_SUCCESS';

export class CreatePieceAuditSuccessAction implements Action {
    readonly type = CREATE_PIECE_AUDIT_SUCCESS;

    constructor(public payload: ProcessCreateResponse) { }
}

export const CREATE_ATTENDANCE_MODIFY = 'CREATE_ATTENDANCE_MODIFY';

export class CreateAttendanceModifyAction implements Action {
    readonly type = CREATE_ATTENDANCE_MODIFY;

    constructor(public payload: CreateAttendanceModifyOptions) { }
}

export const CREATE_ATTENDANCE_MODIFY_FAIL = 'CREATE_ATTENDANCE_MODIFY_FAIL';

export class CreateAttendanceModifyFailAction implements Action {
    readonly type = CREATE_ATTENDANCE_MODIFY_FAIL;

    constructor(public payload: MultiProcessCreateResponse) { }
}

export const CREATE_ATTENDANCE_MODIFY_SUCCESS = 'CREATE_ATTENDANCE_MODIFY_SUCCESS';

export class CreateAttendanceModifySuccessAction implements Action {
    readonly type = CREATE_ATTENDANCE_MODIFY_SUCCESS;

    constructor(public payload: MultiProcessCreateResponse) { }
}

export const UPLOAD_WORKER_CONTRACT_ATTACH = 'UPLOAD_WORKER_CONTRACT_ATTACH';

export class UploadWorkerContractAttachAction implements Action {
    readonly type = UPLOAD_WORKER_CONTRACT_ATTACH;

    constructor(public payload: UploadWorkerContractAttachOptions) { }
}

export const UPLOAD_WORKER_CONTRACT_ATTACH_FAIL = 'UPLOAD_WORKER_CONTRACT_ATTACH_FAIL';

export class UploadWorkerContractAttachFailAction implements Action {
    readonly type = UPLOAD_WORKER_CONTRACT_ATTACH_FAIL;
    
    constructor(public payload: UploadWorkerContractAttachResponse) { }
}

export const UPLOAD_WORKER_CONTRACT_ATTACH_SUCCESS = 'UPLOAD_WORKER_CONTRACT_ATTACH_SUCCESS';

export class UploadWorkerContractAttachSuccessAction implements Action {
    readonly type = UPLOAD_WORKER_CONTRACT_ATTACH_SUCCESS;
    
    constructor(public payload: UploadWorkerContractAttachResponse) { }
}

export type Actions = CreateWorkerContractAction
    | CreateAttendanceModifyAction
    | CreateAttendanceModifyFailAction
    | CreateAttendanceModifySuccessAction
    | CreateLeaveAction
    | CreateLeaveFailAction
    | CreateLeaveSuccessAction
    | CreateOvertimeAction
    | CreateOvertimeFailAction
    | CreateOvertimeSuccessAction
    | CreatePieceAuditAction
    | CreatePieceAuditFailAction
    | CreatePieceAuditSuccessAction
    | CreateWorkerContractFailAction
    | CreateWorkerContractModifyAction
    | CreateWorkerContractModifyFailAction
    | CreateWorkerContractModifySuccessAction
    | CreateWorkerContractSuccessAction
    | UploadWorkerContractAttachAction
    | UploadWorkerContractAttachFailAction
    | UploadWorkerContractAttachSuccessAction;