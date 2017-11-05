import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {IconService} from '../../serveices/business/iconService';
import {IconState} from '../../reducers/icons-reducer';
import {Observable} from 'rxjs/Observable';
import * as icon from'../../serveices/business/iconService';

/**
 * Generated class for the ProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const icons = [
  icon.attendance,
  icon.payroll,
  icon.organization,
  icon.workerManager,
  icon.workPiece,
  icon.location,
  icon.trajectory,
  icon.attendanceMachine,
  icon.locationCard,
  icon.attendanceCard
];

@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {

  icons: Observable<IconState[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public iconService: IconService) {
  }

  ionViewDidLoad() {
    this.icons = this.iconService.getIcons('project', icons);
  }

  goTo(item) {
    console.log(item);
  }

  // noinspection JSUnusedGlobalSymbols
  ionViewWillUnload() {
    this.iconService.clean();
  }
}
