import 'rxjs/add/operator/filter';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { CertificateService } from '../../services/business/certificate-service';
import { personalIdValidator, realNameValidator } from '../../validators/validators';
import { tabsPage } from './../pages';

@IonicPage()
@Component({
    selector: 'page-certification',
    templateUrl: 'certification.html',
})
export class CertificationPage implements BusinessPageModel{

    certificateForm: FormGroup;

    realName$: Observable<string>;

    certificate$: Subject<boolean> = new Subject();

    subscriptions: Subscription[] = [];

    constructor(
        private navCtrl: NavController,
        private certificateService: CertificateService,
        private fb: FormBuilder
    ) {
        this.initForm();
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.realName$ = this.certificateService.getRealName();
    }

    launch(): void {
        this.subscriptions = [
            this.certificateService.getCertificateResult()
                .filter(value => !!value)
                .subscribe(_ => this.navCtrl.push(tabsPage).then(() => { })),

            this.certificateService.monitorUploadResult(),

            ...this.certificateService.certificate(this.certificate$.map(_ => this.certificateForm.value)),

            this.certificateService.handleUpdateError(),

            this.certificateService.handleError(),
        ];
    }

    initForm() {
        this.certificateForm = this.fb.group({
            realName: ['', realNameValidator],
            personalId: ['', personalIdValidator],
            personalIdPhoto: this.fb.group({
                front: ['', Validators.required],
                back: ['', Validators.required],
            }),
        });
    }

    getImage(url = '', type: string) {
        this.certificateForm.get('personalIdPhoto').patchValue({ [type]: url });
    }

    ionViewWillUnload() {
        this.navCtrl.pop();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

    get realName() {
        return this.certificateForm.get('realName')
    }

    get personalId() {
        return this.certificateForm.get('personalId');
    }
}
