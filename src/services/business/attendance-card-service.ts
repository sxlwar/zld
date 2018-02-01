import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { orderBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    ResetAttendanceCardOperateResponseAction,
    UpdateBindingStateAction,
    UpdateOrderStateAction,
} from './../../actions/action/attendance-card-action';
import { BindingStateFlag, ConditionOption, OrderFlag } from './../../interfaces/order-interface';
import { AttendanceCardUpdateOptions, RequestOption } from './../../interfaces/request-interface';
import {
    AttendanceCard,
    AttendanceCardAddResponse,
    AttendanceCardDeleteResponse,
    AttendanceCardListResponse,
    AttendanceCardUpdateResponse,
} from './../../interfaces/response-interface';
import {
    AppState,
    selectAttendanceCardAddResponse,
    selectAttendanceCardBindingOptions,
    selectAttendanceCardDeleteResponse,
    selectAttendanceCardOrderOptions,
    selectAttendanceCardResponse,
    selectAttendanceCardUpdateResponse,
} from './../../reducers/index-reducer';
import { AddAttendanceCardFormModel } from './../api/mapper-service';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';

@Injectable()
export class AttendanceCardService {

    constructor(
        private store: Store<AppState>,
        private userInfo: UserService,
        private error: ErrorService,
        private processor: ProcessorService
    ) {
    }

    /* =============================================================Data acquisition================================================================ */

    getCardListResponse(): Observable<AttendanceCardListResponse> {
        return this.store.select(selectAttendanceCardResponse).filter(value => !!value);
    }

    getCards(): Observable<AttendanceCard[]> {
        return this.getCardListResponse().map(res => res.attendance_cards);
    }

    getCardsByConditions(): Observable<AttendanceCard[]> {
        return this.getCards()
            .combineLatest(
            this.getBindingStateOptions().map(options => options.find(item => item.selected).condition),
            this.getOrderOptions().map(options => options.find(item => item.selected).condition)
            )
            .map(([cards, bindCondition, orderCondition]) => {
                let result = [...cards];
                if (bindCondition === BindingStateFlag.binding) result = cards.filter(item => item.user_id);
                if (bindCondition === BindingStateFlag.unbind) result = cards.filter(item => !item.user_id);
                if (orderCondition === OrderFlag.lowToHigh) result = orderBy(result, ['ic_card_num'], ['asc']);
                if (orderCondition === OrderFlag.highToLow) result = orderBy(result, ['ic_card_num'], ['desc']);
                return result;
            });
    }

    getBindingStateOptions(): Observable<ConditionOption[]> {
        return this.store.select(selectAttendanceCardBindingOptions);
    }

    getOrderOptions(): Observable<ConditionOption[]> {
        return this.store.select(selectAttendanceCardOrderOptions);
    }

    getAddAttendanceCardResponse(): Observable<AttendanceCardAddResponse> {
        return this.store.select(selectAttendanceCardAddResponse).filter(value => !!value);
    }

    getDeleteAttendanceCardResponse(): Observable<AttendanceCardDeleteResponse> {
        return this.store.select(selectAttendanceCardDeleteResponse).filter(value => !!value);
    }

    getUpdateAttendanceCardResponse(): Observable<AttendanceCardUpdateResponse> {
        return this.store.select(selectAttendanceCardUpdateResponse).filter(value => !!value);
    }

    /* ===================================================================API request============================================================= */

    getAttendanceCardList(): Subscription {
        return this.processor.attendanceCardListProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    addAttendanceCard(form: Observable<AddAttendanceCardFormModel>): Subscription {
        return this.processor.attendanceCardAddProcessor(
            form.map(form => this.processor.addAttendanceCardForm(form))
                .withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
                )
        );
    }

    deleteAttendanceCard(ids: Observable<number[]>): Subscription {
        return this.processor.attendanceCardDeleteProcessor(
            ids.withLatestFrom(
                this.userInfo.getSid(),
                (attendance_card_id, sid) => ({ attendance_card_id, sid })
            )
        );
    }

    updateAttendanceCard(option: Observable<RequestOption>): Subscription {
        return this.processor.attendanceCardUpdateProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid }) as AttendanceCardUpdateOptions
            )
        );
    }

    /* ============================================================Local state update================================================== */

    updateOrderConditionState(option: ConditionOption): void {
        this.store.dispatch(new UpdateOrderStateAction(option));
    }

    updateBindConditionState(option: ConditionOption): void {
        this.store.dispatch(new UpdateBindingStateAction(option));
    }

    resetAttendanceCardOperateResponse(operate: string): void {
        this.store.dispatch(new ResetAttendanceCardOperateResponseAction(operate));
    }

    /* =============================================================Error handle================================================================ */

    handleError(): Subscription[] {
        return [this.handleAddError(), this.handleDeleteError(), this.handleQueryError(), this.handleUpdateError()];
    }

    handleQueryError(): Subscription {
        return this.error.handleErrorInSpecific(this.getCardListResponse(), 'API_ERROR');
    }

    handleAddError(): Subscription {
        return this.error.handleErrorInSpecific(this.getAddAttendanceCardResponse(), 'API_ERROR');
    }

    handleDeleteError(): Subscription {
        return this.error.handleErrorInSpecific(this.getDeleteAttendanceCardResponse(), 'API_ERROR');
    }

    handleUpdateError(): Subscription {
        return this.error.handleErrorInSpecific(this.getUpdateAttendanceCardResponse(), 'API_ERROR');
    }
}
