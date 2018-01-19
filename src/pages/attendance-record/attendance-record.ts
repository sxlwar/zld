import { FaceImageComponent } from './../../components/face-image/face-image';
import { applyAttendanceModifyPage } from './../pages';
import { PermissionService } from './../../services/config/permission-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, InfiniteScroll } from 'ionic-angular';
import { AttendanceInstant, AttendanceResult } from '../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { AttendanceService } from '../../services/business/attendance-service';
import { AttendanceRecordService } from '../../services/business/attendance-record-service';
import { uniqBy } from 'lodash';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
    selector: 'page-attendance-record',
    templateUrl: 'attendance-record.html',
})
export class AttendanceRecordPage {

    attendanceResult: AttendanceResult;

    operatePermission: Observable<boolean>;

    records: Observable<AttendanceInstant[]>;

    haveMoreData: Observable<boolean>;

    pageSubscription: Subscription;

    recordSubscription: Subscription;

    actionSheet$$: Subscription;

    subscriptions: Subscription[] = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public attendance: AttendanceService,
        public attendanceRecord: AttendanceRecordService,
        public permission: PermissionService,
        public modalCtrl: ModalController
    ) {
        this.attendanceResult = this.navParams.get('attendance');
    }

    ionViewDidLoad() {
        const rootName = this.navParams.get('rootName');

        const iconName = this.navParams.get('iconName');

        this.operatePermission = this.permission.getOperatePermission(iconName, rootName);

        this.initialModel();

        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.attendanceRecord.getAttendanceInstantList(Observable.of({ start_day: this.attendanceResult.day, end_day: this.attendanceResult.day, user_id: [this.attendanceResult.contract__worker_id] })),
            this.attendanceRecord.handleError(),
        ];
    }

    initialModel(): void {
        this.haveMoreData = this.attendanceRecord.getHaveMoreData();

        this.records = this.attendanceRecord
            .getAttendanceRecord()
            .scan((acc, cur) => acc.concat(cur))
            .map(result => uniqBy(result, 'id'));
    }

    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.pageSubscription && this.pageSubscription.unsubscribe();

        this.pageSubscription = this.attendanceRecord.getNextPage(infiniteScroll);
    }

    showActionSheet(): void {
        this.actionSheet$$ && this.actionSheet$$.unsubscribe();

        const applyFn = () => this.navCtrl.push(applyAttendanceModifyPage);

        this.actionSheet$$ = this.attendance.showActionSheet([this.attendanceResult], applyFn);
    }


    showCapture(instant: AttendanceInstant): void {
        const { similarity, screen_image, capture_image } = instant;

        this.modalCtrl.create(FaceImageComponent, { similarity, screen: screen_image, capture: capture_image }).present();
    }

    ionViewWillUnload() {
        this.pageSubscription && this.pageSubscription.unsubscribe();

        this.recordSubscription && this.recordSubscription.unsubscribe();

        this.actionSheet$$ && this.actionSheet$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

    ionViewWillLeave() {
        this.attendanceRecord.resetPage();
    }
}
