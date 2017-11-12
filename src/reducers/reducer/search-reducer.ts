//region
import * as actions from '../../actions/action/search-action';
import {SEARCH_COMPANY, SEARCH_COMPANY_COMPLETE, SELECT_COMPANY} from '../../actions/action/search-action';
import {Company} from '../../interfaces/response-interface';
//endregion

export interface State {
  companies: Company[];
  loading: boolean;
  query: string,
  selected: Company
}

export const initialSate: State = {
  companies: [],
  loading: false,
  query: '',
  selected: null
};


export function reducer(state = initialSate, action: actions.Actions): State {
  switch (action.type) {
    case SEARCH_COMPANY:
      const query = action.payload.name;

      if(query === '') {
        return {
          companies: [],
          loading: false,
          selected: null,
          query
        }
      }
      return Object.assign({}, state, {query, loading: true});
    case SEARCH_COMPANY_COMPLETE:
      const companies = action.payload;

      return {
        companies,
        loading: false,
        query: state.query,
        selected: null
      };
    case SELECT_COMPANY:
      const selected = state.companies.find(company => company.id === action.payload);

      return Object.assign({},state,{selected});
    default:
      return state;
  }
}

export const getQuery = (state: State) => state.query;

export const getCompanies = (state: State) => state.companies;

export const getLoading = (state: State) => state.loading;

export const getSelectedCompany = (state: State) => state.selected;
