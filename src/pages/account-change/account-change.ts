import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { ChangeAccountFormModel } from '../../services/api/mapper-service';
import { mobilePhoneValidator } from '../../validators/validators';
import { AccountChangeService } from './../../services/business/account-change-service';

@IonicPage()
@Component({
    selector: 'page-account-change',
    templateUrl: 'account-change.html',
})
export class AccountChangePage implements BusinessPageModel{

    subscriptions: Subscription[] = [];

    form: FormGroup;

    oldPhoneVerification$: Subject<boolean> = new Subject();

    newPhoneVerification$: Subject<boolean> = new Subject();

    oldImageVerification$: Subject<boolean> = new Subject();

    newImageVerification$: Subject<boolean> = new Subject();

    change$: Subject<ChangeAccountFormModel> = new Subject();

    showOldImageVerification: Observable<boolean>;

    showNewImageVerification: Observable<boolean>;

    oldImageVerificationUrl: Observable<string>;

    newImageVerificationUrl: Observable<string>;

    constructor(
        private accountChange: AccountChangeService,
        private fb: FormBuilder
    ) {
        this.initialForm();
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialForm(): void {
        this.form = this.fb.group({
            oldMobilePhone: '',
            newMobilePhone: ['', mobilePhoneValidator],
            oldPhoneVerification: '',
            newPhoneVerification: '',
            oldImageVerification: '',
            newImageVerification: '',
        });
    }

    initialModel(): void {
        this.showOldImageVerification = this.accountChange.getCheckPhoneVerifyResponse().map(res => res.captcha).startWith(false);

        this.showNewImageVerification = this.accountChange.getChangePhoneVerifyResponse().map(res => res.captcha).startWith(false);

        this.oldImageVerificationUrl = this.accountChange.getCheckPhoneVerifyUrl();

        this.newImageVerificationUrl = this.accountChange.getChangePhoneVerifyUrl();
    }

    launch(): void {
        this.subscriptions = [
            this.accountChange.changePhone(this.change$.map(_ => this.form.value)),

            this.accountChange.checkPhoneVerify(
                this.oldPhoneVerification$.map(_ => this.form.get('oldMobilePhone').value),
                this.oldPhoneVerification$.map(_ => this.form.get('oldImageVerification').value)
            ),

            this.accountChange.changePhoneVerify(
                this.newPhoneVerification$.map(_ => this.form.get('newMobilePhone').value),
                this.newPhoneVerification$.map(_ => this.form.get('newImageVerification').value)
            ),

            this.accountChange.updateCheckRandomCode(this.oldImageVerification$),

            this.accountChange.updateChangeRandomCode(this.newImageVerification$),

            this.accountChange.getAccount().subscribe(oldMobilePhone => this.form.patchValue({ oldMobilePhone })),

            this.accountChange.getChangePhoneSuccessResponse().subscribe(_ => this.form.reset()),

            this.accountChange.updateAccount(),

            ...this.accountChange.handleError(),
        ];
    }

    ionViewWillUnload() {
        this.accountChange.resetLocalData();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

    get oldMobilePhone() {
        return this.form.get('oldMobilePhone');
    }

    get newMobilePhone() {
        return this.form.get('newMobilePhone');
    }

    get oldPhoneVerification() {
        return this.form.get('oldPhoneVerification');
    }

    get newPhoneVerification() {
        return this.form.get('newPhoneVerification');
    }

    get oldImageVerification() {
        return this.form.get('oldImageVerification');
    }

    get newImageVerification() {
        return this.form.get('newImageVerification');
    }
}
