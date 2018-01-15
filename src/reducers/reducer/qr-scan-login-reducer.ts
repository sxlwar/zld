import * as actions from '../../actions/action/qr-scan-login-action';
import { QRScanLoginResponse } from "../../interfaces/response-interface";

export interface State {
    QRCode: string;
    scanLoginResponse: QRScanLoginResponse
}

export const initialState: State = {
    QRCode: '',
    scanLoginResponse: null
}

export function reducer(state = initialState, action: actions.Actions) {
    switch (action.type) {
        case actions.SET_QR_CODE:
            return { ...state, QRCode: action.payload };

        case actions.SCAN_LOGIN_FAIL:
        case actions.SCAN_LOGIN_SUCCESS:
            return { ...state, QRScanLoginResponse: action.payload };

        case actions.RESET_QR_SID:
            return { ...state, QRCode: '' };

        default:
            return state;
    }
}

export const getQRCode = (state: State) => state.QRCode;

export const getQRLoginResponse = (state: State) => state.scanLoginResponse;