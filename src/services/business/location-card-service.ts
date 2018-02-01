import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { orderBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { LocationCardUpdateOptions, RequestOption } from '../../interfaces/request-interface';
import { AddLocationCardFormModel } from '../../services/api/mapper-service';
import {
    ResetLocationCardOperateResponseAction,
    SetSelectedTeamAction,
    UpdateBindingStateAction,
    UpdateDeviceStateAction,
    UpdateOrderStateAction,
    UpdateTeamStateAction,
} from './../../actions/action/location-card-action';
import { BindingStateFlag, ConditionOption, DeviceStateFlag, OrderFlag } from './../../interfaces/order-interface';
import { LocationCardDeleteOptions } from './../../interfaces/request-interface';
import {
    DeviceStatus,
    LocationCard,
    LocationCardAddResponse,
    LocationCardDeleteResponse,
    LocationCardListResponse,
    LocationCardUpdateResponse,
} from './../../interfaces/response-interface';
import {
    AppState,
    selectLocationCardAddResponse,
    selectLocationCardBindingOptions,
    selectLocationCardCount,
    selectLocationCardDeleteResponse,
    selectLocationCardDeviceOptions,
    selectLocationCardListResponse,
    selectLocationCardOrderOptions,
    selectLocationCardTeamStateOptions,
    selectLocationCardUpdateResponse,
} from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { ProjectService } from './project-service';
import { UserService } from './user-service';

export interface ExecFn<T> {
    (T): T
}

export interface ConditionFn<T> {
    (arg: T, condition: number): T
}

export interface CurryFn<T, U> {
    (fn: ConditionFn<T>, condition: U): ExecFn<T>
}

export interface PipeFn<T, U> {
    (source: T, ...fns: U[]): T
}

@Injectable()
export class LocationCardService {
    constructor(
        private store: Store<AppState>,
        private project: ProjectService,
        private processor: ProcessorService,
        private error: ErrorService,
        private userInfo: UserService
    ) { }

    /* ==============================================API request operate================================================ */

    getLocationCardList(option: Observable<RequestOption>): Subscription {
        return this.processor.locationCardListProcessor(
            option.withLatestFrom(
                this.project.getProjectId(),
                this.userInfo.getSid(),
                (option, project_id, sid) => ({ sid, project_id, ...option })
            )
        );
    }

    addLocationCard(option: Observable<AddLocationCardFormModel>): Subscription {
        return this.processor.locationCardAddProcessor(
            option.map(form => this.processor.addLocationCardForm(form))
                .withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
                )
        );
    }

    updateLocationCard(option: Observable<RequestOption>): Subscription {
        return this.processor.locationCardUpdateProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ sid, ...option }) as LocationCardUpdateOptions
            )
        );
    }

    deleteLocationCard(option: Observable<RequestOption>): Subscription {
        return this.processor.locationCardDeleteProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ sid, ...option }) as LocationCardDeleteOptions
            )
        );
    }

    /* =====================================================Data acquisition============================================= */

    getLocationCardListResponse(): Observable<LocationCardListResponse> {
        return this.store.select(selectLocationCardListResponse).filter(value => !!value);
    }

    getLocationCards(): Observable<LocationCard[]> {
        return this.getLocationCardListResponse().map(res => res.location_cards);
    }

    getLocationCardCount(): Observable<number> {
        return this.store.select(selectLocationCardCount);
    }

    getLocationCardsByCondition(): Observable<LocationCard[]> {
        const condition = this.getBindingStateOptions()
            .map(options => options.find(item => item.selected).condition)
            .combineLatest(
            this.getOrderOptions().map(options => options.find(item => item.selected).condition),
            this.getDeviceStateOptions().map(options => options.find(item => item.selected).condition)
            );

        const curry: CurryFn<LocationCard[], number> = (fun, secondArg) => firstArg => fun(firstArg, secondArg);

        const pipe: PipeFn<LocationCard[], ExecFn<LocationCard[]>> = (source, ...functions) => functions.reduce((memo, fun) => fun(memo), source);

        return this.getLocationCards()
            .combineLatest(condition)
            .map(([cards, [bindingState, order, deviceState]]) => pipe(
                cards,
                curry(this.sortCards, order),
                curry(this.filterCardByBindingState, bindingState),
                curry(this.filterCardByDeviceState, deviceState))
            );
    }

    getOrderOptions(): Observable<ConditionOption[]> {
        return this.store.select(selectLocationCardOrderOptions);
    }

    getBindingStateOptions(): Observable<ConditionOption[]> {
        return this.store.select(selectLocationCardBindingOptions);
    }

    getDeviceStateOptions(): Observable<ConditionOption[]> {
        return this.store.select(selectLocationCardDeviceOptions);
    }

    getTeamStateOptions(): Observable<ConditionOption[]> {
        return this.store.select(selectLocationCardTeamStateOptions);
    }

    getSelectedTeam(): Observable<ConditionOption> {
        return this.store.select(selectLocationCardTeamStateOptions)
            .mergeMap(source => Observable.from(source)
                .find(item => item.selected)
            );
    }

    getAddLocationCardResponse(): Observable<LocationCardAddResponse> {
        return this.store.select(selectLocationCardAddResponse).filter(value => !!value);
    }

    getUpdateLocationCardResponse(): Observable<LocationCardUpdateResponse> {
        return this.store.select(selectLocationCardUpdateResponse).filter(value => !!value);
    }

    getDeleteLocationCardResponse(): Observable<LocationCardDeleteResponse> {
        return this.store.select(selectLocationCardDeleteResponse).filter(value => !!value);
    }

    /* ============================================================Local State update============================================= */

    updateOrderState(option: ConditionOption): void {
        this.store.dispatch(new UpdateOrderStateAction(option));
    }

    updateBindingState(option: ConditionOption): void {
        this.store.dispatch(new UpdateBindingStateAction(option));
    }

    updateDeviceState(option: ConditionOption): void {
        this.store.dispatch(new UpdateDeviceStateAction(option));
    }

    updateSelectedTeam(option: ConditionOption) {
        this.store.dispatch(new SetSelectedTeamAction(option));
    }

    updateTeamStateOptions(source: ConditionOption[]): void {
        this.store.dispatch(new UpdateTeamStateAction(source));
    }

    resetOperateResponse(operate: string): void {
        this.store.dispatch(new ResetLocationCardOperateResponseAction(operate));
    }

    /* =====================================================Condition functions======================================================= */

    private sortCards(source: LocationCard[], condition: number): LocationCard[] {
        switch (condition) {
            case OrderFlag.highToLow:
                return orderBy(source, ['dev_id'], ['desc']);

            case OrderFlag.lowToHigh:
                return orderBy(source, ['dev_id'], ['asc']);

            case OrderFlag.noneOrder:
            default:
                return source;
        }
    }

    private filterCardByBindingState(source: LocationCard[], condition: number): LocationCard[] {
        switch (condition) {
            case BindingStateFlag.binding:
                return source.filter(item => !!item.user_id);

            case BindingStateFlag.unbind:
                return source.filter(item => !item.user_id);

            case BindingStateFlag.noneState:
            default:
                return source;
        }
    }

    private filterCardByDeviceState(source: LocationCard[], condition: number): LocationCard[] {
        switch (condition) {
            case DeviceStateFlag.online:
                return source.filter(item => item.status === DeviceStatus.online);

            case DeviceStateFlag.offline:
                return source.filter(item => item.status === DeviceStatus.offline);

            case DeviceStateFlag.noneState:
            default:
                return source;
        }
    }

    /* ==================================================Error handlers=================================================== */

    handleQueryError(): Subscription {
        return this.error.handleApiRequestError(this.getLocationCardListResponse());
    }

    handleAddError(): Subscription {
        return this.error.handleApiRequestError(this.getAddLocationCardResponse());
    }

    handleUpdateError(): Subscription {
        return this.error.handleApiRequestError(this.getUpdateLocationCardResponse());
    }

    handleDeleteError(): Subscription {
        return this.error.handleApiRequestError(this.getDeleteLocationCardResponse());
    }
}
