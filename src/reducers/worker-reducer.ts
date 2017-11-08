import {WorkerContract, WorkerContractListResponse} from '../interfaces/response-interface';
import * as actions from '../actions/worker-action';

export interface State {
  limit: number;
  page: number;
  workerContractResponse: WorkerContractListResponse;
  workerContracts: WorkerContract[]
}

export const initialState: State = {
  limit: 10,
  page: 1,
  workerContractResponse: {
    count: -1,
    worker_contract: null
  },
  workerContracts: []
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {

    case actions.WORKER_CONTRACT_LIST_FAIL: {
      const workerContractResponse = action.payload;

      return {
        limit: state.limit,
        page: state.page,
        workerContracts: state.workerContracts,
        workerContractResponse
      };
    }
    case actions.WORKER_CONTRACT_LIST_SUCCESS: {
      const workerContractResponse = action.payload;

      let {limit, page, workerContracts} = state;

      workerContracts = workerContracts.concat(workerContractResponse.worker_contract);

      return {limit, page, workerContractResponse, workerContracts};
    }

    case actions.SET_QUERY_WORKER_CONTRACT_LIMIT: {
      const result = {...state};

      result.limit = action.payload;

      return result;
    }

    case actions.SET_QUERY_WORKER_CONTRACT_PAGE: {
      const result = {...state};

      result.page = action.payload;

      return result;
    }

    case actions.RESET_QUERY_WORKER_CONTRACT_PAGE: {
      const result = {...state};

      result.page = initialState.page;

      return result;
    }

    case actions.INCREMENT_QUERY_WORKER_CONTRACT_PAGE: {
      return Object.assign({}, state, {page: state.page + 1});
    }

    case actions.DECREMENT_QUERY_WORKER_CONTRACT_PAGE: {
      return Object.assign({}, state, {page: state.page -1});
    }

    case actions.RESET_WORKER_CONTRACTS: {
      return Object.assign({}, state, {workerContracts: []});
    }

    case actions.GET_QUERY_WORKER_CONTRACT_PAGE:
    case actions.GET_QUERY_WORKER_CONTRACT_LIMIT:
    case actions.GET_WORKER_CONTRACTS:
    default:
      return state;
  }
}

export const getWorkerContractLimit = (state: State) => state.limit;

export const getWorkerContractPage = (state: State) => state.page;

export const getWorkerContracts = (state: State) => state.workerContracts;

export const getWorkerContractResponse = (state: State) => state.workerContractResponse;
