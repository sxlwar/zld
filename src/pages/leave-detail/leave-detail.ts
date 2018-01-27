import { leave } from '../../services/business/icon-service';
import { MissionRoot } from './../pages';
import { PermissionService } from './../../services/config/permission-service';
import { LeaveService } from './../../services/business/leave-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { Leave, WorkFlow } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-leave-detail',
    templateUrl: 'leave-detail.html',
})
export class LeaveDetailPage {

    id: number;

    workFlow: Observable<WorkFlow>;

    leave: Observable<Leave>;

    subscriptions: Subscription[] = [];

    isAuditButtonVisibility: Observable<boolean>;

    audit$$: Subscription;

    constructor(
        private navParams: NavParams,
        private workFlowService: WorkFlowService,
        private leaveService: LeaveService,
        private permission: PermissionService
    ) {
        this.id = navParams.get('id');
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel() {
        this.workFlow = this.workFlowService.getWorkFlow(this.id);

        this.leave = this.leaveService.getLeaveRecordLists().map(res => res[0]);

        this.isAuditButtonVisibility = this.workFlowService.isAuditButtonVisibility(
            this.navParams.get('status'),
            this.permission.getOperatePermission(leave.icon, MissionRoot)
        );
    }

    launch() {
        this.subscriptions = [
            this.leaveService.getLeaveRecord(this.leaveService.getRecordOptions(this.id, this.navParams.get('status'))),
            this.leaveService.handleError()
        ];
    }

    audit() {
        this.audit$$ && this.audit$$.unsubscribe();

        this.audit$$ = this.workFlowService.auditTask(this.id);
    }

    ionViewWillUnload() {
        this.audit$$ && this.audit$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

}
