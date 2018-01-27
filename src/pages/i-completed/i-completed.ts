import { SpecificWorkFlowState } from './../../interfaces/request-interface';
import { MissionRoot } from './../pages';
import { PermissionService } from './../../services/config/permission-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { MissionListItem, AuditTarget, WorkFlowPageType, processIdToPage, ScreeningCondition, screeningConditions } from './../../interfaces/mission-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { iCompleted } from '../../services/business/icon-service';

@IonicPage()
@Component({
    selector: 'page-i-completed',
    templateUrl: 'i-completed.html',
})
export class ICompletedPage {

    total: Observable<number>;

    list: Observable<MissionListItem[]>;

    operate: Observable<boolean>;

    haveMoreData: Observable<boolean>;

    subscriptions: Subscription[] = [];

    page$$: Subscription;

    screeningConditions: ScreeningCondition[] = screeningConditions;

    screening: string;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private workFlow: WorkFlowService,
        private permission: PermissionService,
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

        this.haveMoreData = this.workFlow.haveMoreData(this.workFlow.getICompletedPage());

        this.operate = this.permission.getOperatePermission(iCompleted.icon, MissionRoot);
    }

    launch(): void {
        this.subscriptions = [
            this.workFlow.getSpecificWorkFlowList(
                Observable.of(this.workFlow.getWorkFlowStateOption(SpecificWorkFlowState.completed)),
                this.workFlow.getICompletedPage()
            ),
            this.workFlow.getScreeningCondition().subscribe(screening => this.screening = screening),
            this.workFlow.handleWorkFlowError()
        ];
    }

    audit(target: AuditTarget): void {
        const { comment, ids, approve } = target;

        this.workFlow.updateMultiTask(Observable.of({ approve: Number(approve), id: ids, comment }));
    }

    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.page$$ && this.page$$.unsubscribe();

        this.page$$ = this.workFlow.getNextPage(infiniteScroll, WorkFlowPageType.iCompletedPage);
    }

    goToNextPage(target: MissionListItem): void {
        this.navCtrl.push(processIdToPage[target.processId], { id: target.id }).then(() => { });
    }

    setScreeningCondition(processId: string): void {
        this.workFlow.setScreeningCondition(processId);
    }

    ionViewWillUnload() {
        this.workFlow.resetWorkFlowResponse();

        this.workFlow.resetPage(WorkFlowPageType.iCompletedPage);

        this.page$$ && this.page$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
