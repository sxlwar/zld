import { Action } from "@ngrx/store";
import { PayBillListOptions } from "../../interfaces/request-interface";
import { PayBillListResponse } from "../../interfaces/response-interface";


export const GET_PAY_BILL_LIST = 'GET_PAY_BILL_LIST';

export class GetPayBillListAction implements Action {
    readonly type = GET_PAY_BILL_LIST;

    constructor(public payload: PayBillListOptions){}
}

export const PAY_BILL_LIST_FAIL = 'PayBillListFailAction';

export class PayBillListFailAction implements Action {
    readonly type = PAY_BILL_LIST_FAIL;

    constructor(public payload: PayBillListResponse){} 
}

export const PAY_BILL_LIST_SUCCESS =  'PAY_BILL_LIST_SUCCESS' ;

export class PayBillListSuccessAction implements Action {
    readonly type = PAY_BILL_LIST_SUCCESS;

    constructor(public payload: PayBillListResponse){}
}

export type Actions = GetPayBillListAction
| PayBillListFailAction
| PayBillListSuccessAction;