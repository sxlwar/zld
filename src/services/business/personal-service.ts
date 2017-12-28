import { MapperService } from './../api/mapper-service';
import { omit } from 'lodash';
import { UpdateLocalWorkerDetailWorkTypesAction } from './../../actions/action/personal-action';
import { RequestOption, homeAddressNameMapBetweenResponseAndRequest, HomeInfoUpdateOptions, EducationUpdateOptions, EducationAddOptions, WorkExperienceAddOptions, WorkExperienceUpdateOptions } from './../../interfaces/request-interface';
import { CraftService } from './craft-service';
import { Family } from './../../interfaces/personal-interface';
import { BasicInfoListResponse, PersonalId, WorkerDetail, Education, WorkExperience, PlatformWorkExperience, PersonalIdListResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { UserService } from './user-service';
import { Store } from '@ngrx/store';
import { AppState, selectBasicInfoListResponse, selectPersonalIdResponse, selectWorkerDetailResponse, selectWorkerDetailUpdateResponse, selectSelectedWorkTypes, selectHomeInfoListResponse, selectEducationListResponse, selectWorkExperienceListResponse, selectPlatformWorkExperienceResponse } from './../../reducers/index-reducer';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { rename } from '../../services/utils/util';

@Injectable()
export class PersonalService {
    basicInformation$$: Subscription;

    constructor(
        public store: Store<AppState>,
        public userInfo: UserService,
        public process: ProcessorService,
        public error: ErrorService,
        public craft: CraftService,
        public mapper: MapperService
    ) {
        this.handleError();
    }

    /* ================================================================Request methods====================================================== */

    getBasicInfoList(userId: Observable<number>): Subscription {
        return this.process.basicInfoListProcessor(this.userInfo.getSid().combineLatest(userId, (sid, user_id) => ({ sid, user_id })));
    }

    getPersonalIdList(): Subscription {
        return this.process.personalIdListProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    getWorkerDetailList(): Subscription {
        return this.process.workerDetailListProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    updateWorkerDetail(option: Observable<RequestOption>): Subscription {
        return this.process.workerDetailUpdateProcessor(this.userInfo.getSid().combineLatest(option, (sid, option) => ({ sid, ...option })));
    }

    getHomeInfoList(): Subscription {
        return this.process.homeInfoListProcessor(this.userInfo.getSid().map(sid => ({ sid })));
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
            option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid }))
        );
    }

    deleteEducation(option: Observable<number>): Subscription {
        return this.process.educationDeleteProcessor(
            option.withLatestFrom(this.userInfo.getSid(), (education_id, sid) => ({ education_id, sid }))
        );
    }

    addEducation(option: Observable<EducationAddOptions>): Subscription {
        return this.process.educationAddProcessor(
            option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid }))
        );
    }

    getWorkExperienceList(): Subscription {
        return this.process.workExperienceListProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    getPlatformWorkExperienceList(): Subscription {
        return this.process.platformWorkExperienceListProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    addWorkExperience(option: Observable<WorkExperienceAddOptions>): Subscription {
        return this.process.workExperienceAddProcessor(option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid })));
    }

    deleteWorkExperience(id: Observable<number>): Subscription {
        return this.process.workExperienceDeleteProcessor(id.withLatestFrom(this.userInfo.getSid(), (workexper_id, sid) => ({ workexper_id, sid })));
    }

    updateWorkExperience(option: Observable<WorkExperienceUpdateOptions>): Subscription {
        return this.process.workExperienceUpdateProcessor(option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid })));
    }

    /* ================================================================Data acquisition methods====================================================== */

    getBasicInfoResponse(): Observable<BasicInfoListResponse> {
        return this.store.select(selectBasicInfoListResponse);
    }

    getPersonalIdResponse(): Observable<PersonalIdListResponse> {
        return this.store.select(selectPersonalIdResponse);
    }

    getPersonalId(): Observable<PersonalId> {
        return this.getPersonalIdResponse() 
            .filter(value => !!value)
            .map(res => res.personal_id[0]);
    }

    getWorkerDetail(): Observable<WorkerDetail> {
        return this.store.select(selectWorkerDetailResponse)
            .filter(value => !!value)
            .map(res => res.workers[0]);
    }

    getOwnWorkTypes(): Observable<string[]> {
        return this.getWorkerDetail().map(item => item.workType__id)
            .combineLatest(this.craft.getWorkTypeList(), (ids, types) => types.filter(type => ids.indexOf(type.id) !== -1).map(item => item.name));
    }

    getWorkerDetailUpdateSuccessResult(): Observable<boolean> {
        return this.store.select(selectWorkerDetailUpdateResponse).map(res => res && !res.information).filter(value => value);
    }

    getOwnFamily(): Observable<Family> {
        return this.store.select(selectHomeInfoListResponse)
            .filter(value => !!value)
            .map(res => this.mapper.transformFamily(res.home_info[0]));
    }

    getOwnEducation(): Observable<Education[]> {
        return this.store.select(selectEducationListResponse)
            .filter(value => !!value)
            .map(res => res.education);
    }

    getOwnWorkExperience(): Observable<WorkExperience[]> {
        return this.store.select(selectWorkExperienceListResponse)
            .filter(value => !!value)
            .map(res => res.exp_add);
    }

    getOwnPlatformExperience(): Observable<PlatformWorkExperience[]> {
        return this.store.select(selectPlatformWorkExperienceResponse)
            .filter(value => !!value)
            .map(res => res.exp_platform);
    }

    /* =======================================================Update worker detail================================================================== */

    updateWorkerDetailWorkTypeAtLocal(): Subscription {
        return this.getWorkerDetailUpdateSuccessResult().mergeMapTo(this.store.select(selectSelectedWorkTypes).filter(item => !!item.length))
            .subscribe(types => this.store.dispatch(new UpdateLocalWorkerDetailWorkTypesAction(types)));
    }

    handleError() {
        const error = this.store.select(selectBasicInfoListResponse);

        this.basicInformation$$ = this.error.handleErrorInSpecific(error, 'API_ERROR');
    }
}