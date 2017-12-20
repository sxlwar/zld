import { TipService } from './../services/tip-service';
import { GET_BASIC_INFORMATION, GetBasicInformationAction, BasicInfoListFailAction, BasicInfoListSuccessAction, GET_PERSONAL_ID_LIST, GetPersonalIdListAction, PersonalIdListFailAction, PersonalIdListSuccessAction, GET_WORKER_DETAIL_LIST, GetWorkerDetailListAction, WorkerDetailListFailAction, WorkerDetailListSuccessAction, UPDATE_WORKER_DETAIL, UpdateWorkerDetailAction, UpdateWorkerDetailFailAction, UpdateWorkerDetailSuccessAction } from './../actions/action/personal-action';
import { Injectable } from '@angular/core';
import { ResponseAction } from './../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from './../services/api/websocket-service';
import { Effect, Actions } from '@ngrx/effects';
import { Command } from './../services/api/command';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PersonalEffect extends Command {
    @Effect()
    basicInfo$: Observable<ResponseAction> = this.actions$
        .ofType(GET_BASIC_INFORMATION)
        .switchMap((action: GetBasicInformationAction) => this.ws
            .send(this.getBasicInfoList(action.payload))
            .takeUntil(this.actions$.ofType(GET_BASIC_INFORMATION))
            .map(msg => msg.isError ? new BasicInfoListFailAction(msg.data) : new BasicInfoListSuccessAction(msg.data))
            .catch(error => of(error))
        );

    @Effect()
    personalIdList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PERSONAL_ID_LIST)
        .switchMap((action: GetPersonalIdListAction) => this.ws
            .send(this.getPersonalIdList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PERSONAL_ID_LIST))
            .map(msg => msg.isError ? new PersonalIdListFailAction(msg.data) : new PersonalIdListSuccessAction(msg.data))
            .catch(error => of(error))
        );

    @Effect()
    workerDetailList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORKER_DETAIL_LIST)
        .switchMap((action: GetWorkerDetailListAction) => this.ws
            .send(this.getWorkerDetailList(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORKER_DETAIL_LIST))
            .map(msg => msg.isError ? new WorkerDetailListFailAction(msg.data) : new WorkerDetailListSuccessAction(msg.data))
            .catch(error => of(error))
        );

    @Effect()
    workerDetailUpdate$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_WORKER_DETAIL)
        .switchMap((action: UpdateWorkerDetailAction) => this.ws
            .send(this.getWorkerDetailUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_WORKER_DETAIL))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new UpdateWorkerDetailFailAction(msg.data) : new UpdateWorkerDetailSuccessAction(msg.data))
            .catch(error => of(error))
        );

    constructor(
        public ws: WebsocketService,
        public actions$: Actions,
        public tip: TipService
    ) {
        super();
    }
}
