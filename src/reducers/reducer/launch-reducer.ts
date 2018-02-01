import * as actions from '../../actions/action/launch-action';
import {
    CreateAttendanceModifyOptions,
    CreateLeaveOptions,
    CreateOvertimeOptions,
    CreatePieceAuditOptions,
    CreateWorkerContractModifyOptions,
    CreateWorkerContractOptions,
    TerminateWorkerContractOptions,
} from './../../interfaces/request-interface';
import {
    CreateAttendanceModifyResponse,
    CreateLeaveResponse,
    CreateOvertimeResponse,
    CreatePieceAuditResponse,
    CreateSignWorkerContractResponse,
    CreateWorkerContractModifyResponse,
    TerminateWorkerContractResponse,
} from './../../interfaces/response-interface';

export enum LaunchResponse {
    attendanceModify = 'attendanceModifyResponse',
    leave = 'leaveResponse',
    overtime = 'overtimeResponse',
    pieceAudit = 'pieceAuditResponse',
    workerContractModify = 'workerContractModifyResponse',
    workerContract = 'workerContractResponse',

}
export interface State {
    attendanceModifyOptions: CreateAttendanceModifyOptions;
    attendanceModifyResponse: CreateAttendanceModifyResponse;
    leaveOptions: CreateLeaveOptions;
    leaveResponse: CreateLeaveResponse;
    overtimeOptions: CreateOvertimeOptions;
    overtimeResponse: CreateOvertimeResponse;
    pieceAuditOptions: CreatePieceAuditOptions;
    pieceAuditResponse: CreatePieceAuditResponse;
    workerContractModifyOptions: CreateWorkerContractModifyOptions;
    workerContractModifyResponse: CreateWorkerContractModifyResponse;
    workerContractOptions: CreateWorkerContractOptions;
    workerContractResponse: CreateSignWorkerContractResponse;
    terminateContractOptions: TerminateWorkerContractOptions;
    terminateResponse: TerminateWorkerContractResponse;
};

export const initialState: State = {
    attendanceModifyOptions: null,
    attendanceModifyResponse: null,
    leaveOptions: null,
    leaveResponse: null,
    overtimeOptions: null,
    overtimeResponse: null,
    pieceAuditOptions: null,
    pieceAuditResponse: null,
    workerContractModifyOptions: null,
    workerContractModifyResponse: null,
    workerContractOptions: null,
    workerContractResponse: null,
    terminateContractOptions: null,
    terminateResponse: null,
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.CREATE_WORKER_CONTRACT:
            return { ...state, workerContractOptions: action.payload };

        case actions.CREATE_WORKER_CONTRACT_MODIFY:
            return { ...state, workerContractModifyOptions: action.payload };

        case actions.CREATE_PIECE_AUDIT:
            return { ...state, pieceAuditOptions: action.payload };

        case actions.CREATE_ATTENDANCE_MODIFY:
            return { ...state, attendanceModifyOptions: action.payload };

        case actions.CREATE_LEAVE:
            return { ...state, leaveOptions: action.payload };

        case actions.CREATE_OVERTIME:
            return { ...state, overtimeOptions: action.payload };

        case actions.CREATE_ATTENDANCE_MODIFY_FAIL:
        case actions.CREATE_ATTENDANCE_MODIFY_SUCCESS:
            return { ...state, attendanceModifyResponse: action.payload };

        case actions.CREATE_WORKER_CONTRACT_FAIL:
        case actions.CREATE_WORKER_CONTRACT_SUCCESS:
            return { ...state, workerContractResponse: action.payload };

        case actions.CREATE_LEAVE_FAIL:
        case actions.CREATE_LEAVE_SUCCESS:
            return { ...state, leaveResponse: action.payload };

        case actions.CREATE_OVERTIME_FAIL:
        case actions.CREATE_OVERTIME_SUCCESS:
            return { ...state, overtimeResponse: action.payload };

        case actions.CREATE_PIECE_AUDIT_FAIL:
        case actions.CREATE_PIECE_AUDIT_SUCCESS:
            return { ...state, pieceAuditResponse: action.payload };

        case actions.CREATE_WORKER_CONTRACT_MODIFY_FAIL:
        case actions.CREATE_WORKER_CONTRACT_MODIFY_SUCCESS:
            return { ...state, workerContractModifyResponse: action.payload };

        case actions.RESET_LAUNCH_RESPONSE:
            return { ...state, [action.payload]: null };

        case actions.TERMINATE_WORKER_CONTRACT:
            return { ...state, terminateContractOptions: action.payload };

        case actions.TERMINATE_WORKER_CONTRACT_FAIL:
        case actions.TERMINATE_WORKER_CONTRACT_SUCCESS:
            return { ...state, terminateResponse: action.payload };

        case actions.RESET_TERMINATE_WORKER_CONTRACT_RESPONSE:
            return { ...state, terminateResponse: null };

        default:
            return state;
    }
}

export const getWorkerContractResponse = (state: State) => state.workerContractResponse;

export const getAttendanceModifyResponse = (state: State) => state.attendanceModifyResponse;

export const getLeaveResponse = (state: State) => state.leaveResponse;

export const getOvertimeResponse = (state: State) => state.overtimeResponse;

export const getPieceAuditResponse = (state: State) => state.pieceAuditResponse;

export const getWorkerContractModifyResponse = (state: State) => state.workerContractModifyResponse;

export const getWorkerContractOptions = (state: State) => state.workerContractOptions;

export const getAttendanceModifyOptions = (state: State) => state.attendanceModifyOptions;

export const getLeaveOptions = (state: State) => state.leaveOptions;

export const getOvertimeOptions = (state: State) => state.overtimeOptions;

export const getPieceAuditOptions = (state: State) => state.pieceAuditOptions;

export const getWorkerContractModifyOptions = (state: State) => state.workerContractModifyOptions;

export const getTerminateContractResponse = (state: State) => state.terminateResponse;

export const getTerminateContractOptions = (state: State) => state.terminateContractOptions;
