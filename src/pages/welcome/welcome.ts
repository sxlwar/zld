import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
*/
@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {

    buttons = ['SIGNUP', 'LOGIN'];

    constructor(
        private navCtrl: NavController
    ) {
    }

    goToLogin(index) {
        this.navCtrl.push('LoginPage', { index }).then(() => { });
    }

    replayTutorial() {
        this.navCtrl.setRoot('TutorialPage').then(() => {
        });
    }
}
