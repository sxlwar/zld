// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {AlertController, App, IonicPage, LoadingController, NavParams, Slides, ViewController} from 'ionic-angular';
import {LoginService} from '../../serveices/business/login-service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers/index-reducer';
import 'rxjs/add/operator/distinctUntilChanged';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  public loginForm: any;
  direction = 'vertical';
  public backgroundImage = 'assets/img/background/login-background.png';

  constructor(public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public app: App,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private loginService: LoginService,
              private store: Store<fromRoot.AppState>) {
    this.initSlide();
    this.loginService.changeSlidesActive(this.navParams.get('index'));
  }

  initSlide() {
    this.viewCtrl.willEnter.subscribe(() => {

      this.store.select(fromRoot.selectActiveIndexOfSlides)
        .subscribe(index => this.slider.slideTo(index));

      this.store.select(fromRoot.selectActiveIndexOfInnerSlides)
        .distinctUntilChanged()
        .subscribe(index => this.innerSlider.slideTo(index));
    });
  }

  changeSlidesActive(index) {
    this.loginService.changeSlidesActive(index);
  }

  changeInnerSlidesActive(index) {
    this.loginService.changeInnerSlidesActive(index);
  }

  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }

  login() {
    this.presentLoading('Thanks for signing up!');
    // this.navCtrl.push(HomePage);
  }

  signup() {
    this.presentLoading('Thanks for signing up!');
    // this.navCtrl.push(HomePage);
  }

  resetPassword() {
    this.presentLoading('An e-mail was sent with your new password.');
  }
}
