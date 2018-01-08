import { CreateWorkerContractOptions, CreateWorkerContractModifyOptions, CreateLeaveOptions, CreateOvertimeOptions, CreatePieceAuditOptions, CreateAttendanceModifyOptions } from './../../interfaces/request-interface';
import { MultiProcessCreateResponse, ProcessCreateResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/launch-action';

export interface State {
    multiProcessCreateResponse: MultiProcessCreateResponse;
    processCreateResponse: ProcessCreateResponse;
    workerContractOptions: CreateWorkerContractOptions;
    workerContractModifyOptions: CreateWorkerContractModifyOptions
    leaveOptions: CreateLeaveOptions;
    overtimeOptions: CreateOvertimeOptions;
    pieceAuditOptions: CreatePieceAuditOptions;
    attendanceModifyOptions: CreateAttendanceModifyOptions;
};

export const initialState: State = {
    multiProcessCreateResponse: null,
    processCreateResponse: null,
    workerContractOptions: null,
    workerContractModifyOptions: null,
    leaveOptions: null,
    overtimeOptions: null,
    pieceAuditOptions: null,
    attendanceModifyOptions: null
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
        case actions.CREATE_WORKER_CONTRACT_FAIL:
        case actions.CREATE_WORKER_CONTRACT_SUCCESS:
            return { ...state, multiProcessCreateResponse: action.payload };

        case actions.CREATE_LEAVE_FAIL:
        case actions.CREATE_LEAVE_SUCCESS:
        case actions.CREATE_OVERTIME_FAIL:
        case actions.CREATE_OVERTIME_SUCCESS:
        case actions.CREATE_PIECE_AUDIT_FAIL:
        case actions.CREATE_PIECE_AUDIT_SUCCESS:
        case actions.CREATE_WORKER_CONTRACT_MODIFY_FAIL:
        case actions.CREATE_WORKER_CONTRACT_MODIFY_SUCCESS:
            return { ...state, processCreateResponse: action.payload };

        default:
            return state;
    }
}

export const getMultiProcessResponse = (state: State) => state.multiProcessCreateResponse;

export const getWorkerContractOptions = (state: State) => state.workerContractOptions;

export const getProcessCreateResponse = (state: State) => state.processCreateResponse;