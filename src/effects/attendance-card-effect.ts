import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    ADD_ATTENDANCE_CARD,
    AddAttendanceCardAction,
    AddAttendanceCardFailAction,
    AddAttendanceCardSuccessAction,
    AttendanceCardListFailAction,
    AttendanceCardListSuccessAction,
    DELETE_ATTENDANCE_CARD,
    DeleteAttendanceCardAction,
    DeleteAttendanceCardFailAction,
    DeleteAttendanceCardSuccessAction,
    GET_ATTENDANCE_CARD_LIST,
    GetAttendanceCardListAction,
    UPDATE_ATTENDANCE_CARD,
    UpdateAttendanceCardAction,
    UpdateAttendanceCardFailAction,
    UpdateAttendanceCardSuccessAction,
} from './../actions/action/attendance-card-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Command } from './../services/api/command';
import { WebsocketService } from './../services/api/websocket-service';
import { TipService } from './../services/tip-service';

@Injectable()
export class AttendanceCardEffect extends Command {

    @Effect()
    cardList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_ATTENDANCE_CARD_LIST)
        .switchMap((action: GetAttendanceCardListAction) => this.ws
            .send(this.getAttendanceCardList(action.payload))
            .takeUntil(this.actions$.ofType(GET_ATTENDANCE_CARD_LIST))
            // 注意这个地方成功响应以后的接口字段中有个单词是错的，需要二次赋值，错了半年了也没有改过，这地雷这次在这又踩中了。
            .map(msg => msg.isError
                ? new AttendanceCardListFailAction(msg.data)
                : new AttendanceCardListSuccessAction({ count: msg.data.count, attendance_cards: msg.data.attendace_cards }))
            .catch(error => Observable.of(error))
        );

    @Effect()
    addCard$: Observable<ResponseAction> = this.actions$
        .ofType(ADD_ATTENDANCE_CARD)
        .switchMap((action: AddAttendanceCardAction) => this.ws
            .send(this.getAttendanceCardAdd(action.payload))
            .takeUntil(this.actions$.ofType(ADD_ATTENDANCE_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new AddAttendanceCardFailAction(msg.data)
                : new AddAttendanceCardSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    updateCard$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_ATTENDANCE_CARD)
        .switchMap((action: UpdateAttendanceCardAction) => this.ws
            .send(this.getAttendanceCardUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_ATTENDANCE_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new UpdateAttendanceCardFailAction(msg.data)
                : new UpdateAttendanceCardSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    deleteCard$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_ATTENDANCE_CARD)
        .switchMap((action: DeleteAttendanceCardAction) => this.ws
            .send(this.getAttendanceCardDelete(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_ATTENDANCE_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new DeleteAttendanceCardFailAction(msg.data)
                : new DeleteAttendanceCardSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private tip: TipService,
        private actions$: Actions
    ) {
        super();
    }
}
