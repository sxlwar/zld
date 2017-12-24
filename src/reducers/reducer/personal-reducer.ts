import { omit } from 'lodash';
import { WorkerDetailUpdateOptions, HomeInfoUpdateOptions, homeAddressNameMapBetweenResponseAndRequest, EducationAddOptions, EducationUpdateOptions, EducationDeleteOptions, WorkExperienceAddOptions, WorkExperienceUpdateOptions, WorkExperienceDeleteOptions } from './../../interfaces/request-interface';
import { BasicInfoListResponse, PersonalIdListResponse, WorkerDetailListResponse, WorkerDetailUpdateResponse, WorkerDetail, HomeInfoListResponse, HomeInfoUpdateResponse, Home, EducationListResponse, EducationAddResponse, EducationDeleteResponse, EducationUpdateResponse, PlatformWorkExperienceResponse, WorkExperienceAddResponse, WorkExperienceUpdateResponse, WorkExperienceDeleteResponse, WorkExperienceListResponse } from './../../interfaces/response-interface';
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
    educationResponse: EducationListResponse;
    educationAddResponse: EducationAddResponse;
    educationDeleteResponse: EducationDeleteResponse;
    educationUpdateResponse: EducationUpdateResponse;
    educationAddOptions: EducationAddOptions;
    educationUpdateOptions: EducationUpdateOptions;
    educationDeleteOptions: EducationDeleteOptions;
    workExperienceResponse: WorkExperienceListResponse;
    platformWorkExperienceResponse: PlatformWorkExperienceResponse;
    workExperienceAddResponse: WorkExperienceAddResponse;
    workExperienceAddOptions: WorkExperienceAddOptions;
    workExperienceDeleteResponse: WorkExperienceDeleteResponse;
    workExperienceDeleteOptions: WorkExperienceDeleteOptions;
    workExperienceUpdateResponse: WorkExperienceUpdateResponse;
    workExperienceUpdateOptions: WorkExperienceUpdateOptions;
}

