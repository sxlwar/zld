import { NationalityResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/nationality-action';

export interface State {
    nationalityResponse: NationalityResponse;
}

export const initialState: State = {
    nationalityResponse: null
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.NATIONALITY_FAIL:
        case actions.NATIONALITY_SUCCESS:
            return { nationalityResponse: action.payload };

        case actions.GET_NATIONALITY:
        default:
            return state;

    }
}

export const getNationalityResponse = (state: State) => state.nationalityResponse;