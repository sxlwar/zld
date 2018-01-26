import { ConditionOption } from './../../interfaces/order-interface';
import { LocationCardListResponse, LocationCardAddResponse, LocationCardUpdateResponse, LocationCardDeleteResponse } from './../../interfaces/response-interface';
import { LocationCardListOptions, LocationCardAddOptions, LocationCardUpdateOptions, LocationCardDeleteOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

/* =====================================================Api operate actions================================================ */

//query
export const GET_LOCATION_CARD_LIST = 'GET_LOCATION_CARD_LIST';

export class GetLocationCardListAction implements Action {
    readonly type = GET_LOCATION_CARD_LIST;

    constructor(public payload: LocationCardListOptions) { };
}

export const LOCATION_CARD_LIST_FAIL = 'LOCATION_CARD_LIST_FAIL';

export class LocationCardListFailAction implements Action {
    readonly type = LOCATION_CARD_LIST_FAIL;

    constructor(public payload: LocationCardListResponse) { }
}

export const LOCATION_CARD_LIST_SUCCESS = 'LOCATION_CARD_LIST_SUCCESS';

export class LocationCardListSuccessAction implements Action {
    readonly type = LOCATION_CARD_LIST_SUCCESS;

    constructor(public payload: LocationCardListResponse) { }
}

//add
export const ADD_LOCATION_CARD = 'ADD_LOCATION_CARD';

export class AddLocationCardAction implements Action {
    readonly type = ADD_LOCATION_CARD;

    constructor(public payload: LocationCardAddOptions) { }
}

export const ADD_LOCATION_CARD_FAIL = 'ADD_LOCATION_CARD_FAIL';

export class AddLocationCardFailAction implements Action {
    readonly type = ADD_LOCATION_CARD_FAIL;

    constructor(public payload: LocationCardAddResponse) { }
}

export const ADD_LOCATION_CARD_SUCCESS = 'ADD_LOCATION_CARD_SUCCESS';

export class AddLocationCardSuccessAction implements Action {
    readonly type = ADD_LOCATION_CARD_SUCCESS;

    constructor(public payload: LocationCardAddResponse) { }
}

//update
export const UPDATE_LOCATION_CARD = 'UPDATE_LOCATION_CARD';

export class UpdateLocationCardAction implements Action {
    readonly type = UPDATE_LOCATION_CARD;

    constructor(public payload: LocationCardUpdateOptions) { }
}

export const UPDATE_LOCATION_CARD_FAIL = 'UPDATE_LOCATION_CARD_FAI';

export class UpdateLocationCardFailAction implements Action {
    readonly type = UPDATE_LOCATION_CARD_FAIL;

    constructor(public payload: LocationCardUpdateResponse) { }
}

export const UPDATE_LOCATION_CARD_SUCCESS = 'UPDATE_LOCATION_CARD_SUCCESS';

export class UpdateLocationCardSuccessAction implements Action {
    readonly type = UPDATE_LOCATION_CARD_SUCCESS;

    constructor(public payload: LocationCardUpdateResponse) { }
}

//delete
export const DELETE_LOCATION_CARD = 'DELETE_LOCATION_CARD';

export class DeleteLocationCardAction implements Action {
    readonly type = DELETE_LOCATION_CARD;

    constructor(public payload: LocationCardDeleteOptions) { }
}

export const DELETE_LOCATION_CARD_FAIL = 'DELETE_LOCATION_CARD_FAIL';

export class DeleteLocationCardFailAction implements Action {
    readonly type = DELETE_LOCATION_CARD_FAIL;

    constructor(public payload: LocationCardDeleteResponse) { }
}

export const DELETE_LOCATION_CARD_SUCCESS = 'DELETE_LOCATION_CARD_SUCCESS';

export class DeleteLocationCardSuccessAction implements Action {
    readonly type = DELETE_LOCATION_CARD_SUCCESS;

    constructor(public payload: LocationCardDeleteResponse) { }
}

/* =====================================================Order operate actions================================================ */

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

export const UPDATE_DEVICE_STATE = 'UPDATE_DEVICE_STATE';

export class UpdateDeviceStateAction implements Action {
    readonly type = UPDATE_DEVICE_STATE;

    constructor(public payload: ConditionOption) { }
}

export const UPDATE_TEAM_STATE = 'UPDATE_TEAM_STATE';

export class UpdateTeamStateAction implements Action {
    readonly type = UPDATE_TEAM_STATE;

    constructor(public payload: ConditionOption[]) { }
}

export const SET_SELECTED_TEAM = 'SET_SELECTED_TEAM';

export class SetSelectedTeamAction implements Action {
    readonly type = SET_SELECTED_TEAM;

    constructor(public payload: ConditionOption) { }
}

/* =====================================================Page operate actions================================================ */

export const GET_LOCATION_CARD_PAGE = 'GET_ATTENDANCE_CARD_PAGE';

export class GetLocationCardPageAction implements Action {
    readonly type = GET_LOCATION_CARD_PAGE;

    constructor() { }
}

export const INCREMENT_LOCATION_CARD_PAGE = 'INCREMENT_LOCATION_CARD_PAGE';

export class IncrementLocationCardPageAction implements Action {
    readonly type = INCREMENT_LOCATION_CARD_PAGE;

    constructor() { }
}

export const RESET_LOCATION_CARD_PAGE = 'RESET_LOCATION_CARD_PAGE';

export class ResetLocationCardPageAction implements Action {
    readonly type = RESET_LOCATION_CARD_PAGE;

    constructor() { }
}

export const RESET_LOCATION_CARD_OPERATE_RESPONSE = 'RESET_LOCATION_CARD_OPERATE_RESPONSE';

export class ResetLocationCardOperateResponseAction implements Action {
    readonly type = RESET_LOCATION_CARD_OPERATE_RESPONSE;

    constructor(public payload: string) { }
}

export const GET_LOCATION_CARD_LIMIT = 'GET_LOCATION_CARD_LIMIT';

export class GetLocationCardLimitAction implements Action {
    readonly type = GET_LOCATION_CARD_LIMIT;

    constructor() { }
}

export type Actions = GetLocationCardListAction
    | AddLocationCardAction
    | AddLocationCardFailAction
    | AddLocationCardSuccessAction
    | DeleteLocationCardAction
    | DeleteLocationCardFailAction
    | DeleteLocationCardSuccessAction
    | GetLocationCardLimitAction
    | GetLocationCardPageAction
    | IncrementLocationCardPageAction
    | LocationCardListFailAction
    | LocationCardListSuccessAction
    | ResetLocationCardPageAction
    | ResetLocationCardOperateResponseAction
    | SetSelectedTeamAction
    | UpdateBindingStateAction
    | UpdateDeviceStateAction
    | UpdateLocationCardAction
    | UpdateLocationCardFailAction
    | UpdateLocationCardSuccessAction
    | UpdateOrderStateAction
    | UpdateTeamStateAction;