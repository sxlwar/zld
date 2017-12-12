import { UpdateOrderStateAction, UpdateBindingStateAction, UpdateDeviceStateAction, SetSelectedTeamAction, UpdateTeamStateAction } from './../../actions/action/location-card-action';
import { orderBy } from 'lodash';
import { ConditionOption, OrderFlag, BindingStateFlag, DeviceStateFlag } from './../../interfaces/order-interface';
import { LocationCardDeleteOptions } from './../../interfaces/request-interface';
import { RequestOption, LocationCardAddOptions, LocationCardUpdateOptions } from '../../interfaces/request-interface';
import { LocationCard, DeviceStatus } from './../../interfaces/response-interface';
import { Subscription } from 'rxjs/Subscription';
import { WorkerService } from './worker-service';
import { UserService } from './user-service';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { ProjectService } from './project-service';
import { Store } from '@ngrx/store';
import { AppState, selectLocationCardListResponse, selectLocationCardAddResponse, selectLocationCardUpdateResponse, selectLocationCardDeleteResponse, selectLocationCards, selectLocationCardCount, selectLocationCardOrderOptions, selectLocationCardBindingOptions, selectLocationCardDeviceOptions, selectLocationCardTeamStateOptions } from './../../reducers/index-reducer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
        public store: Store<AppState>,
        public project: ProjectService,
        public processor: ProcessorService,
        public error: ErrorService,
        public userInfo: UserService,
        public worker: WorkerService
    ) { }

    /* ==============================================API request operate================================================ */

    getLocationCardList(option: Observable<RequestOption>): Subscription {
        const sid = this.userInfo.getSid();

        const projectId = this.project.getProjectId();

        const options = sid.combineLatest(projectId, option, (sid, project_id, option) => ({ sid, project_id, ...option }));

        return this.processor.locationCardListProcessor(options);
    }

    addLocationCard(option: Observable<RequestOption>): Subscription {
        const sid = this.userInfo.getSid();

        const options = sid.zip(option, (sid, option) => ({ sid, ...option })) as Observable<LocationCardAddOptions>;

        return this.processor.locationCardAddProcessor(options);
    }

    updateLocationCard(option: Observable<RequestOption>): Subscription {
        const sid = this.userInfo.getSid();

        const options = sid.zip(option, (sid, option) => ({ sid, ...option })) as Observable<LocationCardUpdateOptions>;

        return this.processor.locationCardUpdateProcessor(options);
    }

    deleteLocationCard(option: Observable<RequestOption>): Subscription {
        const sid = this.userInfo.getSid();

        const options = sid.zip(option, (sid, option) => ({ sid, ...option })) as Observable<LocationCardDeleteOptions>;

        return this.processor.locationCardDeleteProcessor(options);
    }

    /* =====================================================Data acquisition============================================= */

    getLocationCards(): Observable<LocationCard[]> {
        return this.store.select(selectLocationCards);
    }

    getLocationCardCount(): Observable<number> {
        return this.store.select(selectLocationCardCount);
    }

    getLocationCardsByCondition(): Observable<LocationCard[]> {
        const condition = this.getBindingStateOptions().map(options => options.find(item => item.selected).condition)
            .combineLatest(
            this.getOrderOptions().map(options => options.find(item => item.selected).condition),
            this.getDeviceStateOptions().map(options => options.find(item => item.selected).condition)
            );

        const curry: CurryFn<LocationCard[], number> = (fun, secondArg) => (firstArg) => fun(firstArg, secondArg);

        const pipe: PipeFn<LocationCard[], ExecFn<LocationCard[]>> = (source, ...functions) => functions.reduce((memo, fun) => fun(memo), source);

        return this.getLocationCards()
            .combineLatest(condition)
            .map(([cards, [bindingState, order, deviceState]]) => pipe(cards, curry(this.sortCards, order), curry(this.filterCardByBindingState, bindingState), curry(this.filterCardByDeviceState, deviceState)));
    }

    /* ============================================================Update Condition state============================================= */

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

    /* ==================================================Shortcut methods=================================================== */

    getOrderOptions(): Observable<ConditionOption[]> {
        return this.store.select(selectLocationCardOrderOptions)
    }

    getBindingStateOptions(): Observable<ConditionOption[]> {
        return this.store.select(selectLocationCardBindingOptions)
    }

    getDeviceStateOptions(): Observable<ConditionOption[]> {
        return this.store.select(selectLocationCardDeviceOptions)
    }

    getTeamStateOptions(): Observable<ConditionOption[]> {
        return this.store.select(selectLocationCardTeamStateOptions);
    }
    
    updateTeamStateOptions(source: ConditionOption[]): void{
       this.store.dispatch(new UpdateTeamStateAction(source));
    }

    getSelectedTeam(): Observable<ConditionOption> {
        return this.store.select(selectLocationCardTeamStateOptions)
            .mergeMap(source => Observable.from(source).find(item => item.selected));
    }

    /* ==================================================Error handlers=================================================== */

    handleError(): Subscription[] {
        return [this.handleQueryError(), this.handleAddError(), this.handleUpdateError(), this.handleDeleteError()];
    }

    private handleQueryError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectLocationCardListResponse), 'API_ERROR');
    }

    private handleAddError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectLocationCardAddResponse), 'API_ERROR');
    }

    private handleUpdateError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectLocationCardUpdateResponse), 'API_ERROR');
    }

    private handleDeleteError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectLocationCardDeleteResponse), 'API_ERROR');
    }
}