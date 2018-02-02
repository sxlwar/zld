import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import {
    RealTimeStatisticsResponse,
    TeamMembersStatistics,
    WorkType,
    WorkTypeRealTimeStatistics,
    WorkTypeRealTimeStatisticsResponse,
} from './../../interfaces/response-interface';
import { CraftService } from './../../services/business/craft-service';
import { WorkerService } from './../../services/business/worker-service';
import { ChartData, ChartService, ChartType } from './../../services/utils/chart-service';

export interface WorkTypeRealTimeStatisticsContainsName extends WorkTypeRealTimeStatistics {
    workTypeName: string;
}

@IonicPage()
@Component({
    selector: 'page-member-statistics',
    templateUrl: 'member-statistics.html',
})
export class MemberStatisticsPage implements BusinessPageModel{
    @ViewChild('workType') workType: ElementRef;

    @ViewChild('teamMembers') teamMembers: ElementRef;

    subscriptions: Subscription[] = [];

    constructor(
        private chart: ChartService,
        private workerService: WorkerService,
        private craft: CraftService,
        private translate: TranslateService
    ) {
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {

    }

    launch(): void {
        this.subscriptions = [
            this.workerService.getWorkTypeRealTimeStatistics(),

            this.workerService.getTeamMembersRealTimeStatistics(),

            this.getWorkTypeStatistics(this.workType),

            this.getTeamMembersStatistics(this.teamMembers),

            this.workerService.handlerTeamMembersRealTimeStatisticsError(),

            this.workerService.handlerWorkTypeRealTimeStatisticsError(),
        ];
    }

    getWorkTypeStatistics(element: ElementRef): Subscription {
        return this.workerService.getWorkTypeRealTimeStatisticsResponse()
            .withLatestFrom(this.craft.getWorkTypeList(), (res, workTypes) => this.addWorkTypeName(this.fixAcutalData(res, 'worktype_id', 'worktype_id__count'), workTypes))
            .zip(this.translate.get('SIGNED_COUNT'), this.translate.get('WORKING_COUNT'))
            .map(([data, tip1, tip2]) => this.getBarChartData('workTypeName', this.getWorkTypeCount, data, tip1, tip2))
            .subscribe(data => this.chart.getChart(element.nativeElement, ChartType.horizontalBar, data, this.chart.getShortLabelOptions()));
    }

    getTeamMembersStatistics(element: ElementRef): Subscription {
        return this.workerService.getTeamMembersStatisticsResponse()
            .map(res => this.fixAcutalData(res, 'team_id', 'team_id__count'))
            .zip(this.translate.get('SIGNED_COUNT'), this.translate.get('WORKING_COUNT'))
            .map(([data, tip1, tip2]) => this.getBarChartData('team__name', this.getTeamMembersCount, data, tip1, tip2))
            .subscribe(data => this.chart.getChart(element.nativeElement, ChartType.horizontalBar, data, this.chart.getShortLabelOptions()));
    }

    private fixAcutalData<T>(data: RealTimeStatisticsResponse<T>, comparison: string, addition: string): RealTimeStatisticsResponse<T> {
        const { actual, total } = data;

        const actualFixed = total.map(requirement => {
            const target = actual.find(item => item[comparison] === requirement[comparison]);

            const count = target ? target[addition] : 0;

            const result = Object.assign({}, requirement);

            result[addition] = count;

            return result;
        });

        return { total, actual: actualFixed };
    }

    private addWorkTypeName(data: WorkTypeRealTimeStatisticsResponse, workTypes: WorkType[]): RealTimeStatisticsResponse<WorkTypeRealTimeStatisticsContainsName> {
        const { actual, total } = data;

        const fn: (x: WorkTypeRealTimeStatistics) => WorkTypeRealTimeStatisticsContainsName = item => ({ ...item, workTypeName: workTypes.find(type => type.id === item.worktype_id).name });

        return { actual: actual.map(fn), total: total.map(fn) };
    }

    private getBarChartData<T>(labelKey: string, dataFn: (x: any) => number, data: RealTimeStatisticsResponse<T>, requirementTip: string, actualTip: string): ChartData {
        const labels: string[] = data.total.map(item => item[labelKey]);

        const requirement = this.chart.getBarChartData({ labels, data: data.total.map(dataFn) }, requirementTip, data.total.length);

        const actual = this.chart.getBarChartData({ labels, data: data.actual.map(dataFn) }, actualTip, data.actual.length, .5);

        return { labels: requirement.labels, datasets: requirement.datasets.concat(actual.datasets) };
    }

    private getWorkTypeCount(data: WorkTypeRealTimeStatisticsContainsName): number {
        return data.worktype_id__count;
    }

    private getTeamMembersCount(data: TeamMembersStatistics): number {
        return data.team_id__count;
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
