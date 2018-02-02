import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { AddWorkCertificateComponent } from './../../components/add-work-certificate/add-work-certificate';
import { CertificateAddOptions, CertificateUpdateOptions } from './../../interfaces/request-interface';
import { Certificate } from './../../interfaces/response-interface';
import { CraftService } from './../../services/business/craft-service';
import { WorkCertificateService } from './../../services/business/work-certificate-service';

@IonicPage()
@Component({
    selector: 'page-work-certificate',
    templateUrl: 'work-certificate.html',
})
export class WorkCertificatePage implements BusinessPageModel{

    certificates: Observable<Certificate[]>;

    subscriptions: Subscription[] = [];

    add$: Subject<CertificateAddOptions> = new Subject();

    update$: Subject<CertificateUpdateOptions> = new Subject();

    delete$: Subject<Certificate> = new Subject();

    constructor(
        private certificate: WorkCertificateService,
        private modalCtrl: ModalController,
        private craft: CraftService
    ) {
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.certificate.getCertificateList(),

            this.certificate.addCertificate(this.add$),

            this.certificate.updateCertificate(this.update$),

            this.certificate.deleteCertificate(this.delete$.map(item => item.id)),

            this.certificate.updateCertificateImage(),

            ...this.certificate.handleError(),
        ];
    }

    initialModel(): void {
        this.certificates = this.certificate.getCertificates()
            .withLatestFrom(
            this.craft.getWorkTypeList(),
            (certificates, workTypes) => certificates.map(item => ({ ...item, workTypeName: workTypes.find(type => type.id === item.worktype_id).name }))
            );
    }

    addCertificate(): void {
        const modal = this.modalCtrl.create(AddWorkCertificateComponent);

        modal.present();

        modal.onDidDismiss((data: CertificateAddOptions) => data && this.add$.next(data));
    }

    updateCertificate($event: Event, target: Certificate): void {
        $event.stopPropagation();

        const modal = this.modalCtrl.create(AddWorkCertificateComponent, { form: target });

        modal.present();

        modal.onDidDismiss((data: CertificateAddOptions) => data && this.update$.next({ ...data, id: target.id }));
    }

    ionViewWillUnload() {
        this.certificate.resetErrorResponse();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
