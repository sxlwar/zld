import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AttendanceCardResponses } from '../../reducers/reducer/attendance-card-reducer';
import { AddAttendanceCardComponent } from './../../components/add-attendance-card/add-attendance-card';
import { ConditionOption } from './../../interfaces/order-interface';
import { PermissionResult } from './../../interfaces/permission-interface';
import { AttendanceCard } from './../../interfaces/response-interface';
import { AttendanceCardService } from './../../services/business/attendance-card-service';
import { attendanceCard } from './../../services/business/icon-service';
import { PermissionService } from './../../services/config/permission-service';
import { ProjectRoot } from './../pages';

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

    delete$: Subject<AttendanceCard> = new Subject();

    unbind$: Subject<AttendanceCard> = new Subject();

    constructor(
        private navParams: NavParams,
        private attendanceCard: AttendanceCardService,
        private modalCtrl: ModalController,
        private permission: PermissionService
    ) {
    }

    ionViewCanEnter() {
        const { view, opt }: PermissionResult = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.cards = this.attendanceCard.getCardsByConditions();

        this.canOperate = this.permission.getOperatePermission(attendanceCard.icon, ProjectRoot);

        this.orderOptions = this.attendanceCard.getOrderOptions();

        this.bindingStateOptions = this.attendanceCard.getBindingStateOptions();
    }

    launch(): void {
        this.subscriptions = [
            this.attendanceCard.getAttendanceCardList(),

            this.attendanceCard.deleteAttendanceCard(this.delete$.map(card => [card.id])),

            this.attendanceCard.updateAttendanceCard(this.unbind$.map(card => ({ ic_card_num: card.ic_card_num }))),

            this.attendanceCard.handleQueryError(),

            this.attendanceCard.handleDeleteError(),

            this.attendanceCard.handleUpdateError(),
        ];
    }

    /* ===============================================Operate functions======================================== */

    addCard(): void {
        this.modalCtrl.create(AddAttendanceCardComponent).present();
    }

    bindCard(card: AttendanceCard): void {
        this.modalCtrl.create(AddAttendanceCardComponent, { cardNumber: card.ic_card_num }).present();
    }

    /* ===============================================Condition related functions======================================== */

    setBindCondition(): void {
        this.attendanceCard.updateBindConditionState(this.byBindingState);
    }

    setOrderCondition(): void {
        this.attendanceCard.updateOrderConditionState(this.byCardNumber);
    }

    ionViewWillUnload() {
        this.attendanceCard.resetAttendanceCardOperateResponse(AttendanceCardResponses.deleteResponse);

        this.attendanceCard.resetAttendanceCardOperateResponse(AttendanceCardResponses.updateResponse);

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
