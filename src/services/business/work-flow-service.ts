import { WorkFlowAggregation } from './../../interfaces/response-interface';
import { ProcessorService } from './../api/processor-service';
import { UserService } from './user-service';
import { Store } from '@ngrx/store';
import { AppState, selectWorkFlowStatisticsResponse, selectWorkFlowStatistics } from './../../reducers/index-reducer';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from "@angular/core";
import { ErrorService } from '../../services/errors/error-service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkFlowService {
    constructor(
        public store: Store<AppState>,
        public userInfo: UserService,
        public error: ErrorService,
        public processor: ProcessorService
    ) {
    }

    getWorkFlowStatistics(): Observable<WorkFlowAggregation[]> {
        return this.store.select(selectWorkFlowStatistics);
    }

    getWorkFlowStatistic(): Subscription {
        return this.processor.workFlowStatisticsProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    /* =====================================================Refuse clean======================================================== */

    handleError(): Subscription[] {
        return [
            this.handleStatisticsError()
        ]
    }

    handleStatisticsError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectWorkFlowStatisticsResponse), 'APP_ERROR');
    }
}