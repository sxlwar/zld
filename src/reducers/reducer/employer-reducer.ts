import * as actions from '../../actions/action/employer-action';
import { CompanyUserListResponse } from './../../interfaces/response-interface';

export interface State {
    companyUserResponse: CompanyUserListResponse;
    selectedForemen: number[];
    selectedQualityClerks: number[];
}

export const initialState: State = {
    companyUserResponse: {
        worker: [],
    },
    selectedForemen: [],
    selectedQualityClerks: [],
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.COMPANY_USER_LIST_FAIL:
        case actions.COMPANY_USER_LIST_SUCCESS:

            return Object.assign({}, state, { companyUserResponse: action.payload, selectedForemen: [], selectedQualityClerks: [] });

        case actions.SET_SELECTED_FOREMAN:

            return Object.assign({}, state, { selectedForemen: action.payload });


        case actions.SET_SELECT_QUALITY_CLERK:

            return Object.assign({}, state, { selectedQualityClerks: action.payload });

        case actions.GET_COMPANY_USER:
        default:
            return state;
    }
}


export const getCompanyUserResponse = (state: State) => state.companyUserResponse;

export const getCompanyUsers = (state: State) => state.companyUserResponse.worker;

export const getSelectedForemen = (state: State) => state.selectedForemen;

export const getSelectedQualityClerks = (state: State) => state.selectedQualityClerks;
