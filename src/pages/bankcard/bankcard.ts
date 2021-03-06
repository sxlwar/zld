import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { AddBankcardComponent } from './../../components/add-bankcard/add-bankcard';
import { Bankcard } from './../../interfaces/response-interface';
import { BankcardService } from './../../services/business/bank-card-service';
import { TipService } from './../../services/tip-service';

@IonicPage()
@Component({
    selector: 'page-bankcard',
    templateUrl: 'bankcard.html',
})
export class BankcardPage implements BusinessPageModel{

    subscriptions: Subscription[] = [];

    bankcards: Observable<Bankcard[]>;

    constructor(
        private navParams: NavParams,
        private modalCtrl: ModalController,
        private bankcard: BankcardService,
        private tip: TipService,
        private translate: TranslateService
    ) {
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    ionViewWillUnload() {
        this.bankcard.resetBankcardAddResponse();

        this.bankcard.resetBankcardDeleteResponse();

        this.bankcard.resetBankcardInformation();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

    initialModel(): void {
        this.bankcards = this.bankcard.getBankCards();
    }

    launch(): void {
        this.subscriptions = [
            ...this.bankcard.handleError(),
            
            this.bankcard.getBankCardList(),
        ];
    }

    addCard(): void {
        const modal = this.modalCtrl.create(AddBankcardComponent);

        modal.present();

        modal.onDidDismiss(data => data && this.bankcard.addBankCard(Observable.of(data)));
    }

    //TODO:确认删除后的步骤没有验证，需要确保在本地删除此卡；
    deleteCard(card: Bankcard): void {
        const confirmFn = () => this.bankcard.deleteBankCard(Observable.of(card.id));

        const message = this.translate.get(['OPERATE_CONFIRM', 'DELETE_BANK_CARD_TIP', 'CANCEL_BUTTON', 'CONFIRM_BUTTON'])
            .map(res => ({ title: res.OPERATE_CONFIRM, message: res.DELETE_BANK_CARD_TIP, cancelText: res.CANCEL_BUTTON, confirmText: res.CONFIRM_BUTTON }));

        this.tip.showConfirmProp(message, confirmFn);
    }
}
