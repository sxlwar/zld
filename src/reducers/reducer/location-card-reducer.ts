import { ConditionOption, OrderFlag, BindingStateFlag, DeviceStateFlag } from './../../interfaces/order-interface';
import { LocationCardAddOptions, LocationCardDeleteOptions, LocationCardUpdateOptions } from './../../interfaces/request-interface';
import { LocationCardListResponse, LocationCardAddResponse, LocationCardDeleteResponse, LocationCardUpdateResponse, LocationCard } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/location-card-action';

export interface State {
    limit: number;
    page: number;
    cardResponse: LocationCardListResponse;
    addResponse: LocationCardAddResponse;
    deleteResponse: LocationCardDeleteResponse;
    updateResponse: LocationCardUpdateResponse;
    addOptions: LocationCardAddOptions;
    deleteOptions: LocationCardDeleteOptions;
    updateOptions: LocationCardUpdateOptions;
    orderOptions: ConditionOption[];
    bindingStateOptions: ConditionOption[];
    deviceStateOptions: ConditionOption[];
    teamStateOptions: ConditionOption[];
}

export const initialState: State = {
    limit: 20,
    page: 1,
    cardResponse: {
        count: 0,
        location_cards: []
    },
    addResponse: null,
    updateResponse: null,
    deleteResponse: null,
    addOptions: null,
    updateOptions: null,
    deleteOptions: null,
    orderOptions: [
        { text: 'HIGH_TO_LOW', selected: true, condition: OrderFlag.highToLow },
        { text: 'LOW_TO_HIGH', selected: false, condition: OrderFlag.lowToHigh }
    ],
    bindingStateOptions: [
        { text: 'ALL', selected: true, condition: BindingStateFlag.noneState },
        { text: 'BINDING', selected: false, condition: BindingStateFlag.binding },
        { text: 'UNBOUND', selected: false, condition: BindingStateFlag.unbind }
    ],
    deviceStateOptions: [
        { text: 'ALL', selected: true, condition: DeviceStateFlag.noneState },
        { text: 'ONLINE', selected: false, condition: DeviceStateFlag.online },
        { text: 'OFFLINE', selected: false, condition: DeviceStateFlag.offline },
    ],
    teamStateOptions: []
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.LOCATION_CARD_LIST_FAIL:
            return Object.assign({}, state, { cardResponse: action.payload });

        case actions.LOCATION_CARD_LIST_SUCCESS:
            return Object.assign({}, state, { cardResponse: action.payload });

        case actions.ADD_LOCATION_CARD:
            return Object.assign({}, state, { addOptions: action.payload });

        case actions.ADD_LOCATION_CARD_FAIL:
            return Object.assign({}, state, { addResponse: action.payload });

        case actions.ADD_LOCATION_CARD_SUCCESS: {
            const location_cards = addCard(state.cardResponse.location_cards, action.payload.id, state.addOptions);

            const cardResponse = { location_cards, count: state.cardResponse.count + 1 };

            return Object.assign({}, state, { cardResponse, addResponse: action.payload });
        }

        case actions.UPDATE_LOCATION_CARD:
            return Object.assign({}, state, { updateOptions: action.payload });

        case actions.UPDATE_LOCATION_CARD_FAIL:
            return Object.assign({}, state, { updateResponse: action.payload });

        case actions.UPDATE_LOCATION_CARD_SUCCESS: {
            const location_cards = updateCard(state.cardResponse.location_cards, state.updateOptions);

            const cardResponse = Object.assign({}, state.cardResponse, { location_cards });

            return Object.assign({}, state, { cardResponse, updateResponse: action.payload });
        }

        case actions.DELETE_LOCATION_CARD:
            return Object.assign({}, state, { deleteOptions: action.payload });

        case actions.DELETE_LOCATION_CARD_FAIL:
            return Object.assign({}, state, { deleteResponse: action.payload });

        case actions.DELETE_LOCATION_CARD_SUCCESS: {
            const location_cards = state.cardResponse.location_cards.filter(item => item.id !== state.deleteOptions.location_card_id);

            const cardResponse = Object.assign({}, state.cardResponse, { location_cards });

            return Object.assign({}, state, { cardResponse, deleteResponse: action.payload });
        }

        case actions.UPDATE_ORDER_STATE:
            return Object.assign({}, state, { orderOptions: updateConditionState(state.orderOptions, action.payload) });

        case actions.UPDATE_BINDING_STATE:
            return Object.assign({}, state, { bindingStateOptions: updateConditionState(state.bindingStateOptions, action.payload) });

        case actions.UPDATE_DEVICE_STATE:
            return Object.assign({}, state, { deviceStateOptions: updateConditionState(state.deviceStateOptions, action.payload) });

        case actions.UPDATE_TEAM_STATE:
            return Object.assign({}, state, { teamStateOptions: action.payload });

        case actions.SET_SELECTED_TEAM:
            return Object.assign({}, state, { teamStateOptions: updateConditionState(state.teamStateOptions, action.payload) });

        case actions.GET_LOCATION_CARD_LIST:
        default:
            return state;
    }
}

/**
 * @description The status field is added in front end, so user mast refresh data manually if want to get the latest information.
 */
export function addCard(source: LocationCard[], id: number, options: LocationCardAddOptions): LocationCard[] {
    let newCard = { id, dev_id: options.dev_id, isLocalAdd: true, status: 0 };

    if (options.user_id) {
        newCard = Object.assign(newCard, { user__employee__realname: options.userName });
    } else {
    }

    return [...source, newCard] as LocationCard[];
}

export function updateCard(source: LocationCard[], options: LocationCardUpdateOptions): LocationCard[] {
    if (options.user_id) {
        const { user_id, dev_id } = options;

        return source.map(item => item.dev_id === options.dev_id ? Object.assign(item, { user_id, dev_id, user__employee__realname: options.userName }) : item)
    } else {
        return source.map(item => item.dev_id === options.dev_id ? Object.assign(item, { dev_id: options.dev_id, user_id: '', user__employee__realname: '' }) : item);
    }
}

export function updateConditionState(source: ConditionOption[], target: ConditionOption): ConditionOption[] {
    return source.map(item => {
        item.selected = item.condition === target.condition;

        return item;
    });
}

export const getCardListResponse = (state: State) => state.cardResponse;

export const getCards = (state: State) => state.cardResponse.location_cards;

export const getCardCount = (state: State) => state.cardResponse.count;

export const getCardAddResponse = (state: State) => state.addResponse;

export const getCardUpdateResponse = (state: State) => state.updateResponse;

export const getCardDeleteResponse = (state: State) => state.deleteResponse;

export const getAddOptions = (state: State) => state.addOptions;

export const getUpdateOptions = (state: State) => state.updateOptions;

export const getDeleteOptions = (state: State) => state.deleteOptions;

export const getOrderOptions = (state: State) => state.orderOptions;

export const getBindingStateOptions = (state: State) => state.bindingStateOptions;

export const getDeviceStateOptions = (state: State) => state.deviceStateOptions;

export const getTeamStateOptions = (state: State) => state.teamStateOptions;
