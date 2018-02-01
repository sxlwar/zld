import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
    ResetAddBankcardResponseAction,
    ResetBankcardInfoAction,
    ResetDeleteBankcardResponseAction,
} from './../../actions/action/bank-card-action';
import { SetBankNoMasterOptions, WorkerBankNoAddOptions } from './../../interfaces/request-interface';
import { Bankcard, BankInfoResponse } from './../../interfaces/response-interface';
import {
    AppState,
    selectBankcardAddResponse,
    selectBankcardDeleteResponse,
    selectBankcardList,
    selectBankInfo,
    selectSetMasterCardResponse,
} from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { PersonalService } from './personal-service';
import { UserService } from './user-service';

@Injectable()
export class BankcardService {
    constructor(
        private userInfo: UserService,
        private store: Store<AppState>,
        private processor: ProcessorService,
        private error: ErrorService,
        private personal: PersonalService
    ) {
    }

    /* ====================================================Date acquisition================================== */

    getBankCards(): Observable<Bankcard[]> {
        return this.store.select(selectBankcardList)
            .filter(value => !!value)
            .map(res => res.person_bank_no)
    }

    getBankInfo(): Observable<BankInfoResponse> {
        return this.store.select(selectBankInfo)
            .filter(value => !!value);
    }

    /* ====================================================API request====================================== */

    getBankCardList(): Subscription {
        return this.processor.bankCardListProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    getBankInformation(option: Observable<string>): Subscription {
        return this.processor.bankInformationProcessor(option.withLatestFrom(this.userInfo.getSid(), (num, sid) => ({ num, sid })));
    }

    addBankCard(option: Observable<WorkerBankNoAddOptions>): Subscription {
        return this.processor.bankCardAddProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                this.personal.getPersonalId().map(personalId => personalId.user_id),
                (option, sid, user_id) => ({ ...option, sid, user_id })
            )
        );
    }

    deleteBankCard(cardId: Observable<number>): Subscription {
        return this.processor.bankCardDeleteProcessor(cardId.withLatestFrom(this.userInfo.getSid(), (card_id, sid) => ({ sid, card_id })));
    }

    setMasterCard(option: Observable<SetBankNoMasterOptions>): Subscription {
        return this.processor.setMasterBankCardProcessor(option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid })));
    }

    /* ====================================================Local State update============================================================ */

    resetBankcardAddResponse(): void {
        this.store.dispatch(new ResetAddBankcardResponseAction);
    }

    resetBankcardDeleteResponse(): void {
        this.store.dispatch(new ResetDeleteBankcardResponseAction);
    }

    resetBankcardInformation(): void {
        this.store.dispatch(new ResetBankcardInfoAction);
    }

    /* =========================================================Error handle============================================================ */

    handleError(): Subscription[] {
        return [
            this.error.handleErrorInSpecific(this.store.select(selectBankcardList).filter(value => !!value), 'API_ERROR'),
            this.error.handleErrorInSpecific(this.store.select(selectBankcardAddResponse).filter(value => !!value), 'API_ERROR'),
            this.error.handleErrorInSpecific(this.store.select(selectBankcardDeleteResponse).filter(value => !!value), 'API_ERROR'),
            this.error.handleErrorInSpecific(this.store.select(selectSetMasterCardResponse).filter(value => !!value), 'API_ERROR'),
            this.handleBankInfoError(),
        ];
    }

    handleBankInfoError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectBankInfo).filter(value => !!value), 'API_ERROR');
    }
}
