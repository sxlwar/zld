//region
import { PermissionService } from './../../services/config/permission-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AttendanceInstant } from '../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { AttendanceService } from '../../services/business/attendance-service';
import { AttendanceRecordService } from '../../services/business/attendance-record-service';
import { RequestOption } from '../../interfaces/request-interface';
import { uniqBy } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
//endregion

@IonicPage()
@Component({
  selector: 'page-attendance-record',
  templateUrl: 'attendance-record.html',
})
export class AttendanceRecordPage {
  time: string;
  operatePermission: Observable<boolean>;
  records: Observable<AttendanceInstant[]>;
  haveMoreData = true;
  pageSubscription: Subscription;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public attendance: AttendanceService,
    public attendanceRecord: AttendanceRecordService,
    public permission: PermissionService
  ) {
    this.time = this.navParams.get('day');
  }

  ionViewDidLoad() {
    const rootName = this.navParams.get('rootName');

    const iconName = this.navParams.get('iconName');

    this.operatePermission = this.permission.getOperatePermission(iconName, rootName);

    this.getAttendanceRecords();
  }

  getAttendanceRecords() {
    this.records = this.attendanceRecord
      .getAttendanceRecord(this.getRecordOption())
      .do(value => this.haveMoreData = !!value.length)
      .scan((acc, cur) => acc.concat(cur))
      .map(result => uniqBy(result, 'id'));
  }

  getRecordOption(): Observable<RequestOption> {
    const workerId = this.navParams.get('workerId');

    const option = { start_day: this.time, end_day: this.time, user_id: [workerId] };

    return Observable.of(option);
  }

  getNextPage(infiniteScroll) {
    this.attendanceRecord.increasePage();

    this.attendanceRecord.getAttendanceInstantList(this.getRecordOption());

    this.pageSubscription && this.pageSubscription.unsubscribe();

    this.pageSubscription = this.attendanceRecord
      .getAttendanceRecordResponse()
      .subscribe(value => infiniteScroll.complete());
  }

  showActionSheet() {
    this.attendance.showActionSheet();
  }

  ionViewWillUnload() {
    this.attendanceRecord.unSubscribe();

    this.pageSubscription && this.pageSubscription.unsubscribe();
  }

  ionViewWillLeave() {
    this.attendanceRecord.resetPage();
  }
}
