import { TipService } from './../services/tip-service';
import { GET_BANK_CARD_LIST, GetBankCardListAction, BankCardListSuccessAction, BankCardListFailAction, GET_BANK_INFORMATION, GetBankInformationAction, BankInformationFailAction, BankInformationSuccessAction, ADD_BANK_CARD, AddBankCardAction, BankCardAddFailAction, BankCardAddSuccessAction, DELETE_BANK_CARD, DeleteBankCardAction, BankCardDeleteFailAction, BankCardDeleteSuccessAction, SET_MASTER_BANK_CARD, SetMasterBankCardAction, SetMasterBankCardFailAction, SetMasterBankCardSuccessAction } from './../actions/action/bank-card-action';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ResponseAction } from '../interfaces/response-interface';
import { WebsocketService } from '../services/api/websocket-service';
import { Command } from '../services/api/command';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';

@Injectable()
export class BankCardEffect extends Command {

    @Effect()
    bankCardList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_BANK_CARD_LIST)
        .switchMap((action: GetBankCardListAction) => this.ws
            .send(this.getWorkerBankNoList(action.payload))
            .takeUntil(this.actions$.ofType(GET_BANK_CARD_LIST))
            .map(msg => msg.isError ? new BankCardListFailAction(msg.data) : new BankCardListSuccessAction(msg.data))
            .catch(error => of(error))
        );

    @Effect()
    bankInfo$: Observable<ResponseAction> = this.actions$
        .ofType(GET_BANK_INFORMATION)
        .switchMap((action: GetBankInformationAction) => this.ws
            .send(this.getBankInfo(action.payload))
            .takeUntil(this.actions$.ofType(GET_BANK_INFORMATION))
            .map(msg => msg.isError ? new BankInformationFailAction(msg.data) : new BankInformationSuccessAction(msg.data))
            .catch(error => of(error))
        );

    @Effect()
    bankCardAdd$: Observable<ResponseAction> = this.actions$
        .ofType(ADD_BANK_CARD)
        .switchMap((action: AddBankCardAction) => this.ws
            .send(this.getWorkerBankNoAdd(action.payload))
            .takeUntil(this.actions$.ofType(ADD_BANK_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new BankCardAddFailAction(msg.data) : new BankCardAddSuccessAction(msg.data))
            .catch(error => of(error))
        );

    @Effect()
    bankCardDelete$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_BANK_CARD)
        .switchMap((action: DeleteBankCardAction) => this.ws
            .send(this.getWorkerBankNoDelete(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_BANK_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new BankCardDeleteFailAction(msg.data) : new BankCardDeleteSuccessAction(msg.data))
            .catch(error => of(error))
        );

    @Effect()
    setMasterBankCard$: Observable<ResponseAction> = this.actions$
        .ofType(SET_MASTER_BANK_CARD)
        .switchMap((action: SetMasterBankCardAction) => this.ws
            .send(this.getSetBankNoMaster(action.payload))
            .takeUntil(this.actions$.ofType(SET_MASTER_BANK_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError ? new SetMasterBankCardFailAction(msg.data) : new SetMasterBankCardSuccessAction(msg.data))
            .catch(error => of(error))
        );

    constructor(
        public actions$: Actions,
        public ws: WebsocketService,
        public tip: TipService
    ) {
        super();
    }
}
