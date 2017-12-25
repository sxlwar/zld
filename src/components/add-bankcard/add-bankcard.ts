import { MapperService } from './../../services/api/mapper-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { PersonalId } from './../../interfaces/response-interface';
import { PersonalService } from './../../services/business/personal-service';
import { BankcardService } from './../../services/business/bank-card-service';
import { mobilePhoneValidator, bankcardNumberValidator, creditCardValidator } from '../../validators/validators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'add-bankcard',
  templateUrl: 'add-bankcard.html'
})
export class AddBankcardComponent implements OnDestroy {
  
  personalId: Observable<PersonalId>;

  bankcardForm: FormGroup;

  subscriptions: Subscription[] = [];

  cardInfoSubscription: Subscription;

  constructor(
    public viewCtrl: ViewController,
    public fb: FormBuilder,
    public bankcard: BankcardService,
    public personal: PersonalService,
    public mapper: MapperService
  ) {
    this.initialModel();

    this.getData();
  }

  initialModel() {
    this.initialForm();

    this.subscriptions = [
      this.bankcard.getBankInfo().subscribe(res => this.bankcardForm.patchValue({ cardType: res.bank_name + res.brand })),
      this.personal.getPersonalIdResponse().subscribe(value => !value && this.personal.getPersonalIdList())
    ];
  }

  getData() {
    this.personalId = this.personal.getPersonalId();
  }

  initialForm() {
    this.bankcardForm = this.fb.group({
      cardNumber: ['', bankcardNumberValidator],
      phoneNumber: ['', mobilePhoneValidator],
      cardType: ['', creditCardValidator],
      isMaster: false
    });
  }

  getCardType(): void {
    const cardNumber = this.bankcardForm.get('cardNumber') as FormControl;

    if (!bankcardNumberValidator(cardNumber)) {
      this.cardInfoSubscription && this.cardInfoSubscription.unsubscribe();

      this.cardInfoSubscription = this.bankcard.getBankInformation(Observable.of(cardNumber.value));
    }
  }

  execution() {
    this.viewCtrl.dismiss(this.mapper.transformAddBankcard(this.bankcardForm.value));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  get cardNumber() {
    return this.bankcardForm.get('cardNumber');
  }

  get phoneNumber() {
    return this.bankcardForm.get('phoneNumber');
  }

  get cardTye() {
    return this.bankcardForm.get('cardType');
  }

}
