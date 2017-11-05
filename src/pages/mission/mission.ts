import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {IconState} from '../../reducers/icons-reducer';
import {IconService} from '../../serveices/business/iconService';
import * as icon from '../../serveices/business/iconService';

/**
 * Generated class for the MissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public iconService: IconService) {
  }

  ionViewDidLoad() {
    this.icons = this.iconService.getIcons('mission', icons);
  }

  goTo(item){
    console.log(item);
  }

}
