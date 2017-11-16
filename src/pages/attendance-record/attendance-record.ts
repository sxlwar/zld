//region
import { ProjectRoot } from './../pages';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AttendanceResult, AttendanceInstant } from '../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { AttendanceService } from '../../services/business/attendance-service';
import { attendance as attendanceIcon } from '../../services/business/icon-service'
import { AttendanceRecordService } from '../../services/business/attendance-record-service';
import { RequestOption } from '../../interfaces/request-interface';
import { uniqBy } from 'lodash';
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public attendance: AttendanceService,
    public attendanceRecord: AttendanceRecordService,
  ) {
    this.getAttendanceTime();
  }

  ionViewDidLoad() {
    this.operatePermission = this.attendance.getOperatePermission(attendanceIcon.icon, ProjectRoot);

    this.getAttendanceRecords();
  }

  getAttendanceTime() {
    const attendance: AttendanceResult = this.navParams.get('attendance');

    this.time = attendance.day;
  }

  getAttendanceRecords() {
    this.records = this.attendanceRecord
      .getAttendanceRecord(this.getRecordOption())
      .scan((acc, cur) => acc.concat(cur))
      .map(result => uniqBy(result, 'id'));
  }

  getRecordOption(): Observable<RequestOption> {
    const attendance: AttendanceResult = this.navParams.get('attendance');

    const option= {start_day: this.time, end_day: this.time, user_id: [attendance.contract__worker_id] };

    return Observable.of(option);
  }

  getNextPage() {
    this.attendanceRecord.increasePage();

    this.attendanceRecord.getAttendaceInstantList(this.getRecordOption());

    return this.attendanceRecord.getAttendanceRecordResponse().toPromise(); //FIXME: NO.3 无限下拉有问题，v1中是使用ng-if拉完所有的数据之后把infinite-scroll移除了
  }

  showActionSheet() {
    this.attendance.showActionSheet();
  }

  ionViewWillUnlod() {
    this.attendanceRecord.unSubscribe();
  }
}
