import { WsRequest } from './../interfaces/request-interface';
import { ResponseAction } from './../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { GET_NATIONALITY, GetNationalityAction, NationalityFailAction, NationalitySuccessAction } from './../actions/action/nationality-action';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from './../services/api/websocket-service';
import { Command } from './../services/api/command';
import { Injectable } from '@angular/core';

@Injectable()
export class NationalityEffect extends Command {
    @Effect()
    nationality$: Observable<ResponseAction> = this.actions$
        .ofType(GET_NATIONALITY)
        .switchMap((action: GetNationalityAction) => this.ws
            .send(this.nationalityList() as WsRequest)
            .takeUntil(this.actions$.ofType(GET_NATIONALITY))
            .map(msg => msg.isError ? new NationalityFailAction(msg.data) : new NationalitySuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        public ws: WebsocketService,
        public actions$: Actions
    ) {
        super();
    }
}