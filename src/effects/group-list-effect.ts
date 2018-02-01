import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    GET_GROUP_LIST,
    GetGroupListAction,
    GroupListFailAction,
    GroupListSuccessAction,
} from './../actions/action/group-list-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Command } from './../services/api/command';
import { WebsocketService } from './../services/api/websocket-service';

@Injectable()
export class GroupsListEffect extends Command {

    @Effect()
    groupsList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_GROUP_LIST)
        .switchMap((action: GetGroupListAction) => this.ws
            .send(this.getGroupsList(action.payload))
            .takeUntil(this.actions$.ofType(GET_GROUP_LIST))
            .map(msg => msg.isError
                ? new GroupListFailAction(msg.data)
                : new GroupListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions
    ) {
        super();
    }
}
