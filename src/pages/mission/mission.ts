import { Subscription } from 'rxjs/Subscription';
import { workFlowMap } from './../../services/business/icon-service';
//region
import { WorkFlowAggregation } from './../../interfaces/response-interface';
import { StatisticsService } from './../../services/business/statistics-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { IconState } from '../../reducers/reducer/icons-reducer';
import { IconService } from '../../services/business/icon-service';
import * as Icons from '../../services/business/icon-service';
import * as pages from '../../pages/pages';
//endregion


/* *
  * iconState => workFlow => workFlowAggregation
    icon:string => enum name: process_id =>  process_id: string;
 */
const icons = [
  Icons.attendanceConfirm,
  Icons.payrollAudit,
  Icons.leave,
  Icons.overtime,
  Icons.pieceAudit,
  Icons.modifyAttendance,
  Icons.workContract,
  Icons.primeContract,
  Icons.subContract,
  Icons.modifyDuty,
  Icons.workContractModify,
  Icons.myLaunch,
  Icons.myAudited
];

@IonicPage()
@Component({
  selector: 'page-mission',
  templateUrl: 'mission.html',
})
export class MissionPage {

  icons: Observable<IconState[]>;

  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public iconService: IconService,
    public statistics: StatisticsService
  ) {
    this.icons = this.iconService.getIcons(pages.MissionRoot, icons);
  }

  ionViewWillEnter() {
    this.addBadge();
  }

  addBadge() {
    this.addAttendanceConfirmBadge();

    this.addWorkFlowBadge();
  }

  addAttendanceConfirmBadge() {
    this.iconService.addBadge(this.attendanceConfirmBadge(), [pages.MissionRoot, Icons.attendanceConfirm.icon]);
  }

  addWorkFlowBadge() {

    const workFlowBadges = this.workFlowBadges();

    this.subscription = this.getBadgeIcons()
      .subscribe(iconState => {
        const processId = workFlowMap.get(iconState.icon);

        const iconName = iconState.icon;

        const observable = workFlowBadges.filter(aggregation => aggregation.process_id === processId).map(aggregation => aggregation.process_id__count);

        this.iconService.addBadge(observable, [pages.MissionRoot, iconName]);
        return [observable, [pages.MissionRoot, iconName]];
      });

  }

  getBadgeIcons(): Observable<IconState> {
    return this.icons
      .mergeMap(icons => Observable.from(icons).filter(icon => this.iconService.needBadge(icon)));
  }

  attendanceConfirmBadge(): Observable<number> {
    return this.getBadgeIcons()
      .filter(item => item.icon === Icons.attendanceConfirm.icon)
      .switchMapTo(this.statistics.getAttendanceResultStatistics())
  }

  workFlowBadges(): Observable<WorkFlowAggregation> {
    return this.statistics.getWorkFlowStatistics()
      .mergeMap(aggregations => Observable.from(aggregations));
  }

  goTo(item) {
    this.navCtrl.push(item.page, item).then(() => { });
  }

  ionViewDidLeave(){
   this.subscription.unsubscribe();
  }

}
