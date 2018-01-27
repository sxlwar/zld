import { MissionRoot } from './../pages';
import { modifyAttendance } from './../../services/business/icon-service';
import { PermissionService } from './../../services/config/permission-service';
import { AttendanceService } from './../../services/business/attendance-service';
import { WorkFlowService } from '../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { WorkFlow, AttendanceModify } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-attendance-modify-detail',
    templateUrl: 'attendance-modify-detail.html',
})
export class AttendanceModifyDetailPage {

    id: number;

    workFlow: Observable<WorkFlow>;

    attendance: Observable<AttendanceModify>;

    subscriptions: Subscription[] = [];

    audit$$: Subscription;

    isAuditButtonVisibility: Observable<boolean>;

    constructor(
        private navParams: NavParams,
        private workFlowService: WorkFlowService,
        private attendanceService: AttendanceService,
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

        this.attendance = this.attendanceService.getAttendanceModifyRecordLists().map(res => res[0]);

        this.isAuditButtonVisibility = this.workFlowService.isAuditButtonVisibility(
            this.navParams.get('status'),
            this.permission.getOperatePermission(modifyAttendance.icon, MissionRoot)
        );
    }

    launch() {
        this.subscriptions = [
            this.attendanceService.getAttendanceModifyRecord(this.attendanceService.getRecordOptions(this.id, this.navParams.get('status'))),
            this.attendanceService.handleAttendanceModifyError()
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
