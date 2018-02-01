import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { omit } from 'lodash';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { rename } from '../../services/utils/util';
import { UpdateLocalWorkerDetailWorkTypesAction } from './../../actions/action/personal-action';
import {
    Certification,
    CustomWorkExperience,
    Education as EducationForBusiness,
    Family,
    PlatformExperience,
} from './../../interfaces/personal-interface';
import {
    EducationAddOptions,
    EducationUpdateOptions,
    homeAddressNameMapBetweenResponseAndRequest,
    HomeInfoUpdateOptions,
    RequestOption,
} from './../../interfaces/request-interface';
import {
    BasicInfoListResponse,
    BasicInformation,
    Education,
    HomeInfoUpdateResponse,
    PersonalId,
    PersonalIdListResponse,
    PlatformWorkExperience,
    WorkerDetail,
    WorkExperience,
    WorkType,
} from './../../interfaces/response-interface';
import {
    AppState,
    selectBasicInfoListResponse,
    selectEducationAddResponse,
    selectEducationDeleteResponse,
    selectEducationListResponse,
    selectEducationUpdateResponse,
    selectHomeInfoListResponse,
    selectHomeInfoUpdateResponse,
    selectPersonalIdResponse,
    selectPlatformWorkExperienceResponse,
    selectSelectedWorkTypes,
    selectWorkerDetailResponse,
    selectWorkerDetailUpdateResponse,
    selectWorkExperienceAddResponse,
    selectWorkExperienceDeleteResponse,
    selectWorkExperienceListResponse,
    selectWorkExperienceUpdateResponse,
} from './../../reducers/index-reducer';
import { WorkExperienceFormModel, WorkExperienceUpdateFormModel } from './../api/mapper-service';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { AddressService } from './../utils/address-service';
import { CraftService } from './craft-service';
import { UserService } from './user-service';

@Injectable()
export class PersonalService {

    constructor(
        private store: Store<AppState>,
        private userInfo: UserService,
        private process: ProcessorService,
        private error: ErrorService,
        private craft: CraftService,
        private address: AddressService
    ) {
    }

    /* ================================================================Request methods====================================================== */

    getBasicInfoList(userId: Observable<number>): Subscription {
        return this.process.basicInfoListProcessor(
            userId.combineLatest(
                this.userInfo.getSid(),
                (user_id, sid) => ({ sid, user_id }))
        );
    }

    getPersonalIdList(): Subscription {
        return this.process.personalIdListProcessor(
            this.getPersonalIdResponse()
                .filter(value => !value)
                .mergeMapTo(
                this.userInfo.getSid().map(sid => ({ sid }))
                )
        );
    }

    getWorkerDetailList(): Subscription {
        return this.process.workerDetailListProcessor(
            this.userInfo.getSid().map(sid => ({ sid }))
        );
    }

    updateWorkerDetail(option: Observable<RequestOption>): Subscription {
        return this.process.workerDetailUpdateProcessor(
            option.combineLatest(
                this.userInfo.getSid(),
                (option, sid) => ({ sid, ...option })
            )
        );
    }

    getHomeInfoList(): Subscription {
        return this.process.homeInfoListProcessor(
            this.userInfo.getSid().map(sid => ({ sid }))
        );
    }

    updateHomeInfo(option: Observable<HomeInfoUpdateOptions>): Subscription {
        return this.process.homeInfoUpdateProcessor(
            option.withLatestFrom(
                this.store.select(selectHomeInfoListResponse)
                    .filter(value => !!value && !!value.home_info && !!value.home_info.length)
                    .map(res => rename(omit(res.home_info[0], ['user_id']), homeAddressNameMapBetweenResponseAndRequest, true)),
                this.userInfo.getSid().map(sid => ({ sid })),
                (option, source, sid) => ({ ...source, ...option, ...sid })
            )
        );
    }

