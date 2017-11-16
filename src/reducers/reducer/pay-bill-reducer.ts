import { PayBillListResponse } from '../../interfaces/response-interface';
import * as actions from '../../actions/action/pay-bill-action';

export interface State {
    response: PayBillListResponse
}

export const initialState: State = {
    response: {
        pay_bill: [],
        count: 0
    }
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.PAY_BILL_LIST_FAIL:
            return { response: action.payload };

        case actions.PAY_BILL_LIST_SUCCESS:
            return { response: action.payload };

        case actions.GET_PAY_BILL_LIST:
        default:
            return state;
    }
}

export const getPayBillListResponse = (state: State) => state.response;

export const getPayBillListCount = (state: State) => state.response.count;

export const getPayBillList = (state: State) => state.response.pay_bill;