export const initialState: State = {
    basicResponse: null,
    personalIdResponse: null,
    workerDetailResponse: null,
    workerDetailUpdateResponse: null,
    workerDetailOptions: null,
    homeInfoResponse: null,
    homeInfoOptions: null,
    homeInfoUpdateResponse: null,
    educationResponse: null,
    educationAddResponse: null,
    educationDeleteResponse: null,
    educationUpdateResponse: null,
    educationAddOptions: null,
    educationUpdateOptions: null,
    educationDeleteOptions: null,
    workExperienceResponse: null,
    platformWorkExperienceResponse: null,
    workExperienceAddOptions: null,
    workExperienceAddResponse: null,
    workExperienceDeleteOptions: null,
    workExperienceDeleteResponse: null,
    workExperienceUpdateOptions: null,
    workExperienceUpdateResponse: null
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.BASIC_INFORMATION_FAIL:
        case actions.BASIC_INFORMATION_SUCCESS:
            return Object.assign({}, state, { basicResponse: action.payload });

        case actions.PERSONAL_ID_LIST_FAIL:
        case actions.PERSONAL_ID_LIST_SUCCESS:
            return { ...state, personalIdResponse: action.payload };

        /* ====================================================================Worker Detail===================================================================== */

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

        /* =====================================================================Home information=============================================================== */

        case actions.HOME_INFO_LIST_FAIL:
        case actions.HOME_INFO_LIST_SUCCESS:
            return { ...state, homeInfoResponse: action.payload };

        case actions.UPDATE_HOME_INFO:
            return { ...state, homeInfoOptions: action.payload };

        case actions.HOME_INFO_UPDATE_FAIL:
            return { ...state, homeInfoUpdateResponse: action.payload };

        case actions.HOME_INFO_UPDATE_SUCCESS:
            return { ...state, homeInfoUpdateResponse: action.payload, homeInfoResponse: { home_info: [updateHomeInfo(state.homeInfoResponse.home_info[0], state.homeInfoOptions)] } };

        /* ===================================================================Education experience==============================================================*/

        case actions.EDUCATION_LIST_FAIL:
        case actions.EDUCATION_LIST_SUCCESS:
            return { ...state, educationResponse: action.payload };

        case actions.ADD_EDUCATION:
            return { ...state, educationAddOptions: action.payload };

        case actions.ADD_EDUCATION_FAIL:
            return { ...state, educationAddResponse: action.payload };

        case actions.ADD_EDUCATION_SUCCESS:
            return { ...state, educationResponse: { education: [...state.educationResponse.education, omit(state.educationAddOptions, ['sid'])] } };

        case actions.DELETE_EDUCATION:
            return { ...state, educationDeleteOptions: action.payload };

        case actions.DELETE_EDUCATION_FAIL:
            return { ...state, educationDeleteResponse: action.payload };

        case actions.DELETE_EDUCATION_SUCCESS:
            return { ...state, educationDeleteResponse: action.payload, educationResponse: { education: state.educationResponse.education.filter(item => item.id !== state.educationDeleteOptions.education_id) } };

        case actions.UPDATE_EDUCATION:
            return { ...state, educationUpdateOptions: action.payload };

        case actions.UPDATE_EDUCATION_FAIL:
            return { ...state, educationUpdateResponse: action.payload };

        case actions.UPDATE_EDUCATION_SUCCESS:
            return { ...state, educationUpdateResponse: action.payload, educationResponse: { education: state.educationResponse.education.map(item => item.id === state.educationUpdateOptions.id ? { ...item, ...omit(state.educationUpdateOptions, ['sid']) } : item) } };

        /* ===================================================================work experience==============================================================*/

        case actions.WORK_EXPERIENCE_LIST_FAIL:
        case actions.WORK_EXPERIENCE_LIST_SUCCESS:
            return { ...state, workExperienceResponse: action.payload };

        case actions.PLATFORM_WORK_EXPERIENCE_LIST_FAIL:
        case actions.PLATFORM_WORK_EXPERIENCE_LIST_SUCCESS:
            return { ...state, platformWorkExperienceResponse: action.payload };

        case actions.ADD_WORK_EXPERIENCE:
            return { ...state, workExperienceAddOptions: action.payload };

        case actions.WORK_EXPERIENCE_ADD_FAIL:
            return { ...state, workExperienceAddResponse: action.payload };

        case actions.WORK_EXPERIENCE_ADD_SUCCESS:
            return { ...state, workExperienceAddResponse: action.payload, workExperienceResponse: { exp_add: [...state.workExperienceResponse.exp_add, omit(state.workExperienceAddOptions, ['sid'])] } };

        case actions.DELETE_WORK_EXPERIENCE:
            return { ...state, workExperienceDeleteOptions: action.payload };
            
        case actions.WORK_EXPERIENCE_DELETE_FAIL:
            return { ...state, workExperienceDeleteResponse: action.payload };

        case actions.WORK_EXPERIENCE_DELETE_SUCCESS:
            return { ...state, workExperienceDeleteResponse: action.payload, workExperienceResponse: { exp_add: state.workExperienceResponse.exp_add.filter(item => item.id !== state.workExperienceDeleteOptions.workexper_id) } };

        case actions.UPDATE_WORK_EXPERIENCE:
            return { ...state, workExperienceUpdateOptions: action.payload };

        case actions.WORK_EXPERIENCE_UPDATE_FAIL:
            return { ...state, workExperienceUpdateResponse: action.payload };

        case actions.WORK_EXPERIENCE_UPDATE_SUCCESS:
            return { ...state, workExperienceUpdateResponse: action.payload, workExperienceResponse: { exp_add: state.workExperienceResponse.exp_add.map(item => item.id === state.workExperienceUpdateOptions.id ? { ...item, ...omit(state.workExperienceUpdateOptions, ['sid']) } : item) } };

        case actions.GET_WORK_EXPERIENCE_LIST:
        case actions.GET_PLATFORM_WORK_EXPERIENCE_LIST:
        case actions.GET_EDUCATION_LIST:
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

export const getEducationListResponse = (state: State) => state.educationResponse;

export const getWorkExperienceResponse = (state: State) => state.workExperienceResponse;

export const getPlatformWorkExperienceResponse = (state: State) => state.platformWorkExperienceResponse;