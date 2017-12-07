import { TipService } from './../services/tip-service';
import { ResponseAction } from './../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { GET_LOCATION_CARD_LIST, LocationCardListFailAction, LocationCardListSuccessAction, ADD_LOCATION_CARD, AddLocationCardFailAction, AddLocationCardSuccessAction, AddLocationCardAction, UPDATE_LOCATION_CARD, UpdateLocationCardAction, UpdateLocationCardFailAction, UpdateLocationCardSuccessAction, DELETE_LOCATION_CARD, DeleteLocationCardAction, DeleteLocationCardFailAction, DeleteLocationCardSuccessAction } from './../actions/action/location-card-action';
import { Command } from './../services/api/command';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from './../services/api/websocket-service';
import { Injectable } from '@angular/core';
import { GetLocationCardListAction } from '../actions/action/location-card-action';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LocationCardEffect extends Command {
    @Effect()
    cardList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_LOCATION_CARD_LIST)
        .switchMap((action: GetLocationCardListAction) => this.ws
            .send(this.getLocationCardList(action.payload))
            .takeUntil(this.actions$.ofType(GET_LOCATION_CARD_LIST))
            .map(msg => msg.isError ? new LocationCardListFailAction(msg.data): new LocationCardListSuccessAction(msg.data))
            .catch(error => of(error))
    );

    @Effect()
    addCard$: Observable<ResponseAction> = this.actions$
        .ofType(ADD_LOCATION_CARD)
        .switchMap((action: AddLocationCardAction) => this.ws
            .send(this.getLocationCardAdd(action.payload))
            .takeUntil(this.actions$.ofType(ADD_LOCATION_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ?new AddLocationCardFailAction(msg.data): new AddLocationCardSuccessAction(msg.data))
            .catch(error => of(error))
    );

    @Effect()
    updateCard$: Observable<ResponseAction> = this.actions$
        .ofType(UPDATE_LOCATION_CARD)
        .switchMap((action: UpdateLocationCardAction) => this.ws
            .send(this.getLocationCardUpdate(action.payload))
            .takeUntil(this.actions$.ofType(UPDATE_LOCATION_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ?new UpdateLocationCardFailAction(msg.data): new UpdateLocationCardSuccessAction(msg.data))
            .catch(error => of(error))
    );

    @Effect()
    delete$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_LOCATION_CARD)
        .switchMap((action: DeleteLocationCardAction) => this.ws
            .send(this.getLocationCardDelete(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_LOCATION_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ?new DeleteLocationCardFailAction(msg.data): new DeleteLocationCardSuccessAction(msg.data))
            .catch(error => of(error))
    );

    constructor(
        public ws: WebsocketService,
        public actions$: Actions,
        public tip: TipService
    ){
        super()
    } 
}