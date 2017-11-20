import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-attendance-confirm',
  templateUrl: 'attendance-confirm.html',
})
export class AttendanceConfirmPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewCanEnter(){
    const {view, opt} = this.navParams.get('permission');
    
    return opt || view;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceConfirmPage');
  }

}
