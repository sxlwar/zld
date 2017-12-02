import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-attendance-card',
  templateUrl: 'attendance-card.html',
})
export class AttendanceCardPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewCanEnter(){
    const { view , opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    
  }

}
