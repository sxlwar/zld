import { Subject } from 'rxjs/Subject';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AlertController, App, IonicPage, LoadingController, ModalController, NavController, NavParams, Slides, ViewController } from 'ionic-angular';
import { LoginService } from '../../services/business/login-service';
import { mobilePhoneValidator, passwordMatchValidator, passwordValidator, realNameValidator, } from '../../validators/validators';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Company, LoginResponse, PhoneVerCodeResponse, RegisterResponse } from '../../interfaces/response-interface';

export class LoginForm {
  mobilePhone = ['', mobilePhoneValidator];
  password = ['', passwordValidator];
  imageVerification = '';
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  backgroundImage = 'assets/img/background/login-background.png';
  userTypes = ['REGISTER_PERSONAL_USER', 'REGISTER_COMPANY_USER'];
  direction = 'vertical';
  loginForm: FormGroup;
  signUpForm: FormGroup;

  private getActiveIndexOfInnerSlides$$: Subscription;
  private getActiveIndexOfSlides$$: Subscription;
  private navSubscription$$: Subscription;

  loginInfo$: Observable<LoginResponse>;
  register$: Observable<RegisterResponse>;
  signUpImageVerification$: Observable<PhoneVerCodeResponse>;
  resetPwdImageVerification$: Observable<PhoneVerCodeResponse>;
  loginVerificationImage$: Observable<string>;
  selectedCompany$: Observable<Company>;

  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;


  subject: Subject<null> = new Subject();

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private loginService: LoginService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {
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

  ionViewDidLoad() {
    this.loginInfo$ = this.loginService.getLoginInfo();
    this.register$ = this.loginService.getRegisterInfo();
    this.selectedCompany$ = this.loginService.getSelectedCompany();
    this.signUpImageVerification$ = this.loginService.getSignUpPhoneVer();
    this.resetPwdImageVerification$ = this.loginService.getResetPwdPhoneVer();
    this.loginVerificationImage$ = this.loginService.getVerificationImageUrl();

    this.navSubscription$$ = this.loginInfo$
      .subscribe(userInfo => userInfo.sid && this.goToNextPage(userInfo.auth_pass));
  }

  initForm() {
    this.loginForm = this.fb.group(new LoginForm());

    this.signUpForm = this.fb.group({
      userType: '',
      company: new FormControl({ value: '', disabled: true }),
      realName: '',
      mobilePhone: ['', mobilePhoneValidator],
      phoneVerification: '',
      imageVerification: '',
      passwordInfo: this.fb.group({
        password: ['', passwordValidator],
        confirmPassword: ['', passwordValidator]
      }, { validator: passwordMatchValidator })
    });

    this.signUpForm.get('userType').valueChanges.subscribe(value => {
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

  signUp() {
    this.loginService.signUp(this.signUpForm.value, this.signUpForm.get('userType').value);
  }

  updateVerificationImage() {
    this.loginService.updateVerificationImageUrl();
  }

  getCompany() {
    const modal = this.modalCtrl.create('SearchCompanyPage');
    modal.present().then(() => {
    });
  }

  /**
   * FIXME: 后台把注册和重置密码的手机验证码分成了2个接口，其逻辑和参数完全相同。
   * */
  getPhoneVerCode() {
    this.loginService.getPhoneVerCode(this.signUpForm.value);
  }

  /*========================================Component methods=====================================================*/

  adjustmentValidationRules(userType: string): void {
    const realNameCtrl = this.signUpForm.get('realName');

    if (userType === 'REGISTER_COMPANY_USER') {
      realNameCtrl.setValidators([Validators.required, realNameValidator])
    } else {
      realNameCtrl.clearValidators();
    }

    realNameCtrl.updateValueAndValidity();
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
      alert.present().then(() => { });
    });

    loading.present().then(() => { });
  }


  goToNextPage(haveAuthPassed) {
    if (haveAuthPassed) {
      this.navCtrl.setRoot('TabsPage').then(() => {
      });
    } else {
      this.navCtrl.push('CertificationPage').then(() => {
      });
    }
  }

  /*=============================================Refuse cleaning====================================================*/

  // noinspection JSUnusedGlobalSymbols
  ionViewWillUnload() {
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

  get userType() {
    return this.signUpForm.get('userType');
  }

  get company() {
    return this.signUpForm.get('company');
  }

  get realName() {
    return this.signUpForm.get('realName');
  }

  get mobilePhoneSignUp() {
    return this.signUpForm.get('mobilePhone');
  }

  get phoneVerificationSignUp() {
    return this.signUpForm.get('phoneVerification');
  }

  get imageVerificationSignUp() {
    return this.signUpForm.get('imageVerification');
  }

  get passwordSignUp() {
    return this.signUpForm.get('passwordInfo.password');
  }

  get confirmPasswordSignUp() {
    return this.signUpForm.get('passwordInfo.confirmPassword');
  }
}
