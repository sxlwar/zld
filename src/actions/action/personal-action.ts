import { Action } from '@ngrx/store';

import {
    BasicInfoListOptions,
    EducationAddOptions,
    EducationDeleteOptions,
    EducationListOptions,
    EducationUpdateOptions,
    HomeInfoListOptions,
    HomeInfoUpdateOptions,
    PersonalIdListOptions,
    PlatformWorkExperienceListOptions,
    WorkerDetailListOptions,
    WorkerDetailUpdateOptions,
    WorkExperienceAddOptions,
    WorkExperienceDeleteOptions,
    WorkExperienceListOptions,
    WorkExperienceUpdateOptions,
} from './../../interfaces/request-interface';
import {
    BasicInfoListResponse,
    EducationAddResponse,
    EducationDeleteResponse,
    EducationListResponse,
    EducationUpdateResponse,
    HomeInfoListResponse,
    HomeInfoUpdateResponse,
    PersonalIdListResponse,
    PlatformWorkExperienceResponse,
    WorkerDetailListResponse,
    WorkerDetailUpdateResponse,
    WorkExperienceAddResponse,
    WorkExperienceDeleteResponse,
    WorkExperienceListResponse,
    WorkExperienceUpdateResponse,
} from './../../interfaces/response-interface';

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

/* ====================================================education experience==================================================== */

export const GET_EDUCATION_LIST = 'GET_EDUCATION_LIST';

export class GetEducationListAction implements Action {
    readonly type = GET_EDUCATION_LIST;

    constructor(public payload: EducationListOptions) { }
}

export const EDUCATION_LIST_FAIL = 'EDUCATION_LIST_FAIL';

export class EducationListFailAction implements Action {
    readonly type = EDUCATION_LIST_FAIL;

    constructor(public payload: EducationListResponse) { }
}

export const EDUCATION_LIST_SUCCESS = 'EDUCATION_LIST_SUCCESS';

export class EducationListSuccessAction implements Action {
    readonly type = EDUCATION_LIST_SUCCESS;

    constructor(public payload: EducationListResponse) { }
}

export const ADD_EDUCATION = 'ADD_EDUCATION';

export class AddEducationAction implements Action {
    readonly type = ADD_EDUCATION;

    constructor(public payload: EducationAddOptions) { }
}

export const ADD_EDUCATION_FAIL = 'ADD_EDUCATION_FAIL';

export class AddEducationFailAction implements Action {
    readonly type = ADD_EDUCATION_FAIL;

    constructor(public payload: EducationAddResponse) { }
}

export const ADD_EDUCATION_SUCCESS = 'ADD_EDUCATION_SUCCESS';

export class AddEducationSuccessAction implements Action {
    readonly type = ADD_EDUCATION_SUCCESS;

    constructor(public payload: EducationAddResponse) { }
}

export const DELETE_EDUCATION = 'DELETE_EDUCATION';

export class DeleteEducationAction implements Action {
    readonly type = DELETE_EDUCATION;

    constructor(public payload: EducationDeleteOptions) { }
}

export const DELETE_EDUCATION_FAIL = 'DELETE_EDUCATION_FAIL';

export class DeleteEducationFailAction implements Action {
    readonly type = DELETE_EDUCATION_FAIL;

    constructor(public payload: EducationDeleteResponse) { }
}

export const DELETE_EDUCATION_SUCCESS = 'DELETE_EDUCATION_SUCCESS';

export class DeleteEducationSuccessAction implements Action {
    readonly type = DELETE_EDUCATION_SUCCESS;

    constructor(public payload: EducationDeleteResponse) { }
}

export const UPDATE_EDUCATION = 'UPDATE_EDUCATION';

export class UpdateEducationAction implements Action {
    readonly type = UPDATE_EDUCATION;

    constructor(public payload: EducationUpdateOptions) { }
}

export const UPDATE_EDUCATION_FAIL = 'UPDATE_EDUCATION_FAIL';

