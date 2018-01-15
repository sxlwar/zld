import { ProcessIdOptions, SpecificWorkFlowState } from './../../interfaces/request-interface';
import { modifyAttendance } from './../../services/business/icon-service';
import { MissionRoot, attendanceModifyDetailPage, applyAttendanceModifyPage } from './../pages';
import { StatisticsService } from './../../services/business/statistics-service';
import { PermissionService } from './../../services/config/permission-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { MissionListItem, AuditTarget, WorkFlowPageType } from './../../interfaces/mission-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-attendance-modify',
    templateUrl: 'attendance-modify.html',
})
export class AttendanceModifyPage {

    total: Observable<number>;

    list: Observable<MissionListItem[]>;

    operate: Observable<boolean>;

    haveMoreData: Observable<boolean>;

    subscriptions: Subscription[] = [];

    page$$: Subscription;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public workFlow: WorkFlowService,
        public permission: PermissionService,
        public statistic: StatisticsService
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

        this.haveMoreData = this.workFlow.haveMoreData(this.workFlow.getAttendanceModifyPage());

        this.operate = this.permission.getOperatePermission(modifyAttendance.icon, MissionRoot)
    }

    launch(): void {
        this.subscriptions = [
            this.workFlow.getSpecificWorkFlowList(
                Observable.of({ process_id: ProcessIdOptions.attendanceModify, ...this.workFlow.getWorkFlowStateOption(SpecificWorkFlowState.pending) }),
                this.workFlow.getPieceAuditPage()
            ),
            this.statistic.updateWorkFlowStatisticAtLocal(ProcessIdOptions.attendanceModify, this.workFlow.getTaskUpdateSuccessCount()),
            this.workFlow.handleWorkFlowError()
        ];
    }

    audit(target: AuditTarget): void {
        const { comment, ids, approve } = target;

        this.workFlow.updateMultiTask(Observable.of({ approve: Number(approve), id: ids, comment }));
    }

    getNextPage(infiniteScroll: InfiniteScroll) {
        this.page$$ && this.page$$.unsubscribe();

        this.page$$ = this.workFlow.getNextPage(infiniteScroll, WorkFlowPageType.attendanceModifyPage);
    }

    goToNextPage(target: MissionListItem): void {
        this.navCtrl.push(attendanceModifyDetailPage, { id: target.id, status: target.status }).then(() => { });
    }

    applyAttendanceModify(): void {
        this.navCtrl.push(applyAttendanceModifyPage);
    }

    ionViewWillUnload() {
        this.workFlow.resetWorkFlowResponse();

        this.workFlow.resetPage(WorkFlowPageType.attendanceModifyPage);

        this.page$$ && this.page$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
