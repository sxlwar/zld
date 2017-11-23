import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProjectBillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-bill',
  templateUrl: 'project-bill.html',
})
export class ProjectBillPage {

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
    console.log('ionViewDidLoad ProjectBillPage');
  }

}
