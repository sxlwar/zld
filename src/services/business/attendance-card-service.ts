import { WorkerService } from './worker-service';
import { orderBy } from 'lodash';
import { ConditionOption, BindingStateFlag, OrderFlag } from './../../interfaces/order-interface';
import { UpdateOrderStateAction, UpdateBindingStateAction } from './../../actions/action/attendance-card-action';
import { AddAttendanceCardFormModel } from './../api/mapper-service';
import { RequestOption, AttendanceCardUpdateOptions } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { AttendanceCardListResponse, AttendanceCard } from './../../interfaces/response-interface';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';
import { ProjectService } from './project-service';
import { AppState, selectAttendanceCardResponse, selectAttendanceCardAddResponse, selectAttendanceCardDeleteResponse, selectAttendanceCardUpdateResponse, selectAttendanceCards, selectAttendanceCardBindingOptions, selectAttendanceCardOrderOptions } from './../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';

@Injectable()
export class AttendanceCardService {

    constructor(
        public store: Store<AppState>,
        public project: ProjectService,
        public userInfo: UserService,
        public error: ErrorService,
        public worker: WorkerService,
        public processor: ProcessorService
    ) {
    }

    /* =============================================================Data acquisition================================================================ */

    getCardListResponse(): Observable<AttendanceCardListResponse> {
        return this.store.select(selectAttendanceCardResponse);
    }

    getCards(): Observable<AttendanceCard[]> {
        return this.store.select(selectAttendanceCards);
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
                (option, sid) => ({ ...option, sid })
            ) as Observable<AttendanceCardUpdateOptions>
        );
    }

    /* ============================================================Local state change methods================================================== */

    updateOrderConditionState(option: ConditionOption): void {
        this.store.dispatch(new UpdateOrderStateAction(option));
    }

    updateBindConditionState(option: ConditionOption): void {
        this.store.dispatch(new UpdateBindingStateAction(option));
    }

    /* =============================================================Error handle================================================================ */

    handleError(): Subscription[] {
        return [this.handleAddError(), this.handleDeleteError(), this.handleQueryError(), this.handleUpdateError()];
    }

    handleQueryError(): Subscription {
        return this.error.handleErrorInSpecific(this.getCardListResponse(), 'API_ERROR');
    }

    handleAddError(): Subscription {
        const error = this.store.select(selectAttendanceCardAddResponse);

        return this.error.handleErrorInSpecific(error, 'API_ERROR');
    }

    handleDeleteError(): Subscription {
        const error = this.store.select(selectAttendanceCardDeleteResponse);

        return this.error.handleErrorInSpecific(error, 'API_ERROR');
    }

    handleUpdateError(): Subscription {
        const error = this.store.select(selectAttendanceCardUpdateResponse);

        return this.error.handleErrorInSpecific(error, 'API_ERROR');
    }
}