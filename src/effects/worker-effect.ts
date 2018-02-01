import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    GET_WORKER_CONTRACTS,
    GetWorkerContractsAction,
    WorkerContractListFailAction,
    WorkerContractListSuccessAction,
} from '../actions/action/worker-action';
import {
    ResponseAction,
    TeamMembersRealTimeStatisticsResponse,
    WorkTypeRealTimeStatisticsResponse,
} from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';
import {
    GET_TEAM_MEMBERS_REAL_TIME_STATISTICS,
    GET_WORK_TYPE_REAL_TIME_STATISTICS,
    GetTeamMembersRealTimeStatisticsAction,
    GetWorkTypeRealTimeStatisticsAction,
    TeamMembersRealTimeStatisticsFailAction,
    TeamMembersRealTimeStatisticsSuccessAction,
    WorkTypeRealTimeStatisticsFailAction,
    WorkTypeRealTimeStatisticsSuccessAction,
} from './../actions/action/statistics-action';
import {
    EDIT_WORKER_CONTRACT,
    EditWorkerContractAction,
    EditWorkerContractFailAction,
    EditWorkerContractSuccessAction,
} from './../actions/action/worker-action';
import { RealTimeStatisticsResponse } from './../interfaces/response-interface';
import { TipService } from './../services/tip-service';

@Injectable()
export class WorkerEffect extends Command {
    @Effect()
    workerContracts$: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORKER_CONTRACTS)
        .switchMap((action: GetWorkerContractsAction) => this.ws
            .send(this.getWorkerContractList(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORKER_CONTRACTS))
            .map(msg => msg.isError
                ? new WorkerContractListFailAction(msg.data)
                : new WorkerContractListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    workerContractEdit$: Observable<ResponseAction> = this.actions$
        .ofType(EDIT_WORKER_CONTRACT)
        .switchMap((action: EditWorkerContractAction) => this.ws
            .send(this.getWorkerContractEdit(action.payload))
            .takeUntil(this.actions$.ofType(EDIT_WORKER_CONTRACT))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new EditWorkerContractFailAction(msg.data)
                : new EditWorkerContractSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    workTypeRealTimeStatistics$: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORK_TYPE_REAL_TIME_STATISTICS)
        .switchMap((action: GetWorkTypeRealTimeStatisticsAction) => this.ws
            .send(this.getRealTimeStatistics(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORK_TYPE_REAL_TIME_STATISTICS))
            .filter(msg => this.predicateStatisticsType(<WorkTypeRealTimeStatisticsResponse>msg.data, 'worktype_id'))
            .map(msg => msg.isError
                ? new WorkTypeRealTimeStatisticsFailAction(msg.data)
                : new WorkTypeRealTimeStatisticsSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    teamMembersRealTimeStatistics$: Observable<ResponseAction> = this.actions$
        .ofType(GET_TEAM_MEMBERS_REAL_TIME_STATISTICS)
        .switchMap((action: GetTeamMembersRealTimeStatisticsAction) => this.ws
            .send(this.getRealTimeStatistics(action.payload))
            .takeUntil(this.actions$.ofType(GET_TEAM_MEMBERS_REAL_TIME_STATISTICS))
            .filter(msg => this.predicateStatisticsType(<TeamMembersRealTimeStatisticsResponse>msg.data, 'team_id'))
            .map(msg => msg.isError
                ? new TeamMembersRealTimeStatisticsFailAction(msg.data)
                : new TeamMembersRealTimeStatisticsSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private tip: TipService,
        private actions$: Actions
    ) {
        super();
    }

    private predicateStatisticsType<T>(res: RealTimeStatisticsResponse<T>, key: string): boolean {
        const { actual, total } = res;

        return actual.some(item => item[key]) || total.some(item => item[key]);
    }
}
