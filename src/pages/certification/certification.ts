import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CertificateService } from '../../services/business/certificate-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { personalIdValidator, realNameValidator } from '../../validators/validators';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

/**
 * Generated class for the CertificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-certification',
  templateUrl: 'certification.html',
})
export class CertificationPage {
  frontTip = 'CER_ID_CARD_BACK_TIP';
  backTip = 'CER_ID_CARD_FRONT_TIP';
  certificateForm: FormGroup;
  realName$: Observable<string>;
  certificate$$: Subscription;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public certificateService: CertificateService,
    public fb: FormBuilder) {
    this.initForm();
  }

  /*============================================Init model======================================================*/

  initForm() {
    this.certificateForm = this.fb.group({
      realname: ['', realNameValidator],
      personalId: ['', personalIdValidator],
      personalIdPhoto: this.fb.group({
        front: ['', Validators.required],
        back: ['', Validators.required]
      })
    });
  }

  ionViewDidLoad() {
    this.realName$ = this.certificateService.realName;
    this.certificate$$ = this.certificateService.certificateResult
      .filter(res => !!res)
      .subscribe(_ => {
        this.navCtrl.push('TabsPage').then(() => {
        });
      });
  }

  /*============================================UI state changed=================================================*/

  certificate() {
    this.certificateService.certificate(this.certificateForm.value);
  }

  getImage(url = '', type: string) {
    const config = {};

    config[type] = url;

    this.certificateForm.get('personalIdPhoto').patchValue(config);
  }

  /*============================================Refuse clean======================================================*/

  // noinspection JSUnusedGlobalSymbols
  ionViewWillUnload() {
    this.certificate$$.unsubscribe();
    this.certificateService.unSubscribe();
  }

  /*====================================Short cut method for template==============================================*/

  get realname() {
    return this.certificateForm.get('realname')
  }

  get personalId() {
    return this.certificateForm.get('personalId');
  }
}
