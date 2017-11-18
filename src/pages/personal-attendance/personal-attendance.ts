//region
import { IconService } from './../../services/business/icon-service';
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OvertimeService } from '../../services/business/overtime-service';
import { TimeService } from '../../services/utils/time-service';
import { PayBillService } from '../../services/business/pay-bill-service';
import { AttendanceInstant, AttendanceResult, Overtime } from '../../interfaces/response-interface';
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
    public iconService: IconService
  ) {
    this.yearMonth = time.getDateInfo(this.date).dateWithoutDay;
  }

  ionViewCanEnter() {
    return this.navParams.get('permission').view;
  }

  ionViewDidLoad() {

  }

  goToNextPage() {
    // this.attendance.getAttendanceResult(this.getDatePeriod())
    //   .withLatestFrom(this.dayClicked)
    //   .subscribe(data => {
    //     console.log(data);
    //   })
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
