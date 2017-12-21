import { omit } from 'lodash';
import { WorkerDetailUpdateOptions, HomeInfoUpdateOptions, homeAddressNameMapBetweenResponseAndRequest } from './../../interfaces/request-interface';
import { BasicInfoListResponse, PersonalIdListResponse, WorkerDetailListResponse, WorkerDetailUpdateResponse, WorkerDetail, HomeInfoListResponse, HomeInfoUpdateResponse, Home } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/personal-action';
import { rename } from '../../services/utils/util';

export interface State {
    basicResponse: BasicInfoListResponse;
    personalIdResponse: PersonalIdListResponse;
    workerDetailResponse: WorkerDetailListResponse;
    workerDetailUpdateResponse: WorkerDetailUpdateResponse;
    workerDetailOptions: WorkerDetailUpdateOptions;
    homeInfoResponse: HomeInfoListResponse;
    homeInfoOptions: HomeInfoUpdateOptions;
    homeInfoUpdateResponse: HomeInfoUpdateResponse;
}

export const initialState: State = {
    basicResponse: null,
    personalIdResponse: null,
    workerDetailResponse: null,
    workerDetailUpdateResponse: null,
    workerDetailOptions: null,
    homeInfoResponse: null,
    homeInfoOptions: null,
    homeInfoUpdateResponse: null
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.BASIC_INFORMATION_FAIL:
        case actions.BASIC_INFORMATION_SUCCESS:
            return Object.assign({}, state, { response: action.payload });

        case actions.PERSONAL_ID_LIST_FAIL:
        case actions.PERSONAL_ID_LIST_SUCCESS:
            return { ...state, personalIdResponse: action.payload };

        case actions.WORKER_DETAIL_LIST_FAIL:
        case actions.WORKER_DETAIL_LIST_SUCCESS:
            return { ...state, workerDetailResponse: action.payload };

        case actions.UPDATE_WORKER_DETAIL_FAIL:
            return { ...state, workerDetailUpdateResponse: action.payload };

        case actions.UPDATE_WORKER_DETAIL_SUCCESS:
            return { ...state, workerDetailUpdateResponse: action.payload, workerDetailResponse: { workers: [updateAddress(state.workerDetailResponse.workers[0], state.workerDetailOptions)] } };

        case actions.UPDATE_WORK_TYPES_AT_LOCAL: {
            return { ...state, workerDetailResponse: { workers: [{ ...state.workerDetailResponse.workers[0], workType__id: action.payload }] } };
        }

        case actions.UPDATE_WORKER_DETAIL: {
            return { ...state, workerDetailOptions: action.payload };
        }

        case actions.HOME_INFO_LIST_FAIL: 
        case actions.HOME_INFO_LIST_SUCCESS:
            return { ...state, homeInfoResponse: action.payload };

        case actions.UPDATE_HOME_INFO: 
            return {...state, homeInfoOptions: action.payload };

        case actions.HOME_INFO_UPDATE_FAIL:
            return { ...state, homeInfoUpdateResponse: action.payload };

        case actions.HOME_INFO_UPDATE_SUCCESS:
            return { ...state, homeInfoResponse: {home_info: [updateHomeInfo(state.homeInfoResponse.home_info[0], state.homeInfoOptions)]} };

        case actions.GET_HOME_INFO_LIST:
        case actions.GET_PERSONAL_ID_LIST:
        case actions.GET_WORKER_DETAIL_LIST:
        case actions.GET_BASIC_INFORMATION:
        default:
            return state;
    }
}

export function updateAddress(source: WorkerDetail, option: WorkerDetailUpdateOptions): WorkerDetail {
    let result = { ...source };

    if (option.province) Object.assign(result, { curraddr__province: option.province, curraddr__city: option.city, curraddr__dist: option.dist });

    if (option.detail) Object.assign(result, { curraddr__detail: option.detail });

    return result;
}

export function updateHomeInfo(source: Home, option: HomeInfoUpdateOptions): Home {
    let result = omit(option, ['sid', 'user_id'])

    return Object.assign({}, source, rename(result, homeAddressNameMapBetweenResponseAndRequest));
}

export const getBasicInfoListResponse = (state: State) => state.basicResponse;

export const getBasicInformation = (state: State) => state.basicResponse.basic_info;

export const getEducationInformation = (state: State) => state.basicResponse.edu_info;

export const getWorkExperience = (state: State) => state.basicResponse.work_expr_info;

export const getPlatformExperience = (state: State) => state.basicResponse.platfrom_work_expr_info;

export const getWorkCertification = (state: State) => state.basicResponse.work_cert_info;

export const getHomeInformation = (state: State) => state.basicResponse.home_info;

export const getPersonalIdInformation = (state: State) => state.basicResponse.person_id_info;

export const getPersonalIdListResponse = (state: State) => state.personalIdResponse;

export const getWorkerDetailListResponse = (state: State) => state.workerDetailResponse;

export const getWorkerDetailUpdateResponse = (state: State) => state.workerDetailUpdateResponse;

export const getWorkerDetailUpdateOptions = (state: State) => state.workerDetailOptions;

export const getHomeInfoResponse = (state: State) => state.homeInfoResponse;

export const getHomeInfoUpdateResponse = (state: State) => state.homeInfoUpdateResponse;

export const getHomeInfoUpdateOptions = (state: State) => state.homeInfoOptions;