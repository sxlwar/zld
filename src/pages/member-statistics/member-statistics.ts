import { WorkTypeRealTimeStatistics, TeamMembersStatistics, RealTimeStatisticsResponse, WorkTypeRealTimeStatisticsResponse, WorkType } from './../../interfaces/response-interface';
import { TranslateService } from '@ngx-translate/core';
import { CraftService } from './../../services/business/craft-service';
import { WorkerService } from './../../services/business/worker-service';
import { ChartService, ChartType, ChartData } from './../../services/utils/chart-service';
import { Subscription } from 'rxjs/Subscription';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';

export interface WorkTypeRealTimeStatisticsContainsName extends WorkTypeRealTimeStatistics {
    workTypeName: string;
}

@IonicPage()
@Component({
    selector: 'page-member-statistics',
    templateUrl: 'member-statistics.html',
})
export class MemberStatisticsPage {
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
            .map(res => this.fixAcutalData(res, 'worktype_id', 'worktype_id__count'))
            .zip(
            this.craft.getWorkTypeList(),
            (result, workTypes) => this.addWorkTypeName(result, workTypes)
            )
            .zip(this.translate.get('REQUIREMENT'), this.translate.get('ACTUAL_COUNT'))
            .map(([data, tip1, tip2]) => this.getBarChartData('workTypeName', this.getWorkTypeCount, data, tip1, tip2))
            .subscribe(data => this.chart.getChart(element.nativeElement, ChartType.horizontalBar, data));
    }

    getTeamMembersStatistics(element: ElementRef): Subscription {
        return this.workerService.getTeamMembersStatisticsResponse()
            .map(res => this.fixAcutalData(res, 'team_id', 'team_id__count'))
            .zip(this.translate.get('REQUIREMENT'), this.translate.get('ACTUAL_COUNT'))
            .map(([data, tip1, tip2]) => this.getBarChartData('team__name', this.getTeamMembersCount, data, tip1, tip2))
            .subscribe(data => this.chart.getChart(element.nativeElement, ChartType.horizontalBar, data));
    }

    private fixAcutalData<T>(data: RealTimeStatisticsResponse<T>, comparison: string, addition: string): RealTimeStatisticsResponse<T> {
        let { actual, total } = data;

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
        const labels = data.total.map(item => item[labelKey]);

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
}
