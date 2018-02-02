import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { AuditTarget, MissionListItem, WorkFlowPageType } from '../../interfaces/mission-interface';
import { processIdToPage, ScreeningCondition, screeningConditions } from './../../interfaces/mission-interface';
import { SpecificWorkFlowState } from './../../interfaces/request-interface';
import { iStarted } from './../../services/business/icon-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { PermissionService } from './../../services/config/permission-service';
import { MissionRoot } from './../pages';

@IonicPage()
@Component({
    selector: 'page-i-started',
    templateUrl: 'i-started.html',
})
export class IStartedPage implements BusinessPageModel{

    total: Observable<number>;

    list: Observable<MissionListItem[]>;

    operate: Observable<boolean>;

    haveMoreData: Observable<boolean>;

    subscriptions: Subscription[] = [];

    nextPage$: Subject<InfiniteScroll> = new Subject();

    audit$: Subject<AuditTarget> = new Subject();

    screeningConditions: ScreeningCondition[] = screeningConditions;

    screening: string;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private workFlow: WorkFlowService,
        private permission: PermissionService
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

        this.list = this.workFlow.getList().combineLatest(this.workFlow.getScreeningCondition(), (list, condition) => list.filter(item => !condition || item.processId === condition));

        this.haveMoreData = this.workFlow.haveMoreData(this.workFlow.getIStartedPage());

        this.operate = this.permission.getOperatePermission(iStarted.icon, MissionRoot);
    }

    launch(): void {
        this.subscriptions = [
            this.workFlow.getSpecificWorkFlowList(
                Observable.of(this.workFlow.getWorkFlowStateOption(SpecificWorkFlowState.launch)),
                this.workFlow.getIStartedPage()
            ),

            this.workFlow.getScreeningCondition().subscribe(screening => this.screening = screening),

            this.workFlow.updateMultiTask(this.audit$.map(({ comment, ids, approve }) => ({ id: ids, comment, approve: Number(approve) }))),

            ...this.workFlow.getNextPage(this.nextPage$, WorkFlowPageType.iCompletedPage),

            this.workFlow.handleWorkFlowError(),
        ];
    }

    goToNextPage(target: MissionListItem): void {
        this.navCtrl.push(processIdToPage[target.processId], { id: target.id, status: target.status }).then(() => { });
    }

    setScreeningCondition(processId: string): void {
        this.workFlow.setScreeningCondition(processId);
    }

    ionViewWillUnload() {
        this.workFlow.resetWorkFlowResponse();

        this.workFlow.resetPage(WorkFlowPageType.iStartedPage);

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
