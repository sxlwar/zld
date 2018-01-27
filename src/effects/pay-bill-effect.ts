import { GET_PROJECT_BILL_LIST, ProjectPayBillListFailAction, ProjectPayBillListSuccessAction, GET_PROJECT_PROCESS_LIST, ProjectPayProcessListFailAction, ProjectPayProcessListSuccessAction, GetPayBillListAction, GetProjectPayBillListAction, GetProjectPayProcessListAction } from './../actions/action/pay-bill-action';
import { Injectable } from '@angular/core';
import { Command } from '../services/api/command'
import { Effect, Actions } from '@ngrx/effects';
import { WebsocketService } from '../services/api/websocket-service';
import { Observable } from 'rxjs/Observable';
import { ResponseAction } from '../interfaces/response-interface';
import { GET_PAY_BILL_LIST, PayBillListFailAction, PayBillListSuccessAction } from '../actions/action/pay-bill-action';

@Injectable()
export class PayBillEffect extends Command {
    @Effect()
    payBill$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PAY_BILL_LIST)
        .switchMap((action: GetPayBillListAction) => this.ws
            .send(this.getPayBillList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PAY_BILL_LIST))
            .map(msg => msg.isError ? new PayBillListFailAction(msg.data) : new PayBillListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    projectPayBill$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PROJECT_BILL_LIST)
        .switchMap((action: GetProjectPayBillListAction) => this.ws
            .send(this.getProjectPayBillList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PROJECT_BILL_LIST))
            .map(msg => msg.isError ? new ProjectPayBillListFailAction(msg.data) : new ProjectPayBillListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    projectProcess$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PROJECT_PROCESS_LIST)
        .switchMap((action: GetProjectPayProcessListAction) => this.ws
            .send(this.getProjectPayProcessList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PROJECT_PROCESS_LIST))
            .map(msg => msg.isError ? new ProjectPayProcessListFailAction(msg.data) : new ProjectPayProcessListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions
    ) {
        super();
    }
}
