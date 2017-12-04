import { AddAttendanceCardComponent } from './../../components/add-attendance-card/add-attendance-card';
import { ConditionOption } from './../../interfaces/order-interface';
import { PermissionService } from './../../services/config/permission-service';
import { ProjectRoot } from './../pages';
import { attendanceCard } from './../../services/business/icon-service';
import { Observable } from 'rxjs/Observable';
import { AttendanceCard } from './../../interfaces/response-interface';
import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from './../../services/business/project-service';
import { WorkerService } from './../../services/business/worker-service';
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
    public worker: WorkerService,
    public modalCtrl: ModalController,
    public project: ProjectService,
    public permission: PermissionService
  ) {
    this.subscriptions = this.attendanceCard.handleError();
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    const subscription = this.attendanceCard.getAttendanceCardList();

    this.subscriptions.push(subscription);

    this.cards = this.attendanceCard.getCardsByConditions();

    this.canOperate = this.permission.getOperatePermission(attendanceCard.icon, ProjectRoot);

    this.orderOptions = this.attendanceCard.getOrderOptions();

    this.bindingStateOptions = this.attendanceCard.getBindingStateOptions();
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  updateCardAtLocal() {

  }

  addCard() {
    this.modalCtrl.create(AddAttendanceCardComponent).present();
  }

  bindCard() {

  }

  unbindCard() {

  }

  deleteCard() {

  }

  setBindCondition() {
    this.attendanceCard.updateBindConditionState(this.byBindingState);
  }

  setOrderCondition() {
    this.attendanceCard.updateOrderConditionState(this.byCardNumber);
  }
}
