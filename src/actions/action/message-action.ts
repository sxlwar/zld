import { UnreadMessageCountResponse, MessageListResponse, MessageContentResponse, MessageDeleteResponse } from './../../interfaces/response-interface';
import { UnreadMessageCountOptions, MessageListOptions, MessageContentOptions, MessageDeleteOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

/* ====================================================Server Action==================================================== */

export const GET_UNREAD_MESSAGE_COUNT = 'GET_UNREAD_MESSAGE_COUNT';

export class GetUnreadMessageCountAction implements Action {
    readonly type = GET_UNREAD_MESSAGE_COUNT;

    constructor(public payload: UnreadMessageCountOptions) { }
}

export const UNREAD_MESSAGE_COUNT_FAIL = 'UNREAD_MESSAGE_COUNT_FAIL';

export class UnreadMessageCountFailAction implements Action {
    readonly type = UNREAD_MESSAGE_COUNT_FAIL;

    constructor(public payload: UnreadMessageCountResponse) { }
}


export const UNREAD_MESSAGE_COUNT_SUCCESS = 'UNREAD_MESSAGE_COUNT_SUCCESS';

export class UnreadMessageCountSuccessAction implements Action {
    readonly type = UNREAD_MESSAGE_COUNT_SUCCESS;

    constructor(public payload: UnreadMessageCountResponse) { }
}

export const GET_MESSAGE_LIST = 'GET_MESSAGE_LIST';

export class GetMessageListAction implements Action {
    readonly type = GET_MESSAGE_LIST;

    constructor(public payload: MessageListOptions) { }
}

export const MESSAGE_LIST_FAIL_ACTION = 'MESSAGE_LIST_FAIL_ACTION';

export class MessageListFailAction implements Action {
    readonly type = MESSAGE_LIST_FAIL_ACTION;

    constructor(public payload: MessageListResponse) { }
}

export const MESSAGE_LIST_SUCCESS_ACTION = 'MESSAGE_LIST_SUCCESS_ACTION';

export class MessageListSuccessAction implements Action {
    readonly type = MESSAGE_LIST_SUCCESS_ACTION;

    constructor(public payload: MessageListResponse) { }
}

export const GET_MESSAGE_CONTENT = 'GET_MESSAGE_CONTENT';

export class GetMessageContentAction implements Action {
    readonly type = GET_MESSAGE_CONTENT;

    constructor(public payload: MessageContentOptions) { }
}

export const MESSAGE_CONTENT_FAIL = 'MESSAGE_CONTENT_FAIL';

export class MessageContentFailAction implements Action {
    readonly type = MESSAGE_CONTENT_FAIL;

    constructor(public payload: MessageContentResponse) { }
}

export const MESSAGE_CONTENT_SUCCESS = 'MESSAGE_CONTENT_SUCCESS';

export class MessageContentSuccessAction implements Action {
    readonly type = MESSAGE_CONTENT_SUCCESS;

    constructor(public payload: MessageContentResponse) { }
}

export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export class DeleteMessageAction implements Action {
    readonly type = DELETE_MESSAGE;

    constructor(public payload: MessageDeleteOptions) { }
}

export const MESSAGE_DELETE_FAIL = 'MESSAGE_DELETE_FAIL';

export class MessageDeleteFailAction implements Action {
    readonly type = MESSAGE_DELETE_FAIL;

    constructor(public payload: MessageDeleteResponse) { }
}

export const MESSAGE_DELETE_SUCCESS = 'MESSAGE_DELETE_SUCCESS';

export class MessageDeleteSuccessAction implements Action {
    readonly type = MESSAGE_DELETE_SUCCESS;

    constructor(public payload: MessageDeleteResponse) { }
}

export const INCREASE_UNREAD_MESSAGE_PAGE = 'INCREASE_UNREAD_MESSAGE_PAGE';

export class IncreaseUnreadMessagePageAction implements Action {
    readonly type = INCREASE_UNREAD_MESSAGE_PAGE;

    constructor() { }
}

export const INCREASE_READ_MESSAGE_PAGE = 'INCREASE_READ_MESSAGE_PAGE';

export class IncreaseReadMessagePageAction implements Action {
    readonly type = INCREASE_READ_MESSAGE_PAGE;

    constructor() { }
}

export const RESET_MESSAGE_PAGE = 'RESET_MESSAGE_PAGE';

export class ResetMessagePageAction implements Action {
    readonly type = RESET_MESSAGE_PAGE;

    constructor() { }
}

/* ==========================================================Local action========================================== */

export const DECREASE_UNREAD_MESSAGE_COUNT = 'DECREASE_UNREAD_MESSAGE_COUNT';

export class DecreaseUnreadMessageCountAction implements Action {
    readonly type = DECREASE_UNREAD_MESSAGE_COUNT;

    constructor() { }
}

export const UPDATE_UNREAD_TIME_ORDER = 'UPDATE_UNREAD_TIME_ORDER';

export class UpdateUnreadTimeOrderAction implements Action {
    readonly type = UPDATE_UNREAD_TIME_ORDER;

    constructor(public payload: number) { }
}

export const UPDATE_READ_TIME_ORDER = 'UPDATE_READ_TIME_ORDER';

export class UpdateReadTimeOrderAction implements Action {
    readonly type = UPDATE_READ_TIME_ORDER;

    constructor(public payload: number) { }
}

export const UPDATE_UNREAD_SELECTED_TYPE = 'UPDATE_UNREAD_SELECTED_TYPE';

export class UpdateUnreadSelectedTypeAction implements Action {
    readonly type = UPDATE_UNREAD_SELECTED_TYPE;

    constructor(public payload: number) { }
}

export const UPDATE_READ_SELECTED_TYPE = 'UPDATE_READ_SELECTED_TYPE';

export class UpdateReadSelectedTypeAction implements Action {
    readonly type = UPDATE_READ_SELECTED_TYPE;

    constructor(public payload: number) { }
}

export const SET_MESSAGE_READ_TYPE_AT_LOCAL = 'SET_MESSAGE_READ_TYPE_AT_LOCAL';

export class SetMessageReadTypeAtLocalAction implements Action {
    readonly type = SET_MESSAGE_READ_TYPE_AT_LOCAL;

    constructor(public payload: number) { } // messageId;
}

export type Actions = GetMessageListAction
    | DeleteMessageAction
    | DecreaseUnreadMessageCountAction
    | GetMessageContentAction
    | GetUnreadMessageCountAction
    | IncreaseUnreadMessagePageAction
    | IncreaseReadMessagePageAction
    | MessageContentFailAction
    | MessageContentSuccessAction
    | MessageDeleteFailAction
    | MessageDeleteSuccessAction
    | MessageListFailAction
    | MessageListSuccessAction
    | ResetMessagePageAction
    | SetMessageReadTypeAtLocalAction
    | UnreadMessageCountFailAction
    | UnreadMessageCountSuccessAction
    | UpdateUnreadSelectedTypeAction
    | UpdateReadSelectedTypeAction
    | UpdateUnreadTimeOrderAction
    | UpdateReadTimeOrderAction;
