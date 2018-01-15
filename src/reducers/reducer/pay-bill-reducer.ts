import { ProjectPayBillListResponse, ProjectPayProcessListResponse } from './../../interfaces/response-interface';
import { PayBillListResponse, PayProcessListResponse } from '../../interfaces/response-interface';
import * as actions from '../../actions/action/pay-bill-action';

export interface UIStatus {
    selectedStatus: string;
}
export interface State {
    payBillResponse: PayBillListResponse;
    payProcessResponse: PayProcessListResponse;
    projectPayBillResponse: ProjectPayBillListResponse;
    projectPayProcessUI: UIStatus;
    projectPayProcessResponse: ProjectPayProcessListResponse;
}

export const initialState: State = {
    payBillResponse: {
        pay_bill: [],
        count: 0
    },
    payProcessResponse: {
        pay_process: [],
        count: 0
    },
    projectPayBillResponse: {
        project_pay_bill: []
    },
    projectPayProcessUI: {
        selectedStatus: 'grantIn'
    },
    projectPayProcessResponse: {
        project_pay_process: [],
        count: 0
    }

}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.PAY_BILL_LIST_FAIL:
            return Object.assign({}, state, { payBillResponse: action.payload });

        case actions.PAY_BILL_LIST_SUCCESS:
            return Object.assign({}, state, { payBillResponse: action.payload });

        case actions.PAY_PROCESS_LIST_FAIL:
            return Object.assign({}, state, { payProcessResponse: action.payload });

        case actions.PAY_PROCESS_LIST_SUCCESS:
            return Object.assign({}, state, { payProcessResponse: action.payload });

        case actions.PROJECT_PAY_BILL_LIST_FAIL:
            return Object.assign({}, state, { projectPayBillResponse: action.payload });

        case actions.PROJECT_PAY_BILL_LIST_SUCCESS:
            return Object.assign({}, state, { projectPayBillResponse: action.payload });

        case actions.PROJECT_PAY_PROCESS_LIST_FAIL:
            return Object.assign({}, state, { projectPayProcessResponse: action.payload });

        case actions.PROJECT_PAY_PROCESS_LIST_SUCCESS:
            return Object.assign({}, state, { projectPayProcessResponse: action.payload });

        case actions.SELECT_PROJECT_PAY_PROCESS_STATUS: {
            const projectPayProcessUI = Object.assign({}, state.projectPayProcessUI, { selectedStatus: action.payload });

            return Object.assign({}, state, { projectPayProcessUI });
        }

        case actions.GET_PROJECT_PROCESS_LIST:
        case actions.GET_PAY_BILL_LIST:
        case actions.GET_PROJECT_BILL_LIST:
        case actions.GET_PAY_PROCESS_LIST:
        default:
            return state;
    }
}

export const getPayBillResponse = (state: State) => state.payBillResponse;

export const getPayBillCount = (state: State) => state.payBillResponse.count;

export const getPayBillList = (state: State) => state.payBillResponse.pay_bill;

export const getPayProcessResponse = (state: State) => state.payProcessResponse;

export const getPayProcessCount = (state: State) => state.payProcessResponse.count;

export const getPayProcessList = (state: State) => state.payProcessResponse.pay_process;

export const getProjectBillResponse = (state: State) => state.projectPayBillResponse;

export const getProjectBillList = (state: State) => state.projectPayBillResponse.project_pay_bill;

export const getProjectProcessResponse = (state: State) => state.projectPayProcessResponse;

export const getProjectProcessCount = (state: State) => state.projectPayProcessResponse.count;

export const getProjectProcessList = (state: State) => state.projectPayProcessResponse.project_pay_process;

export const getSelectedProjectPayProcessStatus = (state: State) => state.projectPayProcessUI.selectedStatus;