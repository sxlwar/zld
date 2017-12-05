import { uniqBy } from 'lodash';
import { WorkerContract, WorkerContractListResponse } from '../../interfaces/response-interface';
import * as actions from '../../actions/action/worker-action';

export interface ContractManagement {
  timerPage: number;
  timerCount: number;
  piecerPage: number;
  piecerCount: number;
  timerContractIds: number[];
  piecerContractIds: number[];
}

export interface State {
  limit: number;
  page: number;
  workerContractResponse: WorkerContractListResponse;
  workerContracts: WorkerContract[];
  management: ContractManagement;
}

export const initialState: State = {
  limit: 20,
  page: 1,
  workerContractResponse: {
    count: -1,
    worker_contract: []
  },
  workerContracts: [],
  management: {
    timerPage: 1,
    timerCount: 0,
    piecerPage: 1,
    piecerCount: 0,
    timerContractIds: [],
    piecerContractIds: []
  }
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {

    case actions.WORKER_CONTRACT_LIST_FAIL: {
      return Object.assign({}, state, { workerContractResponse: action.payload });
    }

    case actions.WORKER_CONTRACT_LIST_SUCCESS: {
      const workerContractResponse = action.payload;

      const workerContracts = uniqBy([...state.workerContracts, ...workerContractResponse.worker_contract], 'id');

      const management = updateManagement(workerContracts, state.management);

      return Object.assign({}, state, { workerContractResponse, workerContracts, management });
    }

    case actions.SET_QUERY_WORKER_CONTRACT_LIMIT: {
      return Object.assign({}, state, { limit: action.payload });
    }

    case actions.SET_QUERY_WORKER_CONTRACT_PAGE: {
      return Object.assign({}, state, { page: action.payload });
    }

    case actions.RESET_QUERY_WORKER_CONTRACT_PAGE: {
      return Object.assign({}, state, { page: initialState.page });
    }

    case actions.INCREMENT_QUERY_WORKER_CONTRACT_PAGE: {
      return Object.assign({}, state, { page: state.page + 1 });
    }

    case actions.DECREMENT_QUERY_WORKER_CONTRACT_PAGE: {
      return Object.assign({}, state, { page: state.page - 1 });
    }

    case actions.INCREMENT_MANAGE_TIMER_PAGE: {
      const management = Object.assign({}, state.management, { timerPage: state.management.timerPage + 1 });

      return Object.assign({}, state, { management });
    }

    case actions.INCREMENT_MANAGE_PIECER_PAGE: {
      const management = Object.assign({}, state.management, { piecerPage: state.management.piecerPage + 1 });

      return Object.assign({}, state, { management });
    }

    case actions.RESET_MANAGE_TIMER_PAGE: {
      const management = Object.assign({}, state.management, { timerPage: initialState.management.timerPage });

      return Object.assign({}, state, { management });
    }

    case actions.RESET_MANAGE_PIECER_PAGE: {
      const management = Object.assign({}, state.management, { piecerPage: initialState.management.piecerPage });

      return Object.assign({}, state, { management });
    }

    case actions.UPDATE_MANAGE_TIMER_COUNT: {
      const management = Object.assign({}, state.management, { timerCount: action.payload });

      return Object.assign({}, state, { management });
    }

    case actions.UPDATE_MANAGE_PIECER_COUNT: {
      const management = Object.assign({}, state.management, { piecerCount: action.payload });

      return Object.assign({}, state, { management });
    }

    case actions.RESET_WORKER_CONTRACTS: {
      return Object.assign({}, state, { workerContracts: [] });
    }

    case actions.GET_QUERY_WORKER_CONTRACT_PAGE:
    case actions.GET_QUERY_WORKER_CONTRACT_LIMIT:
    case actions.GET_WORKER_CONTRACTS:
    default:
      return state;
  }
}


export function updateManagement(source: WorkerContract[], management: ContractManagement): ContractManagement {
  const timerContractIds = source.filter(item => item.type === 'work_time_pay').map(item => item.id);

  const piecerContractIds = source.filter(item => item.type === 'work_piece_pay').map(item => item.id);

  return Object.assign({}, management, { timerContractIds, piecerContractIds });
}

export const getWorkerContractLimit = (state: State) => state.limit;

export const getWorkerContractPage = (state: State) => state.page;

export const getWorkerContracts = (state: State) => state.workerContracts;

export const getWorkerContractResponse = (state: State) => state.workerContractResponse;

export const getTimerContracts = (state: State) => state.management.timerContractIds;

export const getPiecerContracts = (state: State) => state.management.piecerContractIds;

export const getTimerCount = (state: State) => state.management.timerCount;

export const getPiecerCount = (state: State) => state.management.piecerCount;

export const getTimerPage = (state: State) => state.management.timerPage;

export const getPiecerPage = (state: State) => state.management.piecerPage;