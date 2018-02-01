import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { GET_TEAM_LIST, GetTeamListAction, TeamListFailAction, TeamListSuccessAction } from '../actions/action/team-action';
import { ResponseAction } from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';
import {
    ADD_TEAM,
    AddTeamAction,
    AddTeamFailAction,
    AddTeamSuccessAction,
    DELETE_TEAM,
    DeleteTeamAction,
    DeleteTeamFailAction,
    DeleteTeamSuccessAction,
    UPDATE_TEAM,
    UpdateTeamAction,
    UpdateTeamFailAction,
    UpdateTeamSuccessAction,
} from './../actions/action/team-action';
import { TipService } from './../services/tip-service';

@Injectable()
export class TeamEffect extends Command {
    @Effect()
    teamList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_TEAM_LIST)
        .mergeMap((action: GetTeamListAction) => this.ws
            .send(this.getTeamList(action.payload))
            .takeUntil(this.actions$.ofType(GET_TEAM_LIST))
            .map(msg => msg.isError
                ? new TeamListFailAction(msg.data)
                : new TeamListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    addTeam$: Observable<ResponseAction> = this.actions$
        .ofType(ADD_TEAM)
        .switchMap((action: AddTeamAction) => this.ws
            .send(this.getTeamAdd(action.payload))
            .takeUntil(this.actions$.ofType(ADD_TEAM))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new AddTeamFailAction(msg.data)
                : new AddTeamSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        )

    @Effect()
    updateTeam$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_TEAM)
        .switchMap((action: UpdateTeamAction) => this.ws
            .send(this.getTeamUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_TEAM))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new UpdateTeamFailAction(msg.data)
                : new UpdateTeamSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        )

    @Effect()
    deleteTeam$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_TEAM)
        .switchMap((action: DeleteTeamAction) => this.ws
            .send(this.getTeamDelete(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_TEAM))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new DeleteTeamFailAction(msg.data)
                : new DeleteTeamSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        )

    constructor(
        private ws: WebsocketService,
        private actions$: Actions,
        private tip: TipService
    ) {
        super();
    }
}
