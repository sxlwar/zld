import { putInArray } from '../../services/utils/util';
//region
import { ProjectService } from './../../services/business/project-service';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { TimeService } from './../../services/utils/time-service';
import { Observable } from 'rxjs/Observable';
import { ProjectPayProcess } from './../../interfaces/response-interface';
import { ChartService, ChartType } from './../../services/utils/chart-service';
import { ProjectProcessService } from './../../services/business/project-process-service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { projectBillDetailPage } from '../../pages/pages';
//endregion

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
        private navCtrl: NavController,
        private navParams: NavParams,
        private processService: ProjectProcessService,
        private chartService: ChartService,
        private timeService: TimeService,
        private translate: TranslateService,
        private project: ProjectService
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

    initialModel(): void {
        this.projectName = this.project.getProjectName();

        this.list = this.getListOfSelectedStatus();

        this.subTotal = this.list.map(item => item.reduce((acc, cur) => acc + cur.amount, 0));
    }

    launch(): void {
        this.subscriptions = [
            this.processService.getProcessList(),
            this.processService.getSelectedStatus().subscribe(value => this.selectedStatus = value),
            this.getOverviewChart(this.processService.getProjectPayProcess()),
            this.processService.handleError(),
        ];
    }

    getListOfSelectedStatus(): Observable<ProcessList[]> {
        return this.processService.getListOfSelectedStatus()
            .mergeMap(processes => Observable.from(processes)
                .map(item => ({ yearMonth: this.timeService.getDateInfo(new Date(item.project_bill__month)).dateWithoutDay, amount: item.amount, billId: item.project_bill_id }))
                .reduce(putInArray, [])
            );
    }

    getOverviewChart(source: Observable<ProjectPayProcess[]>): Subscription {
        return source.withLatestFrom(this.translate.get('TOTAL_AMOUNT'))
            .map(([processes, legend]) => {
                const labels = processes.map(item => this.timeService.getMonthFromStringDate(item.project_bill__month));

                const data = processes.map(item => item.amount);

                this.overviewTotal = data.reduce((acc, cur) => acc + cur, 0);

                return this.chartService.getBarChartData({ labels, data }, legend, data.length);
            })
            .subscribe(data => this.chartService.getChart(this.overview.nativeElement, ChartType.horizontalBar, data));
    }

    segmentChanged(): void {
        this.processService.setSelectedStatus(this.selectedStatus);
    }

    goToNextPage(item: ProcessList): void {
        this.navCtrl.push(projectBillDetailPage, item).then(() => { });
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
