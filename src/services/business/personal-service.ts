import { Certification, Education as EducationUI, Edu, Family } from './../../interfaces/personal-interface';
//region
import { BasicInfoListResponse, Certificate, WorkType, Education, Home } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { UserService } from './user-service';
import { Store } from '@ngrx/store';
import { AppState, selectBasicInfoListResponse } from './../../reducers/index-reducer';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
//endregion

@Injectable()
export class PersonalService {
    subscriptions: Subscription[] = [];

    basicInformation$$: Subscription;

    constructor(
        public store:Store<AppState>,
        public userInfo: UserService,
        public process:ProcessorService,
        public error: ErrorService
    ){
        this.handleError();
    }

    getBasicInfoResponse(): Observable<BasicInfoListResponse> {
        return this.store.select(selectBasicInfoListResponse);
    }
    
    getBasicInfoList(userId: Observable<number>): void {
        const sid = this.userInfo.getSid();
        
        const option = sid.zip(userId, (sid, user_id) => ({sid, user_id}));

        const subscription = this.process.basicInfoListProcessor(option);

        this.subscriptions.push(subscription);
    }

    transformCertification(cer: Certificate, types: WorkType[]): Certification{
        const target = types.find(item => item.id === cer.worktype_id);
        
        const workType = target.name;

        const expire = cer.usestart_date + '-' + cer.usefinish_date;

        const {education, mechanism } = cer;

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

    transformEducation(source: Education): EducationUI{
        const { degree, major } = source;

        const education = Edu[degree];

        const school = source.school__name;

        const expire = source.start_date + '-' + source.finish_date;
        
        return { expire, school, education, major }
    }

    transformFamily(source: Home): Family {
        const marriage = source.marriage ? 'MARRIED': 'CELIBATE';

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

    handleError() {
        const error = this.store.select(selectBasicInfoListResponse);

        this.basicInformation$$ = this.error.handleErrorInSpecific(error, 'API_ERROR');
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}