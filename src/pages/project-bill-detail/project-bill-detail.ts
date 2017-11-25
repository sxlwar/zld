import { PayBillService } from './../../services/business/pay-bill-service';
import { TranslateService } from '@ngx-translate/core';
import { ChartService, ChartType } from './../../services/utils/chart-service';
import { ProjectPayBill } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectBillService } from '../../services/business/project-bill-service';
import { initial } from 'lodash';

export interface PayBillListItem {
  attendance: number;
  overtime: number;
  piece: number;
  name: string;
}

@IonicPage()
@Component({
  selector: 'page-project-bill-detail',
  templateUrl: 'project-bill-detail.html',
})
export class ProjectBillDetailPage {
  @ViewChild('projectBillDetail') projectBillDetail: ElementRef;
  subscriptions: Subscription[] = [];
  overviewTotal: number;
  list: Observable<PayBillListItem[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public projectBill: ProjectBillService,
    public chartService: ChartService,
    public payBill: PayBillService,
    public translate: TranslateService
  ) {
    const id = this.navParams.get('billId');

    projectBill.getProjectBillList(Observable.of(id));
  }

  ionViewDidLoad() {
    const bills = this.projectBill.getProjectPayBills()
      .filter(value => !!value.length)
      .mergeMap(bills => Observable.from(bills).first());

    this.getProjectBillChart(bills);

    this.getPayBillList(bills);
  }

  getProjectBillChart(bill: Observable<ProjectPayBill>): void {
    const labels = this.translate.get(['TURN_OUT_FOR_WORK', 'OVERTIME', 'WORK_PIECE'])
      .map(res => ([res.TURN_OUT_FOR_WORK, res.OVERTIME, res.WORK_PIECE]));

    const subscription = bill.withLatestFrom(labels)
      .map(([bill, labels]) => {
        const data = [this.projectBill.countAttendanceAmount(bill), this.projectBill.countOvertimeAmount(bill), this.projectBill.countPieceAmount(bill)];

        this.overviewTotal = this.projectBill.countAmount(bill);

        return this.chartService.getPieChartData({ labels, data });
      })
      .subscribe(data => this.chartService.getChart(this.projectBillDetail.nativeElement, ChartType.doughnut, data));

    this.subscriptions.push(subscription);
  }

  getPayBillList(bill: Observable<ProjectPayBill>): void {
    this.list = bill.mergeMap(({ project_id, month }) => this.payBill.getPayBills(Observable.of({ project_id, month: initial(month.split('-')).join('-') })))
      .filter(value => !!value.length)
      .mergeMap(bills => {
        return Observable.from(bills)
          .map(bill => {
            const name = bill.contract__worker__employee__realname;

            if (bill.pay_type === 'time_pay') {
              const attendance = this.payBill.countAttendanceTotalAmount(bill);

              const overtime = this.payBill.countOvertimeTotalAmount(bill);

              const total = attendance + overtime;

              return { attendance, overtime, total, name, piece: 0 }
            } else {
              const piece = this.payBill.countPieceTotalAmount(bill);

              const total = piece;

              return { piece, total, name, attendance: 0, overtime: 0 };
            }
          })
          .reduce((acc, cur) => {
            acc.push(cur);
            return acc;
          }, []);
      });
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
