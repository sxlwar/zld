import { Action } from '@ngrx/store';
import { NationalityResponse } from '../../interfaces/response-interface';

export const GET_NATIONALITY = 'GET_NATIONALITY';

export class GetNationalityAction implements Action {
    readonly type = GET_NATIONALITY;

    constructor() { }
}

export const NATIONALITY_FAIL = 'NATIONALITY_FAIL';

export class NationalityFailAction implements Action {
    readonly type = NATIONALITY_FAIL;

    constructor(public payload: NationalityResponse) { }
}

export const NATIONALITY_SUCCESS = 'NATIONALITY_SUCCESS';

export class NationalitySuccessAction implements Action {
    readonly type = NATIONALITY_SUCCESS;

    constructor(public payload: NationalityResponse) { }
}

export type Actions = GetNationalityAction
    | NationalityFailAction
    | NationalitySuccessAction;
