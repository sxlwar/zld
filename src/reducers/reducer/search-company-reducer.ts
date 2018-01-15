import { SearchCompanyResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/search-company-action';
import { Company } from '../../interfaces/response-interface';

export interface State {
    searchCompanyResponse: SearchCompanyResponse;
    loading: boolean;
    query: string,
    selected: Company
}

export const initialState: State = {
    searchCompanyResponse: null,
    loading: false,
    query: '',
    selected: null
};


export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.SEARCH_COMPANY:
            return { ...state, query: action.payload.name, loading: true, selected: null };

        case actions.SEARCH_COMPANY_FAIL:
        case actions.SEARCH_COMPANY_SUCCESS:
            return { ...state, searchCompanyResponse: action.payload, loading: false, selected: null };

        case actions.SELECT_COMPANY:
            return Object.assign({}, state, { selected: state.searchCompanyResponse.companies.find(company => company.id === action.payload) });

        default:
            return state;
    }
}

export const getQuery = (state: State) => state.query;

export const getSearchCompanyResponse = (state: State) => state.searchCompanyResponse;

export const getLoading = (state: State) => state.loading;

export const getSelectedCompany = (state: State) => state.selected;
