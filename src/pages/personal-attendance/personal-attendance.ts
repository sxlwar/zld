//region
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OvertimeService } from '../../services/business/overtime-service';
import { AttendanceService } from '../../services/business/attendance-service';
import { AttendanceRecordService } from '../../services/business/attendance-record-service';
import { TimeService } from '../../services/utils/time-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkerService } from '../../services/business/worker-service';
import { PayBillService } from '../../services/business/pay-bill-service';
import { WorkerContract, workerContractList } from '../../services/api/command';
import { AttendanceInstant, AttendanceResult, PayBill, Overtime } from '../../interfaces/response-interface';
import { RequestOption } from '../../interfaces/request-interface';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
//endregion

export interface DatePeriod {
  start: string;
  end: string;
}

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
  subscriptions: Subscription[] = [];
  // payBills: Observable<PayBill[]>;
  data: Observable<AttendanceUnionData>;
  toggleNotify: Observable<DatePeriod>;
  statistics: Observable<Statistics>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public time: TimeService,
    public instant: AttendanceRecordService,
    public attendance: AttendanceService,
    public overtime: OvertimeService,
    public contract: WorkerService,
    public payBill: PayBillService
  ) {

  }

  ionViewDidLoad() {
    this.attachData();
    this.toggleSymbol();
    this.createStatisticsChar();
  }

  getContractDate(): Observable<DatePeriod> {
    const unexpired = WorkerContract.unexpired;

    const subOption = workerContractList.noMagicNumber.get(unexpired).value;

    const option = Observable.of(Object.assign({ request_status: '完成' }, subOption))

    return this.contract.getOwnContract(option).map(contract => {
      const { start_day, finish_day } = contract;

      return { start: start_day, end: finish_day };
    });
  }

  getPayBill() {
    // const { dateWithoutDay } = this.time.getDateInfo(this.date);

    // return this.payBill.getPayBillList(Observable.of({ month: dateWithoutDay }));
  }

  toggleSymbol() {
    this.toggleNotify = Observable.forkJoin(
      this.getContractDate(),
      this.instant.getAttendanceRecord(this.getDatePeriod())
    )
    .map(result => result[0]);
  }

  attachData() {
    const option = this.getDatePeriod();

    this.data = Observable.forkJoin(
      this.attendance.getAttendanceResult(option),
      this.instant.getAttendanceRecord(option),
      this.overtime.getOvertimeRecord(option)
    )
    .map(result => {
      const [attendances, records, overtimes] = result;

      return {attendances, records, overtimes};
    });
  }

  createStatisticsChar() {

  }

  getDatePeriod(): Observable<RequestOption> {
    const result = {
      start_day: this.time.getDate(this.time.getFirstDateOfMonth(this.date), true),
      end_day: this.time.getDate(this.time.getYesterday(), true)
    }

    return Observable.of(result);
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
