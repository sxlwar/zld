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
  Icons.payrollAudit,
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
    public workFlow: WorkFlowService
  ) {
  }

  ionViewDidLoad() {
    this.initialModel();

    this.launch();
  }

  initialModel() {
    this.icons = this.iconService.getIcons(pages.MissionRoot, icons);
  }

  launch() {
    this.subscriptions = [
      this.iconService.addMissionBadge(this.statistics.getAttendanceResultStatistics('unconfirm_count')),
      this.workFlow.getWorkFlowStatistic(),
      this.workFlow.handleStatisticsError()
    ];
  }

  goTo(item) {
    this.navCtrl.push(item.page, item).then(() => { });
  }

  ionViewWillUnload() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

}
