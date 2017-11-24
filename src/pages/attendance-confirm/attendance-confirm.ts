import { orderBy } from 'lodash';
import { AttendanceConfirmStatisticByTeam, AttendanceConfirmStatisticByDay, AttendanceStatisticDayItem } from './../../services/business/statistics-service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ChartService, ChartType } from './../../services/utils/chart-service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatisticsService } from '../../services/business/statistics-service';

@IonicPage()
@Component({
  selector: 'page-attendance-confirm',
  templateUrl: 'attendance-confirm.html',
})
export class AttendanceConfirmPage {

  @ViewChild('teamChart') teamChart: ElementRef;

  @ViewChild('dayChart') dayChart: ElementRef;

  teams: Observable<{ name: string }[]>;

  days: Observable<{ date: string }[]>;

  statisticList: Observable<AttendanceStatisticDayItem[]>;

  subscriptions: Subscription[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public statistics: StatisticsService,
    public chartService: ChartService
  ) {
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    const teamSource = this.statistics.getAttendanceStatisticsByTeam('unconfirm_count');

    this.generateTeamChart(teamSource);

    this.getTeams(teamSource);

    const daySource = this.statistics.getAttendanceConfirmByDay('unconfirm_count');

    this.generateDayChart(daySource);

    this.getDays(daySource);

    this.statisticList = this.statistics.getAttendanceItemOf('unconfirm_count');
  }

  generateTeamChart(sourceData: Observable<AttendanceConfirmStatisticByTeam[]>) {
    const subscription = sourceData.map(source => {
      const labels = source.map(item => item.teamName);

      const data = source.map(item => item.count);

      return this.chartService.getPieChartData({ labels, data });
    })
      .subscribe(data => {
        this.chartService.getChart(this.teamChart.nativeElement, ChartType.doughnut, data);
      });

    this.subscriptions.push(subscription);
  }

  getTeams(sourceData: Observable<AttendanceConfirmStatisticByTeam[]>) {
    this.teams = sourceData.map(data => data.map(item => ({ name: item.teamName })));
  }

  generateDayChart(sourceData: Observable<AttendanceConfirmStatisticByDay[]>) {
    const subscription = sourceData
      .map(source => {
        const labels = source.map(item => item.date);

        const data = source.map(item => item.count);

        return this.chartService.getBarChartData({ labels, data}, '未确认数量');
      })
      .subscribe(data => {
        const options = {
          scales: {
            yAxes: [{ ticks: { beginAtZero: true } }]
          }
        };

        this.chartService.getChart(this.dayChart.nativeElement, ChartType.bar, data, options);
      });

    this.subscriptions.push(subscription);
  }

  getDays(sourceData: Observable<AttendanceConfirmStatisticByDay[]>) {
    this.days = sourceData.map(data => {
      let result = data.map(item => ({ date: item.date }));

      return orderBy(result,['date'], ['desc']);
    });
  }

  filterDataBy(type: string, event): void {
    if(type === 'team') {
      this.statistics.showAttendanceByTeams(event.map(item => item.name));
    }

    if(type === 'day') {
      this.statistics.showAttendanceByDates(event.map(item => item.date));
    }
  }

  goToNextPage(statistic) {
    //TODO:把数据传给考勤表page完事。
    console.log(statistic);
  }

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}