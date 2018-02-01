import { omit } from 'lodash';

import * as actions from '../../actions/action/bank-card-action';
import {
    SetBankNoMasterOptions,
    WorkerBankNoAddOptions,
    WorkerBankNoDeleteOptions,
} from './../../interfaces/request-interface';
import {
    BankInfoResponse,
    SetBankNOMasterResponse,
    WorkerBankNoAddResponse,
    WorkerBankNoDeleteResponse,
    WorkerBankNoListResponse,
} from './../../interfaces/response-interface';

export interface State {
    bankcardResponse: WorkerBankNoListResponse;
    bankInformationResponse: BankInfoResponse;
    bankcardAddOptions: WorkerBankNoAddOptions;
    bankcardDeleteOptions: WorkerBankNoDeleteOptions;
    bankcardAddResponse: WorkerBankNoAddResponse;
    bankcardDeleteResponse: WorkerBankNoDeleteResponse;
    setMasterCardOptions: SetBankNoMasterOptions;
    setMasterCardResponse: SetBankNOMasterResponse;
}

export const initialState: State = {
    bankcardAddOptions: null,
    bankcardDeleteOptions: null,
    bankcardResponse: null,
    bankInformationResponse: null,
    bankcardAddResponse: null,
    bankcardDeleteResponse: null,
    setMasterCardResponse: null,
    setMasterCardOptions: null,
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.BANK_CARD_LIST_FAIL:
        case actions.BANK_CARD_LIST_SUCCESS:
            return { ...state, bankcardResponse: action.payload };

        case actions.BANK_INFORMATION_FAIL:
        case actions.BANK_INFORMATION_SUCCESS:
            return { ...state, bankInformationResponse: action.payload };

        case actions.ADD_BANK_CARD:
            return { ...state, bankcardAddOptions: action.payload };

        case actions.ADD_BANK_CARD_FAIL:
            return { ...state, bankcardAddResponse: action.payload };

        case actions.ADD_BANK_CARD_SUCCESS:
            return {
                ...state,
                bankcardAddResponse: action.payload,
                bankcardResponse: {
                    person_bank_no: [...state.bankcardResponse.person_bank_no, omit(state.bankcardAddOptions, ['sid'])],
                },
            }; //TODO: 添加成功以后需要再去查一下卡的信息；

        case actions.DELETE_BANK_CARD:
            return { ...state, bankcardDeleteOptions: action.payload };

        case actions.BANK_CARD_DELETE_FAIL:
            return { ...state, bankcardDeleteResponse: action.payload };

        case actions.BANK_CARD_DELETE_SUCCESS:
            return {
                ...state,
                bankcardDeleteResponse: action.payload,
                bankcardResponse: {
                    person_bank_no: state.bankcardResponse.person_bank_no.filter(item => item.id !== state.bankcardDeleteOptions.card_id),
                },
            };

        case actions.SET_MASTER_BANK_CARD:
            return { ...state, setMasterCardOptions: action.payload };

        case actions.SET_MASTER_BANK_CARD_FAIL:
            return { ...state, setMasterCardResponse: action.payload };

        case actions.SET_MASTER_BANK_CARD_SUCCESS:
            return {
                ...state,
                setMasterCardResponse: action.payload,
                bankcardResponse: {
                    person_bank_no: state.bankcardResponse.person_bank_no.map(item => item.id === state.setMasterCardOptions.bankno_id
                        ? { ...item, ismaster: state.setMasterCardOptions.flag === 2 }
                        : item
                    ),
                },
            };

        case actions.RESET_ADD_BANK_CARD_RESPONSE:
            return { ...state, bankcardAddResponse: null };

        case actions.RESET_DELETE_BANK_CARD_RESPONSE:
            return { ...state, bankcardDeleteResponse: null };

        case actions.RESET_BANK_CARD_INFORMATION:
            return { ...state, bankInformationResponse: null };

        case actions.GET_BANK_CARD_LIST:
        case actions.GET_BANK_INFORMATION:
        default:
            return state;
    }
}

export const getBankcardListResponse = (state: State) => state.bankcardResponse;

export const getBankInfoResponse = (state: State) => state.bankInformationResponse;

export const getBankcardAddResponse = (state: State) => state.bankcardAddResponse;

export const getBankcardDeleteResponse = (state: State) => state.bankcardDeleteResponse;

export const getSetMasterResponse = (state: State) => state.setMasterCardResponse;
