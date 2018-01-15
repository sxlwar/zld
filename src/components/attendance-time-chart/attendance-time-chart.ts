import { TranslateService } from '@ngx-translate/core';
import { PayBillService } from './../../services/business/pay-bill-service';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChartService, ChartType } from '../../services/utils/chart-service';
import { Subscription } from 'rxjs/Subscription';


export interface ChartSourceData {
    labels: string[];
    data: number[];
}

@Component({
    selector: 'attendance-time-chart',
    templateUrl: 'attendance-time-chart.html'
})
export class AttendanceTimeChartComponent implements OnInit {

    @Input() yearMonth: string;

    @ViewChild('pieCanvas') pieCanvas: ElementRef;

    totalTime: Observable<number>;

    chart: any;

    chartSubscription: Subscription;

    constructor(
        public payBill: PayBillService,
        public translate: TranslateService,
        public chartService: ChartService
    ) {
    }

    ngOnInit() {
        const sourceData = this.payBill.getAttendanceTimeStatistics(Observable.of({ month: this.yearMonth }));

        this.totalTime = sourceData.map(res => res.reduce((acc, cur) => acc + cur), 0);

        this.getPieChart(sourceData);
    }

    getPieChart(sourceData: Observable<number[]>) {
        this.chartSubscription = this.getChartData(sourceData).map(source => this.chartService.getPieChartData(source))
            .subscribe(data => {
                this.chart = this.chartService.getChart(this.pieCanvas.nativeElement, ChartType.pie, data);
            })
    }

    getChartData(sourceData: Observable<number[]>): Observable<ChartSourceData> {
        return this.getStatisticsLabel().zip(sourceData)
            .map(res => {
                const [labels, data] = res;

                return { labels, data };
            })
    }

    getStatisticsLabel(): Observable<string[]> {
        return this.translate.get(['NORMAL_ATTENDANCE_TIME', 'NORMAL_OVERTIME_TIME', 'OVER_OVERTIME_TIME'])
            .map(res => ([res.NORMAL_ATTENDANCE_TIME, res.NORMAL_OVERTIME_TIME, res.OVER_OVERTIME_TIME]));
    }
}

