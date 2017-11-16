import { Action } from '@ngrx/store'
import { WorkOvertimeRecordListOptions } from '../../interfaces/request-interface';
import { WorkOvertimeRecordListResponse } from 'interfaces/response-interface';

/* ===========================================Overtime api operate======================================== */

export const GET_OVERTIME_RECORD = 'GET_OVERTIME_RECORD';

export class GetWorkOvertimeRecordAction implements Action {
    readonly type = GET_OVERTIME_RECORD;

    constructor(public payload: WorkOvertimeRecordListOptions) { }
}

export const OVERTIME_RECORD_FAIL = 'OVERTIME_RECORD_FAIL';

export class WorkOvertimeRecordListFailAction implements Action {
    readonly type = OVERTIME_RECORD_FAIL;

    constructor(public payload: WorkOvertimeRecordListResponse) { }
}

export const OVERTIME_RECORD_SUCCESS = 'OVERTIME_RECORD_SUCCESS';

export class WorkOvertimeRecordListSuccessAction implements Action {
    readonly type = OVERTIME_RECORD_SUCCESS;

    constructor(public payload: WorkOvertimeRecordListResponse) { }
}

/* ===========================================Overtime page operate======================================== */

export const INCREASE_OVERTIME_RECORD_PAGE = 'INCREASE_OVERTIME_RECORD_PAGE';

export class IncreaseOvertimeRecordPage implements Action {
    readonly type = INCREASE_OVERTIME_RECORD_PAGE;

    constructor(){}
}

export const RESET_OVERTIME_RECORD_PAGE = 'RESET_OVERTIME_RECORD_PAGE';

export class ResetOvertimeRecordPage implements Action {
    readonly type = RESET_OVERTIME_RECORD_PAGE;

    constructor(){}
}

export type Actions = GetWorkOvertimeRecordAction
    | WorkOvertimeRecordListSuccessAction
    | WorkOvertimeRecordListFailAction;