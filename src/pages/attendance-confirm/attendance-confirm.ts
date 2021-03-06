import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { orderBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { StatisticsService } from '../../services/business/statistics-service';
import { AttendanceService } from './../../services/business/attendance-service';
import {
    AttendanceConfirmStatisticByDay,
    AttendanceConfirmStatisticByTeam,
    AttendanceStatisticDayItem,
} from './../../services/business/statistics-service';
import { ChartService, ChartType } from './../../services/utils/chart-service';
import { attendanceConfirmDetailPage } from './../pages';

@IonicPage()
@Component({
    selector: 'page-attendance-confirm',
    templateUrl: 'attendance-confirm.html',
})
export class AttendanceConfirmPage implements BusinessPageModel{
    selectedTeams: { name: string }[]

    @ViewChild('teamChart') teamChart: ElementRef;

    @ViewChild('dayChart') dayChart: ElementRef;

    teams: Observable<{ name: string }[]>;

    days: Observable<{ date: string }[]>;

    statisticList: Observable<AttendanceStatisticDayItem[]>;

    subscriptions: Subscription[] = [];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private statistics: StatisticsService,
        private chartService: ChartService,
        private attendance: AttendanceService
    ) {
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.attendance.getAttendanceStatisticsByTeam(),

            this.generateTeamChart(this.getTeams()),

            this.generateDayChart(this.getDays()),

            this.attendance.handleStatisticsError(),
        ]
    }

    initialModel(): void {
        this.statisticList = this.statistics.getAttendanceItemOf('unconfirm_count');

        this.teams = this.getTeams().map(data => data.map(item => ({ name: item.teamName })));

        this.days = this.getDays().map(data => orderBy(data.map(item => ({ date: item.date })), ['date'], ['desc']));
    }

    getTeams(): Observable<AttendanceConfirmStatisticByTeam[]> {
        return this.statistics.getAttendanceStatisticsByTeam('unconfirm_count');
    }

    getDays(): Observable<AttendanceConfirmStatisticByDay[]> {
        return this.statistics.getAttendanceConfirmByDay('unconfirm_count');
    }

    generateTeamChart(sourceData: Observable<AttendanceConfirmStatisticByTeam[]>): Subscription {
        return sourceData.map(source => {
            const labels = source.map(item => item.teamName);

            const data = source.map(item => item.count);

            return this.chartService.getPieChartData({ labels, data });
        })
            .subscribe(data => {
                this.chartService.getChart(this.teamChart.nativeElement, ChartType.doughnut, data);
            });
    }

    generateDayChart(sourceData: Observable<AttendanceConfirmStatisticByDay[]>): Subscription {
        return sourceData
            .map(source => {
                const labels = source.map(item => item.date);

                const data = source.map(item => item.count);

                return this.chartService.getBarChartData({ labels, data }, '未确认数量');
            })
            .subscribe(data => {
                const options = {
                    scales: {
                        yAxes: [{ ticks: { beginAtZero: true } }],
                    },
                };

                this.chartService.getChart(this.dayChart.nativeElement, ChartType.bar, data, options);
            });
    }

    filterDataBy(type: string, event): void {
        if (type === 'team') {
            this.statistics.showAttendanceByTeams(event.map(item => item.name));
        }

        if (type === 'day') {
            this.statistics.showAttendanceByDates(event.map(item => item.date));
        }
    }

    goToNextPage(statistic: AttendanceStatisticDayItem): void {
        this.navCtrl.push(attendanceConfirmDetailPage, { statistic }).then(() => { });
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
