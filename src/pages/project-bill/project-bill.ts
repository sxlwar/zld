import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { TimeService } from './../../services/utils/time-service';
import { Observable } from 'rxjs/Observable';
import { ProjectPayProcess } from './../../interfaces/response-interface';
import { ChartService, ChartType } from './../../services/utils/chart-service';
import { ProjectProcessService } from './../../services/business/project-process-service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProjectBillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-bill',
  templateUrl: 'project-bill.html',
})
export class ProjectBillPage {
  @ViewChild('overview') overview: ElementRef;
  // @ViewChild('grantIn') grantIn: ElementRef;
  // @ViewChild('pendingRelease') pendingRelease: ElementRef;
  // @ViewChild('alreadyIssued') alreadyIssued: ElementRef;

  subscriptions: Subscription[] = [];
  selectedStatus = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public processService: ProjectProcessService,
    public chartService: ChartService,
    public timeService: TimeService,
    public translate: TranslateService
  ) {
    processService.getProcessList();
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    this.getSelectedStatus();
    
    const processes = this.processService.getProjectPayProcess();

    this.getOverviewChart(processes);

    processes.subscribe(v => console.log(v));
  }

  getSelectedStatus() {
    const subscription = this.processService.getSelectedStatus().subscribe(value => this.selectedStatus = value);

    this.subscriptions.push(subscription);
  }

  getOverviewChart(source: Observable<ProjectPayProcess[]>) {
    const subscription = source.withLatestFrom(this.translate.get('TOTAL_AMOUNT'))
      .map(([processes, legend]) => {
        const labels = processes.map(item => this.timeService.getMonthFromStringDate(item.project_bill__month));

        const data = processes.map(item => item.amount);

        return this.chartService.getBarChartData({ labels, data }, legend, data.length);
      })
      .subscribe(data => this.chartService.getChart(this.overview.nativeElement, ChartType.horizontalBar, data));

    this.subscriptions.push(subscription);
  }

  segmentChanged() {
    this.processService.setSelectedStatus(this.selectedStatus);
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
