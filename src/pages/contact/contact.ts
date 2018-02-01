import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ConfirmProp, TipService } from './../../services/tip-service';

@IonicPage()
@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
})
export class ContactPage {
    tel = '0571-58977777';

    subscription: Subscription;

    constructor(
        private tip: TipService,
        private translate: TranslateService
    ) {
    }

    call(): void {
        const confirmFn = window.open(`tel:${this.tel}`);

        const content: Observable<ConfirmProp> = this.translate.get(['CALL_CUSTOMER_SERVICE_PHONE', 'CANCEL_BUTTON', 'CONFIRM_BUTTON'])
            .map(labels => ({ message: labels.CALL_CUSTOMER_SERVICE_PHONE, cancelText: labels.CANCEL_BUTTON, confirmText: labels.CONFIRM_BUTTON }));

        this.subscription = this.tip.showConfirmProp(content, confirmFn);
    }

    ionViewWillUnload() {
        this.subscription && this.subscription.unsubscribe();
    }
}
