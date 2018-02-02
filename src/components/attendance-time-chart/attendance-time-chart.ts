import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusinessComponentModel } from '../../interfaces/core-interface';
import { ChartService, ChartType } from '../../services/utils/chart-service';
import { PayBillService } from './../../services/business/pay-bill-service';

export interface ChartSourceData {
    labels: string[];
    data: number[];
}

@Component({
    selector: 'attendance-time-chart',
    templateUrl: 'attendance-time-chart.html',
})
export class AttendanceTimeChartComponent implements BusinessComponentModel {

    @Input() yearMonth: string;

    @ViewChild('pieCanvas') pieCanvas: ElementRef;

    totalTime: Observable<number>;

    chart: any;

    subscriptions: Subscription[] = [];

    constructor(
        private payBill: PayBillService,
        private translate: TranslateService,
        private chartService: ChartService
    ) {
    }

    ngOnInit() {
        const sourceData = this.payBill.getAttendanceTimeStatistics();

        this.initialModel(sourceData);

        this.launch(sourceData);
    }

    launch(source: Observable<number[]>): void {
        this.subscriptions = [
            this.payBill.getPayBillList(Observable.of({ month: this.yearMonth })),
            this.getPieChart(source),
            this.payBill.handleError(),
        ];
    }

    initialModel(source: Observable<number[]>): void {
        this.totalTime = source.map(res => res.reduce((acc, cur) => acc + cur), 0);
    }

    getPieChart(sourceData: Observable<number[]>): Subscription {
        return this.getChartData(sourceData)
            .map(source => this.chartService.getPieChartData(source))
            .subscribe(data => this.chart = this.chartService.getChart(this.pieCanvas.nativeElement, ChartType.pie, data));
    }

    getChartData(sourceData: Observable<number[]>): Observable<ChartSourceData> {
        return this.getStatisticsLabel().withLatestFrom(sourceData)
            .map(([labels, data]) => ({ labels, data }));
    }

    getStatisticsLabel(): Observable<string[]> {
        return this.translate.get(['NORMAL_ATTENDANCE_TIME', 'NORMAL_OVERTIME_TIME', 'OVER_OVERTIME_TIME'])
            .map(res => ([res.NORMAL_ATTENDANCE_TIME, res.NORMAL_OVERTIME_TIME, res.OVER_OVERTIME_TIME]));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
