//region
import { attendanceRecordPage, MineRoot } from './../pages';
import { IconService, myAttendance } from './../../services/business/icon-service';
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OvertimeService } from '../../services/business/overtime-service';
import { TimeService } from '../../services/utils/time-service';
import { PayBillService } from '../../services/business/pay-bill-service';
import { AttendanceInstant, AttendanceResult, Overtime } from '../../interfaces/response-interface';
import { UserService } from '../../services/business/user-service';
//endregion

export interface AttendanceUnionData {
  attendances: AttendanceResult[];
  records: AttendanceInstant[];
  overtimes: Overtime[];
}
export interface Statistics {
  attendanceTime: number;
  workTime: number;
  overtimeTime: number;
}

@IonicPage()
@Component({
  selector: 'page-personal-attendance',
  templateUrl: 'personal-attendance.html',
})
export class PersonalAttendancePage {
  date = new Date();
  isMonth = true;
  yearMonth: string;
  subscriptions: Subscription[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public time: TimeService,
    public overtime: OvertimeService,
    public payBill: PayBillService,
    public iconService: IconService,
    public userInfo: UserService,
  ) {
    this.yearMonth = time.getDateInfo(this.date).dateWithoutDay;
  }

  ionViewCanEnter() {
    return this.navParams.get('permission').view;
  }

  ionViewDidLoad() {

  }

  goToDetailPage(date) {
    if (!date.isNormalAttendance) return;

    const day = this.time.getDate(date, true);

    const subscription = this.userInfo.getUserId().subscribe(workerId => {
      this.navCtrl.push(attendanceRecordPage, { day, workerId, rootName: MineRoot, iconName: myAttendance.icon }).then(() => { });
    })

    this.subscriptions.push(subscription);
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
