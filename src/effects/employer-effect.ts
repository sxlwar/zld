import { GET_COMPANY_USER, GetCompanyUserListAction, CompanyUserListSuccessAction, CompanyUserListFailAction } from './../actions/action/employer-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from './../services/api/websocket-service';
import { Command } from './../services/api/command';
import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class EmployerEffect extends Command {

    @Effect()
    companyUserList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_COMPANY_USER)
        .switchMap((action: GetCompanyUserListAction) => this.ws
            .send(this.getCompanyUserList(action.payload))
            .takeUntil(this.actions$.ofType(GET_COMPANY_USER))
            .map(msg => msg.isError ? new CompanyUserListFailAction(msg.data) : new CompanyUserListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        public ws: WebsocketService,
        public actions$: Actions
    ) {
        super();
    }
}