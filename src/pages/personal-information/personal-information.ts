import { RequestOption } from './../../interfaces/request-interface';
import { TipService } from './../../services/tip-service';
import { Subject } from 'rxjs/Subject';
import { AddressService } from './../../services/utils/address-service';
import { WorkTypeSelectComponent } from './../../components/work-type-select/work-type-select';
import { Subscription } from 'rxjs/Subscription';
import { CraftService } from './../../services/business/craft-service';
import { Observable } from 'rxjs/Observable';
import { PersonalId, WorkerDetail } from './../../interfaces/response-interface';
import { PersonalService } from './../../services/business/personal-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddressColumn, Column } from '../../services/utils/address-service';
import { addressAreaFormat } from '../../validators/validators';
import { projectRequestOptions } from '../../services/utils/util';

@IonicPage()
@Component({
  selector: 'page-personal-information',
  templateUrl: 'personal-information.html',
})
export class PersonalInformationPage {

  subscriptions: Subscription[];

  personalId: PersonalId;

  workerDetail: WorkerDetail;

  workTypes: Observable<string[]>;

  address: Observable<AddressColumn<Column>[]>;

  selectedAddress = '';

  addressSubject: Subject<string> = new Subject();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personal: PersonalService,
    public craft: CraftService,
    public modalCtrl: ModalController,
    public addressService: AddressService,
    public tip: TipService
  ) {
    this.address = addressService.address;
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    this.initialModel();

    this.launch();

    this.personal.getPersonalIdList();

    this.personal.getWorkerDetailList();
  }

  launch() {
    this.subscriptions = [
      this.personal.getPersonalId().subscribe(id => this.personalId = id),

      this.personal.getWorkerDetail().subscribe(detail => this.workerDetail = detail),

      this.personal.updateWorkerDetailWorkTypeAtLocal(),

      this.addressService.getAddressCode(this.personal.getWorkerDetail().map(item => [item.curraddr__province, item.curraddr__city, item.curraddr__dist]))
        .subscribe(result => this.selectedAddress = result.join(' ')),

      this.monitor()
    ];
  }

  initialModel() {
    this.workTypes = this.personal.getOwnWorkTypes();
  }

  /**
   * @description Monitoring whether the values that allow users to modify are changed.
   * If the user modifies some values, the corresponding api will be adjusted, at the same time, the corresponding 
   * data in the store will be modified after the response is successful;
   */
  monitor(): Subscription {
    const typeOption = this.craft.getSelectedTypes()
      .skip(1)
      .distinct(value => value)
      .map(work_type_id => ({ work_type_id }));

    //基于后台的2逼逻辑，处理地址信息的时候需要把work type 的信息带上，所以加了这一行
    const workType = this.personal.getWorkerDetail().map(item => ({ work_type_id: item.workType__id })).take(1).concat(typeOption);

    return this.personal.updateWorkerDetail(
      typeOption.merge(
        this.monitorAddressArea(workType),
        this.monitorAddressDetail(workType)
      )
    );
  }

  /**
     * @description To update the area, we have to pass the work type ids to the server.
     * To ensure that the stream emit value when area information changes only, it is necessary to check
     * whether the value of area has changed.
     */
  monitorAddressArea(workType: Observable<RequestOption>): Observable<RequestOption> {
    return workType
      .combineLatest(
      this.addressService.getAddressName(this.addressSubject
        .filter(item => addressAreaFormat.test(item))
        .map(item => item.split(' ')))
        .distinct(value => value)
        .map(([province, city, dist]) => ({ province, city, dist })),
      projectRequestOptions
      );
  }

  /**
   * @description To update the address details, we have to get the other information of the address, e.g. province, city, country...
   * more nauseous is that we have to pass the work type ids to the server, otherwise api error occur.
   */
  monitorAddressDetail(workType: Observable<RequestOption>): Observable<RequestOption> {
    return workType.combineLatest(
      this.addressSubject.filter(item => !addressAreaFormat.test(item)).map(detail => ({ detail }))
        .withLatestFrom(this.personal.getWorkerDetail()
          .map(item => ({ province: item.curraddr__province, city: item.curraddr__city, dist: item.curraddr__dist })))
        .map(([detail, other]) => ({ ...detail, ...other })),
      projectRequestOptions
    )
      .distinctUntilKeyChanged('detail');
  }

  modifyWorkType() {
    this.modalCtrl.create(WorkTypeSelectComponent, { types: this.workerDetail.workType__id }).present();
  }

  modifyAddress() {
    const alert = this.tip.modifyAddressDetail();

    alert.present();

    alert.onDidDismiss(data => data.detail && this.addressSubject.next(data.detail));
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
