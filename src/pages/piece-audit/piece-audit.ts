import { ProcessIdOptions, SpecificWorkFlowState } from './../../interfaces/request-interface';
import { MissionRoot, pieceAuditDetailPage, applyPieceAuditPage } from './../pages';
import { pieceAudit } from './../../services/business/icon-service';
import { StatisticsService } from './../../services/business/statistics-service';
import { PermissionService } from './../../services/config/permission-service';
import { Subscription } from 'rxjs/Subscription';
import { MissionListItem, AuditTarget, WorkFlowPageType } from './../../interfaces/mission-interface';
import { Observable } from 'rxjs/Observable';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-piece-audit',
    templateUrl: 'piece-audit.html',
})
export class PieceAuditPage {

    total: Observable<number>;

    list: Observable<MissionListItem[]>;

    operate: Observable<boolean>;

    haveMoreData: Observable<boolean>;

    subscriptions: Subscription[] = [];

    page$$: Subscription;

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

        this.haveMoreData = this.workFlow.haveMoreData(this.workFlow.getPieceAuditPage());

        this.operate = this.permission.getOperatePermission(pieceAudit.icon, MissionRoot)
    }

    launch(): void {
        this.subscriptions = [
            this.workFlow.getSpecificWorkFlowList(
                Observable.of({ process_id: ProcessIdOptions.pieceAudit, ...this.workFlow.getWorkFlowStateOption(SpecificWorkFlowState.pending) }),
                this.workFlow.getPieceAuditPage()
            ),
            this.statistic.updateWorkFlowStatisticAtLocal(ProcessIdOptions.pieceAudit, this.workFlow.getTaskUpdateSuccessCount()),
            this.workFlow.handleWorkFlowError()
        ];
    }

    audit(target: AuditTarget): void {
        const { comment, ids, approve } = target;

        this.workFlow.updateMultiTask(Observable.of({ approve: Number(approve), id: ids, comment }));
    }

    applyPieceAudit(): void {
        this.navCtrl.push(applyPieceAuditPage).then(() => { });
    }

    getNextPage(infiniteScroll: InfiniteScroll) {
        this.page$$ && this.page$$.unsubscribe();

        this.page$$ = this.workFlow.getNextPage(infiniteScroll, WorkFlowPageType.pieceAuditPage);
    }

    goToNextPage(target: MissionListItem): void {
        this.navCtrl.push(pieceAuditDetailPage, { id: target.id, status: target.status }).then(() => { });
    }

    ionViewWillUnload() {
        this.workFlow.resetWorkFlowResponse();

        this.workFlow.resetPage(WorkFlowPageType.pieceAuditPage);

        this.page$$ && this.page$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