export class UpdateEducationFailAction implements Action {
    readonly type = UPDATE_EDUCATION_FAIL;

    constructor(public payload: EducationUpdateResponse) { }
}

export const UPDATE_EDUCATION_SUCCESS = 'UPDATE_EDUCATION_SUCCESS';

export class UpdateEducationSuccessAction implements Action {
    readonly type = UPDATE_EDUCATION_SUCCESS;

    constructor(public payload: EducationUpdateResponse) { }
}

/* ====================================================Work experience================================================= */

export const GET_WORK_EXPERIENCE_LIST = 'GET_WORK_EXPERIENCE_LIST';

export class GetWorkExperienceListAction implements Action {
    readonly type = GET_WORK_EXPERIENCE_LIST;

    constructor(public payload: WorkExperienceListOptions) { }
}

export const WORK_EXPERIENCE_LIST_FAIL = 'WORK_EXPERIENCE_LIST_FAIL';

export class WorkExperienceListFailAction implements Action {
    readonly type = WORK_EXPERIENCE_LIST_FAIL;

    constructor(public payload: WorkExperienceListResponse) { }
}

export const WORK_EXPERIENCE_LIST_SUCCESS = 'WORK_EXPERIENCE_LIST_SUCCESS';

export class WorkExperienceListSuccessAction implements Action {
    readonly type = WORK_EXPERIENCE_LIST_SUCCESS;

    constructor(public payload: WorkExperienceListResponse) { }
}

export const ADD_WORK_EXPERIENCE = 'ADD_WORK_EXPERIENCE';

export class AddWorkExperienceAction implements Action {
    readonly type = ADD_WORK_EXPERIENCE;

    constructor(public payload: WorkExperienceAddOptions) { }
}

export const WORK_EXPERIENCE_ADD_FAIL = 'WORK_EXPERIENCE_ADD_FAIL';

export class WorkExperienceAddFailAction implements Action {
    readonly type = WORK_EXPERIENCE_ADD_FAIL;

    constructor(public payload: WorkExperienceAddResponse) { }
}

export const WORK_EXPERIENCE_ADD_SUCCESS = 'WORK_EXPERIENCE_ADD_SUCCESS';

export class WorkExperienceAddSuccessAction implements Action {
    readonly type = WORK_EXPERIENCE_ADD_SUCCESS;

    constructor(public payload: WorkExperienceAddResponse) { }
}

export const DELETE_WORK_EXPERIENCE = 'DELETE_WORK_EXPERIENCE';

export class DeleteWorkExperienceAction implements Action {
    readonly type = DELETE_WORK_EXPERIENCE;

    constructor(public payload: WorkExperienceDeleteOptions) { }
}

export const WORK_EXPERIENCE_DELETE_FAIL = 'WORK_EXPERIENCE_DELETE_FAIL';

export class WorkExperienceDeleteFailAction implements Action {
    readonly type = WORK_EXPERIENCE_DELETE_FAIL;

    constructor(public payload: WorkExperienceDeleteResponse) { }
}

export const WORK_EXPERIENCE_DELETE_SUCCESS = 'WORK_EXPERIENCE_DELETE_SUCCESS';

export class WorkExperienceDeleteSuccessAction implements Action {
    readonly type = WORK_EXPERIENCE_DELETE_SUCCESS;

    constructor(public payload: WorkExperienceDeleteResponse) { }
}

export const UPDATE_WORK_EXPERIENCE = 'UPDATE_WORK_EXPERIENCE';

export class UpdateWorkExperienceAction implements Action {
    readonly type = UPDATE_WORK_EXPERIENCE;

    constructor(public payload: WorkExperienceUpdateOptions) { }
}

export const WORK_EXPERIENCE_UPDATE_FAIL = 'WORK_EXPERIENCE_UPDATE_FAIL';

