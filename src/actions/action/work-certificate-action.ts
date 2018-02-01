import { Action } from '@ngrx/store';

import {
    CertificateAddOptions,
    CertificateDeleteOptions,
    CertificateListOptions,
    CertificateUpdateOptions,
    UploadCertificateImageOptions,
} from './../../interfaces/request-interface';
import {
    CertificateAddResponse,
    CertificateDeleteResponse,
    CertificateListResponse,
    CertificateUpdateResponse,
    UploadCertificateImageResponse,
} from './../../interfaces/response-interface';

export const GET_CERTIFICATE_LIST = 'GET_CERTIFICATE_LIST';

export class GetCertificateListAction implements Action {
    readonly type = GET_CERTIFICATE_LIST;

    constructor(public payload: CertificateListOptions) { }
}

export const CERTIFICATE_LIST_FAIL = 'CERTIFICATE_LIST_FAIL';

export class CertificateListFailAction implements Action {
    readonly type = CERTIFICATE_LIST_FAIL;

    constructor(public payload: CertificateListResponse) { }
}

export const CERTIFICATE_LIST_SUCCESS = 'CERTIFICATE_LIST_SUCCESS';

export class CertificateListSuccessAction implements Action {
    readonly type = CERTIFICATE_LIST_SUCCESS;

    constructor(public payload: CertificateListResponse) { }
}

export const ADD_CERTIFICATE = 'ADD_CERTIFICATE';

export class AddCertificateAction implements Action {
    readonly type = ADD_CERTIFICATE;

    constructor(public payload: CertificateAddOptions) { }
}

export const CERTIFICATE_ADD_FAIL = 'CERTIFICATE_ADD_FAIL';

export class CertificateAddFailAction implements Action {
    readonly type = CERTIFICATE_ADD_FAIL;

    constructor(public payload: CertificateAddResponse) { }
}

export const CERTIFICATE_ADD_SUCCESS = 'CERTIFICATE_ADD_SUCCESS';

export class CertificateAddSuccessAction implements Action {
    readonly type = CERTIFICATE_ADD_SUCCESS;

    constructor(public payload: CertificateAddResponse) { }
}

export const DELETE_CERTIFICATE = 'DELETE_CERTIFICATE';

export class DeleteCertificateAction implements Action {
    readonly type = DELETE_CERTIFICATE;

    constructor(public payload: CertificateDeleteOptions) { }
}

export const CERTIFICATE_DELETE_FAIL = 'CERTIFICATE_DELETE_FAIL';

export class CertificateDeleteFailAction implements Action {
    readonly type = CERTIFICATE_DELETE_FAIL;

    constructor(public payload: CertificateDeleteResponse) { }
}

export const CERTIFICATE_DELETE_SUCCESS = 'CERTIFICATE_DELETE_SUCCESS';

export class CertificateDeleteSuccessAction implements Action {
    readonly type = CERTIFICATE_DELETE_SUCCESS;

    constructor(public payload: CertificateDeleteResponse) { }
}

export const UPDATE_CERTIFICATE = 'UPDATE_CERTIFICATE';

export class UpdateCertificateAction implements Action {
    readonly type = UPDATE_CERTIFICATE;

    constructor(public payload: CertificateUpdateOptions) { }
}

export const UPDATE_CERTIFICATE_FAIL = 'UPDATE_CERTIFICATE_FAIL';

export class CertificateUpdateFailAction implements Action {
    readonly type = UPDATE_CERTIFICATE_FAIL;

    constructor(public payload: CertificateUpdateResponse) { }
}

export const UPDATE_CERTIFICATE_SUCCESS = 'UPDATE_CERTIFICATE_SUCCESS';

export class CertificateUpdateSuccessAction implements Action {
    readonly type = UPDATE_CERTIFICATE_SUCCESS;

    constructor(public payload: CertificateUpdateResponse) { }
}

export const UPLOAD_CERTIFICATE_IMAGE = 'UPLOAD_CERTIFICATE_IMAGE';

export class UploadCertificateImageAction implements Action {
    readonly type = UPLOAD_CERTIFICATE_IMAGE;

    constructor(public payload: UploadCertificateImageOptions) { }
}

export const CERTIFICATE_IMAGE_UPLOAD_FAIL = 'CERTIFICATE_IMAGE_UPLOAD_FAIL';

export class CertificateImageUploadFailAction implements Action {
    readonly type = CERTIFICATE_IMAGE_UPLOAD_FAIL;

    constructor(public payload: UploadCertificateImageResponse) { }
}

export const CERTIFICATE_IMAGE_UPLOAD_SUCCESS = 'CERTIFICATE_IMAGE_UPLOAD_SUCCESS';

export class CertificateImageUploadSuccessAction implements Action {
    readonly type = CERTIFICATE_IMAGE_UPLOAD_SUCCESS;

    constructor(public payload: UploadCertificateImageResponse) { }
}

export const RESET_WORKER_CERTIFICATE_ERROR_RESPONSE = 'RESET_WORKER_CERTIFICATE_ERROR_RESPONSE';

export class ResetWorkerCertificateErrorResponse implements Action {
    readonly type = RESET_WORKER_CERTIFICATE_ERROR_RESPONSE;

    constructor() { }
}

export type Actions = GetCertificateListAction
    | AddCertificateAction
    | CertificateAddFailAction
    | CertificateAddSuccessAction
    | CertificateDeleteFailAction
    | CertificateDeleteSuccessAction
    | CertificateImageUploadFailAction
    | CertificateImageUploadSuccessAction
    | CertificateListFailAction
    | CertificateListSuccessAction
    | CertificateUpdateFailAction
    | CertificateUpdateSuccessAction
    | DeleteCertificateAction
    | ResetWorkerCertificateErrorResponse
    | UpdateCertificateAction
    | UploadCertificateImageAction;
