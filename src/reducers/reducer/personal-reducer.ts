import { BasicInfoListResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/personal-action';

export interface State {
    response: BasicInfoListResponse;
}

export const initialState: State = {
    response: null
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.BASIC_INFORMATION_FAIL:
        case actions.BASIC_INFORMATION_SUCCESS:
            return Object.assign({}, state, { response: action.payload });

        case actions.GET_BASIC_INFORMATION:
        default:
            return state;
    }
}

export const getBasicInfoListResponse = (state: State) => state.response;

export const getBasicInformation = (state: State) => state.response.basic_info;

export const getEducationInformation = (state: State) => state.response.edu_info;

export const getWorkExperience = (state: State) => state.response.work_expr_info;

export const getPlatformExperience = (state: State) => state.response.platfrom_work_expr_info;

export const getWorkCertification = (state: State) => state.response.work_cert_info;

export const getHomeInformation = (state: State) => state.response.home_info;

export const getPersonalIdInformation = (state: State) => state.response.person_id_info;