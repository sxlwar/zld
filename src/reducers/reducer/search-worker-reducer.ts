import { SearchWorkerResponse, WorkerInfo } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/search-worker-action';

export enum QueryWorkerBy {
    name = 'name',
    userName = 'username'
}

export interface State {
    searchWorkerResponse: SearchWorkerResponse;
    selectedWorkers: WorkerInfo[];
    query: string;
    queryBy: string;
}

export const initialState: State = {
    searchWorkerResponse: null,
    selectedWorkers: [],
    query: '',
    queryBy: QueryWorkerBy.name
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.SEARCH_WORKER_FAIL:
        case actions.SEARCH_WORKER_SUCCESS:
            return { ...state, searchWorkerResponse: action.payload };

        case actions.ADD_SELECTED_WORKER:
            return { ...state, selectedWorkers: state.selectedWorkers.concat([state.searchWorkerResponse.workers.find(item => item.user_id === action.payload)]) };

        case actions.REMOVE_SELECTED_WORKER:
            return { ...state, selectedWorkers: state.selectedWorkers.filter(item => item.user_id !== action.payload) };

        case actions.SEARCH_WORKER:
            return { ...state, query: state.queryBy === QueryWorkerBy.name ? action.payload.realname : action.payload.username };

        case actions.SET_QUERY_CONDITION:
            return { ...state, queryBy: action.payload };

        default:
            return state;
    }
}

export const getSearchWorkerResponse = (state: State) => state.searchWorkerResponse;

export const getSelectedWorkers = (state: State) => state.selectedWorkers;

export const getQuery = (state: State) => state.query;

export const getQueryCondition = (state: State) => state.queryBy;