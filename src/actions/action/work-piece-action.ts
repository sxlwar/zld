import { Action } from '@ngrx/store';
import { WorkPieceListOptions } from '../../interfaces/request-interface';
import { WorkPieceListResponse } from '../../interfaces/response-interface';

export const GET_WORK_PIECE = 'GET_WORK_PIECE';

export class GetWorkPieceListAction implements Action {
    readonly type = GET_WORK_PIECE;

    constructor(public payload: WorkPieceListOptions) { }
}

export const WORK_PIECE_LIST_FAIL = 'WORK_PIECE_LIST_FAIL';

export class WorkPieceListFailAction implements Action {
    readonly type = WORK_PIECE_LIST_FAIL;

    constructor(public payload: WorkPieceListResponse) { }
}

export const WORK_PIECE_LIST_SUCCESS = 'WORK_PIECE_LIST_SUCCESS';

export class WorkPieceListSuccessAction implements Action {
    readonly type = WORK_PIECE_LIST_SUCCESS;

    constructor(public payload: WorkPieceListResponse) { }
}

export type Actions = GetWorkPieceListAction
    | WorkPieceListFailAction
    | WorkPieceListSuccessAction;