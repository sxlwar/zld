//region
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {WebsocketService} from '../serveices/api/websocket-service';
import {Command} from '../serveices/api/command';
import {ResponseAction} from '../interfaces/response-interface';
import {Observable} from 'rxjs/Observable';
import {
  GET_PROJECT_LIST,
  GetProjectListAction,
  ProjectListFailAction,
  ProjectListSuccessAction
} from '../actions/action/project-action';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/map';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
//endregion

@Injectable()
export class ProjectEffect extends Command {
  @Effect()
  projectList$: Observable<ResponseAction> = this.actions$
    .ofType(GET_PROJECT_LIST)
    .switchMap((action: GetProjectListAction) => this.ws
      .send(this.getProjectList(action.payload))
      .takeUntil(this.actions$.ofType(GET_PROJECT_LIST))
      .map(msg => msg.isError ? new ProjectListFailAction(msg.data) : new ProjectListSuccessAction(msg.data))
      .catch(error => of(error))
    );

  constructor(public actions$: Actions,
              public ws: WebsocketService) {
    super();
  }
}
