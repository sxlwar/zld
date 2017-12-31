import { MultiTaskUpdateOptions, TaskUpdateOptions } from './../../interfaces/request-interface';
import { WorkFlowListResponse, ProjectPayBillFlowListResponse, MultiTaskUpdateResponse, TaskUpdateResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/work-flow-action';

export interface State {
    workFlowListResponse: WorkFlowListResponse;
    projectPayBillFlowListResponse: ProjectPayBillFlowListResponse;
    multiTaskUpdateResponse: MultiTaskUpdateResponse;
    taskUpdateResponse: TaskUpdateResponse;
    multiTaskUpdateOptions: MultiTaskUpdateOptions;
    taskUpdateOptions: TaskUpdateOptions;
}

export const initialState: State = {
    workFlowListResponse: null,
    projectPayBillFlowListResponse: null,
    multiTaskUpdateResponse: null,
    taskUpdateResponse: null,
    multiTaskUpdateOptions: null,
    taskUpdateOptions: null
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.WORK_FLOW_LIST_FAIL:
        case actions.WORK_FLOW_LIST_SUCCESS:
            return { ...state, workFlowListResponse: action.payload };

        case actions.PROJECT_PAY_BILL_FLOW_FAIL:
        case actions.PROJECT_PAY_BILL_FLOW_SUCCESS:
            return { ...state, projectPayBillFlowListResponse: action.payload };

        case actions.UPDATE_MULTI_TASK:
            return { ...state, multiTaskUpdateOptions: action.payload };

        case actions.UPDATE_MULTI_TASK_FAIL:
        case actions.UPDATE_MULTI_TASK_SUCCESS:
            return { ...state, multiTaskUpdateResponse: action.payload };

        case actions.UPDATE_TASK:
            return { ...state, taskUpdateOptions: action.payload };

        case actions.UPDATE_TASK_FAIL:
        case actions.UPDATE_TASK_SUCCESS:
            return { ...state, taskUpdateResponse: action.payload };

        case actions.GET_PROJECT_PAY_BILL_FLOW_LIST:
        case actions.GET_WORK_FLOW_LIST:
        default:
            return state;
    }
}

export const getWorkFlowListResponse = (state: State) => state.workFlowListResponse;

export const getMultiTaskUpdateResponse = (state: State) => state.multiTaskUpdateResponse;

export const getTaskUpdateResponse = (state: State) => state.taskUpdateResponse;

export const getProjectPayBillFlowListResponse = (state: State) => state.projectPayBillFlowListResponse;
