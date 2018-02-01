import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    CompanyUserListFailAction,
    CompanyUserListSuccessAction,
    GET_COMPANY_USER,
    GetCompanyUserListAction,
} from './../actions/action/employer-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Command } from './../services/api/command';
import { WebsocketService } from './../services/api/websocket-service';

@Injectable()
export class EmployerEffect extends Command {

    @Effect()
    companyUserList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_COMPANY_USER)
        .switchMap((action: GetCompanyUserListAction) => this.ws
            .send(this.getCompanyUserList(action.payload))
            .takeUntil(this.actions$.ofType(GET_COMPANY_USER))
            .map(msg => msg.isError
                ? new CompanyUserListFailAction(msg.data)
                : new CompanyUserListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions
    ) {
        super();
    }
}
