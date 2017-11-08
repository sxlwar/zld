import {Action} from '@ngrx/store';
import {WorkerContractOptions} from '../interfaces/request-interface';
import {WorkerContractListResponse} from '../interfaces/response-interface';

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

  constructor(public payload: number){}
}

export const GET_QUERY_WORKER_CONTRACT_LIMIT = 'GET_QUERY_WORKER_CONTRACT_LIMIT';

export class GetQueryWorkerContractLimitAction implements Action {
  readonly type = GET_QUERY_WORKER_CONTRACT_LIMIT;

  constructor(){};
}

/*================================================page actions===================================================*/

export const SET_QUERY_WORKER_CONTRACT_PAGE = 'SET_QUERY_WORKER_CONTRACT_PAGE';

export class SetQueryWorkerContractPageAction implements Action {
  readonly type = SET_QUERY_WORKER_CONTRACT_PAGE;

  constructor(public payload: number){}
}

export const GET_QUERY_WORKER_CONTRACT_PAGE = 'GET_QUERY_WORKER_CONTRACT_PAGE';

export class GetQueryWorkerContractPageAction implements Action {
  readonly type = GET_QUERY_WORKER_CONTRACT_PAGE;

  constructor(){};
}

export const RESET_QUERY_WORKER_CONTRACT_PAGE = 'RESET_QUERY_WORKER_CONTRACT_PAGE';

export class ResetQueryWorkerContractPageAction implements Action {
  readonly type = RESET_QUERY_WORKER_CONTRACT_PAGE;

  constructor(){}
}

export const INCREMENT_QUERY_WORKER_CONTRACT_PAGE = 'INCREMENT_QUERY_WORKER_CONTRACT_PAGE';

export class IncrementQueryWorkerContractPageAction implements Action {
  readonly type = 'INCREMENT_QUERY_WORKER_CONTRACT_PAGE';

  constructor() {}
}

export const DECREMENT_QUERY_WORKER_CONTRACT_PAGE = 'DECREMENT_QUERY_WORKER_CONTRACT_PAGE';

export class DecrementQueryWorkerContractPageAction implements Action {
  readonly type = 'DECREMENT_QUERY_WORKER_CONTRACT_PAGE';

  constructor() {}
}

/*================================================worker contracts actions===================================================*/

export const RESET_WORKER_CONTRACTS = 'RESET_WORKER_CONTRACTS';

export class ResetWorkerContracts implements Action {
  readonly type = RESET_WORKER_CONTRACTS;

  constructor(){}
}

/*================================================response actions===================================================*/

export const WORKER_CONTRACT_LIST_FAIL = 'WORKER_CONTRACT_LIST_FAIL';

export class WorkerContractListFailAction {
  readonly type = WORKER_CONTRACT_LIST_FAIL;

  constructor(public payload: WorkerContractListResponse){}
}

export const WORKER_CONTRACT_LIST_SUCCESS = 'WORKER_CONTRACT_LIST_SUCCESS';

export class WorkerContractListSuccessAction {
  readonly type = WORKER_CONTRACT_LIST_SUCCESS;

  constructor(public payload: WorkerContractListResponse){}
}

export type Actions = GetWorkerContractsAction
  | SetQueryWorkerContractLimitAction
  | GetQueryWorkerContractLimitAction
  | SetQueryWorkerContractPageAction
  | GetQueryWorkerContractPageAction
  | ResetQueryWorkerContractPageAction
  | IncrementQueryWorkerContractPageAction
  | DecrementQueryWorkerContractPageAction
  | WorkerContractListFailAction
  | WorkerContractListSuccessAction
  | ResetWorkerContracts;
