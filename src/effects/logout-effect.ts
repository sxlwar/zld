import { LOGOUT, LogoutAction, LogoutFailAction, LogoutSuccessAction } from './../actions/action/logout-action';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from '../services/api/websocket-service';
import { Command } from '../services/api/command';
import 'rxjs/add/operator/filter';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/switchMap';
import { ResponseAction } from '../interfaces/response-interface';

@Injectable()
export class LogoutEffect extends Command {
    @Effect()
    login$: Observable<ResponseAction> = this.actions$
        .ofType(LOGOUT)
        .switchMap((action: LogoutAction) => this.ws
            .send(this.getLogout(action.payload))
            .takeUntil(this.actions$.ofType(LOGOUT))
            .map(msg => msg.isError ? new LogoutFailAction(msg.data) : new LogoutSuccessAction(msg.data))
            .catch((msg) => of(msg))
        );

    constructor(
        public actions$: Actions,
        public ws: WebsocketService,
    ) {
        super();
    }
}
