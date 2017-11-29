//region
import { Injectable } from '@angular/core';
import { GET_BASIC_INFORMATION, GetBasicInformationAction, BasicInfoListFailAction, BasicInfoListSuccessAction } from './../actions/action/personal-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { WebsocketService } from './../services/api/websocket-service';
import { Effect, Actions } from '@ngrx/effects';
import { Command } from './../services/api/command';
import { of } from 'rxjs/observable/of';
//endregion

@Injectable()
export class PersonalEffect extends Command {
    @Effect()
    basicInfo$: Observable<ResponseAction> = this.actions$
        .ofType(GET_BASIC_INFORMATION)
        .switchMap((action: GetBasicInformationAction) => this.ws
            .send(this.getBasicInfoList(action.payload))
            .takeUntil(this.actions$.ofType(GET_BASIC_INFORMATION))
            .map(msg => msg.isError ? new BasicInfoListFailAction(msg.data) : new BasicInfoListSuccessAction(msg.data))
            .catch(error => of(error))
        )

    constructor(
        public ws: WebsocketService,
        public actions$: Actions
    ) {
        super();
    }
}