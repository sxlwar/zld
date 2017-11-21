import { GET_WORK_FLOW_STATISTICS, GetWorkFlowStatisticsAction, WorkFlowStatisticsFailAction, WorkFlowStatisticsSuccessAction } from './../actions/action/statistics-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { AppState } from './../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { WebsocketService } from './../services/api/websocket-service';
import { Command } from './../services/api/command';
import { Injectable } from "@angular/core";
import { of } from 'rxjs/Observable/of';


@Injectable()
export class WorkFlowEffect extends Command {

    @Effect()
    workFlowStatistics$: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORK_FLOW_STATISTICS)
        .switchMap((action: GetWorkFlowStatisticsAction) => this.ws
            .send(this.getWorkFlowStatistics(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORK_FLOW_STATISTICS))
            .map(msg => msg.isError ? new WorkFlowStatisticsFailAction(msg.data) : new WorkFlowStatisticsSuccessAction(msg.data))
            .catch(error => of(error))
        )

    constructor(
        public ws: WebsocketService,
        public store: Store<AppState>,
        public actions$: Actions
    ) {
        super();
    }
}