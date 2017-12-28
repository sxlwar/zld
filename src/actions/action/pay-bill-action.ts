import { PayProcessListResponse, ProjectPayProcessListResponse, ProjectPayBillListResponse } from './../../interfaces/response-interface';
import { PayProcessListOptions, ProjectPayProcessListOptions, ProjectPayBillListOptions } from './../../interfaces/request-interface';
import { Action } from "@ngrx/store";
import { PayBillListOptions } from "../../interfaces/request-interface";
import { PayBillListResponse } from "../../interfaces/response-interface";

/* ===================================================Pay bill list=================================================== */

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

/* ===================================================Pay process list=================================================== */

export const GET_PAY_PROCESS_LIST = 'GET_PAY_PROCESS_LIST';

export class GetPayProcessListAction implements Action {
    readonly type = GET_PAY_PROCESS_LIST;

    constructor(public payload: PayProcessListOptions) {}
}

export const PAY_PROCESS_LIST_FAIL = 'PAY_PROCESS_LIST_FAIL';

export class PayProcessListFailAction implements Action {
   readonly type =  PAY_PROCESS_LIST_FAIL;

   constructor(public payload: PayProcessListResponse) {}
}

export const PAY_PROCESS_LIST_SUCCESS = 'PAY_PROCESS_LIST_SUCCESS';

export class PayProcessListSuccessAction implements Action {
    readonly type = PAY_PROCESS_LIST_SUCCESS;

    constructor(public payload: PayProcessListResponse) {}
}

/* ===================================================Project process list=================================================== */

export const GET_PROJECT_PROCESS_LIST = 'GET_PROJECT_PROCESS_LIST';

export class GetProjectPayProcessListAction implements Action {
    readonly type = GET_PROJECT_PROCESS_LIST;

    constructor(public payload: ProjectPayProcessListOptions) {}
}

export const PROJECT_PAY_PROCESS_LIST_FAIL = 'PROJECT_PAY_PROCESS_LIST_FAIL';

export class ProjectPayProcessListFailAction implements Action {
    readonly type = PROJECT_PAY_PROCESS_LIST_FAIL;

    constructor(public payload: ProjectPayProcessListResponse) {}
}

export const PROJECT_PAY_PROCESS_LIST_SUCCESS = 'PROJECT_PAY_PROCESS_LIST_SUCCESS';

export class ProjectPayProcessListSuccessAction implements Action {
    readonly type = PROJECT_PAY_PROCESS_LIST_SUCCESS;

    constructor(public payload: ProjectPayProcessListResponse) {}
}

export const SELECT_PROJECT_PAY_PROCESS_STATUS = 'SELECT_PROJECT_PAY_PROCESS_STATUS';

export class SelectProjectPayProcessStatus implements Action {
    readonly type = SELECT_PROJECT_PAY_PROCESS_STATUS;

    constructor(public payload: string) {}
}

/* ===================================================Project bill list=================================================== */

export const GET_PROJECT_BILL_LIST = 'GET_PROJECT_BILL_LIST';

export class GetProjectPayBillListAction implements Action {
    readonly type = GET_PROJECT_BILL_LIST;

    constructor(public payload: ProjectPayBillListOptions) {}
}

export const PROJECT_PAY_BILL_LIST_FAIL = 'PROJECT_PAY_BILL_LIST_FAIL';

export class ProjectPayBillListFailAction implements Action {
    readonly type = PROJECT_PAY_BILL_LIST_FAIL;

    constructor(public payload: ProjectPayBillListResponse) {}
}

export const PROJECT_PAY_BILL_LIST_SUCCESS = 'PROJECT_PAY_BILL_LIST_SUCCESS';

export class ProjectPayBillListSuccessAction implements Action {
    readonly type = PROJECT_PAY_BILL_LIST_SUCCESS;

    constructor(public payload: ProjectPayBillListResponse) {}
}

export type Actions = GetPayBillListAction
| PayBillListFailAction
| PayBillListSuccessAction
| GetPayProcessListAction
| PayProcessListFailAction
| PayProcessListSuccessAction
| GetProjectPayProcessListAction
| ProjectPayProcessListFailAction
| ProjectPayProcessListSuccessAction
| GetProjectPayBillListAction
| ProjectPayBillListFailAction
| ProjectPayBillListSuccessAction
| SelectProjectPayProcessStatus;