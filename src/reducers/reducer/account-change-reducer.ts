import { ChangePhoneOptions } from './../../interfaces/request-interface';
import { ChangePhoneResponse, ChangePhoneVerifyCodeResponse, CheckPhoneResponse, CheckPhoneVerifyCodeResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/account-change-action';

export interface State {
    changePhoneResponse: ChangePhoneResponse;
    changePhoneVerifyResponse: ChangePhoneVerifyCodeResponse;
    checkPhoneResponse: CheckPhoneResponse;
    checkPhoneVerifyResponse: CheckPhoneVerifyCodeResponse;
    checkRandomCode: string;
    changeRandomCode: string;
    changeOptions: ChangePhoneOptions
}

export const initialState: State = {
    changePhoneResponse: null,
    changePhoneVerifyResponse: null,
    checkPhoneResponse: null,
    checkPhoneVerifyResponse: null,
    checkRandomCode: null,
    changeRandomCode: null,
    changeOptions: null,
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.CHANGE_PHONE_NUMBER_FAIL:
        case actions.CHANGE_PHONE_NUMBER_SUCCESS:
            return { ...state, changePhoneResponse: action.payload };

        case actions.CHANGE_PHONE_VERIFY_FAIL:
        case actions.CHANGE_PHONE_VERIFY_SUCCESS:
            return { ...state, changePhoneVerifyResponse: action.payload };

        case actions.CHECK_PHONE_NUMBER_FAIL:
        case actions.CHECK_PHONE_NUMBER_SUCCESS:
            return { ...state, checkPhoneResponse: action.payload };

        case actions.CHECK_PHONE_VERIFY_FAIL:
        case actions.CHECK_PHONE_VERIFY_SUCCESS:
            return { ...state, checkPhoneVerifyResponse: action.payload };

        case actions.UPDATE_CHECK_RANDOM_CODE:
            return { ...state, checkRandomCode: action.payload };

        case actions.UPDATE_CHANGE_RANDOM_CODE:
            return { ...state, changeRandomCode: action.payload };

        case actions.RESET_LOCAL_DATA: 
            return { ...initialState };

        case actions.CHANGE_PHONE_NUMBER:
            return { ...state, changeOptions: action.payload };

        case actions.CHECK_PHONE_NUMBER:
        case actions.CHANGE_PHONE_VERIFY:
        case actions.CHECK_PHONE_VERIFY:
        default:
            return state;
    }
}

export const getCheckPhoneResponse = (state: State) => state.checkPhoneResponse;

export const getCheckPhoneVerifyResponse = (state: State) => state.checkPhoneVerifyResponse;

export const getChangePhoneResponse = (state: State) => state.changePhoneResponse;

export const getChangePhoneVerifyResponse = (state: State) => state.changePhoneVerifyResponse;

export const getCheckRandomCode = (state: State) => state.checkRandomCode;

export const getChangeRandomCode = (state: State) => state.changeRandomCode;

export const getChangePhoneOptions = (state: State) => state.changeOptions;