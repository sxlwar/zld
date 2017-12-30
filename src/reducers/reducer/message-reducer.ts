import { MessageDeleteOptions, MessageListOptions, MessageReadTag } from './../../interfaces/request-interface';
import { MessageListResponse, UnreadMessageCountResponse, MessageContentResponse, MessageDeleteResponse, Message } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/message-action';

export interface State {
    messageListResponse: MessageListResponse;
    unreadMessageCountResponse: UnreadMessageCountResponse;
    messageContentResponse: MessageContentResponse;
    messageDeleteResponse: MessageDeleteResponse;
    messageDeleteOptions: MessageDeleteOptions;
    unreadPage: number;
    readPage: number;
    limit: number;
    readCount: number;
    messageListOption: MessageListOptions;
    unreadMessages: Message[];
    readMessages: Message[];
    unreadMessageTimeOrder: number;
    readMessageTimeOrder: number;
    unreadMessageSelectedType: number;
    readMessageSelectedType: number;
}

export const initialState: State = {
    messageContentResponse: null,
    messageListResponse: null,
    messageDeleteResponse: null,
    unreadMessageCountResponse: null,
    messageDeleteOptions: null,
    unreadPage: 1,
    readPage: 1,
    limit: 10,
    messageListOption: null,
    unreadMessages: null,
    readMessages: null,
    readCount: NaN,
    unreadMessageTimeOrder: 1,
    readMessageTimeOrder: 1,
    unreadMessageSelectedType: 0,
    readMessageSelectedType: 0
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.GET_MESSAGE_LIST:
            return { ...state, messageListOption: action.payload };

        case actions.MESSAGE_LIST_FAIL_ACTION:
            return { ...state, messageListResponse: action.payload };

        case actions.MESSAGE_LIST_SUCCESS_ACTION: {
            if (state.messageListOption.read_tag === MessageReadTag.read) {
                return {
                    ...state,
                    messageListResponse: action.payload,
                    readCount: action.payload.count,
                    readMessages: state.readMessages ? state.readMessages.concat(action.payload.msgs) : action.payload.msgs,
                };
            }

            if (state.messageListOption.read_tag === MessageReadTag.unread) {
                return { ...state, messageListResponse: action.payload, unreadMessages: state.unreadMessages ? state.unreadMessages.concat(action.payload.msgs) : action.payload.msgs };
            }

            return { ...state, messageListResponse: action.payload };
        }

        case actions.MESSAGE_CONTENT_FAIL:
        case actions.MESSAGE_CONTENT_SUCCESS:
            return { ...state, messageContentResponse: action.payload };

        case actions.DELETE_MESSAGE:
            return { ...state, messageDeleteOptions: action.payload };

        case actions.MESSAGE_DELETE_FAIL:
            return { ...state, messageDeleteResponse: action.payload };

        case actions.MESSAGE_DELETE_SUCCESS:
            return {
                ...state,
                messageDeleteResponse: action.payload,
                messageListResponse: { msgs: state.messageListResponse.msgs.filter(item => state.messageDeleteOptions.title_ids.indexOf(item.id) === -1), count: state.messageListResponse.count - state.messageDeleteOptions.title_ids.length },
                unreadMessageCountResponse: { count: calculateUnreadMessageCount(state.unreadMessageCountResponse.count, state.unreadMessages, state.messageDeleteOptions.title_ids) },
                unreadMessages: state.unreadMessages.filter(item => state.messageDeleteOptions.title_ids.indexOf(item.id) === -1),
                readMessages: state.readMessages.filter(item => state.messageDeleteOptions.title_ids.indexOf(item.id) === -1)
            };

        case actions.UNREAD_MESSAGE_COUNT_FAIL:
        case actions.UNREAD_MESSAGE_COUNT_SUCCESS:
            return { ...state, unreadMessageCountResponse: action.payload };

        case actions.DECREASE_UNREAD_MESSAGE_COUNT:
            return { ...state, unreadMessageCountResponse: { count: state.unreadMessageCountResponse.count - 1 } };

        case actions.INCREASE_UNREAD_MESSAGE_PAGE:
            return { ...state, unreadPage: state.unreadPage + 1 };

        case actions.INCREASE_READ_MESSAGE_PAGE:
            return { ...state, readPage: state.readPage + 1 };

        case actions.RESET_MESSAGE_PAGE:
            return { ...state, unreadPage: 1, readPage: 1 };

        case actions.UPDATE_UNREAD_TIME_ORDER:
            return { ...state, unreadMessageTimeOrder: action.payload };

        case actions.UPDATE_READ_TIME_ORDER:
            return { ...state, readMessageTimeOrder: action.payload };

        case actions.UPDATE_UNREAD_SELECTED_TYPE:
            return { ...state, unreadMessageSelectedType: action.payload };

        case actions.UPDATE_READ_SELECTED_TYPE:
            return { ...state, readMessageSelectedType: action.payload };

        case actions.SET_MESSAGE_READ_TYPE_AT_LOCAL:
            return { ...state, readMessages: state.readMessages.concat([findMessage(state.unreadMessages, action.payload)]), unreadMessages: state.unreadMessages.filter(item => item.id !== action.payload) };

        case actions.GET_UNREAD_MESSAGE_COUNT:
        case actions.GET_MESSAGE_CONTENT:
        default:
            return state;
    }
}

function calculateUnreadMessageCount(count: number, unreadMsgs: Message[], deleteIds: number[]): number {
    const deleteCount = deleteIds.reduce((acc, deletedId) => {
        const target = unreadMsgs.find(item => item.id === deletedId);

        if (target) {
            return acc + 1;
        } else {
            return acc;
        }
    }, 0);

    return count - deleteCount;
}

function findMessage(messages: Message[], id: number): Message {
    const target = messages.find(item => item.id === id);

    target.is_read = true;

    return target;
}

export const getMessages = (state: State) => state.messageListResponse;

export const getUnreadMessageCount = (state: State) => state.unreadMessageCountResponse;

export const getMessageDelete = (state: State) => state.messageDeleteResponse;

export const getMessageContent = (state: State) => state.messageContentResponse;

export const getUnreadMessagePage = (state: State) => state.unreadPage;

export const getReadMessagePage = (state: State) => state.readPage;

export const getMessageLimit = (state: State) => state.limit;

export const getReadMessages = (state: State) => state.readMessages;

export const getUnreadMessages = (state: State) => state.unreadMessages;

export const getReadCount = (state: State) => state.readCount;

export const getUnreadSelectedType = (state: State) => state.unreadMessageSelectedType;

export const getReadSelectedType = (state: State) => state.readMessageSelectedType;

export const getUnreadTimeOrder = (state: State) => state.unreadMessageTimeOrder;

export const getReadTimeOrder = (state: State) => state.readMessageTimeOrder;
