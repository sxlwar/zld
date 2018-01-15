import { SearchCompanyResponse } from './../../interfaces/response-interface';
import { SearchCompanyOptions } from '../../interfaces/request-interface';

export const SEARCH_COMPANY = 'SEARCH_COMPANY';

export class SearchCompanyAction {
    readonly type = SEARCH_COMPANY;

    constructor(public payload: SearchCompanyOptions) { }
}

export const SEARCH_COMPANY_FAIL = 'SEARCH_COMPANY_FAIL';

export class SearchCompanyFailAction {
    readonly type = SEARCH_COMPANY_FAIL;

    constructor(public payload: SearchCompanyResponse) { }
}

export const SEARCH_COMPANY_SUCCESS = 'SEARCH_COMPANY_SUCCESS';

export class SearchCompanySuccessAction {
    readonly type = SEARCH_COMPANY_SUCCESS;

    constructor(public payload: SearchCompanyResponse) { }
}

export const SELECT_COMPANY = 'SELECT_COMPANY';

export class SelectCompanyAction {
    readonly type = SELECT_COMPANY;

    constructor(public payload: number) { }
}

export type Actions = SearchCompanyAction
    | SearchCompanyFailAction
    | SearchCompanySuccessAction
    | SelectCompanyAction;
