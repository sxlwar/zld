import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  AlertController,
  App,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  Slides,
  ViewController
} from 'ionic-angular';
import {LoginService} from '../../serveices/business/login-service';
import {
  mobilePhoneValidator,
  passwordMatchValidator,
  passwordValidator,
  realnameValidator,
} from '../../validators/validators';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Company, PhoneVerCodeResponse, RegisterResponse, LoginResponse} from '../../interfaces/response-interface';

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

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public resetPwdForm: FormGroup;
  direction = 'vertical';
  public backgroundImage = 'assets/img/background/login-background.png';
  public signupImageVerification$: Observable<PhoneVerCodeResponse>;
  public showVerificationOfReset: boolean;
  public loginVerificationImage$: Observable<string>;
  public userTypes = ['LOGIN_PERSONAL_USER', 'LOGIN_COMPANY_USER'];
  private getActiveIndexOfInnerSlides$$: Subscription;
  private getActiveIndexOfSlides$$: Subscription;
  loginInfo$: Observable<LoginResponse>;
  register$: Observable<RegisterResponse>;
  realnameValidator = realnameValidator;
  selectedCompany$: Observable<Company>;
  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;


  constructor(public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public app: App,
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private loginService: LoginService,
              private fb: FormBuilder,
              private navCtrl: NavController,
              private modalCtrl: ModalController) {
    this.initSlide();
    this.initForm();
  }

  /*=========================================Init model=============================================================*/
  initSlide() {
    this.viewCtrl.willEnter.subscribe(() => {

      this.loginService.changeSlidesActive(this.navParams.get('index'));

      this.getActiveIndexOfSlides$$ = this.loginService.getActiveIndexOfSlides()
        .subscribe(index => this.slider.slideTo(index));

      this.getActiveIndexOfInnerSlides$$ = this.loginService.getActiveIndexOfInnerSlides()
        .subscribe(index => this.innerSlider.slideTo(index));
    });
  }

  ngOnInit() {
    this.loginInfo$ = this.loginService.getLoginInfo();
    this.register$ = this.loginService.getRegisterInfo();
    this.selectedCompany$ = this.loginService.getSelectedCompany();
    this.signupImageVerification$ = this.loginService.getSignupPhoneVer();
    this.loginVerificationImage$ = this.loginService.getVerificationImageUrl();
  }

  initForm() {
    this.loginForm = this.fb.group(new LoginForm());

    this.signupForm = this.fb.group({
      userType: '',
      company: new FormControl({value: '', disabled: true}),
      realname: '',
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

    this.signupForm.get('userType').valueChanges.subscribe(value => {
      this.adjustmentValidationRules(value);
    });
  }

  /*=============================================UI state change===================================================*/

  changeSlidesActive(index) {
    this.loginService.changeSlidesActive(index);
  }

  changeInnerSlidesActive(index) {
    this.loginService.changeInnerSlidesActive(index);
  }

  /*=============================================Date state change===================================================*/

  login() {
    this.loginService.login(this.loginForm.value);
  }

  signup() {
    console.log(this.signupForm.value);
    this.loginService.signup(this.signupForm.value, this.signupForm.get('userType').value);
  }

  resetPassword() {
    console.log(this.resetPwdForm.value);
    console.log(this.resetPwdForm.get('passwordInfo').status);
  }

  updateVerificationImage() {
    this.loginService.updateVerificationImageUrl();
  }

  getCompany() {
    const modal = this.modalCtrl.create('SearchCompanyPage');
    modal.present().then(() => {
    });
  }

  getPhoneVerCode() {
    this.loginService.getPhoneVerCode(this.signupForm.value);
  }

  /*========================================Component methods=====================================================*/

  adjustmentValidationRules(userType: string): void {
    const realnameCtrl = this.signupForm.get('realname');

    if (userType === 'LOGIN_COMPANY_USER') {
      realnameCtrl.setValidators([Validators.required, this.realnameValidator])
    } else {
      realnameCtrl.clearValidators();
    }

    realnameCtrl.updateValueAndValidity();
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
      alert.present().then(() => {});
    });

    loading.present().then(() => {});
  }


  goToNextPage(haveAuthPassed) {
    if (haveAuthPassed) {
      this.navCtrl.setRoot('TabsPage').then(() => {
      });
    } else {
      this.navCtrl.push('mapPage').then(() => {
      });
    }
  }

  /*=============================================Refuse cleaning====================================================*/

  ngOnDestroy() {
    this.getActiveIndexOfSlides$$.unsubscribe();
    this.getActiveIndexOfInnerSlides$$.unsubscribe();
    this.loginService.unSubscribe();
  }

  /*====================================Short cut method for template==============================================*/

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
