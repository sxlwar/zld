import { applyAttendanceModifyPage } from './../pages';
import { PermissionService } from './../../services/config/permission-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

    time: string;

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
        public permission: PermissionService
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
            this.attendanceRecord.getAttendanceInstantList(Observable.of({ start_day: this.time, end_day: this.time, user_id: [this.attendanceResult.contract__worker_id] })),
            this.attendanceRecord.handleError(),
        ];
    }

    initialModel(): void {
        this.time = this.attendanceResult.day;

        this.haveMoreData = this.attendanceRecord.getHaveMoreData();

        this.records = this.attendanceRecord
            .getAttendanceRecord()
            .scan((acc, cur) => acc.concat(cur))
            .map(result => uniqBy(result, 'id'));
    }

    getNextPage(infiniteScroll) {
        this.attendanceRecord.increasePage();

        this.pageSubscription && this.pageSubscription.unsubscribe();

        this.pageSubscription = this.attendanceRecord
            .getAttendanceRecordResponse()
            .subscribe(value => infiniteScroll.complete());
    }

    showActionSheet() {
        this.actionSheet$$ && this.actionSheet$$.unsubscribe();

        const applyFn = () => this.navCtrl.push(applyAttendanceModifyPage);

        this.actionSheet$$ = this.attendance.showActionSheet([this.attendanceResult], applyFn);
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