    getEducationList(): Subscription {
        return this.process.educationListProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    updateEducation(option: Observable<EducationUpdateOptions>): Subscription {
        return this.process.educationUpdateProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
            )
        );
    }

    deleteEducation(option: Observable<number>): Subscription {
        return this.process.educationDeleteProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (education_id, sid) => ({ education_id, sid })
            )
        );
    }

    addEducation(option: Observable<EducationAddOptions>): Subscription {
        return this.process.educationAddProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
            )
        );
    }

    getWorkExperienceList(): Subscription {
        return this.process.workExperienceListProcessor(
            this.userInfo.getSid().map(sid => ({ sid }))
        );
    }

    getPlatformWorkExperienceList(): Subscription {
        return this.process.platformWorkExperienceListProcessor(
            this.userInfo.getSid().map(sid => ({ sid }))
        );
    }

    addWorkExperience(option: Observable<WorkExperienceFormModel>): Subscription {
        return this.process.workExperienceAddProcessor(
            option.map(option => this.process.transformWorkExperienceAddOptions(option))
                .withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
                )
        );
    }

    deleteWorkExperience(id: Observable<number>): Subscription {
        return this.process.workExperienceDeleteProcessor(
            id.withLatestFrom(
                this.userInfo.getSid(),
                (workexper_id, sid) => ({ workexper_id, sid })
            )
        );
    }

    updateWorkExperience(option: Observable<WorkExperienceUpdateFormModel>): Subscription {
        return this.process.workExperienceUpdateProcessor(
            option.map(option => this.process.transformWorkExperienceUpdateOptions(option))
                .withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
                )
        );
    }

    /* ================================================================Data acquisition methods====================================================== */

    getBasicInfoResponse(): Observable<BasicInfoListResponse> {
        return this.store.select(selectBasicInfoListResponse).filter(value => !!value);
    }

    /**
     * 以下7个从BasicInfo上获取数据的方法中的filter不能删，因为后台的数据结构不稳定，防止不给返回需要的字段。
     * 貌似在权限不够时后台会把一些字段给删除，权限不够可以返null啊，由于这不稳定的数据结构导致很多不必要的BUG，总而言之后台的数据结构就是一堆屎
     */
    getBasicFromBasicInfoList(): Observable<BasicInformation> {
        return this.getBasicInfoResponse()
            .filter(data => !!data.basic_info)
            .map(data => data.basic_info)
    }

    getCertificationsFromBasicInfoList(): Observable<Certification[]> {
        return this.getBasicInfoResponse()
            .filter(value => !!value.work_cert_info)
            .combineLatest(
            this.craft.getWorkTypeList(),
            (source, type) => source.work_cert_info.map(element => this.process.transformCertification(element, type))
            );
    }

    getFamilyFromBasicInfoList(): Observable<Family> {
        return this.getBasicInfoResponse()
            .filter(value => !!value.home_info && !!value.home_info.length)
            .mergeMap(data => Observable.from(data.home_info)
                .first()
                .map(res => this.process.transformFamily(res))
                .zip(
                this.address.getAddressCode(
                    Observable.from(data.home_info)
                        .first()
                        .map(data => [data.homeaddr__province, data.homeaddr__city, data.homeaddr__dist])).map(res => res.join(' ')
                    ),
                (result, addressArea) => ({ ...result, addressArea })
                )
            );
    }

    getEducationsFromBasicInfoList(): Observable<EducationForBusiness[]> {
        return this.getBasicInfoResponse()
            .filter(res => !!res.edu_info && !!res.edu_info.length)
            .map(data => data.edu_info.map(item => this.process.transformEducation(item)));
    }

    getPersonalIdFromBasicInfoList(): Observable<PersonalId> {
        return this.getBasicInfoResponse()
            .filter(value => !!value.person_id_info && !!value.person_id_info.length)
            .mergeMap(data => Observable.from(data.person_id_info).first());
    }

    getCustomWorkExperiencesFromBasicInfoList(): Observable<CustomWorkExperience[]> {
        return this.getBasicInfoResponse()
            .filter(value => !!value.work_expr_info)
            .map(data => data.work_expr_info.map(item => this.process.transformWorkExperience(item)))
    }

    getPlatformWorkExperiencesFromBasicInfoList(): Observable<PlatformExperience[]> {
        return this.getBasicInfoResponse()
            .filter(value => !!value.platfrom_work_expr_info)
            .map(data => data.platfrom_work_expr_info.map(item => this.process.transformPlatformWorkExperience(item)));
    }

    getPersonalIdResponse(): Observable<PersonalIdListResponse> {
        return this.store.select(selectPersonalIdResponse);
    }

    getPersonalId(): Observable<PersonalId> {
        return this.getPersonalIdResponse()
            .filter(value => !!value && !!value.personal_id)
            .map(res => res.personal_id[0]);
    }

    getWorkerDetail(): Observable<WorkerDetail> {
        return this.store.select(selectWorkerDetailResponse)
            .filter(value => !!value && !!value.workers.length)
            .map(res => res.workers[0]);
    }

    getOwnWorkTypes(): Observable<WorkType[]> {
        return this.getWorkerDetail().map(item => item.workType__id)
            .combineLatest(
            this.craft.getWorkTypeList(),
            (ids, types) => types.filter(type => ids.indexOf(type.id) !== -1)
            );
    }

    getWorkerDetailUpdateSuccessResult(): Observable<boolean> {
        return this.store.select(selectWorkerDetailUpdateResponse)
            .map(res => res && !res.errorMessage)
            .filter(value => value);
    }

    getOwnFamily(): Observable<Family> {
        return this.store.select(selectHomeInfoListResponse)
            .filter(value => !!value && !!value.home_info)
            .map(res => this.process.transformFamily(res.home_info[0]));
    }

    getOwnEducation(): Observable<Education[]> {
        return this.store.select(selectEducationListResponse)
            .filter(value => !!value && !!value.education)
            .map(res => res.education);
    }

    getOwnWorkExperience(): Observable<WorkExperience[]> {
        return this.store.select(selectWorkExperienceListResponse)
            .filter(value => !!value && !!value.exp_add)
            .map(res => res.exp_add);
    }

    getOwnPlatformExperience(): Observable<PlatformWorkExperience[]> {
        return this.store.select(selectPlatformWorkExperienceResponse)
            .filter(value => !!value && !!value.exp_platform)
            .map(res => res.exp_platform);
    }

    getHomeInfoUpdateSuccessResponse(): Observable<HomeInfoUpdateResponse> {
        return this.store.select(selectHomeInfoUpdateResponse)
            .filter(value => !!value && !value.errorMessage);
    }

    /* =======================================================Local state update================================================================= */

    updateWorkerDetailWorkTypeAtLocal(): Subscription {
        return this.getWorkerDetailUpdateSuccessResult()
            .mergeMapTo(
            this.store.select(selectSelectedWorkTypes)
                .filter(item => !!item.length)
            )
            .subscribe(types => this.store.dispatch(new UpdateLocalWorkerDetailWorkTypesAction(types)));
    }

    /* =======================================================Error handle================================================================= */

    handleBasicInfoError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectBasicInfoListResponse));
    }

    handlePersonalIdError(): Subscription {
        return this.error.handleApiRequestError(this.getPersonalIdResponse());
    }

    handleWorkDetailError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectWorkerDetailResponse));
    }

    handleUpdateWorkerDetailError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectWorkerDetailUpdateResponse));
    }

    handleHomeInfoError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectHomeInfoListResponse));
    }

    handleUpdateHomeInfoError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectHomeInfoUpdateResponse));
    }

    handleEducationError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectEducationListResponse));
    }

    handleUpdateEducationError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectEducationUpdateResponse));
    }

    handleDeleteEducationError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectEducationDeleteResponse));
    }

    handleAddEducationError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectEducationAddResponse));
    }

    handleWorkExperienceError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectWorkExperienceListResponse));
    }

    handlePlatformWorkExperienceError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectPlatformWorkExperienceResponse));
    }

    handleAddWorkExperienceError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectWorkExperienceAddResponse));
    }

    handleDeleteWorkExperienceError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectWorkExperienceDeleteResponse));
    }

    handleUpdateWorkExperienceError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectWorkExperienceUpdateResponse));
    }
}
