import { CreateWorkerContractOptions, CreateWorkerContractModifyOptions, CreateLeaveOptions, CreateOvertimeOptions, CreatePieceAuditOptions, CreateAttendanceModifyOptions } from './../../interfaces/request-interface';
import { CreateSignWorkerContractResponse, CreateAttendanceModifyResponse, CreateLeaveResponse, CreateOvertimeResponse, CreatePieceAuditResponse, CreateWorkerContractModifyResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/launch-action';

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
    workerContractResponse: null
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.CREATE_WORKER_CONTRACT:
            return Object.assign({}, state, { workerContractOptions: action.payload });

        case actions.CREATE_WORKER_CONTRACT_MODIFY:
            return Object.assign({}, state, { workerContractModifyOptions: action.payload });

        case actions.CREATE_PIECE_AUDIT:
            return Object.assign({}, state, { pieceAuditOptions: action.payload });

        case actions.CREATE_ATTENDANCE_MODIFY:
            return Object.assign({}, state, { attendanceModifyOptions: action.payload });

        case actions.CREATE_LEAVE:
            return Object.assign({}, state, { leaveOptions: action.payload });

        case actions.CREATE_OVERTIME:
            return Object.assign({}, state, { overtimeOptions: action.payload });

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