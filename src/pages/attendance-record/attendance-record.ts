//region
import { PermissionService } from './../../services/config/permission-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AttendanceInstant, AttendanceResult } from '../../interfaces/response-interface';
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

  attendanceResult: AttendanceResult;

  time: string;

  operatePermission: Observable<boolean>;

  records: Observable<AttendanceInstant[]>;

  haveMoreData = true;

  pageSubscription: Subscription;

  recordSubscription: Subscription;

  actionSheet$$: Subscription;

  constructor(public navCtrl: NavController,
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

  }

  initialModel(): void {
    this.time = this.attendanceResult.day;

    this.records = this.attendanceRecord
      .getAttendanceRecord(this.getRecordOption())
      .do(value => this.haveMoreData = !!value.length)
      .scan((acc, cur) => acc.concat(cur))
      .map(result => uniqBy(result, 'id'));
  }

  getRecordOption(): Observable<RequestOption> {
    const option = { start_day: this.time, end_day: this.time, user_id: [this.attendanceResult.contract__worker_id] };

    return Observable.of(option);
  }

  getNextPage(infiniteScroll) {
    this.attendanceRecord.increasePage();

    this.recordSubscription && this.recordSubscription.unsubscribe();

    this.recordSubscription = this.attendanceRecord.getAttendanceInstantList(this.getRecordOption());

    this.pageSubscription && this.pageSubscription.unsubscribe();

    this.pageSubscription = this.attendanceRecord
      .getAttendanceRecordResponse()
      .subscribe(value => infiniteScroll.complete());
  }

  showActionSheet() {
    this.actionSheet$$ && this.actionSheet$$.unsubscribe();

    this.actionSheet$$ = this.attendance.showActionSheet([this.attendanceResult]);
  }

  ionViewWillUnload() {
    this.attendanceRecord.unSubscribe();

    this.pageSubscription && this.pageSubscription.unsubscribe();

    this.recordSubscription && this.recordSubscription.unsubscribe();

    this.actionSheet$$ && this.actionSheet$$.unsubscribe();
  }

  ionViewWillLeave() {
    this.attendanceRecord.resetPage();
  }
}
