import { ChartService, ChartType } from './../../services/utils/chart-service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { PayBill } from './../../interfaces/response-interface';
import { PayBillService } from './../../services/business/pay-bill-service';
import { Observable } from 'rxjs/Observable';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export interface Salary {
  systemAttendanceAmount: number;
  manualAttendanceAmount: number;
  systemOvertimeAmount: number;
  manualOvertimeAmount: number;
  pieceAmount: number;
  attendanceAmount: number;
  overtimeAmount: number;
}

@IonicPage()
@Component({
  selector: 'page-salary-detail',
  templateUrl: 'salary-detail.html',
})
export class SalaryDetailPage {
  @ViewChild('salaryDetail') salaryDetail: ElementRef;
  yearMonth: string;
  totalAmount: number;
  payBillChart$$: Subscription;
  salary: Observable<Salary>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public payBill: PayBillService,
    public chart: ChartService,
    public translate: TranslateService
  ) {
    this.yearMonth = navParams.get('month');
  }

  ionViewDidLoad() {
    const option = { month: this.yearMonth };

    const bill = this.payBill.getPayBillOfMonth(Observable.of(option));

    this.salary = this.getSalary(bill);

    this.getPayBillChart();
  }

  getSalary(bill: Observable<PayBill>): Observable<Salary> {
    return bill.map(bill => {
      const systemAttendanceAmount = this.payBill.countSystemAttendanceAmount(bill);

      const manualAttendanceAmount = this.payBill.countManualAttendanceAmount(bill);

      const systemOvertimeAmount = this.payBill.countSystemOvertimeAmount(bill);

      const manualOvertimeAmount = this.payBill.countManualOvertimeAmount(bill);

      const pieceAmount = this.payBill.countPieceTotalAmount(bill);

      const attendanceAmount = systemAttendanceAmount + manualAttendanceAmount;

      const overtimeAmount = systemOvertimeAmount + manualOvertimeAmount;

      return { systemAttendanceAmount, manualAttendanceAmount, systemOvertimeAmount, manualOvertimeAmount, pieceAmount, attendanceAmount, overtimeAmount };
    });
  }

  getPayBillChart(): void {
    this.payBillChart$$ = this.salary
      .withLatestFrom(
      this.translate.get(['SYSTEM_ATTENDANCE_SALARY', 'MANUAL_ATTENDANCE_SALARY', 'SYSTEM_OVERTIME_SALARY', 'MANUAL_OVERTIME_SALARY', 'WORK_PIECE_SALARY'])
        .map(res => [res.SYSTEM_ATTENDANCE_SALARY, res.MANUAL_ATTENDANCE_SALARY, res.SYSTEM_OVERTIME_SALARY, res.MANUAL_OVERTIME_SALARY, res.WORK_PIECE_SALARY])
      )
      .map(([salary, labels]) => {
        const { systemAttendanceAmount, manualAttendanceAmount, systemOvertimeAmount, manualOvertimeAmount, pieceAmount } = salary;

        const data = [systemAttendanceAmount, manualAttendanceAmount, systemOvertimeAmount, manualOvertimeAmount, pieceAmount];

        this.totalAmount = data.reduce((acc, cur) => acc + cur, 0);

        return this.chart.getPieChartData({ labels, data });
      })
      .subscribe(data => this.chart.getChart(this.salaryDetail.nativeElement, ChartType.pie, data));
  }

  ionViewWillUnload() {
    this.payBillChart$$.unsubscribe();
  }

}