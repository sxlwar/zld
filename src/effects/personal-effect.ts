import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    ADD_EDUCATION,
    ADD_WORK_EXPERIENCE,
    AddEducationAction,
    AddEducationFailAction,
    AddEducationSuccessAction,
    AddWorkExperienceAction,
    BasicInfoListFailAction,
    BasicInfoListSuccessAction,
    DELETE_EDUCATION,
    DELETE_WORK_EXPERIENCE,
    DeleteEducationAction,
    DeleteEducationFailAction,
    DeleteEducationSuccessAction,
    DeleteWorkExperienceAction,
    EducationListFailAction,
    EducationListSuccessAction,
    GET_BASIC_INFORMATION,
    GET_EDUCATION_LIST,
    GET_HOME_INFO_LIST,
    GET_PERSONAL_ID_LIST,
    GET_PLATFORM_WORK_EXPERIENCE_LIST,
    GET_WORK_EXPERIENCE_LIST,
    GET_WORKER_DETAIL_LIST,
    GetBasicInformationAction,
    GetEducationListAction,
    GetHomeInfoListAction,
    GetPersonalIdListAction,
    GetPlatformWorkExperienceListAction,
    GetWorkerDetailListAction,
    GetWorkExperienceListAction,
    HomeInfoListFailAction,
    HomeInfoListSuccessAction,
    HomeInfoUpdateFailAction,
    HomeInfoUpdateSuccessAction,
    PersonalIdListFailAction,
    PersonalIdListSuccessAction,
    PlatformWorkExperienceListFailAction,
    PlatformWorkExperienceListSuccessAction,
    UPDATE_EDUCATION,
    UPDATE_HOME_INFO,
    UPDATE_WORK_EXPERIENCE,
    UPDATE_WORKER_DETAIL,
    UpdateEducationAction,
    UpdateEducationFailAction,
    UpdateEducationSuccessAction,
    UpdateHomeInfoAction,
    UpdateWorkerDetailAction,
    UpdateWorkerDetailFailAction,
    UpdateWorkerDetailSuccessAction,
    UpdateWorkExperienceAction,
    WorkerDetailListFailAction,
    WorkerDetailListSuccessAction,
    WorkExperienceAddFailAction,
    WorkExperienceAddSuccessAction,
    WorkExperienceDeleteFailAction,
    WorkExperienceDeleteSuccessAction,
    WorkExperienceListFailAction,
    WorkExperienceListSuccessAction,
    WorkExperienceUpdateFailAction,
    WorkExperienceUpdateSuccessAction,
} from './../actions/action/personal-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Command } from './../services/api/command';
import { WebsocketService } from './../services/api/websocket-service';
import { TipService } from './../services/tip-service';

