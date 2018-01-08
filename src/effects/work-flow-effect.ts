import { TipService } from './../services/tip-service';
import { GET_WORK_FLOW_LIST, GetWorkFlowListAction, WorkFlowListFailAction, WorkFlowListSuccessAction, GET_PROJECT_PAY_BILL_FLOW_LIST, GetProjectPayBillFlowListAction, ProjectPayBillFlowListFailAction, ProjectPayBillFlowListSuccessAction, UPDATE_MULTI_TASK, UpdateMultiTaskAction, UpdateMultiTaskFailAction, UpdateMultiTaskSuccessAction, UPDATE_TASK, UpdateTaskAction, UpdateTaskFailAction, UpdateTaskSuccessAction } from './../actions/action/work-flow-action';
import { GET_WORK_FLOW_STATISTICS, GetWorkFlowStatisticsAction, WorkFlowStatisticsFailAction, WorkFlowStatisticsSuccessAction } from './../actions/action/statistics-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { WebsocketService } from './../services/api/websocket-service';
import { Command } from './../services/api/command';
import { Injectable } from "@angular/core";

@Injectable()
export class WorkFlowEffect extends Command {

    @Effect()
    workFlowStatistics$: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORK_FLOW_STATISTICS)
        .switchMap((action: GetWorkFlowStatisticsAction) => this.ws
            .send(this.getWorkFlowStatistics(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORK_FLOW_STATISTICS))
            .map(msg => msg.isError ? new WorkFlowStatisticsFailAction(msg.data) : new WorkFlowStatisticsSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    workFlowList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORK_FLOW_LIST)
        .switchMap((action: GetWorkFlowListAction) => this.ws
            .send(this.getWorkFlowList(action.payload))
            .takeUntil(this.actions$.ofType(GET_WORK_FLOW_LIST))
            .map(msg => msg.isError ? new WorkFlowListFailAction(msg.data) : new WorkFlowListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    projectPayBillFlowList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PROJECT_PAY_BILL_FLOW_LIST)
        .switchMap((action: GetProjectPayBillFlowListAction) => this.ws
            .send(this.getProjectPayBillFlowList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PROJECT_PAY_BILL_FLOW_LIST))
            .map(msg => msg.isError ? new ProjectPayBillFlowListFailAction(msg.data) : new ProjectPayBillFlowListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    multiTaskUpdate$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_MULTI_TASK)
        .switchMap((action: UpdateMultiTaskAction) => this.ws
            .send(this.getMultiTaskUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_MULTI_TASK))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new UpdateMultiTaskFailAction(msg.data) : new UpdateMultiTaskSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    taskUpdate$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_TASK)
        .switchMap((action: UpdateTaskAction) => this.ws
            .send(this.getTaskUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_TASK))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new UpdateTaskFailAction(msg.data) : new UpdateTaskSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        public ws: WebsocketService,
        public actions$: Actions,
        public tip: TipService
    ) {
        super();
    }
}
