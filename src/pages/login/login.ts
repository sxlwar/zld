import {FormBuilder, FormGroup} from '@angular/forms';
import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, App, IonicPage, LoadingController, NavParams, Slides, ViewController} from 'ionic-angular';
import {LoginService} from '../../serveices/business/login-service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers/index-reducer';
import {
  mobilePhoneValidator,
  passwordMatchValidator,
  passwordValidator,
  realnameValidator,
} from '../../validators/validators';
import 'rxjs/add/operator/switch';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

export class LoginForm {
  mobilePhone = ['', mobilePhoneValidator];
  password = ['', passwordValidator];
  imageVerification = '';
}

export class PasswordInfo {
  password = ['', mobilePhoneValidator];
  confirmPassword = ['', mobilePhoneValidator];
}

export class ResetPwdForm {
  mobilePhone = ['', mobilePhoneValidator];
  phoneVerification = '';
  imageVerification = '';
  constructor(public passwordInfo: FormGroup){
  }
}

export interface LoginFormModel {
  mobilePhone: string;
  password: string;
  imageVerification: string;
}

const userTypes = ['LOGIN_PERSONAL_USER', 'LOGIN_COMPANY_USER'];

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage  implements OnInit{

  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public resetPwdForm: FormGroup;
  direction = 'vertical';
  public backgroundImage = 'assets/img/background/login-background.png';
  public showVerificationOfLogin$: Observable<boolean>;
  public showVerificationOfSignup: boolean;
  public showVerificationOfReset: boolean;
  public userTypes = userTypes;


  constructor(public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public app: App,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private loginService: LoginService,
              private fb: FormBuilder) {
    this.initSlide();
    this.initForm();
    this.loginService.changeSlidesActive(this.navParams.get('index'));
  }

  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  initSlide() {
    this.viewCtrl.willEnter.subscribe(() => {

      this.loginService.getActiveIndexOfSlides()
        .subscribe(index => this.slider.slideTo(index));

      this.loginService.getActiveIndexOfInnerSlides()
        .subscribe(index => this.innerSlider.slideTo(index));
    });
  }

  private loginSubscription: Subscription;
  ngOnInit(){
    const info$ = this.loginService.getLoginObservable();
    this.showVerificationOfLogin$ = info$.map(info => info.captcha);
    this.loginSubscription = info$.subscribe(value => console.log(value));
  }

  changeSlidesActive(index) {
    this.loginService.changeSlidesActive(index);
  }

  changeInnerSlidesActive(index) {
    this.loginService.changeInnerSlidesActive(index);
  }

  initForm() {
    this.loginForm = this.fb.group(new LoginForm());

    this.signupForm = this.fb.group({
      userType: '',
      company: '',
      realname: ['', realnameValidator],
      mobilePhone: ['', mobilePhoneValidator],
      phoneVerification: '',
      imageVerification: '',
      passwordInfo: this.fb.group({
        password: ['', passwordValidator],
        confirmPassword: ['', passwordValidator]
      }, {validator: passwordMatchValidator})
    });

    this.resetPwdForm = this.fb.group({
      mobilePhone: ['', mobilePhoneValidator],
      imageVerification: '',
      phoneVerification: '',
      passwordInfo: this.fb.group({
        password: ['', passwordValidator],
        confirmPassword: ['', passwordValidator]
      }, {validator: passwordMatchValidator}),
    });
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
    this.loginService.login(this.loginForm.value);
  }

  signup() {
    console.log(this.signupForm.value);
  }

  resetPassword() {
    console.log(this.resetPwdForm.value);
    console.log(this.resetPwdForm.get('passwordInfo').status);
  }

  get mobilePhone() {
    return this.loginForm.get('mobilePhone');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get imageVerification() {
    return this.loginForm.get('imageVerification');
  }

  get mobilePhoneReset() {
    return this.resetPwdForm.get('mobilePhone');
  }

  get phoneVerificationReset() {
    return this.resetPwdForm.get('phoneVerification');
  }

  get imageVerificationReset() {
    return this.resetPwdForm.get('imageVerification');
  }

  get passwordReset() {
    return this.resetPwdForm.get('passwordInfo.password');
  }

  get confirmPasswordReset() {
    return this.resetPwdForm.get('passwordInfo.confirmPassword');
  }

  get userType() {
    return this.signupForm.get('userType');
  }

  get company() {
    return this.signupForm.get('company');
  }

  get realname() {
    return this.signupForm.get('realname');
  }

  get mobilePhoneSignup() {
    return this.signupForm.get('mobilePhone');
  }

  get phoneVerificationSignup() {
    return this.signupForm.get('phoneVerification');
  }

  get imageVerificationSignup() {
    return this.signupForm.get('imageVerification');
  }

  get passwordSignup() {
    return this.signupForm.get('passwordInfo.password');
  }

  get confirmPasswordSignup() {
    return this.signupForm.get('passwordInfo.confirmPassword');
  }
}
