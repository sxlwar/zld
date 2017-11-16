//region
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
    payBill: Observable<ResponseAction> = this.actions$
        .ofType(GET_PAY_BILL_LIST)
        .switchMap((action: RequestAction) => this.ws
            .send(this.getPayBillList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PAY_BILL_LIST))
            .map(msg => msg.isError ? new PayBillListFailAction(msg.data) : new PayBillListSuccessAction(msg.data))
            .catch(error => of(error))
        )
    constructor(
        public ws: WebsocketService,
        public actions$: Actions
    ) {
        super();
    }
}
