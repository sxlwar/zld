import { Subscription } from 'rxjs/Subscription';
import { Family } from './../../interfaces/personal-interface';
import { Observable } from 'rxjs/Observable';
import { PersonalService } from './../../services/business/personal-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-family-information',
  templateUrl: 'family-information.html',
})
export class FamilyInformationPage {

  family: Observable<Family>;

  subscriptions: Subscription[] = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public personal: PersonalService,
    public modalCtrl: ModalController
  ) {
  }

  ionViewCanEnter(){
    const { view, opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    this.initialData();

    this.launch();
  }

  initialData() {
    this.family = this.personal.getOwnFamily();
  }

  launch() {
    this.subscriptions = [
      this.personal.getHomeInfoList(),
    ] 
  }

  // updateHomeInfo(): Observable<RequestOption> {
    
  // }

}
