import { UploadPersonalIdImageOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';
import { CertificateOptions } from '../../interfaces/request-interface';
import { CertificateResponse, UploadPersonalIdImageResponse } from '../../interfaces/response-interface';

export const CERTIFICATE = 'CERTIFICATE';

export class CertificateAction implements Action {
    readonly type = CERTIFICATE;

    constructor(public payload: CertificateOptions) {
    }
}

export const CERTIFICATE_FAIL = 'CERTIFICATE_FAIL';

export class CertificateFailAction implements Action {
    readonly type = CERTIFICATE_FAIL;

    constructor(public payload: CertificateResponse) {
    }
}

export const CERTIFICATE_SUCCESS = 'CERTIFICATE_SUCCESS';

export class CertificateSuccessAction implements Action {
    readonly type = CERTIFICATE_SUCCESS;

    constructor(public payload: CertificateResponse) {
    }
}

export const UPLOAD_PERSONAL_ID_IMAGE = 'UPLOAD_PERSONAL_ID_IMAGE';

export class UploadPersonalIdImageAction implements Action {
    readonly type = UPLOAD_PERSONAL_ID_IMAGE;

    constructor(public payload: UploadPersonalIdImageOptions) { }
}

export const UPLOAD_PERSONAL_ID_IMAGE_FAIL = 'UPLOAD_PERSONAL_ID_IMAGE_FAIL';

export class UploadPersonalIdImageFailAction implements Action {
    readonly type = UPLOAD_PERSONAL_ID_IMAGE_FAIL;

    constructor(public payload: UploadPersonalIdImageResponse) { }
}

export const UPLOAD_PERSONAL_ID_IMAGE_SUCCESS = 'UPLOAD_PERSONAL_ID_IMAGE_SUCCESS';

export class UploadPersonalIdImageSuccessAction implements Action {
    readonly type = UPLOAD_PERSONAL_ID_IMAGE_SUCCESS;

    constructor(public payload: UploadPersonalIdImageResponse) { }
}

export type Actions = CertificateAction
    | CertificateFailAction
    | CertificateSuccessAction
    | UploadPersonalIdImageAction
    | UploadPersonalIdImageFailAction
    | UploadPersonalIdImageSuccessAction;

