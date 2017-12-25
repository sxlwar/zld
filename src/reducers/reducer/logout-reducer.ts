import { LogoutResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/logout-action';

export interface State {
    logoutResponse: LogoutResponse;
}

export const initialState = {
    logoutResponse: null
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.LOGOUT_FAIL:
        case actions.LOGOUT_SUCCESS:
            return { ...state, logoutResponse: action.payload };

        case actions.RESET_LOGOUT_RESPONSE:
            return { logoutResponse: null };

        case actions.LOGOUT:
        default:
            return state;
    }
}

export const getLogoutResponse = (state: State) => state.logoutResponse;