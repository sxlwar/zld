//region
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from '../serveices/api/websocket-service';
import { AppState } from '../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { Command } from '../serveices/api/command';
import { Observable } from 'rxjs/Observable';
import { ResponseAction } from '../interfaces/response-interface';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import { GET_TEAM_LIST, GetTeamListAction, TeamListFailAction, TeamListSuccessAction } from '../actions/action/team-actions';
//endregion

@Injectable()
export class TeamEffect extends Command {
  @Effect()
  teamList$: Observable<ResponseAction> = this.actions$
    .ofType(GET_TEAM_LIST)
    .mergeMap((action: GetTeamListAction) => this.ws
      .send(this.getTeamList(action.payload))
      .takeUntil(this.actions$.ofType(GET_TEAM_LIST))
      .map(msg => msg.isError ? new TeamListFailAction(msg.data) : new TeamListSuccessAction(msg.data))
      .catch(error => of(error))
    );

  constructor(public ws: WebsocketService,
    public store: Store<AppState>,
    public actions$: Actions) {
    super();
  }
}
