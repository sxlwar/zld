import { WorkFlowListResponse, MultiTaskUpdateResponse, TaskUpdateResponse, ProjectPayBillFlowListResponse } from './../../interfaces/response-interface';
import { Action } from '@ngrx/store';
import { WorkFlowListOptions, MultiTaskUpdateOptions, TaskUpdateOptions, ProjectPayBillFlowListOptions } from './../../interfaces/request-interface';

export const GET_WORK_FLOW_LIST = 'GET_WORK_FLOW_LIST';

export class GetWorkFlowListAction implements Action {
    readonly type = GET_WORK_FLOW_LIST;

    constructor(public payload: WorkFlowListOptions) { }
}

export const WORK_FLOW_LIST_FAIL = 'WORK_FLOW_LIST_FAIL';

export class WorkFlowListFailAction implements Action {
    readonly type = WORK_FLOW_LIST_FAIL;

    constructor(public payload: WorkFlowListResponse) { }
}

export const WORK_FLOW_LIST_SUCCESS = 'WORK_FLOW_LIST_SUCCESS';

export class WorkFlowListSuccessAction implements Action {
    readonly type = WORK_FLOW_LIST_SUCCESS;

    constructor(public payload: WorkFlowListResponse) { }
}

export const UPDATE_MULTI_TASK = 'UPDATE_MULTI_TASK';

export class UpdateMultiTaskAction implements Action {
    readonly type = UPDATE_MULTI_TASK;

    constructor(public payload: MultiTaskUpdateOptions) { }
}

export const UPDATE_MULTI_TASK_FAIL = 'UPDATE_MULTI_TASK_FAIL';

export class UpdateMultiTaskFailAction implements Action {
    readonly type = UPDATE_MULTI_TASK_FAIL;

    constructor(public payload: MultiTaskUpdateResponse) { }
}

export const UPDATE_MULTI_TASK_SUCCESS = 'UPDATE_MULTI_TASK_SUCCESS';

export class UpdateMultiTaskSuccessAction implements Action {
    readonly type = UPDATE_MULTI_TASK_SUCCESS;

    constructor(public payload: MultiTaskUpdateResponse) { }
}

export const UPDATE_TASK = 'UPDATE_TASK';

export class UpdateTaskAction implements Action {
    readonly type = UPDATE_TASK;

    constructor(public payload: TaskUpdateOptions) { }
}

export const UPDATE_TASK_FAIL = 'UPDATE_TASK_FAIL';

export class UpdateTaskFailAction implements Action {
    readonly type = UPDATE_TASK_FAIL;

    constructor(public payload: TaskUpdateResponse) { }
}

export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';

export class UpdateTaskSuccessAction implements Action {
    readonly type = UPDATE_TASK_SUCCESS;

    constructor(public payload: TaskUpdateResponse) { }
}

export const GET_PROJECT_PAY_BILL_FLOW_LIST = 'GET_PROJECT_PAY_BILL_FLOW_LIST';

export class GetProjectPayBillFlowListAction implements Action {
    readonly type = GET_PROJECT_PAY_BILL_FLOW_LIST;

    constructor(public payload: ProjectPayBillFlowListOptions) { }
}

export const PROJECT_PAY_BILL_FLOW_FAIL = 'PROJECT_PAY_BILL_FLOW_FAIL';

export class ProjectPayBillFlowListFailAction implements Action {
    readonly type = PROJECT_PAY_BILL_FLOW_FAIL;

    constructor(public payload: ProjectPayBillFlowListResponse) { }
}

export const PROJECT_PAY_BILL_FLOW_SUCCESS = 'PROJECT_PAY_BILL_FLOW_SUCCESS';

export class ProjectPayBillFlowListSuccessAction implements Action {
    readonly type = PROJECT_PAY_BILL_FLOW_SUCCESS;

    constructor(public payload: ProjectPayBillFlowListResponse) { }
}

export const INCREASE_PAGE = 'INCREASE_PAGE';

export class IncreasePageAction implements Action {
    readonly type = INCREASE_PAGE;

    constructor(public payload: string) { }
}

export const RESET_PAGE = 'RESET_PAGE';

export class ResetPageAction implements Action {
    readonly type = RESET_PAGE;

    constructor(public payload: string) { }
}

export const RESET_WORK_FLOW_RESPONSE = 'RESET_WORK_FLOW_RESPONSE';

export class ResetWorkFlowResponseAction implements Action {
    readonly type = RESET_WORK_FLOW_RESPONSE;

    constructor() { }
}

export const SET_SCREENING_CONDITION = 'SET_SCREENING_CONDITION';

export class SetScreeningConditionAction implements Action {
    readonly type = SET_SCREENING_CONDITION;

    constructor(public payload: string) { }
}

export type Actions = GetWorkFlowListAction
    | GetProjectPayBillFlowListAction
    | IncreasePageAction
    | ResetPageAction
    | ResetWorkFlowResponseAction
    | SetScreeningConditionAction
    | ProjectPayBillFlowListFailAction
    | ProjectPayBillFlowListSuccessAction
    | WorkFlowListFailAction
    | WorkFlowListSuccessAction
    | UpdateMultiTaskAction
    | UpdateMultiTaskFailAction
    | UpdateMultiTaskSuccessAction
    | UpdateTaskAction
    | UpdateTaskFailAction
    | UpdateTaskSuccessAction;

