import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { PermissionService } from '../../services/config/permission-service';
import { AuditTarget, MissionListItem, WorkFlowPageType } from './../../interfaces/mission-interface';
import { ProcessIdOptions, SpecificWorkFlowState } from './../../interfaces/request-interface';
import { overtime } from './../../services/business/icon-service';
import { StatisticsService } from './../../services/business/statistics-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { applyOvertimePage, MissionRoot, overtimeDetailPage } from './../pages';

@IonicPage()
@Component({
    selector: 'page-overtime',
    templateUrl: 'overtime.html',
})
export class OvertimePage implements BusinessPageModel {

    subscriptions: Subscription[] = [];

    total: Observable<number>;

    list: Observable<MissionListItem[]>;

    operate: Observable<boolean>;

    haveMoreData: Observable<boolean>;

    nextPage$: Subject<InfiniteScroll> = new Subject();

    audit$: Subject<AuditTarget> = new Subject();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private workFlow: WorkFlowService,
        private permission: PermissionService,
        private statistic: StatisticsService
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
        this.total = this.workFlow.getCount();

        this.list = this.workFlow.getList();

        this.haveMoreData = this.workFlow.haveMoreData(this.workFlow.getOvertimePage());

        this.operate = this.permission.getOperatePermission(overtime.icon, MissionRoot)
    }

    launch(): void {
        this.subscriptions = [
            this.workFlow.getSpecificWorkFlowList(
                Observable.of({ process_id: ProcessIdOptions.overtime, ...this.workFlow.getWorkFlowStateOption(SpecificWorkFlowState.pending) }),
                this.workFlow.getOvertimePage()
            ),

            this.statistic.updateWorkFlowStatisticAtLocal(ProcessIdOptions.overtime, this.workFlow.getTaskUpdateSuccessCount()),

            ...this.workFlow.getNextPage(this.nextPage$, WorkFlowPageType.overtimePage),

            this.workFlow.updateMultiTask(this.audit$.map(({ comment, ids, approve }) => ({ approve: Number(approve), ids, comment }))),

            this.workFlow.handleWorkFlowError(),

            this.workFlow.handleUpdateError(),
        ];
    }

    applyOvertime(): void {
        this.navCtrl.push(applyOvertimePage).then(() => { });
    }

    goToNextPage(target: MissionListItem): void {
        this.navCtrl.push(overtimeDetailPage, { id: target.id, status: target.status }).then(() => { });
    }

    ionViewWillUnload() {
        this.workFlow.resetWorkFlowResponse();

        this.workFlow.resetTaskUpdateResponse();

        this.workFlow.resetPage(WorkFlowPageType.overtimePage);

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
