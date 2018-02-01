import { Action } from '@ngrx/store';

import { ConditionOption } from './../../interfaces/order-interface';
import {
    AttendanceCardAddOptions,
    AttendanceCardDeleteOptions,
    AttendanceCardListOptions,
    AttendanceCardUpdateOptions,
} from './../../interfaces/request-interface';
import {
    AttendanceCardAddResponse,
    AttendanceCardDeleteResponse,
    AttendanceCardListResponse,
    AttendanceCardUpdateResponse,
} from './../../interfaces/response-interface';

/* ========================================Attendance card operate actions ======================================== */

//query
export const GET_ATTENDANCE_CARD_LIST = 'GET_ATTENDANCE_CARD_LIST';

export class GetAttendanceCardListAction implements Action {
    readonly type = GET_ATTENDANCE_CARD_LIST;

    constructor(public payload: AttendanceCardListOptions) { }
}

export const ATTENDANCE_CARD_LIST_FAIL = 'ATTENDANCE_CARD_LIST_FAIL';

export class AttendanceCardListFailAction implements Action {
    readonly type = ATTENDANCE_CARD_LIST_FAIL;

    constructor(public payload: AttendanceCardListResponse) { }
}

export const ATTENDANCE_CARD_LIST_SUCCESS = 'ATTENDANCE_CARD_LIST_SUCCESS';

export class AttendanceCardListSuccessAction implements Action {
    readonly type = ATTENDANCE_CARD_LIST_SUCCESS;

    constructor(public payload: AttendanceCardListResponse) { }
}

//add
export const ADD_ATTENDANCE_CARD = 'ADD_ATTENDANCE_CARD';

export class AddAttendanceCardAction implements Action {
    readonly type = ADD_ATTENDANCE_CARD;

    constructor(public payload: AttendanceCardAddOptions) { }
}

export const ADD_ATTENDANCE_CARD_FAIL = 'ADD_ATTENDANCE_CARD_FAIL'

export class AddAttendanceCardFailAction implements Action {
    readonly type = ADD_ATTENDANCE_CARD_FAIL;

    constructor(public payload: AttendanceCardAddResponse) { }
}

export const ADD_ATTENDANCE_CARD_SUCCESS = 'ADD_ATTENDANCE_CARD_SUCCESS';

export class AddAttendanceCardSuccessAction implements Action {
    readonly type = ADD_ATTENDANCE_CARD_SUCCESS;

    constructor(public payload: AttendanceCardAddResponse) { }
}

// update
export const UPDATE_ATTENDANCE_CARD = 'UPDATE_ATTENDANCE_CARD';

export class UpdateAttendanceCardAction implements Action {
    readonly type = UPDATE_ATTENDANCE_CARD;

    constructor(public payload: AttendanceCardUpdateOptions) { }
}

export const UPDATE_ATTENDANCE_CARD_FAIL = 'UPDATE_ATTENDANCE_CARD_FAIL';

export class UpdateAttendanceCardFailAction implements Action {
    readonly type = UPDATE_ATTENDANCE_CARD_FAIL;

    constructor(public payload: AttendanceCardUpdateResponse) { }
}

export const UPDATE_ATTENDANCE_CARD_SUCCESS = 'UPDATE_ATTENDANCE_CARD_SUCCESS';

export class UpdateAttendanceCardSuccessAction implements Action {
    readonly type = UPDATE_ATTENDANCE_CARD_SUCCESS;

    constructor(public payload: AttendanceCardUpdateResponse) { }
}

//delete
export const DELETE_ATTENDANCE_CARD = 'DELETE_ATTENDANCE_CARD';

export class DeleteAttendanceCardAction implements Action {
    readonly type = DELETE_ATTENDANCE_CARD;

    constructor(public payload: AttendanceCardDeleteOptions) { }
}

export const DELETE_ATTENDANCE_CARD_FAIL = 'DELETE_ATTENDANCE_CARD_FAIL';

export class DeleteAttendanceCardFailAction implements Action {
    readonly type = DELETE_ATTENDANCE_CARD_FAIL;

    constructor(public payload: AttendanceCardDeleteResponse) { }
}

export const DELETE_ATTENDANCE_CARD_SUCCESS = 'DELETE_ATTENDANCE_CARD_SUCCESS';

export class DeleteAttendanceCardSuccessAction implements Action {
    readonly type = DELETE_ATTENDANCE_CARD_SUCCESS;

    constructor(public payload: AttendanceCardDeleteResponse) { }
}

/* ========================================Page actions ======================================== */

export const GET_ATTENDANCE_CARD_PAGE = 'GET_ATTENDANCE_CARD_PAGE';

export class GetAttendanceCardPageAction implements Action {
    readonly type = GET_ATTENDANCE_CARD_PAGE;

    constructor() { }
}

export const INCREMENT_ATTENDANCE_CARD_PAGE = 'INCREMENT_ATTENDANCE_CARD_PAGE';

export class IncrementAttendanceCardPageAction implements Action {
    readonly type = INCREMENT_ATTENDANCE_CARD_PAGE;

    constructor() { }
}

export const RESET_ATTENDANCE_CARD_PAGE = 'RESET_ATTENDANCE_CARD_PAGE';

export class ResetAttendanceCardPageAction implements Action {
    readonly type = RESET_ATTENDANCE_CARD_PAGE;

    constructor() { }
}

export const RESET_ATTENDANCE_CARD_RESPONSE = 'RESET_ATTENDANCE_CARD_RESPONSE';

export class ResetAttendanceCardOperateResponseAction implements Action {
    readonly type = RESET_ATTENDANCE_CARD_RESPONSE;

    constructor(public payload: string) { }
}

export const GET_ATTENDANCE_CARD_LIMIT = 'GET_ATTENDANCE_CARD_LIMIT';

export class GetAttendanceCardLimitAction implements Action {
    readonly type = GET_ATTENDANCE_CARD_LIMIT;

    constructor() { }
}

export const UPDATE_ORDER_STATE = 'UPDATE_ORDER_STATE';

export class UpdateOrderStateAction implements Action {
    readonly type = UPDATE_ORDER_STATE;

    constructor(public payload: ConditionOption) { }
}

export const UPDATE_BINDING_STATE = 'UPDATE_BINDING_STATE';

export class UpdateBindingStateAction implements Action {
    readonly type = UPDATE_BINDING_STATE;

    constructor(public payload: ConditionOption) { }
}

export type Actions = GetAttendanceCardListAction
    | AddAttendanceCardAction
    | AddAttendanceCardFailAction
    | AddAttendanceCardSuccessAction
    | AttendanceCardListFailAction
    | AttendanceCardListSuccessAction
    | DeleteAttendanceCardAction
    | DeleteAttendanceCardFailAction
    | DeleteAttendanceCardSuccessAction
    | GetAttendanceCardLimitAction
    | GetAttendanceCardPageAction
    | IncrementAttendanceCardPageAction
    | ResetAttendanceCardOperateResponseAction
    | ResetAttendanceCardPageAction
    | UpdateAttendanceCardAction
    | UpdateAttendanceCardFailAction
    | UpdateAttendanceCardSuccessAction
    | UpdateBindingStateAction
    | UpdateOrderStateAction;
