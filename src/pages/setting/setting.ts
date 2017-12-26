import { Observable } from 'rxjs/Observable';
import { UserService } from './../../services/business/user-service';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  account: Observable<string>;

  reset: Observable<null>;

  constructor(
    public userInfo: UserService
  ) {
  }

  ionViewDidLoad() {
    this.account = this.userInfo.getAccount()

    this.reset = Observable.empty();
  }

}
