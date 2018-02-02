import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import * as pages from '../../pages/pages';
import { IconState } from '../../reducers/reducer/icons-reducer';
import * as icon from '../../services/business/icon-service';
import { AttendanceService } from './../../services/business/attendance-service';
import { StatisticsService } from './../../services/business/statistics-service';
import { WorkFlowService } from './../../services/business/work-flow-service';

const icons = [
    icon.attendanceConfirm,
    icon.leave,
    icon.overtime,
    icon.pieceAudit,
    icon.modifyAttendance,
    icon.signWorkerContract,
    icon.workContractModify,
    icon.iStarted,
    icon.iCompleted,
];

@IonicPage()
@Component({
    selector: 'page-mission',
    templateUrl: 'mission.html',
})
export class MissionPage implements BusinessPageModel{

    icons: Observable<IconState[]>;

    subscriptions: Subscription[] = [];

    constructor(
        private navCtrl: NavController,
        private iconService: icon.IconService,
        private statistics: StatisticsService,
        private workFlow: WorkFlowService,
        private attendance: AttendanceService
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
