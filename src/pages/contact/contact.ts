import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { ConfirmProp, TipService } from './../../services/tip-service';

@IonicPage()
@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
})
export class ContactPage implements BusinessPageModel {
    tel = '0571-58977777';

    subscriptions: Subscription[] = [];

    call$: Subject<boolean> = new Subject();

    constructor(
        private tip: TipService,
        private translate: TranslateService
    ) {
    }

    ionViewDidLoad() {
        this.launch();
    }

    launch(): void {
        const confirmFn = window.open(`tel:${this.tel}`);

        this.subscriptions = [
            this.tip.showConfirmProp(this.call$.withLatestFrom(this.call(), (_, confirmProp) => confirmProp), confirmFn),
        ];
    }

    initialModel(): void {

    }

    call(): Observable<ConfirmProp> {
        return this.translate.get(['CALL_CUSTOMER_SERVICE_PHONE', 'CANCEL_BUTTON', 'CONFIRM_BUTTON'])
            .map(labels => ({ message: labels.CALL_CUSTOMER_SERVICE_PHONE, cancelText: labels.CANCEL_BUTTON, confirmText: labels.CONFIRM_BUTTON }));
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
