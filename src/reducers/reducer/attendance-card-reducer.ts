import { OrderFlag, BindingStateFlag, ConditionOption } from './../../interfaces/order-interface';
import { AttendanceCardAddOptions, AttendanceCardDeleteOptions, AttendanceCardUpdateOptions } from './../../interfaces/request-interface';
import { AttendanceCardListResponse, AttendanceCardAddResponse, AttendanceCardDeleteResponse, AttendanceCardUpdateResponse, AttendanceCard } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/attendance-card-action';

export interface State {
    queryResponse: AttendanceCardListResponse;
    addResponse: AttendanceCardAddResponse;
    deleteResponse: AttendanceCardDeleteResponse;
    updateResponse: AttendanceCardUpdateResponse;
    limit: number;
    page: number;
    addOptions: AttendanceCardAddOptions;
    deleteOptions: AttendanceCardDeleteOptions;
    updateOptions: AttendanceCardUpdateOptions;
    orderOptions: ConditionOption[];
    bindingStateOptions: ConditionOption[];
}

export const initialState: State = {
    queryResponse: {
        count: 0,
        attendance_cards: []
    },
    addResponse: null,
    deleteResponse: null,
    updateResponse: null,
    limit: 20,
    page: 1,
    addOptions: null,
    deleteOptions: null,
    updateOptions: null,
    orderOptions: [
        { text: 'HIGH_TO_LOW', selected: true, condition: OrderFlag.highToLow },
        { text: 'LOW_TO_HIGH', selected: false, condition: OrderFlag.lowToHigh }
    ],
    bindingStateOptions: [
        { text: 'ALL', selected: true, condition: BindingStateFlag.noneState },
        { text: 'BINDING', selected: false, condition: BindingStateFlag.binding },
        { text: 'UNBOUND', selected: false, condition: BindingStateFlag.unbind }
    ]
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.ATTENDANCE_CARD_LIST_FAIL:
        case actions.ATTENDANCE_CARD_LIST_SUCCESS:
            return Object.assign({}, state, { queryResponse: action.payload });

        case actions.ADD_ATTENDANCE_CARD:
            return Object.assign({}, state, { addOptions: action.payload });

        case actions.ADD_ATTENDANCE_CARD_FAIL:
            return Object.assign({}, state, { addResponse: action.payload });

        case actions.ADD_ATTENDANCE_CARD_SUCCESS: {
            const { ic_card_num, user_id, userName } = state.addOptions.attendance_card_form;

            const attendance_cards = [...state.queryResponse.attendance_cards, { id: action.payload.id, ic_card_num, user_id, user__employee__realname: userName }]; // user_id is an optional param, so it is may be 'undefined';

            const queryResponse = Object.assign({}, state.queryResponse, { attendance_cards });

            return Object.assign({}, state, { queryResponse });
        }

        case actions.UPDATE_ATTENDANCE_CARD:
            return Object.assign({}, state, { updateOptions: action.payload });

        case actions.UPDATE_ATTENDANCE_CARD_FAIL:
            return Object.assign({}, state, { updateResponse: action.payload });

        case actions.UPDATE_ATTENDANCE_CARD_SUCCESS: {
            const attendance_cards = state.queryResponse.attendance_cards.map(item => item.ic_card_num === state.updateOptions.ic_card_num ? updateCard(item, state.updateOptions) : item);

            return updateQueryList(state, attendance_cards);
        }

        case actions.DELETE_ATTENDANCE_CARD:
            return Object.assign({}, state, { deleteOptions: action.payload })

        case actions.DELETE_ATTENDANCE_CARD_FAIL:
            return Object.assign({}, state, { deleteResponse: action.payload });

        case actions.DELETE_ATTENDANCE_CARD_SUCCESS: {
            const attendance_cards = state.queryResponse.attendance_cards.filter(item => state.deleteOptions.attendance_card_id.indexOf(item.id) === -1);

            return updateQueryList(state, attendance_cards);
        }

        case actions.DELETE_ATTENDANCE_CARD:
            return Object.assign({}, state, { deleteOptions: action.payload });

        case actions.RESET_ATTENDANCE_CARD_PAGE:
            return Object.assign({}, state, { page: initialState.page });

        case actions.INCREMENT_ATTENDANCE_CARD_PAGE:
            return Object.assign({}, state, { page: state.page + 1 });

        case actions.UPDATE_ORDER_STATE:
            return Object.assign({}, state, { orderOptions: updateConditionState(state.orderOptions, action.payload) });

        case actions.UPDATE_BINDING_STATE:
            return Object.assign({}, state, { bindingStateOptions: updateConditionState(state.bindingStateOptions, action.payload) })

        case actions.GET_ATTENDANCE_CARD_LIST:
        default:
            return state;
    }
}

export function updateConditionState(source: ConditionOption[], target: ConditionOption): ConditionOption[] {
    return source.map(item => {
        item.selected = item.condition === target.condition;

        return item
    });
}

export function updateCard(card: AttendanceCard, option: AttendanceCardUpdateOptions): AttendanceCard {
    if (option.user_id) {
        return Object.assign({}, card, { user__employee__realname: option.userName, user_id: option.user_id });
    } else {
        return {
            ic_card_num: card.ic_card_num,
            user_id: NaN,
            id: card.id,
            user__employee__realname: '',
            company_id: NaN
        };
    }
}

export function updateQueryList(state: State, attendance_cards: AttendanceCard[]): State {
    const queryResponse = Object.assign({}, state.queryResponse, { attendance_cards });

    return Object.assign({}, state, { queryResponse });
}

export const getAttendanceCardListResponse = (state: State) => state.queryResponse;

export const getAttendanceCards = (state: State) => state.queryResponse.attendance_cards;

export const getAttendanceCardPage = (state: State) => state.page;

export const getAttendanceCardLimit = (state: State) => state.limit;

export const getAttendanceCardAddOptions = (state: State) => state.addOptions;

export const getAttendanceCardUpdateOptions = (state: State) => state.updateOptions;

export const getAttendanceCardAddResponse = (state: State) => state.addResponse;

export const getAttendanceCardDeleteResponse = (state: State) => state.deleteResponse;

export const getAttendanceCardUpdateResponse = (state: State) => state.updateResponse;

export const getOrderOptions = (state: State) => state.orderOptions;

export const getBindingStateOptions = (state: State) => state.bindingStateOptions;
