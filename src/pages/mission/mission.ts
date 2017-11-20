import { StatisticsService } from './../../services/business/statistics-service';
import { attendanceConfirm } from './../../services/business/icon-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { IconState } from '../../reducers/reducer/icons-reducer';
import { IconService } from '../../services/business/icon-service';
import * as icon from '../../services/business/icon-service';
import * as pages from '../../pages/pages';

const icons = [
  icon.attendanceConfirm,
  icon.payrollAudit,
  icon.leave,
  icon.overtime,
  icon.pieceAudit,
  icon.modifyAttendance,
  icon.workContract,
  icon.primeContract,
  icon.subContract,
  icon.modifyDuty,
  icon.workContractModify,
  icon.myLaunch,
  icon.myAudited
];

@IonicPage()
@Component({
  selector: 'page-mission',
  templateUrl: 'mission.html',
})
export class MissionPage {

  icons: Observable<IconState[]>;

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
    const attendanceConfirmBadge = this.attendanceConfirmBadge();

    this.iconService.addBadge(attendanceConfirmBadge, [pages.MissionRoot, icon.attendanceConfirm.icon]);
  }

  getBadgeIcons(): Observable<IconState> {
    return this.icons
      .mergeMap(icons => Observable.from(icons).filter(icon => this.iconService.needBadge(icon)));
  }

  attendanceConfirmBadge(): Observable<number> {
    return this.getBadgeIcons()
      .filter(icon => icon.icon === attendanceConfirm.icon)
      .switchMapTo(this.statistics.getAttendanceResultStatistics())
  }

  goTo(item) {
    this.navCtrl.push(item.page, item).then(() => { });
  }

}
