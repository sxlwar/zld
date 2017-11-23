//region
import { GET_PAY_PROCESS_LIST, PayProcessListFailAction, PayProcessListSuccessAction, GET_PROJECT_BILL_LIST, ProjectPayBillListFailAction, ProjectPayBillListSuccessAction, GET_PROJECT_PROCESS_LIST, ProjectPayProcessListFailAction, ProjectPayProcessListSuccessAction } from './../actions/action/pay-bill-action';
import { Injectable } from '@angular/core';
import { Command } from '../services/api/command'
import { Effect, Actions } from '@ngrx/effects';
import { WebsocketService } from '../services/api/websocket-service';
import { Observable } from 'rxjs/Observable';
import { ResponseAction } from '../interfaces/response-interface';
import { GET_PAY_BILL_LIST, PayBillListFailAction, PayBillListSuccessAction } from '../actions/action/pay-bill-action';
import { RequestAction } from '../interfaces/request-interface';
import { of } from 'rxjs/observable/of';
//endregion

@Injectable()
export class PayBillEffect extends Command {
    @Effect()
    payBill$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PAY_BILL_LIST)
        .switchMap((action: RequestAction) => this.ws
            .send(this.getPayBillList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PAY_BILL_LIST))
            .map(msg => msg.isError ? new PayBillListFailAction(msg.data) : new PayBillListSuccessAction(msg.data))
            .catch(error => of(error))
        )
    
    @Effect()
    payProcess$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PAY_PROCESS_LIST)
        .switchMap((action: RequestAction) => this.ws
            .send(this.getPayProcessList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PAY_PROCESS_LIST))
            .map(msg => msg.isError ? new PayProcessListFailAction(msg.data) : new PayProcessListSuccessAction(msg.data))
            .catch(error => of(error))
    )

    @Effect()
    projectPayBill$: Observable<RequestAction> = this.actions$
        .ofType(GET_PROJECT_BILL_LIST)
        .switchMap((action: RequestAction) => this.ws
            .send(this.getProjectPayBillList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PROJECT_BILL_LIST))
            .map(msg => msg.isError ? new ProjectPayBillListFailAction(msg.data): new ProjectPayBillListSuccessAction(msg.data))
            .catch(error => of(error))
    )

    @Effect()
    projectProcess$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PROJECT_PROCESS_LIST)
        .switchMap((action: RequestAction) => this.ws
            .send(this.getProjectPayProcessList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PROJECT_PROCESS_LIST))
            .map(msg => msg.isError ? new ProjectPayProcessListFailAction(msg.data): new ProjectPayProcessListSuccessAction(msg.data))
            .catch(error => of(error))
    )

    constructor(
        public ws: WebsocketService,
        public actions$: Actions
    ) {
        super();
    }
}
