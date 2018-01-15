import { UploadPersonalIdImageResponse } from './../../interfaces/response-interface';
import { CertificateResponse } from '../../interfaces/response-interface';
import * as actions from '../../actions/action/certificate-action';

export interface State {
    response: CertificateResponse;
    uploadResponse: UploadPersonalIdImageResponse;
}

export const initialState: State = {
    response: null,
    uploadResponse: null,
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.CERTIFICATE_FAIL:
        case actions.CERTIFICATE_SUCCESS:
            return { ...state, response: action.payload };

        case actions.UPLOAD_PERSONAL_ID_IMAGE_FAIL:
            return { ...state, uploadResponse: action.payload };

        case actions.UPLOAD_PERSONAL_ID_IMAGE_SUCCESS:
            return { ...state, uploadResponse: action.payload };

        case actions.UPLOAD_PERSONAL_ID_IMAGE:
        case actions.CERTIFICATE:
        default:
            return state;
    }
}

export const getCertificateResponse = (state: State) => state.response;

export const getUploadResponse = (state: State) => state.uploadResponse;

