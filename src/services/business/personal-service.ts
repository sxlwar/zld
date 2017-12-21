import { omit } from 'lodash';
import { UpdateLocalWorkerDetailWorkTypesAction } from './../../actions/action/personal-action';
import { RequestOption, homeAddressNameMapBetweenResponseAndRequest, HomeInfoUpdateOptions } from './../../interfaces/request-interface';
import { CraftService } from './craft-service';
import { Certification, Edu, Family, CustomWorkExperience, PlatformExperience } from './../../interfaces/personal-interface';
import { BasicInfoListResponse, Certificate, WorkType, Education, Home, WorkExperience, PlatformWorkExperience, PersonalId, WorkerDetail } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { UserService } from './user-service';
import { Store } from '@ngrx/store';
import { AppState, selectBasicInfoListResponse, selectPersonalIdResponse, selectWorkerDetailResponse, selectWorkerDetailUpdateResponse, selectSelectedWorkTypes, selectHomeInfoListResponse } from './../../reducers/index-reducer';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Education as EducationUI } from './../../interfaces/personal-interface';
import { rename } from '../../services/utils/util';

@Injectable()
export class PersonalService {
    basicInformation$$: Subscription;

    constructor(
        public store: Store<AppState>,
        public userInfo: UserService,
        public process: ProcessorService,
        public error: ErrorService,
        public craft: CraftService
    ) {
        this.handleError();
    }

    /* ================================================================Request methods====================================================== */

    getBasicInfoList(userId: Observable<number>): Subscription {
        return this.process.basicInfoListProcessor(this.userInfo.getSid().zip(userId, (sid, user_id) => ({ sid, user_id })));
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

    updateHomeInfo(option: Observable<RequestOption>): Subscription {
        return this.process.homeInfoUpdateProcessor(
            this.store.select(selectHomeInfoListResponse)
                .map(res => rename(omit(res.home_info[0], ['user_id']), homeAddressNameMapBetweenResponseAndRequest, true))
                .combineLatest(option, this.userInfo.getSid().map(sid => ({ sid })), (source, sid, option) => ({ ...source, ...option, ...sid })) as Observable<HomeInfoUpdateOptions>
        );
    }

    /* ================================================================Data acquisition methods====================================================== */

    getBasicInfoResponse(): Observable<BasicInfoListResponse> {
        return this.store.select(selectBasicInfoListResponse);
    }

    getPersonalId(): Observable<PersonalId> {
        return this.store.select(selectPersonalIdResponse)
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
            .map(res => this.transformFamily(res.home_info[0]));
    }

    /* =======================================================Update worker detail================================================================== */

    updateWorkerDetailWorkTypeAtLocal(): Subscription {
        return this.getWorkerDetailUpdateSuccessResult().mergeMapTo(this.store.select(selectSelectedWorkTypes).filter(item => !!item.length))
            .subscribe(types => this.store.dispatch(new UpdateLocalWorkerDetailWorkTypesAction(types)));
    }

    /**
     * transformCertification, transformEducation, transformFamily, transformWorkExperience, transformPlatformWorkExperience
     * @description Map the data returned by the server to the information needed on the view
     */
    transformCertification(cer: Certificate, types: WorkType[]): Certification {
        const target = types.find(item => item.id === cer.worktype_id);

        const workType = target.name;

        const expire = cer.usestart_date + '-' + cer.usefinish_date;

        const { education, mechanism } = cer;

        return {
            workType,
            expire,
            mechanism,
            education: Edu[education],
            identifier: cer.num,
            imageFace: cer.imageface,
            imageBack: cer.imageback
        }
    }

    transformEducation(source: Education): EducationUI {
        const { degree, major } = source;

        const education = Edu[degree];

        const school = source.school__name;

        const expire = source.start_date + '-' + source.finish_date;

        return { expire, school, education, major }
    }

    transformFamily(source: Home): Family {
        const marriage = source.marriage ? 'MARRIED' : 'CELIBATE';

        return {
            marriage,
            marryDay: source.marryday,
            children: source.childnum,
            emergencyName: source.emergency_contact_name,
            emergencyPhone: source.emergency_contact_tel,
            emergencyRelation: source.emergency_contact_relation,
            addressArea: source.homeaddr__province + ' ' + source.homeaddr__city + ' ' + source.homeaddr__dist,
            addressDetail: source.homeaddr__street + ' ' + source.homeaddr__detail
        }
    }

    transformWorkExperience(source: WorkExperience): CustomWorkExperience {
        return {
            expire: source.start + '-' + source.finish,
            project: source.project_name,
            company: source.company_name,
            job: source.job
        }
    }

    transformPlatformWorkExperience(source: PlatformWorkExperience): PlatformExperience {
        return {
            expire: source.start_day + '-' + source.finish_day,
            workType: source.worktype__name,
            project: source.team__project__name,
            team: source.team__name
        }
    }

    handleError() {
        const error = this.store.select(selectBasicInfoListResponse);

        this.basicInformation$$ = this.error.handleErrorInSpecific(error, 'API_ERROR');
    }
}