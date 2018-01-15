import { UploadWorkerContractAttachResponse, UploadAttendanceModifyAttachResponse, CreateSignWorkerContractResponse, CreateAttendanceModifyResponse, CreateWorkerContractModifyResponse, CreateLeaveResponse, CreateOvertimeResponse, CreatePieceAuditResponse, UploadLeaveAttachResponse, UploadOvertimeAttachResponse, UploadPieceAuditAttachResponse, UploadWorkerContractModifyAttachResponse } from './../../interfaces/response-interface';
import { CreateWorkerContractOptions, CreateWorkerContractModifyOptions, CreateLeaveOptions, CreateOvertimeOptions, CreatePieceAuditOptions, CreateAttendanceModifyOptions, UploadWorkerContractAttachOptions, UploadAttendanceModifyAttachOptions, UploadLeaveAttachOptions, UploadOvertimeAttachOptions, UploadPieceAuditAttachOptions, UploadWorkerContractModifyAttachOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

export const CREATE_WORKER_CONTRACT = 'CREATE_WORKER_CONTRACT';

export class CreateWorkerContractAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT;

    constructor(public payload: CreateWorkerContractOptions) { }
}

export const CREATE_WORKER_CONTRACT_FAIL = 'CREATE_WORKER_CONTRACT_FAIL';

export class CreateWorkerContractFailAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT_FAIL;

    constructor(public payload: CreateSignWorkerContractResponse) { }
}

export const CREATE_WORKER_CONTRACT_SUCCESS = 'CREATE_WORKER_CONTRACT_SUCCESS';

export class CreateWorkerContractSuccessAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT_SUCCESS;

    constructor(public payload: CreateSignWorkerContractResponse) { }
}

export const CREATE_WORKER_CONTRACT_MODIFY = 'CREATE_WORKER_CONTRACT_MODIFY';

export class CreateWorkerContractModifyAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT_MODIFY;

    constructor(public payload: CreateWorkerContractModifyOptions) { }
}

export const CREATE_WORKER_CONTRACT_MODIFY_FAIL = 'CREATE_WORKER_CONTRACT_MODIFY_FAIL';

export class CreateWorkerContractModifyFailAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT_MODIFY_FAIL;

    constructor(public payload: CreateWorkerContractModifyResponse) { }
}

export const CREATE_WORKER_CONTRACT_MODIFY_SUCCESS = 'CREATE_WORKER_CONTRACT_MODIFY_SUCCESS';

export class CreateWorkerContractModifySuccessAction implements Action {
    readonly type = CREATE_WORKER_CONTRACT_MODIFY_SUCCESS;

    constructor(public payload: CreateWorkerContractModifyResponse) { }
}

export const CREATE_LEAVE = 'CREATE_LEAVE';

export class CreateLeaveAction implements Action {
    readonly type = CREATE_LEAVE;

    constructor(public payload: CreateLeaveOptions) { }
}

export const CREATE_LEAVE_FAIL = 'CREATE_LEAVE_FAIL';

export class CreateLeaveFailAction implements Action {
    readonly type = CREATE_LEAVE_FAIL;

    constructor(public payload: CreateLeaveResponse) { }
}

export const CREATE_LEAVE_SUCCESS = 'CREATE_LEAVE_SUCCESS';

export class CreateLeaveSuccessAction implements Action {
    readonly type = CREATE_LEAVE_SUCCESS;

    constructor(public payload: CreateLeaveResponse) { }
}

export const CREATE_OVERTIME = 'CREATE_OVERTIME';

export class CreateOvertimeAction implements Action {
    readonly type = CREATE_OVERTIME;

    constructor(public payload: CreateOvertimeOptions) { }
}

export const CREATE_OVERTIME_FAIL = 'CREATE_OVERTIME_FAIL';

export class CreateOvertimeFailAction implements Action {
    readonly type = CREATE_OVERTIME_FAIL;

    constructor(public payload: CreateOvertimeResponse) { }
}

export const CREATE_OVERTIME_SUCCESS = 'CREATE_OVERTIME_SUCCESS';

export class CreateOvertimeSuccessAction implements Action {
    readonly type = CREATE_OVERTIME_SUCCESS;

    constructor(public payload: CreateOvertimeResponse) { }
}

export const CREATE_PIECE_AUDIT = 'CREATE_PIECE_AUDIT';

export class CreatePieceAuditAction implements Action {
    readonly type = CREATE_PIECE_AUDIT;

