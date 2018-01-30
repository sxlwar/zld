import { WorkerContractEditResponse } from './../../interfaces/response-interface';
import { WorkerContractEditOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';
import { WorkerContractOptions } from '../../interfaces/request-interface';
import { WorkerContractListResponse } from '../../interfaces/response-interface';

export const GET_WORKER_CONTRACTS = 'GET_WORKER_CONTRACTS';

export class GetWorkerContractsAction implements Action {
    readonly type = GET_WORKER_CONTRACTS;

    constructor(public payload: WorkerContractOptions) {
    }
}

/*================================================limit actions===================================================*/

export const SET_QUERY_WORKER_CONTRACT_LIMIT = 'SET_QUERY_WORKER_CONTRACT_LIMIT';

export class SetQueryWorkerContractLimitAction implements Action {
    readonly type = SET_QUERY_WORKER_CONTRACT_LIMIT;

    constructor(public payload: number) { }
}

export const GET_QUERY_WORKER_CONTRACT_LIMIT = 'GET_QUERY_WORKER_CONTRACT_LIMIT';

export class GetQueryWorkerContractLimitAction implements Action {
    readonly type = GET_QUERY_WORKER_CONTRACT_LIMIT;

    constructor() { };
}

/*================================================page actions===================================================*/

export const SET_QUERY_WORKER_CONTRACT_PAGE = 'SET_QUERY_WORKER_CONTRACT_PAGE';

export class SetQueryWorkerContractPageAction implements Action {
    readonly type = SET_QUERY_WORKER_CONTRACT_PAGE;

    constructor(public payload: number) { }
}

export const GET_QUERY_WORKER_CONTRACT_PAGE = 'GET_QUERY_WORKER_CONTRACT_PAGE';

export class GetQueryWorkerContractPageAction implements Action {
    readonly type = GET_QUERY_WORKER_CONTRACT_PAGE;

    constructor() { };
}

export const RESET_QUERY_WORKER_CONTRACT_PAGE = 'RESET_QUERY_WORKER_CONTRACT_PAGE';

export class ResetQueryWorkerContractPageAction implements Action {
    readonly type = RESET_QUERY_WORKER_CONTRACT_PAGE;

    constructor() { }
}

export const INCREMENT_QUERY_WORKER_CONTRACT_PAGE = 'INCREMENT_QUERY_WORKER_CONTRACT_PAGE';

export class IncrementQueryWorkerContractPageAction implements Action {
    readonly type = 'INCREMENT_QUERY_WORKER_CONTRACT_PAGE';

    constructor() { }
}

export const DECREMENT_QUERY_WORKER_CONTRACT_PAGE = 'DECREMENT_QUERY_WORKER_CONTRACT_PAGE';

export class DecrementQueryWorkerContractPageAction implements Action {
    readonly type = 'DECREMENT_QUERY_WORKER_CONTRACT_PAGE';

    constructor() { }
}

export const INCREMENT_MANAGE_TIMER_PAGE = 'INCREMENT_MANAGE_TIMER_PAGE';

export class IncrementManagementTimerPageAction implements Action {
    readonly type = INCREMENT_MANAGE_TIMER_PAGE;

    constructor() { }
}

export const RESET_MANAGE_TIMER_PAGE = 'RESET_MANAGE_TIMER_PAGE';

export class ResetManagementTimerPageAction implements Action {
    readonly type = RESET_MANAGE_TIMER_PAGE;

    constructor() { }
}

export const INCREMENT_MANAGE_PIECER_PAGE = 'INCREMENT_MANAGE_PIECER_PAGE';

export class IncrementManagementPiecerPageAction implements Action {
    readonly type = INCREMENT_MANAGE_PIECER_PAGE;

    constructor() { }
}

export const RESET_MANAGE_PIECER_PAGE = 'RESET_MANAGE_PIECER_PAGE';

export class ResetManagementPiecerPageAction implements Action {
    readonly type = RESET_MANAGE_PIECER_PAGE;

    constructor() { }
}

/*================================================worker contracts actions===================================================*/

export const RESET_WORKER_CONTRACTS = 'RESET_WORKER_CONTRACTS';

export class ResetWorkerContractsAction implements Action {
    readonly type = RESET_WORKER_CONTRACTS;

    constructor() { }
}

/* ================================================response actions=================================================== */

export const WORKER_CONTRACT_LIST_FAIL = 'WORKER_CONTRACT_LIST_FAIL';

export class WorkerContractListFailAction {
    readonly type = WORKER_CONTRACT_LIST_FAIL;

    constructor(public payload: WorkerContractListResponse) { }
}

export const WORKER_CONTRACT_LIST_SUCCESS = 'WORKER_CONTRACT_LIST_SUCCESS';

export class WorkerContractListSuccessAction {
    readonly type = WORKER_CONTRACT_LIST_SUCCESS;

    constructor(public payload: WorkerContractListResponse) { }
}

/* ================================================Contract Amount actions=================================================== */

export const UPDATE_MANAGE_TIMER_COUNT = 'UPDATE_MANAGE_TIMER_COUNT';

export class UpdateManagementTimerCountAction implements Action {
    readonly type = UPDATE_MANAGE_TIMER_COUNT;

    constructor(public payload: number) { }
}

export const UPDATE_MANAGE_PIECER_COUNT = 'UPDATE_MANAGE_PIECER_COUNT';

export class UpdateManagementPiecerCountAction implements Action {
    readonly type = UPDATE_MANAGE_PIECER_COUNT;

    constructor(public payload: number) { }
}

export const UPDATE_SELECTED_WORKERS = 'UPDATE_SELECTED_WORKERS';

export class UpdateSelectedWorkersAction implements Action {
    readonly type = UPDATE_SELECTED_WORKERS;

    constructor(public payload: number[]) { }
}

export const RESET_SELECTED_WORKERS = 'RESET_SELECTED_WORKERS';

export class ResetSelectedWorkersAction implements Action {
    readonly type = RESET_SELECTED_WORKERS;

    constructor() { }
}

/* ================================================Contract Edit actions=================================================== */

export const EDIT_WORKER_CONTRACT = 'EDIT_WORKER_CONTRACT';

export class EditWorkerContractAction implements Action {
    readonly type = EDIT_WORKER_CONTRACT;

    constructor(public payload: WorkerContractEditOptions) { }
}

export const EDIT_WORKER_CONTRACT_FAIL = 'EDIT_WORKER_CONTRACT_FAIL';

export class EditWorkerContractFailAction implements Action {
    readonly type = EDIT_WORKER_CONTRACT_FAIL;

    constructor(public payload: WorkerContractEditResponse) { }
}

export const EDIT_WORKER_CONTRACT_SUCCESS = 'EDIT_WORKER_CONTRACT_SUCCESS';

export class EditWorkerContractSuccessAction implements Action {
    readonly type = EDIT_WORKER_CONTRACT_SUCCESS;

    constructor(public payload: WorkerContractEditResponse) { }
}

export const RESET_WORKER_CONTRACT_EDIT_RESPONSE = 'RESET_WORKER_CONTRACT_EDIT_RESPONSE';

export class ResetWorkerContractEditResponseAction implements Action {
    readonly type = RESET_WORKER_CONTRACT_EDIT_RESPONSE;

    constructor() { }
}

export const TERMINATE_WORKER_CONTRACT_AT_LOCAL = 'TERMINATE_WORKER_CONTRACT_AT_LOCAL';

export class TerminateWorkerContractAtLocalAction implements Action {
    readonly type = TERMINATE_WORKER_CONTRACT_AT_LOCAL;

    constructor(public payload: number) { }
}

export type Actions = GetWorkerContractsAction
    | DecrementQueryWorkerContractPageAction
    | EditWorkerContractAction
    | EditWorkerContractFailAction
    | EditWorkerContractSuccessAction
    | GetQueryWorkerContractLimitAction
    | GetQueryWorkerContractPageAction
    | IncrementManagementPiecerPageAction
    | IncrementManagementTimerPageAction
    | IncrementQueryWorkerContractPageAction
    | ResetManagementPiecerPageAction
    | ResetManagementTimerPageAction
    | ResetSelectedWorkersAction
    | ResetQueryWorkerContractPageAction
    | ResetWorkerContractEditResponseAction
    | ResetWorkerContractsAction
    | SetQueryWorkerContractLimitAction
    | SetQueryWorkerContractPageAction
    | TerminateWorkerContractAtLocalAction
    | UpdateSelectedWorkersAction
    | UpdateManagementPiecerCountAction
    | UpdateManagementTimerCountAction
    | WorkerContractListFailAction
    | WorkerContractListSuccessAction;
