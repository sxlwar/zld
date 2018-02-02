import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { leave } from '../../services/business/icon-service';
import { Leave, WorkFlow } from './../../interfaces/response-interface';
import { LeaveService } from './../../services/business/leave-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { PermissionService } from './../../services/config/permission-service';
import { MissionRoot } from './../pages';

@IonicPage()
@Component({
    selector: 'page-leave-detail',
    templateUrl: 'leave-detail.html',
})
export class LeaveDetailPage implements BusinessPageModel{

    id: number;

    workFlow: Observable<WorkFlow>;

    leave: Observable<Leave>;

    subscriptions: Subscription[] = [];

    isAuditButtonVisibility: Observable<boolean>;

    audit$: Subject<boolean> = new Subject();

    constructor(
        private navCtrl: NavController,
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

            this.workFlowService.getTaskUpdateSuccessResponse().subscribe(_ => this.navCtrl.pop()),

            this.workFlowService.auditTask(this.audit$.mapTo(this.id)),

            this.leaveService.handleError(),
        ];
    }

    ionViewWillUnload() {
        this.workFlowService.resetTaskUpdateResponse();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

}
