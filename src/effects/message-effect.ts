import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    DELETE_MESSAGE,
    DeleteMessageAction,
    GET_MESSAGE_CONTENT,
    GET_MESSAGE_LIST,
    GET_UNREAD_MESSAGE_COUNT,
    GetMessageContentAction,
    GetMessageListAction,
    GetUnreadMessageCountAction,
    MessageContentFailAction,
    MessageContentSuccessAction,
    MessageDeleteFailAction,
    MessageDeleteSuccessAction,
    MessageListFailAction,
    MessageListSuccessAction,
    UnreadMessageCountFailAction,
    UnreadMessageCountSuccessAction,
} from './../actions/action/message-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Command } from './../services/api/command';
import { WebsocketService } from './../services/api/websocket-service';
import { TipService } from './../services/tip-service';

@Injectable()
export class MessageEffect extends Command {
    @Effect()
    messageList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_MESSAGE_LIST)
        .switchMap((action: GetMessageListAction) => this.ws
            .send(this.getMessageList(action.payload))
            .takeUntil(this.actions$.ofType(GET_MESSAGE_LIST))
            .map(msg => msg.isError
                ? new MessageListFailAction(msg.data)
                : new MessageListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    messageContent$: Observable<ResponseAction> = this.actions$
        .ofType(GET_MESSAGE_CONTENT)
        .switchMap((action: GetMessageContentAction) => this.ws
            .send(this.getMessageContent(action.payload))
            .takeUntil(this.actions$.ofType(GET_MESSAGE_CONTENT))
            .map(msg => msg.isError
                ? new MessageContentFailAction(msg.data)
                : new MessageContentSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    messageDelete$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_MESSAGE)
        .switchMap((action: DeleteMessageAction) => this.ws
            .send(this.getMessageDelete(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_MESSAGE))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new MessageDeleteFailAction(msg.data)
                : new MessageDeleteSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    unreadMessageCount$: Observable<ResponseAction> = this.actions$
        .ofType(GET_UNREAD_MESSAGE_COUNT)
        .switchMap((action: GetUnreadMessageCountAction) => this.ws
            .send(this.getUnreadMessageCount(action.payload))
            .takeUntil(this.actions$.ofType(GET_UNREAD_MESSAGE_COUNT))
            .map(msg => msg.isError
                ? new UnreadMessageCountFailAction(msg.data)
                : new UnreadMessageCountSuccessAction(msg.data))
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
