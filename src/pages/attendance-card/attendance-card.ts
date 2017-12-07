import { AddAttendanceCardComponent } from './../../components/add-attendance-card/add-attendance-card';
import { ConditionOption } from './../../interfaces/order-interface';
import { PermissionService } from './../../services/config/permission-service';
import { ProjectRoot } from './../pages';
import { attendanceCard } from './../../services/business/icon-service';
import { Observable } from 'rxjs/Observable';
import { AttendanceCard } from './../../interfaces/response-interface';
import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from './../../services/business/project-service';
import { AttendanceCardService } from './../../services/business/attendance-card-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-attendance-card',
  templateUrl: 'attendance-card.html',
})
export class AttendanceCardPage {

  subscriptions: Subscription[] = [];

  cards: Observable<AttendanceCard[]>;

  canOperate: Observable<boolean>;

  orderOptions: Observable<ConditionOption[]>;

  bindingStateOptions: Observable<ConditionOption[]>;

  byCardNumber: ConditionOption;

  byBindingState: ConditionOption;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public attendanceCard: AttendanceCardService,
    public modalCtrl: ModalController,
    public project: ProjectService,
    public permission: PermissionService
  ) {
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    const result = opt || view;

    result && this.launch();

    return opt || view;
  }

  ionViewDidLoad() {
    this.cards = this.attendanceCard.getCardsByConditions();

    this.canOperate = this.permission.getOperatePermission(attendanceCard.icon, ProjectRoot);

    this.orderOptions = this.attendanceCard.getOrderOptions();

    this.bindingStateOptions = this.attendanceCard.getBindingStateOptions();
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  /* ===============================================Launch functions======================================== */
  
  launch() {
    this.subscriptions = this.attendanceCard.handleError();

    this.getAttendanceCardList();
  }

  getAttendanceCardList() {
    const subscription = this.attendanceCard.getAttendanceCardList();

    this.subscriptions.push(subscription);
  }

  /* ===============================================Operate functions======================================== */

  addCard() {
    this.modalCtrl.create(AddAttendanceCardComponent).present();
  }

  bindCard(card: AttendanceCard) {
    this.modalCtrl.create(AddAttendanceCardComponent, { cardNumber: card.ic_card_num }).present();
  }

  unbindCard(card: AttendanceCard) {
    const { ic_card_num } = card;

    this.attendanceCard.updateAttendanceCard(Observable.of({ ic_card_num }));
  }

  deleteCard(card: AttendanceCard) {
    this.attendanceCard.deleteAttendanceCard(Observable.of([card.id]));
  }

  /* ===============================================Condition related functions======================================== */
  
  setBindCondition() {
    this.attendanceCard.updateBindConditionState(this.byBindingState);
  }

  setOrderCondition() {
    this.attendanceCard.updateOrderConditionState(this.byCardNumber);
  }
}
