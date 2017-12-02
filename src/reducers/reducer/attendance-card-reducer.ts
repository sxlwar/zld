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
}

export const initialState: State = {
    queryResponse: null,
    addResponse: null,
    deleteResponse: null,
    updateResponse: null,
    limit: 20,
    page: 1,
    addOptions: null,
    deleteOptions: null,
    updateOptions: null
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
            const { ic_card_num, user_id } = state.addOptions.attendance_card_form;

            const attendance_cards = [...state.queryResponse.attendance_cards, { id: action.payload.id, ic_card_num, user_id }]; // user_id is an optional param, so it is may be 'undefined';

            const queryResponse = Object.assign({}, state.queryResponse, { attendance_cards });

            return Object.assign({}, state, { queryResponse });
        }

        case actions.UPDATE_ATTENDANCE_CARD:
            return Object.assign({}, state, { updateOptions: action.payload });

        case actions.UPDATE_ATTENDANCE_CARD_FAIL:
            return Object.assign({}, state, { updateResponse: action.payload });

        case actions.UPDATE_ATTENDANCE_CARD_SUCCESS: {
            if (!state.updateOptions.user_id) {
                const attendance_cards = state.queryResponse.attendance_cards.map(item => item.ic_card_num === state.updateOptions.ic_card_num ? updateCard(item) : item);

                const queryResponse = Object.assign({}, state.queryResponse, { attendance_cards });

                return Object.assign({}, state, { queryResponse, updateResponse: action.payload });

            }

            return Object.assign({}, state, { updateResponse: action.payload });
        }

        case actions.UPDATE_ATTENDANCE_CARD_AT_LOCAL: {
            const attendance_cards = state.queryResponse.attendance_cards.map(item => item.ic_card_num === state.updateOptions.ic_card_num ? updateCard(item, { ...action.payload, userId: state.updateOptions.user_id }) : item);

            const queryResponse = Object.assign({}, state.queryResponse, { attendance_cards });

            return Object.assign({}, state, { queryResponse });
        }


        case actions.DELETE_ATTENDANCE_CARD:
            return Object.assign({}, state, { deleteOptions: action.payload });

        case actions.DELETE_ATTENDANCE_CARD_FAIL:
            return Object.assign({}, state, { deleteResponse: action.payload });

        case actions.DELETE_ATTENDANCE_CARD_SUCCESS: {
            const attendance_cards = state.queryResponse.attendance_cards.filter(item => state.deleteOptions.attendance_card_id.indexOf(item.id) !== -1);

            const queryResponse = Object.assign({}, state.queryResponse, { attendance_cards });

            return Object.assign({}, state, { queryResponse });
        }

        case actions.DELETE_ATTENDANCE_CARD:
            return Object.assign({}, state, { deleteOptions: action.payload });

        case actions.RESET_ATTENDANCE_CARD_PAGE:
            return Object.assign({}, state, { page: initialState.page });

        case actions.INCREMENT_ATTENDANCE_CARD_PAGE:
            return Object.assign({}, state, { page: state.page + 1 });

        case actions.GET_ATTENDANCE_CARD_LIST:
        default:
            return state;
    }
}

export function updateCard(card: AttendanceCard, option?: { name: string; companyId: number, userId: number }): AttendanceCard {
    if (option) {
        return Object.assign({}, card, { user__employee__realname: option.name, company_id: option.companyId, user_id: option.userId });
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

export const getAttendanceCardListResponse = (state: State) => state.queryResponse;

export const getAttendanceCards = (state: State) => state.queryResponse.attendance_cards;

export const getAttendanceCardPage = (state: State) => state.page;

export const getAttendanceCardLimit = (state: State) => state.limit;

export const getAttendanceCardUpdateOptions = (state: State) => state.updateOptions;

export const getAttendanceCardAddResponse = (state: State) => state.addResponse;

export const getAttendanceCardDeleteResponse = (state: State) => state.deleteResponse;

export const getAttendanceCardUpdateResponse = (state: State) => state.updateResponse;
