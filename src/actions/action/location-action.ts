import { HistoryLocationListResponse, ProjectAreaListResponse } from './../../interfaces/response-interface';
import { HistoryLocationListOptions, ProjectAreaListOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';
import { Trajectory } from '../../interfaces/location-interface';

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

export const RESET_HISTORY_LOCATION_END_TIME = 'RESET_HISTORY_LOCATION_END_TIME';

export class ResetHistoryLocationEndTimeAction implements Action {
    readonly type = RESET_HISTORY_LOCATION_END_TIME;

    constructor() { };
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

export const UPDATE_TRAJECTORY_OPTIONS = 'UPDATE_TRAJECTORY_OPTIONS';

export class UpdateTrajectoryOptionAction implements Action {
    readonly type = UPDATE_TRAJECTORY_OPTIONS;

    constructor(public payload: { [key: string]: string | number[] }) { }
}

export const RESET_TRAJECTORY_END_TIME = 'RESET_TRAJECTORY_END_TIME';

export class ResetTrajectoryEndTimeAction implements Action {
    readonly type = RESET_TRAJECTORY_END_TIME;

    constructor() { }
}

export const UPDATE_TRAJECTORY_MAX_END_TIME = 'UPDATE_TRAJECTORY_MAX_END_TIME';

export class UpdateMaxEndTimeOfTrajectoryAction implements Action {
    readonly type = UPDATE_TRAJECTORY_MAX_END_TIME;

    constructor(public payload: string) { }
}

export const UPDATE_TRAJECTORY_SELECTED_WORKER_ID = 'UPDATE_TRAJECTORY_SELECTED_WORKER_ID';

export class UpdateTrajectorySelectedWorkerAction implements Action {
    readonly type = UPDATE_TRAJECTORY_SELECTED_WORKER_ID;

    constructor(public payload: { id: number, selected: boolean }) { }
}

/* ====================================================================Play actions================================================== */

export const UPDATE_PLAY_WORKERS = 'UPDATE_PLAY_WORKERS';

export class UpdatePlayWorkersAction implements Action {
    readonly type = UPDATE_PLAY_WORKERS;

    constructor(public payload: number[]) { }
}

export const UPDATE_TRAJECTORY = 'UPDATE_TRAJECTORY';

export class UpdateTrajectoryAction implements Action {
    readonly type = UPDATE_TRAJECTORY;

    constructor(public payload: Trajectory[]) { }
}

export const UPDATE_PLAY_STATE = 'UPDATE_PLAY_STATE';

export class UpdatePlayStateAction implements Action {
    readonly type = UPDATE_PLAY_STATE;

    constructor(public payload: number) { }
}

export const UPDATE_RATE_STATE = 'UPDATE_RATE_STATE';

export class UpdateRateStateAction implements Action {
    readonly type = UPDATE_RATE_STATE;

    constructor(public payload: number) { }
}

export type Actions = GetHistoryLocationListAction
    | GetProjectAreaListAction
    | HistoryLocationListFailAction
    | HistoryLocationListSuccessAction
    | ProjectAreaListFailAction
    | ProjectAreaListSuccessAction
    | ResetHistoryLocationEndTimeAction
    | ResetTrajectoryEndTimeAction
    | UpdateHistoryLocationOptionAction
    | UpdateMaxEndTimeAction
    | UpdateMaxEndTimeOfTrajectoryAction
    | UpdatePlayStateAction
    | UpdatePlayWorkersAction
    | UpdateRateStateAction
    | UpdateTrajectoryAction
    | UpdateSelectedWorkerId
    | UpdateTrajectoryOptionAction
    | UpdateTrajectorySelectedWorkerAction;
