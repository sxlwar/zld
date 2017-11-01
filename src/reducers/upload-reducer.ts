import * as upload from '../actions/upload-action';

export interface State {
  uploading: boolean;
  uploadedState: boolean;
}

const initialState: State = {
  uploading: false,
  uploadedState: false
};

export function reducer(state = initialState, action: upload.Actions): State {
  switch (action.type) {
    case upload.UPLOAD:
      return {
        uploading: true,
        uploadedState: state.uploadedState
      };

    case upload.UPLOAD_COMPLETE:
      return {
        uploading: false,
        uploadedState: state.uploadedState
      };

    case upload.UPLOAD_FAIL:
    case upload.UPLOAD_SUCCESS:
      return {
        uploading: false,
        uploadedState: action.payload
      };

    default:
      return state;
  }
}

export const getUploadingState = (state: State) => state.uploading;

export const getUploadedState = (state: State) => state.uploadedState;
