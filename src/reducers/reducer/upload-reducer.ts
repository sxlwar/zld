import * as upload from '../../actions/action/upload-action';

export interface State {
    uploading: boolean;
    uploadedState: boolean;
    uploadResponse: any[];
}

const initialState: State = {
    uploading: false,
    uploadedState: false,
    uploadResponse: []
};

export function reducer(state = initialState, action: upload.Actions): State {
    switch (action.type) {
        case upload.UPLOAD:
            return {
                uploading: true,
                uploadedState: state.uploadedState,
                uploadResponse: state.uploadResponse
            };

        case upload.UPLOAD_COMPLETE:
            return {
                uploading: false,
                uploadedState: state.uploadedState,
                uploadResponse: action.payload
            };

        default:
            return state;
    }
}

export const getUploadingState = (state: State) => state.uploading;

export const getUploadedState = (state: State) => state.uploadedState;

export const getUploadResult = (state: State) => state.uploadResponse;
