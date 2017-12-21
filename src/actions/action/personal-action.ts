import { BasicInfoListResponse, PersonalIdListResponse, WorkerDetailListResponse, WorkerDetailUpdateResponse, HomeInfoListResponse, HomeInfoUpdateResponse } from './../../interfaces/response-interface';
import { BasicInfoListOptions, PersonalIdListOptions, WorkerDetailListOptions, WorkerDetailUpdateOptions, HomeInfoListOptions, HomeInfoUpdateOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

/*  ===================================================Basic information================================================== */

export const GET_BASIC_INFORMATION = 'GET_BASIC_INFORMATION';

export class GetBasicInformationAction implements Action {
    readonly type = GET_BASIC_INFORMATION;

    constructor(public payload: BasicInfoListOptions) { }
}

export const BASIC_INFORMATION_FAIL = 'BASIC_INFORMATION_FAIL';

export class BasicInfoListFailAction implements Action {
    readonly type = BASIC_INFORMATION_FAIL;

    constructor(public payload: BasicInfoListResponse) { }
}

export const BASIC_INFORMATION_SUCCESS = 'BASIC_INFORMATION_SUCCESS';

export class BasicInfoListSuccessAction implements Action {
    readonly type = BASIC_INFORMATION_SUCCESS;

    constructor(public payload: BasicInfoListResponse) { }
}

/*  ===================================================Personal id================================================== */

export const GET_PERSONAL_ID_LIST = 'GET_PERSONAL_ID_LIST';

export class GetPersonalIdListAction implements Action {
    readonly type = GET_PERSONAL_ID_LIST;

    constructor(public payload: PersonalIdListOptions) { }
}

export const PERSONAL_ID_LIST_FAIL = 'PERSONAL_ID_LIST_FAIL';

export class PersonalIdListFailAction implements Action {
    readonly type = PERSONAL_ID_LIST_FAIL;

    constructor(public payload: PersonalIdListResponse) { }
}

export const PERSONAL_ID_LIST_SUCCESS = 'PERSONAL_ID_LIST_SUCCESS';

export class PersonalIdListSuccessAction implements Action {
    readonly type = PERSONAL_ID_LIST_SUCCESS;

    constructor(public payload: PersonalIdListResponse) { }
}

/*  ===================================================Worker detail=========================================== */

export const GET_WORKER_DETAIL_LIST = 'GET_WORKER_DETAIL_LIST';

export class GetWorkerDetailListAction implements Action {
    readonly type = GET_WORKER_DETAIL_LIST;

    constructor(public payload: WorkerDetailListOptions) { }
}

export const WORKER_DETAIL_LIST_FAIL = 'WORKER_DETAIL_LIST_FAIL';

export class WorkerDetailListFailAction implements Action {
    readonly type = WORKER_DETAIL_LIST_FAIL;

    constructor(public payload: WorkerDetailListResponse) { }
}

export const WORKER_DETAIL_LIST_SUCCESS = 'WORKER_DETAIL_LIST_SUCCESS';

export class WorkerDetailListSuccessAction implements Action {
    readonly type = WORKER_DETAIL_LIST_SUCCESS;

    constructor(public payload: WorkerDetailListResponse) { }
}

/* ======================================================Worker detail update============================================ */

export const UPDATE_WORKER_DETAIL = 'UPDATE_WORKER_DETAIL';

export class UpdateWorkerDetailAction implements Action {
    readonly type = UPDATE_WORKER_DETAIL;

    constructor(public payload: WorkerDetailUpdateOptions) { }
}

export const UPDATE_WORKER_DETAIL_FAIL = 'UPDATE_WORKER_DETAIL_FAIL';

export class UpdateWorkerDetailFailAction implements Action {
    readonly type = UPDATE_WORKER_DETAIL_FAIL;

    constructor(public payload: WorkerDetailUpdateResponse) { }
}

export const UPDATE_WORKER_DETAIL_SUCCESS = 'UPDATE_WORKER_DETAIL_SUCCESS';

export class UpdateWorkerDetailSuccessAction implements Action {
    readonly type = UPDATE_WORKER_DETAIL_SUCCESS;

    constructor(public payload: WorkerDetailUpdateResponse) { }
}

/* ====================================================Home information================================================ */

export const GET_HOME_INFO_LIST = 'GET_HOME_INFO_LIST';

export class GetHomeInfoListAction implements Action {
    readonly type = GET_HOME_INFO_LIST;

    constructor(public payload: HomeInfoListOptions) { }
}

export const HOME_INFO_LIST_FAIL = 'HOME_INFO_LIST_FAIL';

export class HomeInfoListFailAction implements Action {
    readonly type = HOME_INFO_LIST_FAIL;

    constructor(public payload: HomeInfoListResponse) { }
}

export const HOME_INFO_LIST_SUCCESS = 'HOME_INFO_LIST_SUCCESS';

export class HomeInfoListSuccessAction implements Action {
    readonly type = HOME_INFO_LIST_SUCCESS;

    constructor(public payload: HomeInfoListResponse) { }
}

export const UPDATE_HOME_INFO = 'UPDATE_HOME_INFO';

export class UpdateHomeInfoAction implements Action {
    readonly type = UPDATE_HOME_INFO;

    constructor(public payload: HomeInfoUpdateOptions) { }
}

export const HOME_INFO_UPDATE_FAIL = 'HOME_INFO_UPDATE_FAIL';

export class HomeInfoUpdateFailAction implements Action {
    readonly type = HOME_INFO_UPDATE_FAIL;

    constructor(public payload: HomeInfoUpdateResponse) { }
}

export const HOME_INFO_UPDATE_SUCCESS = 'HOME_INFO_UPDATE_SUCCESS';

export class HomeInfoUpdateSuccessAction implements Action {
    readonly type = HOME_INFO_UPDATE_SUCCESS;

    constructor(public payload: HomeInfoUpdateResponse) { }
}

/* ====================================================Local update==================================================== */

export const UPDATE_WORK_TYPES_AT_LOCAL = 'UPDATE_WORK_TYPES_AT_LOCAL'

export class UpdateLocalWorkerDetailWorkTypesAction implements Action {
    readonly type = UPDATE_WORK_TYPES_AT_LOCAL;

    constructor(public payload: number[]) { }
}

export type Actions = GetBasicInformationAction
    | BasicInfoListFailAction
    | BasicInfoListSuccessAction
    | GetHomeInfoListAction
    | GetPersonalIdListAction
    | GetWorkerDetailListAction
    | HomeInfoListFailAction
    | HomeInfoUpdateFailAction
    | HomeInfoListSuccessAction
    | HomeInfoUpdateSuccessAction
    | PersonalIdListFailAction
    | PersonalIdListSuccessAction
    | UpdateHomeInfoAction
    | UpdateLocalWorkerDetailWorkTypesAction
    | UpdateWorkerDetailAction
    | UpdateWorkerDetailFailAction
    | UpdateWorkerDetailSuccessAction
    | WorkerDetailListFailAction
    | WorkerDetailListSuccessAction