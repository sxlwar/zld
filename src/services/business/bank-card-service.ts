import { ResetAddBankcardResponseAction, ResetDeleteBankcardResponseAction, ResetBankcardInfoAction } from './../../actions/action/bank-card-action';
import { PersonalService } from './personal-service';
import { WorkerBankNoAddOptions, SetBankNoMasterOptions } from './../../interfaces/request-interface';
import { Subscription } from 'rxjs/Subscription';
import { Bankcard, BankInfoResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { Store } from '@ngrx/store';
import { AppState, selectBankcardList, selectBankInfo, selectBankcardAddResponse, selectBankcardDeleteResponse, selectSetMasterCardResponse } from './../../reducers/index-reducer';
import { UserService } from './user-service';
import { Injectable } from '@angular/core';

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