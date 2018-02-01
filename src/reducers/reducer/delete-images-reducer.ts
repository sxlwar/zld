import * as actions from '../../actions/action/delete-images-action';
import { DeleteImagesResponse } from './../../interfaces/response-interface';

export interface State {
    deleteImagesResponse: DeleteImagesResponse;
}

export const initialState: State = {
    deleteImagesResponse: null,
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.DELETE_IMAGES_FAIL:
        case actions.DELETE_IMAGES_SUCCESS:
            return { deleteImagesResponse: action.payload };

        case actions.DELETE_IMAGES:
        default:
            return state;
    }
}

export const getDeleteImagesResponse = (state: State) => state.deleteImagesResponse;
