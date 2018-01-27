import { Observable } from 'rxjs/Observable';
import { UserService } from './../../services/business/user-service';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-reset-password',
    templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

    account: Observable<string>;

    reset: Observable<null>;

    constructor(
        private userInfo: UserService
    ) {
    }

    ionViewDidLoad() {
        this.account = this.userInfo.getAccount()

        this.reset = Observable.empty();
    }

}
