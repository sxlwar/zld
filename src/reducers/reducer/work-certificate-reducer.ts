import { omit } from 'lodash';

import * as actions from '../../actions/action/work-certificate-action';
import {
    CertificateAddOptions,
    CertificateDeleteOptions,
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

export interface State {
    certificateListResponse: CertificateListResponse;
    certificateAddResponse: CertificateAddResponse;
    certificateDeleteResponse: CertificateDeleteResponse;
    certificateUpdateResponse: CertificateUpdateResponse;
    certificateImageUploadResponse: UploadCertificateImageResponse;
    certificateAddOptions: CertificateAddOptions;
    certificateDeleteOptions: CertificateDeleteOptions;
    certificateUpdateOptions: CertificateUpdateOptions;
    certificateImageUploadOptions: UploadCertificateImageOptions;
}

export const initialState: State = {
    certificateListResponse: null,
    certificateAddResponse: null,
    certificateAddOptions: null,
    certificateDeleteResponse: null,
    certificateDeleteOptions: null,
    certificateUpdateResponse: null,
    certificateUpdateOptions: null,
    certificateImageUploadOptions: null,
    certificateImageUploadResponse: null,
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.CERTIFICATE_LIST_FAIL:
        case actions.CERTIFICATE_LIST_SUCCESS:
            return {
                ...state,
                certificateListResponse: {
                    work_certificates: action.payload.work_certificates,
                },
            };

        case actions.ADD_CERTIFICATE:
            return { ...state, certificateAddOptions: action.payload };

        case actions.CERTIFICATE_ADD_FAIL:
            return { ...state, certificateAddResponse: action.payload };

        case actions.CERTIFICATE_ADD_SUCCESS:
            return {
                ...state,
                certificateAddResponse: action.payload,
                certificateListResponse: {
                    work_certificates: [
                        ...state.certificateListResponse.work_certificates,
                        { ...omit(state.certificateAddOptions, ['sid']), id: action.payload.work_certificate_id },
                    ],
                },
            };

        case actions.DELETE_CERTIFICATE:
            return { ...state, certificateDeleteOptions: action.payload };

        case actions.CERTIFICATE_DELETE_FAIL:
            return { ...state, certificateDeleteResponse: action.payload };

        case actions.CERTIFICATE_DELETE_SUCCESS:
            return {
                ...state,
                certificateDeleteResponse: action.payload,
                certificateListResponse: {
                    work_certificates: state.certificateListResponse.work_certificates.filter(
                        item => item.id !== state.certificateDeleteOptions.work_certificate_id
                    ),
                },
            };

        case actions.UPDATE_CERTIFICATE:
            return { ...state, certificateUpdateOptions: action.payload };

        case actions.UPDATE_CERTIFICATE_FAIL:
            return { ...state, certificateUpdateResponse: action.payload };

        case actions.UPDATE_CERTIFICATE_SUCCESS:
            return {
                ...state,
                certificateUpdateResponse: action.payload,
                certificateListResponse: {
                    work_certificates: state.certificateListResponse.work_certificates.map(
                        item =>
                            item.id === state.certificateUpdateOptions.id
                                ? { ...item, ...omit(state.certificateUpdateOptions, ['sid']) }
                                : item
                    ),
                },
            };

        case actions.UPLOAD_CERTIFICATE_IMAGE:
            return { ...state, certificateImageUploadOptions: action.payload };

        case actions.CERTIFICATE_IMAGE_UPLOAD_FAIL:
        case actions.CERTIFICATE_IMAGE_UPLOAD_SUCCESS:
            return { ...state, certificateImageUploadResponse: action.payload };

        case actions.RESET_WORKER_CERTIFICATE_ERROR_RESPONSE:
            return {
                ...state,
                certificateListResponse: !!state.certificateListResponse && !!state.certificateListResponse.errorMessage
                    ? null
                    : state.certificateListResponse,
                certificateAddResponse: !!state.certificateAddResponse && !!state.certificateAddResponse.errorMessage
                    ? null
                    : state.certificateAddResponse,
                certificateUpdateResponse: !!state.certificateUpdateResponse && !!state.certificateUpdateResponse.errorMessage
                    ? null
                    : state.certificateUpdateResponse,
                certificateDeleteResponse: !!state.certificateDeleteResponse && !!state.certificateDeleteResponse.errorMessage
                    ? null
                    : state.certificateDeleteResponse,
            };

        case actions.GET_CERTIFICATE_LIST:
        default:
            return state;
    }
}

export const getListResponse = (state: State) => state.certificateListResponse;

export const getAddResponse = (state: State) => state.certificateAddResponse;

export const getDeleteResponse = (state: State) => state.certificateDeleteResponse;

export const getUpdateResponse = (state: State) => state.certificateUpdateResponse;

export const getUploadResponse = (state: State) => state.certificateImageUploadResponse;

export const getAddOptions = (state: State) => state.certificateAddOptions;

export const getDeleteOptions = (state: State) => state.certificateDeleteOptions;

export const getUpdateOptions = (state: State) => state.certificateUpdateOptions;
