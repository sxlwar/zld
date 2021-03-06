import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { initial } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { ProjectBillService } from '../../services/business/project-bill-service';
import { putInArray } from '../../services/utils/util';
import { ProjectPayBill } from './../../interfaces/response-interface';
import { PayBillService } from './../../services/business/pay-bill-service';
import { ChartService, ChartType } from './../../services/utils/chart-service';

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
export class ProjectBillDetailPage implements BusinessPageModel {
    @ViewChild('projectBillDetail') projectBillDetail: ElementRef;
    subscriptions: Subscription[] = [];
    overviewTotal: number;
    list: Observable<PayBillListItem[]>;

    constructor(
        private navParams: NavParams,
        private projectBill: ProjectBillService,
        private chartService: ChartService,
        private payBill: PayBillService,
        private translate: TranslateService
    ) {
    }

    ionViewDidLoad() {
        const bills = this.projectBill.getProjectPayBills()
            .filter(value => !!value.length)
            .mergeMap(bills => Observable.from(bills).first());

        this.initialModel();

        this.launch(bills);
    }

    initialModel(): void {
        this.list = this.getPayBillList();
    }

    launch(bills: Observable<ProjectPayBill>): void {
        this.subscriptions = [
            this.projectBill.getProjectBillList(Observable.of(this.navParams.get('billId'))),

            this.getProjectBillChart(bills),

            this.payBill.getPayBillList(bills.map(({ project_id, month }) => ({ project_id, month: initial(month.split('-')).join('-') }))),

            this.projectBill.handleError(),

            this.payBill.handleError(),
        ];
    }

    getProjectBillChart(bill: Observable<ProjectPayBill>): Subscription {
        const labels = this.translate.get(['TURN_OUT_FOR_WORK', 'OVERTIME', 'WORK_PIECE'])
            .map(res => ([res.TURN_OUT_FOR_WORK, res.OVERTIME, res.WORK_PIECE]));

        return bill.withLatestFrom(labels)
            .map(([bill, labels]) => {
                const data = [this.projectBill.countAttendanceAmount(bill), this.projectBill.countOvertimeAmount(bill), this.projectBill.countPieceAmount(bill)];

                this.overviewTotal = this.projectBill.countAmount(bill);

                return this.chartService.getPieChartData({ labels, data });
            })
            .subscribe(data => this.chartService.getChart(this.projectBillDetail.nativeElement, ChartType.doughnut, data));
    }

    getPayBillList(): Observable<PayBillListItem[]> {
        return this.payBill.getPayBills()
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
                    .reduce(putInArray, []);
            });
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
