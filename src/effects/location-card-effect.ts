import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { GetLocationCardListAction } from '../actions/action/location-card-action';
import {
    ADD_LOCATION_CARD,
    AddLocationCardAction,
    AddLocationCardFailAction,
    AddLocationCardSuccessAction,
    DELETE_LOCATION_CARD,
    DeleteLocationCardAction,
    DeleteLocationCardFailAction,
    DeleteLocationCardSuccessAction,
    GET_LOCATION_CARD_LIST,
    LocationCardListFailAction,
    LocationCardListSuccessAction,
    UPDATE_LOCATION_CARD,
    UpdateLocationCardAction,
    UpdateLocationCardFailAction,
    UpdateLocationCardSuccessAction,
} from './../actions/action/location-card-action';
import { ResponseAction } from './../interfaces/response-interface';
import { Command } from './../services/api/command';
import { WebsocketService } from './../services/api/websocket-service';
import { TipService } from './../services/tip-service';

@Injectable()
export class LocationCardEffect extends Command {
    @Effect()
    cardList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_LOCATION_CARD_LIST)
        .switchMap((action: GetLocationCardListAction) => this.ws
            .send(this.getLocationCardList(action.payload))
            .takeUntil(this.actions$.ofType(GET_LOCATION_CARD_LIST))
            .map(msg => msg.isError 
                ? new LocationCardListFailAction(msg.data) 
                : new LocationCardListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    addCard$: Observable<ResponseAction> = this.actions$
        .ofType(ADD_LOCATION_CARD)
        .switchMap((action: AddLocationCardAction) => this.ws
            .send(this.getLocationCardAdd(action.payload))
            .takeUntil(this.actions$.ofType(ADD_LOCATION_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError 
                ? new AddLocationCardFailAction(msg.data) 
                : new AddLocationCardSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    updateCard$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_LOCATION_CARD)
        .switchMap((action: UpdateLocationCardAction) => this.ws
            .send(this.getLocationCardUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_LOCATION_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError 
                ? new UpdateLocationCardFailAction(msg.data) 
                : new UpdateLocationCardSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    delete$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_LOCATION_CARD)
        .switchMap((action: DeleteLocationCardAction) => this.ws
            .send(this.getLocationCardDelete(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_LOCATION_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError 
                ? new DeleteLocationCardFailAction(msg.data) 
                : new DeleteLocationCardSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private ws: WebsocketService,
        private actions$: Actions,
        private tip: TipService
    ) {
        super()
    }
}
