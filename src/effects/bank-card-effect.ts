import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ResponseAction } from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';
import {
    ADD_BANK_CARD,
    AddBankCardAction,
    BankCardAddFailAction,
    BankCardAddSuccessAction,
    BankCardDeleteFailAction,
    BankCardDeleteSuccessAction,
    BankCardListFailAction,
    BankCardListSuccessAction,
    BankInformationFailAction,
    BankInformationSuccessAction,
    DELETE_BANK_CARD,
    DeleteBankCardAction,
    GET_BANK_CARD_LIST,
    GET_BANK_INFORMATION,
    GetBankCardListAction,
    GetBankInformationAction,
    SET_MASTER_BANK_CARD,
    SetMasterBankCardAction,
    SetMasterBankCardFailAction,
    SetMasterBankCardSuccessAction,
} from './../actions/action/bank-card-action';
import { TipService } from './../services/tip-service';

@Injectable()
export class BankCardEffect extends Command {

    @Effect()
    bankCardList$: Observable<ResponseAction> = this.actions$
        .ofType(GET_BANK_CARD_LIST)
        .switchMap((action: GetBankCardListAction) => this.ws
            .send(this.getWorkerBankNoList(action.payload))
            .takeUntil(this.actions$.ofType(GET_BANK_CARD_LIST))
            .map(msg => msg.isError
                ? new BankCardListFailAction(msg.data)
                : new BankCardListSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    bankInfo$: Observable<ResponseAction> = this.actions$
        .ofType(GET_BANK_INFORMATION)
        .switchMap((action: GetBankInformationAction) => this.ws
            .send(this.getBankInfo(action.payload))
            .takeUntil(this.actions$.ofType(GET_BANK_INFORMATION))
            .map(msg => msg.isError
                ? new BankInformationFailAction(msg.data)
                : new BankInformationSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    bankCardAdd$: Observable<ResponseAction> = this.actions$
        .ofType(ADD_BANK_CARD)
        .switchMap((action: AddBankCardAction) => this.ws
            .send(this.getWorkerBankNoAdd(action.payload))
            .takeUntil(this.actions$.ofType(ADD_BANK_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new BankCardAddFailAction(msg.data)
                : new BankCardAddSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    bankCardDelete$: Observable<ResponseAction> = this.actions$
        .ofType(DELETE_BANK_CARD)
        .switchMap((action: DeleteBankCardAction) => this.ws
            .send(this.getWorkerBankNoDelete(action.payload))
            .takeUntil(this.actions$.ofType(DELETE_BANK_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new BankCardDeleteFailAction(msg.data)
                : new BankCardDeleteSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    @Effect()
    setMasterBankCard$: Observable<ResponseAction> = this.actions$
        .ofType(SET_MASTER_BANK_CARD)
        .switchMap((action: SetMasterBankCardAction) => this.ws
            .send(this.getSetBankNoMaster(action.payload))
            .takeUntil(this.actions$.ofType(SET_MASTER_BANK_CARD))
            .do(msg => !msg.isError && this.tip.showServerResponseSuccess(msg.msg))
            .map(msg => msg.isError
                ? new SetMasterBankCardFailAction(msg.data)
                : new SetMasterBankCardSuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );

    constructor(
        private actions$: Actions,
        private ws: WebsocketService,
        private tip: TipService
    ) {
        super();
    }
}