    constructor(public payload: CreatePieceAuditOptions) { }
}

export const CREATE_PIECE_AUDIT_FAIL = 'CREATE_PIECE_AUDIT_FAIL';

export class CreatePieceAuditFailAction implements Action {
    readonly type = CREATE_PIECE_AUDIT_FAIL;

    constructor(public payload: CreatePieceAuditResponse) { }
}

export const CREATE_PIECE_AUDIT_SUCCESS = 'CREATE_PIECE_AUDIT_SUCCESS';

export class CreatePieceAuditSuccessAction implements Action {
    readonly type = CREATE_PIECE_AUDIT_SUCCESS;

    constructor(public payload: CreatePieceAuditResponse) { }
}

export const CREATE_ATTENDANCE_MODIFY = 'CREATE_ATTENDANCE_MODIFY';

export class CreateAttendanceModifyAction implements Action {
    readonly type = CREATE_ATTENDANCE_MODIFY;

    constructor(public payload: CreateAttendanceModifyOptions) { }
}

export const CREATE_ATTENDANCE_MODIFY_FAIL = 'CREATE_ATTENDANCE_MODIFY_FAIL';

export class CreateAttendanceModifyFailAction implements Action {
    readonly type = CREATE_ATTENDANCE_MODIFY_FAIL;

    constructor(public payload: CreateAttendanceModifyResponse) { }
}

export const CREATE_ATTENDANCE_MODIFY_SUCCESS = 'CREATE_ATTENDANCE_MODIFY_SUCCESS';

export class CreateAttendanceModifySuccessAction implements Action {
    readonly type = CREATE_ATTENDANCE_MODIFY_SUCCESS;

    constructor(public payload: CreateAttendanceModifyResponse) { }
}
/* ====================================================Upload attachment actions======================================= */

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

export const UPLOAD_ATTENDANCE_MODIFY_ATTACH = 'UPLOAD_ATTENDANCE_MODIFY_ATTACH';

export class UploadAttendanceModifyAttachAction implements Action {
    readonly type = UPLOAD_ATTENDANCE_MODIFY_ATTACH;

    constructor(public payload: UploadAttendanceModifyAttachOptions) { }
}

export const UPLOAD_ATTENDANCE_MODIFY_ATTACH_FAIL = 'UPLOAD_ATTENDANCE_MODIFY_ATTACH_FAIL';

export class UploadAttendanceModifyAttachFailAction implements Action {
    readonly type = UPLOAD_ATTENDANCE_MODIFY_ATTACH_FAIL;

    constructor(public payload: UploadAttendanceModifyAttachResponse) { }
}

export const UPLOAD_ATTENDANCE_MODIFY_ATTACH_SUCCESS = 'UPLOAD_ATTENDANCE_MODIFY_ATTACH_SUCCESS';

export class UploadAttendanceModifyAttachSuccessAction implements Action {
    readonly type = UPLOAD_ATTENDANCE_MODIFY_ATTACH_SUCCESS;

    constructor(public payload: UploadAttendanceModifyAttachResponse) { }
}

export const UPLOAD_LEAVE_ATTACH = 'UPLOAD_LEAVE_ATTACH';

export class UploadLeaveAttachAction implements Action {
    readonly type = UPLOAD_LEAVE_ATTACH;

    constructor(public payload: UploadLeaveAttachOptions) { }
}

export const UPLOAD_LEAVE_ATTACH_FAIL = 'UPLOAD_LEAVE_ATTACH_FAIL';

export class UploadLeaveAttachFailAction implements Action {
    readonly type = UPLOAD_LEAVE_ATTACH_FAIL;

    constructor(public payload: UploadLeaveAttachResponse) { }
}

export const UPLOAD_LEAVE_ATTACH_SUCCESS = 'UPLOAD_LEAVE_ATTACH_SUCCESS';

export class UploadLeaveAttachSuccessAction implements Action {
    readonly type = UPLOAD_LEAVE_ATTACH_SUCCESS;

    constructor(public payload: UploadLeaveAttachResponse) { }
}

export const UPLOAD_OVERTIME_ATTACH = 'UPLOAD_OVERTIME_ATTACH';

export class UploadOvertimeAttachAction implements Action {
    readonly type = UPLOAD_OVERTIME_ATTACH;

    constructor(public payload: UploadOvertimeAttachOptions) { }
}

