import * as actions from '../../actions/action/work-piece-action';
import { WorkPieceListResponse } from '../../interfaces/response-interface';

export interface State {
    response: WorkPieceListResponse
}

export const initialState: State = {
    response: {
        work_piece_pay: [],
        work_piece_finish_flow: [],
    },
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.WORK_PIECE_LIST_SUCCESS:
            return { response: action.payload };

        case actions.WORK_PIECE_LIST_FAIL:
            return { response: action.payload };

        case actions.GET_WORK_PIECE:
        default:
            return state;
    }
}

export const getPieceResponse = (state: State) => state.response;

export const getPieces = (state: State) => state.response.work_piece_pay;

export const getPieceFinishFlow = (state: State) => state.response.work_piece_finish_flow;
