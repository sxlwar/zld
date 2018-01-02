import { MultiTaskUpdateOptions, TaskUpdateOptions, WorkFlowListOptions } from './../../interfaces/request-interface';
import { WorkFlowListResponse, ProjectPayBillFlowListResponse, MultiTaskUpdateResponse, TaskUpdateResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/work-flow-action';

export interface State {
    workFlowListResponse: WorkFlowListResponse;
    projectPayBillFlowListResponse: ProjectPayBillFlowListResponse;
    multiTaskUpdateResponse: MultiTaskUpdateResponse;
    taskUpdateResponse: TaskUpdateResponse;
    workFlowListOptions: WorkFlowListOptions;
    multiTaskUpdateOptions: MultiTaskUpdateOptions;
    taskUpdateOptions: TaskUpdateOptions;
    leavePage: number;
    overtimePage: number;
    pieceAuditPage: number;
    attendanceModifyPage: number;
    limit: number;
}

export const initialState: State = {
    workFlowListResponse: null,
    projectPayBillFlowListResponse: null,
    multiTaskUpdateResponse: null,
    taskUpdateResponse: null,
    workFlowListOptions: null,
    multiTaskUpdateOptions: null,
    taskUpdateOptions: null,
    leavePage: 1,
    overtimePage: 1,
    pieceAuditPage: 1,
    attendanceModifyPage: 1,
    limit: 20
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.GET_WORK_FLOW_LIST:
            return { ...state, workFlowListOptions: action.payload };

        case actions.WORK_FLOW_LIST_FAIL:
            return { ...state, workFlowListResponse: action.payload };

        case actions.WORK_FLOW_LIST_SUCCESS: {
            if (state.workFlowListResponse) {
                let { count, request, requests_types } = action.payload;

                request = state.workFlowListResponse.request.concat(request);

                return { ...state, workFlowListResponse: { count, request, requests_types } }
            } else {
                return { ...state, workFlowListResponse: action.payload };
            }
        }

        case actions.PROJECT_PAY_BILL_FLOW_FAIL:
        case actions.PROJECT_PAY_BILL_FLOW_SUCCESS:
            return { ...state, projectPayBillFlowListResponse: action.payload };

        case actions.UPDATE_MULTI_TASK:
            return { ...state, multiTaskUpdateOptions: action.payload };

        case actions.UPDATE_MULTI_TASK_FAIL:
            return { ...state, multiTaskUpdateResponse: action.payload };

        case actions.UPDATE_MULTI_TASK_SUCCESS:
            return { ...state, multiTaskUpdateResponse: action.payload, workFlowListResponse: { ...state.workFlowListResponse, request: state.workFlowListResponse.request.filter(item => state.multiTaskUpdateOptions.id.indexOf(item.task[item.task.length - 1].id) === -1), count: state.workFlowListResponse.count - state.multiTaskUpdateOptions.id.length } };

        case actions.UPDATE_TASK:
            return { ...state, taskUpdateOptions: action.payload };

        case actions.UPDATE_TASK_FAIL:
            return { ...state, taskUpdateResponse: action.payload };

        case actions.UPDATE_TASK_SUCCESS:
            return { ...state, taskUpdateResponse: action.payload, workFlowListResponse: { ...state.workFlowListResponse, request: state.workFlowListResponse.request.filter(item => item.task[item.task.length - 1].id !== state.taskUpdateOptions.id), count: state.workFlowListResponse.count - 1 } };

        case actions.RESET_PAGE: {
            const result = {};

            result[state[action.payload]] = 1;

            return { ...state, ...result };
        }

        case actions.INCREASE_PAGE: {
            const result = {};

            result[state[action.payload]] = state[action.payload] + 1;

            return { ...state, ...result };
        }

        case actions.RESET_WORK_FLOW_RESPONSE:
            return { ...state, workFlowListResponse: null };

        case actions.GET_PROJECT_PAY_BILL_FLOW_LIST:
        default:
            return state;
    }
}

export const getWorkFlowListResponse = (state: State) => state.workFlowListResponse;

export const getMultiTaskUpdateResponse = (state: State) => state.multiTaskUpdateResponse;

export const getTaskUpdateResponse = (state: State) => state.taskUpdateResponse;

export const getProjectPayBillFlowListResponse = (state: State) => state.projectPayBillFlowListResponse;

export const getLeavePage = (state: State) => state.leavePage;

export const getOvertimePage = (state: State) => state.overtimePage;

export const getPieceAuditPage = (state: State) => state.pieceAuditPage;

export const getAttendanceModifyPage = (state: State) => state.attendanceModifyPage;

export const getLimit = (state: State) => state.limit;

export const getMultiTaskUpdateOptions = (state: State) => state.multiTaskUpdateOptions;

export const getTaskUpdateOptions = (state: State) => state.taskUpdateOptions;