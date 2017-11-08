import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {IconService} from '../../serveices/business/icon-service';
import * as icon from '../../serveices/business/icon-service';
import {Observable} from 'rxjs/Observable';
import {IconState} from '../../reducers/icons-reducer';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const icons = [
  icon.myAttendance,
  icon.salary,
  icon.bankCard,
  icon.certificate,
  icon.workContract,
  icon.apply,
  icon.trajectory,
  icon.workContractModify
];

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {

  icons: Observable<IconState[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public iconService: IconService) {
  }

  ionViewDidLoad() {
    this.icons = this.iconService.getIcons('mine', icons);
  }

  goTo(item) {
    console.log(item);
  }
}
