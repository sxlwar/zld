import { ProjectService } from './../../services/business/project-service';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { TimeService } from './../../services/utils/time-service';
import { Observable } from 'rxjs/Observable';
import { ProjectPayProcess, PayProcessStatus } from './../../interfaces/response-interface';
import { ChartService, ChartType } from './../../services/utils/chart-service';
import { ProjectProcessService } from './../../services/business/project-process-service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export interface ProcessList {
  yearMonth: string;
  amount: number;
}

@IonicPage()
@Component({
  selector: 'page-project-bill',
  templateUrl: 'project-bill.html',
})
export class ProjectBillPage {
  @ViewChild('overview') overview: ElementRef;
  subscriptions: Subscription[] = [];
  selectedStatus = '';
  overviewTotal: number;
  projectName: Observable<string>;
  list: Observable<ProcessList[]>;
  subTotal: Observable<number>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public processService: ProjectProcessService,
    public chartService: ChartService,
    public timeService: TimeService,
    public translate: TranslateService,
    public project: ProjectService
  ) {
    processService.getProcessList();
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    this.getSelectedStatus();

    this.getOverviewChart(this.processService.getProjectPayProcess());

    this.projectName = this.project.getProjectName();

    this.getListOfSelectedStatus();

    this.getSubTotal();
  }

  getSelectedStatus(): void {
    const subscription = this.processService.getSelectedStatus().subscribe(value => this.selectedStatus = value);

    this.subscriptions.push(subscription);
  }

  getListOfSelectedStatus(): void {
    this.list = this.processService.getListOfSelectedStatus()
    .mergeMap(processes => Observable.from(processes)
      .map(item => ({ yearMonth: this.timeService.getDateInfo(new Date(item.project_bill__month)).dateWithoutDay, amount: item.amount }))
      .reduce((acc, cur) => {
        acc.push(cur);
        return acc;
      }, [])); 
  }

  getOverviewChart(source: Observable<ProjectPayProcess[]>): void {
    const subscription = source.withLatestFrom(this.translate.get('TOTAL_AMOUNT'))
      .map(([processes, legend]) => {
        const labels = processes.map(item => this.timeService.getMonthFromStringDate(item.project_bill__month));

        const data = processes.map(item => item.amount);

        this.overviewTotal = data.reduce((acc, cur) => acc + cur, 0);

        return this.chartService.getBarChartData({ labels, data }, legend, data.length);
      })
      .subscribe(data => this.chartService.getChart(this.overview.nativeElement, ChartType.horizontalBar, data));

    this.subscriptions.push(subscription);
  }

  getSubTotal(): void {
    this.subTotal = this.list.map(item => item.reduce((acc,cur) => acc + cur.amount, 0));
  }

  segmentChanged(): void {
    this.processService.setSelectedStatus(this.selectedStatus);
  }

  goToNextPage(item): void {
    console.log(item);
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
