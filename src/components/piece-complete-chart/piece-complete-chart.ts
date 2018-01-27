import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { ChartService, ChartType } from './../../services/utils/chart-service';
import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';

/**
 * Generated class for the PieceCompleteChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'piece-complete-chart',
    templateUrl: 'piece-complete-chart.html'
})
export class PieceCompleteChartComponent implements OnInit, OnDestroy {

    @Input() complete: number;

    @Input() total: number;

    @ViewChild('pieceChart') pieceChart: ElementRef;

    subscription: Subscription;

    constructor(
        private chart: ChartService,
        private translate: TranslateService
    ) {
    }

    ngOnInit() {
        this.subscription = this.translate.get(['UNCOMPLETED_COUNT', 'COMPLETE_COUNT'])
            .map(res => {
                const labels = [res.UNCOMPLETED_COUNT, res.COMPLETE_COUNT];

                const data = [this.total - this.complete, this.complete];

                return this.chart.getPieChartData({ labels, data });
            })
            .subscribe(data => this.chart.getChart(this.pieceChart.nativeElement, ChartType.pie, data));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
