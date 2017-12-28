//region
import { WorkFlowAggregation } from './../../interfaces/response-interface';
import { ProcessorService } from './../api/processor-service';
import { UserService } from './user-service';
import { Store } from '@ngrx/store';
import { AppState, selectWorkFlowStatisticsResponse, selectWorkFlowStatistics } from './../../reducers/index-reducer';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from "@angular/core";
import { ErrorService } from '../../services/errors/error-service';
import { Observable } from 'rxjs/Observable';
//endregion

@Injectable()
export class WorkFlowService {
    subscriptions: Subscription[] =[];
    workFlow$$: Subscription;

    constructor(
        public store: Store<AppState>,
        public userInfo: UserService,
        public error: ErrorService,
        public processor: ProcessorService
    ){
        this.handleError();
    }

    getWorkFlowStatistics(): Observable<WorkFlowAggregation[]> {
        const result = this.store.select(selectWorkFlowStatistics);

        const subscription = result.take(1).subscribe(value => !value.length && this.getWorkFlowStatistic());
        
        this.subscriptions.push(subscription);

        return result; 
    }

    getWorkFlowStatistic(): void {
        const subscription = this.processor.workFlowStatisticsProcessor(this.userInfo.getSid().map(sid => ({sid})));

        this.subscriptions.push(subscription);
    }

    /* =====================================================Refuse clean======================================================== */

    private handleError() {
        this.handleStatisticsError();
    }

    private handleStatisticsError() {
        const error = this.store.select(selectWorkFlowStatisticsResponse);

        this.workFlow$$ = this.error.handleErrorInSpecific(error, 'APP_ERROR');
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}