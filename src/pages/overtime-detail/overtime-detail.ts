import { MissionRoot } from './../pages';
import { overtime } from './../../services/business/icon-service';
import { PermissionService } from './../../services/config/permission-service';
import { OvertimeService } from './../../services/business/overtime-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { WorkFlow, Overtime } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-overtime-detail',
    templateUrl: 'overtime-detail.html',
})
export class OvertimeDetailPage {

    id: number;

    workFlow: Observable<WorkFlow>;

    overtime: Observable<Overtime>;

    subscriptions: Subscription[] = [];

    isAuditButtonVisibility: Observable<boolean>;

    audit$$: Subscription;

    constructor(
        private navParams: NavParams,
        private workFlowService: WorkFlowService,
        private overtimeService: OvertimeService,
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

        this.overtime = this.overtimeService.getOvertimeRecords().map(res => res[0]);

        this.isAuditButtonVisibility = this.workFlowService.isAuditButtonVisibility(
            this.navParams.get('status'),
            this.permission.getOperatePermission(overtime.icon, MissionRoot)
        );
    }

    launch() {
        this.subscriptions = [
            this.overtimeService.getOvertimeRecordList(this.overtimeService.getRecordOptions(this.id, this.navParams.get('status'))),
            this.overtimeService.handleError(),
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