export const UPLOAD_OVERTIME_ATTACH_FAIL = 'UPLOAD_OVERTIME_ATTACH_FAIL';

export class UploadOvertimeAttachFailAction implements Action {
    readonly type = UPLOAD_OVERTIME_ATTACH_FAIL;

    constructor(public payload: UploadOvertimeAttachResponse) { }
}

export const UPLOAD_OVERTIME_ATTACH_SUCCESS = 'UPLOAD_OVERTIME_ATTACH_SUCCESS';

export class UploadOvertimeAttachSuccessAction implements Action {
    readonly type = UPLOAD_OVERTIME_ATTACH_SUCCESS;

    constructor(public payload: UploadOvertimeAttachResponse) { }
}

export const UPLOAD_PIECE_AUDIT_ATTACH = 'UPLOAD_PIECE_AUDIT_ATTACH';

export class UploadPieceAuditAttachAction implements Action {
    readonly type = UPLOAD_PIECE_AUDIT_ATTACH;

    constructor(public payload: UploadPieceAuditAttachOptions) { }
}

export const UPLOAD_PIECE_AUDIT_ATTACH_FAIL = 'UPLOAD_PIECE_AUDIT_ATTACH_FAIL';

export class UploadPieceAuditAttachFailAction implements Action {
    readonly type = UPLOAD_PIECE_AUDIT_ATTACH_FAIL;

    constructor(public payload: UploadPieceAuditAttachResponse) { }
}

export const UPLOAD_PIECE_AUDIT_ATTACH_SUCCESS = 'UPLOAD_PIECE_AUDIT_ATTACH_SUCCESS';

export class UploadPieceAuditAttachSuccessAction implements Action {
    readonly type = UPLOAD_PIECE_AUDIT_ATTACH_SUCCESS;

    constructor(public payload: UploadPieceAuditAttachResponse) { }
}

export const UPLOAD_WORKER_CONTRACT_MODIFY_ATTACH = 'UPLOAD_WORKER_CONTRACT_MODIFY_ATTACH';

export class UploadWorkerContractModifyAttachAction implements Action {
    readonly type = UPLOAD_WORKER_CONTRACT_MODIFY_ATTACH;

    constructor(public payload: UploadWorkerContractModifyAttachOptions) { }
}

export const UPLOAD_WORKER_CONTRACT_MODIFY_ATTACH_FAIL = 'UPLOAD_WORKER_CONTRACT_MODIFY_ATTACH_FAIL';

export class UploadWorkerContractModifyAttachFailAction implements Action {
    readonly type = UPLOAD_WORKER_CONTRACT_MODIFY_ATTACH_FAIL;

    constructor(public payload: UploadWorkerContractModifyAttachResponse) { }
}

export const UPLOAD_WORKER_CONTRACT_MODIFY_ATTACH_SUCCESS = 'UPLOAD_WORKER_CONTRACT_MODIFY_ATTACH_SUCCESS';

export class UploadWorkerContractModifyAttachSuccessAction implements Action {
    readonly type = UPLOAD_WORKER_CONTRACT_MODIFY_ATTACH_SUCCESS;

    constructor(public payload: UploadWorkerContractModifyAttachResponse) { }
}

export const RESET_LAUNCH_RESPONSE = 'RESET_LAUNCH_RESPONSE';

export class ResetLaunchResponseAction implements Action {
    readonly type = RESET_LAUNCH_RESPONSE;

    constructor(public payload: string) { }
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
    | ResetLaunchResponseAction
    | CreateWorkerContractSuccessAction
    | UploadAttendanceModifyAttachAction
    | UploadAttendanceModifyAttachFailAction
    | UploadAttendanceModifyAttachSuccessAction
    | UploadLeaveAttachAction
    | UploadLeaveAttachFailAction
    | UploadLeaveAttachSuccessAction
    | UploadOvertimeAttachAction
    | UploadOvertimeAttachFailAction
    | UploadOvertimeAttachSuccessAction
    | UploadPieceAuditAttachAction
    | UploadPieceAuditAttachFailAction
    | UploadPieceAuditAttachSuccessAction
    | UploadWorkerContractAttachAction
    | UploadWorkerContractAttachAction
    | UploadWorkerContractAttachFailAction
    | UploadWorkerContractAttachFailAction
    | UploadWorkerContractAttachSuccessAction
    | UploadWorkerContractModifyAttachSuccessAction;