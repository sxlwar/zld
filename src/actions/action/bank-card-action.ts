import { Action } from '@ngrx/store';

import {
    BankInfoOptions,
    SetBankNoMasterOptions,
    WorkerBankNoAddOptions,
    WorkerBankNoDeleteOptions,
    WorkerBankNoListOptions,
} from './../../interfaces/request-interface';
import {
    BankInfoResponse,
    SetBankNOMasterResponse,
    WorkerBankNoAddResponse,
    WorkerBankNoDeleteResponse,
    WorkerBankNoListResponse,
} from './../../interfaces/response-interface';

export const GET_BANK_CARD_LIST = 'GET_BANK_CARD_LIST';

export class GetBankCardListAction implements Action {
    readonly type = GET_BANK_CARD_LIST;

    constructor(public payload: WorkerBankNoListOptions) { }
}

export const BANK_CARD_LIST_FAIL = 'BANK_CARD_LIST_FAIL';

export class BankCardListFailAction implements Action {
    readonly type = BANK_CARD_LIST_FAIL;

    constructor(public payload: WorkerBankNoListResponse) { }
}

export const BANK_CARD_LIST_SUCCESS = 'BANK_CARD_LIST_SUCCESS';

export class BankCardListSuccessAction implements Action {
    readonly type = BANK_CARD_LIST_SUCCESS;

    constructor(public payload: WorkerBankNoListResponse) { }
}

export const GET_BANK_INFORMATION = 'GET_BANK_INFORMATION';

export class GetBankInformationAction implements Action {
    readonly type = GET_BANK_INFORMATION;

    constructor(public payload: BankInfoOptions) { }
}

export const BANK_INFORMATION_FAIL = 'BANK_INFORMATION_FAIL';

export class BankInformationFailAction implements Action {
    readonly type = BANK_INFORMATION_FAIL;

    constructor(public payload: BankInfoResponse) { }
}

export const BANK_INFORMATION_SUCCESS = 'BANK_INFORMATION_SUCCESS';

export class BankInformationSuccessAction implements Action {
    readonly type = BANK_INFORMATION_SUCCESS;

    constructor(public payload: BankInfoResponse) { }
}

export const ADD_BANK_CARD = 'ADD_BANK_CARD';

export class AddBankCardAction implements Action {
    readonly type = ADD_BANK_CARD;

    constructor(public payload: WorkerBankNoAddOptions) { }
}

export const ADD_BANK_CARD_FAIL = 'ADD_BANK_CARD_FAIL';

export class BankCardAddFailAction implements Action {
    readonly type = ADD_BANK_CARD_FAIL;

    constructor(public payload: WorkerBankNoAddResponse) { }
}

export const ADD_BANK_CARD_SUCCESS = 'ADD_BANK_CARD_SUCCESS';

export class BankCardAddSuccessAction implements Action {
    readonly type = ADD_BANK_CARD_SUCCESS;

    constructor(public payload: WorkerBankNoAddResponse) { }
}

export const DELETE_BANK_CARD = 'DELETE_BANK_CARD';

export class DeleteBankCardAction implements Action {
    readonly type = DELETE_BANK_CARD;

    constructor(public payload: WorkerBankNoDeleteOptions) { }
}

export const BANK_CARD_DELETE_FAIL = 'BANK_CARD_DELETE_FAIL';

export class BankCardDeleteFailAction implements Action {
    readonly type = BANK_CARD_DELETE_FAIL;

    constructor(public payload: WorkerBankNoDeleteResponse) { }
}

export const BANK_CARD_DELETE_SUCCESS = 'BANK_CARD_DELETE_SUCCESS';

export class BankCardDeleteSuccessAction implements Action {
    readonly type = BANK_CARD_DELETE_SUCCESS;

    constructor(public payload: WorkerBankNoDeleteResponse) { }
}

export const SET_MASTER_BANK_CARD = 'SET_MASTER_BANK_CARD';

export class SetMasterBankCardAction implements Action {
    readonly type = SET_MASTER_BANK_CARD;

    constructor(public payload: SetBankNoMasterOptions) { }
}

export const SET_MASTER_BANK_CARD_FAIL = 'SET_MASTER_BANK_CARD_FAIL';

export class SetMasterBankCardFailAction implements Action {
    readonly type = SET_MASTER_BANK_CARD_FAIL;

    constructor(public payload: SetBankNOMasterResponse) { }
}

export const SET_MASTER_BANK_CARD_SUCCESS = 'SET_MASTER_BANK_CARD_SUCCESS';

export class SetMasterBankCardSuccessAction implements Action {
    readonly type = SET_MASTER_BANK_CARD_SUCCESS;

    constructor(public payload: SetBankNOMasterResponse) { }
}

/* ============================================================Reset operate response======================================== */

export const RESET_ADD_BANK_CARD_RESPONSE = 'RESET_ADD_BANK_CARD_RESPONSE';

export class ResetAddBankcardResponseAction implements Action {
    readonly type = RESET_ADD_BANK_CARD_RESPONSE;

    constructor() { }
}

export const RESET_DELETE_BANK_CARD_RESPONSE = 'RESET_DELETE_BANK_CARD_RESPONSE';

export class ResetDeleteBankcardResponseAction implements Action {
    readonly type = RESET_DELETE_BANK_CARD_RESPONSE;

    constructor() { }
}

export const RESET_BANK_CARD_INFORMATION = 'RESET_BANK_CARD_INFORMATION';

export class ResetBankcardInfoAction implements Action {
    readonly type = RESET_BANK_CARD_INFORMATION;

    constructor() { }
}

export type Actions = GetBankCardListAction
    | AddBankCardAction
    | BankCardAddFailAction
    | BankCardAddSuccessAction
    | BankCardDeleteFailAction
    | BankCardDeleteSuccessAction
    | BankCardListFailAction
    | BankCardListSuccessAction
    | BankInformationFailAction
    | BankInformationSuccessAction
    | DeleteBankCardAction
    | GetBankInformationAction
    | ResetAddBankcardResponseAction
    | ResetBankcardInfoAction
    | ResetDeleteBankcardResponseAction
    | SetMasterBankCardAction
    | SetMasterBankCardFailAction
    | SetMasterBankCardSuccessAction;
