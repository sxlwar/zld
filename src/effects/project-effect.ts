import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    GET_PROJECT_LIST,
    GetProjectListAction,
    ProjectListFailAction,
    ProjectListSuccessAction,
} from '../actions/action/project-action';
import { ResponseAction } from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';

@Injectable()
export class ProjectEffect extends Command {
    @Effect()
    projectList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PROJECT_LIST)
        .switchMap((action: GetProjectListAction) => this.ws
            .send(this.getProjectList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PROJECT_LIST))
            .map(msg => msg.isError
                ? new ProjectListFailAction(msg.data)
                : new ProjectListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private actions$: Actions,
        private ws: WebsocketService
    ) {
        super();
    }
}
