import { AttendanceService } from './../../services/business/attendance-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { StatisticsService } from './../../services/business/statistics-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { IconState } from '../../reducers/reducer/icons-reducer';
import { IconService } from '../../services/business/icon-service';
import * as Icons from '../../services/business/icon-service';
import * as pages from '../../pages/pages';

const icons = [
    Icons.attendanceConfirm,
    Icons.leave,
    Icons.overtime,
    Icons.pieceAudit,
    Icons.modifyAttendance,
    Icons.signWorkerContract,
    Icons.workContractModify,
    Icons.iStarted,
    Icons.iCompleted
];

@IonicPage()
@Component({
    selector: 'page-mission',
    templateUrl: 'mission.html',
})
export class MissionPage {

    icons: Observable<IconState[]>;

    subscription: Subscription;

    subscriptions: Subscription[] = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public iconService: IconService,
        public statistics: StatisticsService,
        public workFlow: WorkFlowService,
        public attendance: AttendanceService
    ) {
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel() {
        this.icons = this.iconService.selectIcons(pages.MissionRoot);
    }

    launch() {
        this.subscriptions = [
            this.attendance.getAttendanceStatisticsByTeam(), 
            this.iconService.addRootModuleIcons(pages.MissionRoot, icons),
            this.iconService.addMissionBadge(this.statistics.getAttendanceResultStatistics('unconfirm_count')),
            this.workFlow.getWorkFlowStatistic(),
            this.workFlow.handleStatisticsError(),
            this.attendance.handleStatisticsError(),
        ];
    }

    goTo(item) {
        this.navCtrl.push(item.page, item).then(() => { });
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }

}
