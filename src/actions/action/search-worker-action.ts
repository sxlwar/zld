import { SearchWorkerOptions } from './../../interfaces/request-interface';
import { SearchWorkerResponse } from './../../interfaces/response-interface';
import { Action } from '@ngrx/store';

export const SEARCH_WORKER = 'SEARCH_WORKER';

export class SearchWorkerAction implements Action {
    readonly type = SEARCH_WORKER;

    constructor(public payload: SearchWorkerOptions) { }
}

export const SEARCH_WORKER_FAIL = 'SEARCH_WORKER_FAIL';

export class SearchWorkerFailAction implements Action {
    readonly type = SEARCH_WORKER_FAIL;

    constructor(public payload: SearchWorkerResponse) { }
}

export const SEARCH_WORKER_SUCCESS = 'SEARCH_WORKER_SUCCESS';

export class SearchWorkerSuccessAction implements Action {
    readonly type = SEARCH_WORKER_SUCCESS;

    constructor(public payload: SearchWorkerResponse) { }
}

export const ADD_SELECTED_WORKER = 'ADD_SELECTED_WORKER';

export class AddSelectedWorkerAction implements Action {
    readonly type = ADD_SELECTED_WORKER;

    constructor(public payload: number) { }
}

export const REMOVE_SELECTED_WORKER = 'REMOVE_SELECTED_WORKER';

export class RemoveSelectedWorkerAction implements Action {
    readonly type = REMOVE_SELECTED_WORKER;

    constructor(public payload: number) { }
}

export const SET_QUERY_CONDITION = 'SET_QUERY_CONDITION';

export class SetQueryWorkerConditionAction implements Action {
    readonly type = SET_QUERY_CONDITION;

    constructor(public payload: string) { }
}

export type Actions = SearchWorkerAction
    | AddSelectedWorkerAction
    | RemoveSelectedWorkerAction
    | SearchWorkerFailAction
    | SearchWorkerSuccessAction
    | SetQueryWorkerConditionAction;

