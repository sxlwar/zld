import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { GET_WORK_TYPE_LIST, WorkTypeListFailAction, WorkTypeListSuccessAction } from '../actions/action/craft-action';
import { ResponseAction } from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';
import { GetCertificateListAction } from './../actions/action/work-certificate-action';

@Injectable()
export class CraftEffect extends Command {
    @Effect()
    workType$: Observable<ResponseAction> = this.actions$
        .ofType(GET_WORK_TYPE_LIST)
        .switchMap((action: GetCertificateListAction) => this.ws
            .send(this.getWorkTypeList())
            .takeUntil(this.actions$.ofType(GET_WORK_TYPE_LIST))
            .map(msg => msg.isError
                ? new WorkTypeListFailAction(msg.data)
                : new WorkTypeListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions
    ) {
        super();
    }
}
