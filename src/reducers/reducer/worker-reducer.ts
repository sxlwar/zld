import { WorkerContractEditOptions, EditPiecePayOptions } from './../../interfaces/request-interface';
import { WorkerContractEditResponse, ContractTypeOfResponse, PiecePay } from './../../interfaces/response-interface';
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
    selectedWorkers: number[]; // user ids.
    contractEditResponse: WorkerContractEditResponse;
    contractEditOptions: WorkerContractEditOptions;
}

export const initialState: State = {
    limit: 20,
    page: 1,
    workerContractResponse: null,
    workerContracts: [],
    management: {
        timerPage: 1,
        timerCount: 0,
        piecerPage: 1,
        piecerCount: 0,
        timerContractIds: [],
        piecerContractIds: []
    },
    selectedWorkers: [],
    contractEditResponse: null,
    contractEditOptions: null,
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {

        case actions.WORKER_CONTRACT_LIST_FAIL:
            return { ...state, workerContractResponse: action.payload };

        case actions.WORKER_CONTRACT_LIST_SUCCESS: {
            const workerContractResponse = action.payload;

            const workerContracts = uniqBy([...state.workerContracts, ...workerContractResponse.worker_contract], 'id');

            const management = updateManagement(workerContracts, state.management);

            return { ...state, workerContractResponse, workerContracts, management };
        }

        case actions.SET_QUERY_WORKER_CONTRACT_LIMIT:
            return { ...state, limit: action.payload };

        case actions.SET_QUERY_WORKER_CONTRACT_PAGE:
            return { ...state, page: action.payload };

        case actions.RESET_QUERY_WORKER_CONTRACT_PAGE:
            return { ...state, page: initialState.page };

        case actions.INCREMENT_QUERY_WORKER_CONTRACT_PAGE:
            return { ...state, page: state.page + 1 };

        case actions.DECREMENT_QUERY_WORKER_CONTRACT_PAGE:
            return { ...state, page: state.page - 1 };

        case actions.INCREMENT_MANAGE_TIMER_PAGE: {
            const management = { ...state.management, timerPage: state.management.timerPage + 1 };

            return { ...state, management };
        }

        case actions.INCREMENT_MANAGE_PIECER_PAGE: {
            const management = { ...state.management, piecerPage: state.management.piecerPage + 1 };

            return { ...state, management };
        }

        case actions.RESET_MANAGE_TIMER_PAGE: {
            const management = { ...state.management, timerPage: initialState.management.timerPage };

            return { ...state, management };
        }

        case actions.RESET_MANAGE_PIECER_PAGE: {
            const management = { ...state.management, piecerPage: initialState.management.piecerPage };

            return { ...state, management };
        }

        case actions.UPDATE_MANAGE_TIMER_COUNT: {
            const management = { ...state.management, timerCount: action.payload };

            return { ...state, management };
        }

        case actions.UPDATE_MANAGE_PIECER_COUNT: {
            const management = { ...state.management, piecerCount: action.payload };

            return { ...state, management };
        }

        case actions.RESET_WORKER_CONTRACTS:
            return { ...state, workerContracts: [] };

        case actions.UPDATE_SELECTED_WORKERS:
            return { ...state, selectedWorkers: action.payload };

        case actions.RESET_SELECTED_WORKERS:
            return { ...state, selectedWorkers: [] };

        case actions.EDIT_WORKER_CONTRACT:
            return { ...state, contractEditOptions: action.payload };

        case actions.EDIT_WORKER_CONTRACT_FAIL:
            return { ...state, contractEditResponse: action.payload };

        case actions.EDIT_WORKER_CONTRACT_SUCCESS:
            return {
                ...state,
                contractEditResponse: action.payload,
                workerContracts: updateWorkerContract(state.contractEditOptions, state.workerContracts),
                workerContractResponse: { ...state.workerContractResponse, worker_contract: updateWorkerContract(state.contractEditOptions, state.workerContractResponse.worker_contract) },
            };

        case actions.RESET_WORKER_CONTRACT_EDIT_RESPONSE:
            return { ...state, contractEditResponse: null };

        case actions.TERMINATE_WORKER_CONTRACT_AT_LOCAL:
            return {
                ...state,
                workerContracts: state.workerContracts.filter(item => item.id !== action.payload),
                workerContractResponse: {
                    ...state.workerContractResponse,
                    count: state.workerContractResponse.count - 1,
                    worker_contract: state.workerContractResponse.worker_contract.filter(item => item.id !== action.payload)
                }
            };

        case actions.GET_QUERY_WORKER_CONTRACT_PAGE:
        case actions.GET_QUERY_WORKER_CONTRACT_LIMIT:
        case actions.GET_WORKER_CONTRACTS:
        default:
            return state;
    }
}

export function updateWorkerContract(options: WorkerContractEditOptions, contracts: WorkerContract[]): WorkerContract[] {
    const index: number = contracts.findIndex(item => item.id === options.contract_id);

    if (index < 0) {
        return contracts;
    } else {
        const result = [...contracts];

        const { work_time_pay, worker_contract, attach, work_piece_pay } = options;

        const pay_day = Number(worker_contract.pay_day);  //真TMD的恶心，同一个字段的数据类型不一样

        const target: WorkerContract = { ...result[index], ...worker_contract, pay_day, request_files: attach };

        if (target.type === ContractTypeOfResponse.timer) {
            result[index] = { ...target, work_time_pay: [{ ...result[index].work_time_pay[0], ...work_time_pay[0] }] };
        } else {
            result[index] = { ...target, work_piece_pay: updatePieces(target.work_piece_pay, work_piece_pay) };
        }

        return result;
    }
}

export function updatePieces(oldPieces: PiecePay[], newPieces: EditPiecePayOptions[]): PiecePay[] {
    const updatedPieces = oldPieces.map(old => {
        const piece = newPieces.find(piece => piece.id === old.id);

        if (piece) {
            return { ...old, ...piece };
        } else {
            return old;
        }
    });

    const addedPieces = <PiecePay[]>newPieces.filter(piece => !oldPieces.find(item => item.id === piece.id))

    return updatedPieces.concat(addedPieces);
}


export function updateManagement(source: WorkerContract[], management: ContractManagement): ContractManagement {
    const timerContractIds = source.filter(item => item.type === 'work_time_pay').map(item => item.id);

    const piecerContractIds = source.filter(item => item.type === 'work_piece_pay').map(item => item.id);

    return { ...management, timerContractIds, piecerContractIds };
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

export const getSelectedWorkers = (state: State) => state.selectedWorkers;

export const getContractEditResponse = (state: State) => state.contractEditResponse;

export const getContractEditOptions = (state: State) => state.contractEditOptions;