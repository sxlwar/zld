import { CraftService } from './../../services/business/craft-service';
import { CertificateAddOptions } from './../../interfaces/request-interface';
import { Certificate } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { AddWorkCertificateComponent } from './../../components/add-work-certificate/add-work-certificate';
import { WorkCertificateService } from './../../services/business/work-certificate-service';
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-work-certificate',
  templateUrl: 'work-certificate.html',
})
export class WorkCertificatePage {

  certificates: Observable<Certificate[]>;

  subscriptions: Subscription[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public certificate: WorkCertificateService,
    public modalCtrl: ModalController,
    public craft: CraftService
  ) {
    this.subscriptions = certificate.handleError();
  }

  ionViewDidLoad() {
    this.initialModel();

    this.sendRequest();
  }

  sendRequest(): void {
    this.subscriptions = [
      ...this.subscriptions,
      this.certificate.getCertificateList(),
      this.certificate.updateCertificateImage(),
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

    modal.onDidDismiss((data: CertificateAddOptions) => data && this.subscriptions.push(this.certificate.addCertificate(Observable.of(data))))
  }

  updateCertificate($event: Event, target: Certificate): void {
    $event.stopPropagation();

    const modal = this.modalCtrl.create(AddWorkCertificateComponent, { form: target });

    modal.present();

    modal.onDidDismiss((data: CertificateAddOptions) => data && this.subscriptions.push(this.certificate.updateCertificate(Observable.of({...data, id: target.id }))));
  }

  deleteCertificate($event: Event, target: Certificate): void {
    $event.stopPropagation();
    
    this.certificate.deleteCertificate(Observable.of(target.id));
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
