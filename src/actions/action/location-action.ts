import { HistoryLocationListResponse, ProjectAreaListResponse } from './../../interfaces/response-interface';
import { HistoryLocationListOptions, ProjectAreaListOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

/* ==================================================API actions=============================================== */

export const GET_HISTORY_LOCATION = 'GET_HISTORY_LOCATION';

export class GetHistoryLocationListAction implements Action {
    readonly type = GET_HISTORY_LOCATION;

    constructor(public payload: HistoryLocationListOptions) { }
}

export const HISTORY_LOCATION_LIST_FAIL = 'HISTORY_LOCATION_LIST_FAIL';

export class HistoryLocationListFailAction implements Action {
    readonly type = HISTORY_LOCATION_LIST_FAIL;

    constructor(public payload: HistoryLocationListResponse) { }
}

export const HISTORY_LOCATION_LIST_SUCCESS = 'HISTORY_LOCATION_LIST_SUCCESS';

export class HistoryLocationListSuccessAction implements Action {
    readonly type = HISTORY_LOCATION_LIST_SUCCESS;

    constructor(public payload: HistoryLocationListResponse) { }
}

export const GET_PROJECT_AREA = 'GET_PROJECT_AREA';

export class GetProjectAreaListAction implements Action {
    readonly type = GET_PROJECT_AREA;

    constructor(public payload: ProjectAreaListOptions) { }
}

export const PROJECT_AREA_LIST_FAIL = 'PROJECT_AREA_LIST_FAIL';

export class ProjectAreaListFailAction implements Action {
    readonly type = PROJECT_AREA_LIST_FAIL;

    constructor(public payload: ProjectAreaListResponse) { }
}

export const PROJECT_AREA_LIST_SUCCESS = 'PROJECT_AREA_LIST_SUCCESS';

export class ProjectAreaListSuccessAction implements Action {
    readonly type = PROJECT_AREA_LIST_SUCCESS;

    constructor(public payload: ProjectAreaListResponse) { }
}

/* ==================================================Condition actions=============================================== */

export const UPDATE_HISTORY_LOCATION_OPTION = 'UPDATE_HISTORY_LOCATION_OPTION';

export class UpdateHistoryLocationOptionAction implements Action {
    readonly type = UPDATE_HISTORY_LOCATION_OPTION;

    constructor(public payload: { [key: string]: string | number[] }) { }
}

export const UPDATE_SELECTED_WORKER_ID = 'UPDATE_SELECTED_WORKER_ID';

export class UpdateSelectedWorkerId implements Action {
    readonly type = UPDATE_SELECTED_WORKER_ID;

    constructor(public payload: { id: number, selected: boolean }) { }
}

export const UPDATE_MAX_END_TIME = 'UPDATE_MAX_END_TIME';

export class UpdateMaxEndTimeAction implements Action {
    readonly type = UPDATE_MAX_END_TIME;

    constructor(public payload: string) { }
}


export type Actions = GetHistoryLocationListAction
    | GetProjectAreaListAction
    | HistoryLocationListFailAction
    | HistoryLocationListSuccessAction
    | ProjectAreaListFailAction
    | ProjectAreaListSuccessAction
    | UpdateHistoryLocationOptionAction
    | UpdateMaxEndTimeAction
    | UpdateSelectedWorkerId;
