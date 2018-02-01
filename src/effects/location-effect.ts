import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
    GET_HISTORY_LOCATION,
    GET_PROJECT_AREA,
    GetHistoryLocationListAction,
    GetProjectAreaListAction,
    HistoryLocationListFailAction,
    HistoryLocationListSuccessAction,
    ProjectAreaListFailAction,
    ProjectAreaListSuccessAction,
} from './../actions/action/location-action';
import { Area, ResponseAction } from './../interfaces/response-interface';
import { Command } from './../services/api/command';
import { WebsocketService } from './../services/api/websocket-service';

@Injectable()
export class LocationEffect extends Command {
    @Effect()
    historyLocationList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_HISTORY_LOCATION)
        .switchMap((action: GetHistoryLocationListAction) => this.ws
            .send(this.getHistoryLocationList(action.payload))
            .takeUntil(this.actions$.ofType(GET_HISTORY_LOCATION))
            .map(msg => msg.isError
                ? new HistoryLocationListFailAction(msg.data)
                : new HistoryLocationListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    projectAreaList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_PROJECT_AREA)
        .switchMap((action: GetProjectAreaListAction) => this.ws
            .send(this.getProjectAreaList(action.payload))
            .takeUntil(this.actions$.ofType(GET_PROJECT_AREA))
            .map(msg => {
                if (msg.isError) return new ProjectAreaListFailAction(msg.data);

                const { project_areas } = msg.data;

                const areas: Area[] = project_areas.map((item: Area) => {
                    const { id, name, project_id, bigpolygons, polygons, wgspolygons } = item;

                    return {
                        id,
                        name,
                        project_id,
                        bigpolygons: bigpolygons && JSON.parse(bigpolygons as string),
                        polygons: polygons && JSON.parse(polygons as string),
                        wgspolygons: wgspolygons && JSON.parse(wgspolygons as string),
                    };
                });

                return new ProjectAreaListSuccessAction({ project_areas: areas });
            })
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions
    ) {
        super();
    }
}