export class WorkExperienceUpdateFailAction implements Action {
    readonly type = WORK_EXPERIENCE_UPDATE_FAIL;

    constructor(public payload: WorkExperienceUpdateResponse) { }
}

export const WORK_EXPERIENCE_UPDATE_SUCCESS = 'WORK_EXPERIENCE_UPDATE_SUCCESS';

export class WorkExperienceUpdateSuccessAction implements Action {
    readonly type = WORK_EXPERIENCE_UPDATE_SUCCESS;

    constructor(public payload: WorkExperienceUpdateResponse) { }
}

export const GET_PLATFORM_WORK_EXPERIENCE_LIST = 'GET_PLATFORM_WORK_EXPERIENCE_LIST';

export class GetPlatformWorkExperienceListAction implements Action {
    readonly type = GET_PLATFORM_WORK_EXPERIENCE_LIST;

    constructor(public payload: PlatformWorkExperienceListOptions) { }
}

export const PLATFORM_WORK_EXPERIENCE_LIST_FAIL = 'PLATFORM_WORK_EXPERIENCE_LIST_FAIL';

export class PlatformWorkExperienceListFailAction implements Action {
    readonly type = PLATFORM_WORK_EXPERIENCE_LIST_FAIL;

    constructor(public payload: PlatformWorkExperienceResponse) { }
}

export const PLATFORM_WORK_EXPERIENCE_LIST_SUCCESS = 'PLATFORM_WORK_EXPERIENCE_LIST_SUCCESS';

export class PlatformWorkExperienceListSuccessAction implements Action {
    readonly type = PLATFORM_WORK_EXPERIENCE_LIST_SUCCESS;

    constructor(public payload: PlatformWorkExperienceResponse) { }
}

/* ====================================================Local update==================================================== */

export const UPDATE_WORK_TYPES_AT_LOCAL = 'UPDATE_WORK_TYPES_AT_LOCAL'

export class UpdateLocalWorkerDetailWorkTypesAction implements Action {
    readonly type = UPDATE_WORK_TYPES_AT_LOCAL;

    constructor(public payload: number[]) { }
}

export type Actions = GetBasicInformationAction
    | AddEducationAction
    | AddEducationFailAction
    | AddEducationSuccessAction
    | AddWorkExperienceAction
    | BasicInfoListFailAction
    | BasicInfoListSuccessAction
    | DeleteEducationAction
    | DeleteEducationFailAction
    | DeleteEducationSuccessAction
    | DeleteWorkExperienceAction
    | EducationListFailAction
    | EducationListSuccessAction
    | GetEducationListAction
    | GetHomeInfoListAction
    | GetPersonalIdListAction
    | GetPlatformWorkExperienceListAction
    | GetWorkExperienceListAction
    | GetWorkerDetailListAction
    | HomeInfoListFailAction
    | HomeInfoListSuccessAction
    | HomeInfoUpdateFailAction
    | HomeInfoUpdateSuccessAction
    | PersonalIdListFailAction
    | PersonalIdListSuccessAction
    | PlatformWorkExperienceListFailAction
    | PlatformWorkExperienceListSuccessAction
    | UpdateEducationAction
    | UpdateEducationFailAction
    | UpdateEducationSuccessAction
    | UpdateHomeInfoAction
    | UpdateLocalWorkerDetailWorkTypesAction
    | UpdateWorkExperienceAction
    | UpdateWorkerDetailAction
    | UpdateWorkerDetailFailAction
    | UpdateWorkerDetailSuccessAction
    | WorkExperienceAddFailAction
    | WorkExperienceAddSuccessAction
    | WorkExperienceDeleteFailAction
    | WorkExperienceDeleteSuccessAction
    | WorkExperienceListFailAction
    | WorkExperienceListSuccessAction
    | WorkExperienceUpdateFailAction
    | WorkExperienceUpdateSuccessAction
    | WorkerDetailListFailAction
    | WorkerDetailListSuccessAction;