@Injectable()
export class PersonalEffect extends Command {
    @Effect()
    basicInfo$: Observable<ResponseAction> = this.actions$
        .ofType(GET_BASIC_INFORMATION)
        .switchMap((action: GetBasicInformationAction) => this.ws
            .send(this.getBasicInfoList(action.payload))
            .takeUntil(this.actions$.ofType(GET_BASIC_INFORMATION))
            .map(msg => msg.isError
                ? new BasicInfoListFailAction(msg.data)
                : new BasicInfoListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    personalIdList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PERSONAL_ID_LIST)
        .switchMap((action: GetPersonalIdListAction) => this.ws
            .send(this.getPersonalIdList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PERSONAL_ID_LIST))
            .map(msg => msg.isError
                ? new PersonalIdListFailAction(msg.data)
                : new PersonalIdListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    workerDetailList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORKER_DETAIL_LIST)
        .switchMap((action: GetWorkerDetailListAction) => this.ws
            .send(this.getWorkerDetailList(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORKER_DETAIL_LIST))
            .map(msg => msg.isError
                ? new WorkerDetailListFailAction(msg.data)
                : new WorkerDetailListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    workerDetailUpdate$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_WORKER_DETAIL)
        .switchMap((action: UpdateWorkerDetailAction) => this.ws
            .send(this.getWorkerDetailUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_WORKER_DETAIL))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new UpdateWorkerDetailFailAction(msg.data)
                : new UpdateWorkerDetailSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    homeInfoList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_HOME_INFO_LIST)
        .switchMap((action: GetHomeInfoListAction) => this.ws
            .send(this.getHomeInfoList(action.payload))
            .takeUntil(this.actions$.ofType(GET_HOME_INFO_LIST))
            .map(msg => msg.isError
                ? new HomeInfoListFailAction(msg.data)
                : new HomeInfoListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    homeInfoUpdate$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_HOME_INFO)
        .switchMap((action: UpdateHomeInfoAction) => this.ws
            .send(this.getHomeInfoUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_HOME_INFO))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new HomeInfoUpdateFailAction(msg.data)
                : new HomeInfoUpdateSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    educationList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_EDUCATION_LIST)
        .switchMap((action: GetEducationListAction) => this.ws
            .send(this.getEducationList(action.payload))
            .takeUntil(this.actions$.ofType(GET_EDUCATION_LIST))
            .map(msg => msg.isError
                ? new EducationListFailAction(msg.data)
                : new EducationListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    educationAdd$: Observable<ResponseAction> = this.actions$
        .ofType(ADD_EDUCATION)
        .switchMap((action: AddEducationAction) => this.ws
            .send(this.getEducationAdd(action.payload))
            .takeUntil(this.actions$.ofType(ADD_EDUCATION))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new AddEducationFailAction(msg.data)
                : new AddEducationSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    educationDelete$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_EDUCATION)
        .switchMap((action: DeleteEducationAction) => this.ws
            .send(this.getEducationDelete(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_EDUCATION))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new DeleteEducationFailAction(msg.data)
                : new DeleteEducationSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    educationUpdate$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_EDUCATION)
        .switchMap((action: UpdateEducationAction) => this.ws
            .send(this.getEducationUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_EDUCATION))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new UpdateEducationFailAction(msg.data)
                : new UpdateEducationSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    workExperienceList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORK_EXPERIENCE_LIST)
        .switchMap((action: GetWorkExperienceListAction) => this.ws
            .send(this.getWorkExperienceList(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORK_EXPERIENCE_LIST))
            .map(msg => msg.isError
                ? new WorkExperienceListFailAction(msg.data)
                : new WorkExperienceListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    workExperienceAdd$: Observable<ResponseAction> = this.actions$
        .ofType(ADD_WORK_EXPERIENCE)
        .switchMap((action: AddWorkExperienceAction) => this.ws
            .send(this.getWorkExperienceAdd(action.payload))
            .takeUntil(this.actions$.ofType(ADD_WORK_EXPERIENCE))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new WorkExperienceAddFailAction(msg.data)
                : new WorkExperienceAddSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    workExperienceDelete$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_WORK_EXPERIENCE)
        .switchMap((action: DeleteWorkExperienceAction) => this.ws
            .send(this.getWorkExperienceDelete(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_WORK_EXPERIENCE))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new WorkExperienceDeleteFailAction(msg.data)
                : new WorkExperienceDeleteSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    workExperienceUpdate$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_WORK_EXPERIENCE)
        .switchMap((action: UpdateWorkExperienceAction) => this.ws
            .send(this.getWorkExperienceUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_WORK_EXPERIENCE))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new WorkExperienceUpdateFailAction(msg.data)
                : new WorkExperienceUpdateSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    platformWorkExperienceList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PLATFORM_WORK_EXPERIENCE_LIST)
        .switchMap((action: GetPlatformWorkExperienceListAction) => this.ws
            .send(this.getPlatformWorkExperienceList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PLATFORM_WORK_EXPERIENCE_LIST))
            .map(msg => msg.isError
                ? new PlatformWorkExperienceListFailAction(msg.data)
                : new PlatformWorkExperienceListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions,
        private tip: TipService
    ) {
        super();
    }
}
