import { QRLoginOptions } from './../../interfaces/request-interface';
import { QRScanLoginResponse } from './../../interfaces/response-interface';
import { Action } from '@ngrx/store';


export const SET_QR_CODE = 'SET_QR_CODE';

export class SetQRCodeAction implements Action {
    readonly type = SET_QR_CODE;

    constructor(public payload: string) { }
}

export const QR_LOGIN = 'QR_LOGIN';

export class QRLoginAction implements Action {
    readonly type = QR_LOGIN;

    constructor(public payload: QRLoginOptions) { }
}

export const SCAN_LOGIN_FAIL = 'SCAN_LOGIN_FAIL';

export class ScanLoginFailAction implements Action {
    readonly type = SCAN_LOGIN_FAIL;

    constructor(public payload: QRScanLoginResponse) { }
}

export const SCAN_LOGIN_SUCCESS = 'SCAN_LOGIN_SUCCESS';

export class ScanLoginSuccessAction implements Action {
    readonly type = SCAN_LOGIN_SUCCESS;

    constructor(public payload: QRScanLoginResponse) { }
}

export const RESET_QR_SID = 'RESET_QR_SID';

export class ResetQRSidAction implements Action {
    readonly type = RESET_QR_SID;

    constructor() { }
}

export type Actions = SetQRCodeAction
    | QRLoginAction
    | ResetQRSidAction
    | ScanLoginFailAction
    | ScanLoginSuccessAction;