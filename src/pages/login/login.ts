import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
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
import {
  Company,
  LoginResponse,
  PhoneVerCodeResponse,
  RegisterResponse,
  ResetPasswordResponse
} from '../../interfaces/response-interface';

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
  signupForm: FormGroup;
  resetPwdForm: FormGroup;

  private getActiveIndexOfInnerSlides$$: Subscription;
  private getActiveIndexOfSlides$$: Subscription;
  private navSubscription$$: Subscription;

  loginInfo$: Observable<LoginResponse>;
  register$: Observable<RegisterResponse>;
  resetPwd$: Observable<ResetPasswordResponse>;
  signupImageVerification$: Observable<PhoneVerCodeResponse>;
  resetPwdImageVerification$: Observable<PhoneVerCodeResponse>;
  loginVerificationImage$: Observable<string>;
  selectedCompany$: Observable<Company>;

  realnameValidator = realnameValidator;
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

  ionViewDidLoad() {
    this.loginInfo$ = this.loginService.getLoginInfo();
    this.register$ = this.loginService.getRegisterInfo();
    this.resetPwd$ = this.loginService.getResetPasswordInfo();
    this.selectedCompany$ = this.loginService.getSelectedCompany();
    this.signupImageVerification$ = this.loginService.getSignupPhoneVer();
    this.resetPwdImageVerification$ = this.loginService.getResetPwdPhoneVer();
    this.loginVerificationImage$ = this.loginService.getVerificationImageUrl();

    this.navSubscription$$ = this.loginInfo$
      .filter(info => !!info.sid)
      .map(info => info.auth_pass)
      .distinctUntilChanged()
      .subscribe(havePass => this.goToNextPage(havePass));
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
    this.loginService.signup(this.signupForm.value, this.signupForm.get('userType').value);
  }

  resetPwd() {
    this.loginService.resetPwd(this.resetPwdForm.value);
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
   * FIXME NO.1
   * @description 后台把注册和重置密码的手机验证码分成了2个接口，其逻辑和参数完全相同。所以这里分成2个函数处理，getPhoneVerCode处理注册
   * 时的手机验证码，getResetPhoneVerCode处理重置密码时的手机验证码。
   * */
  getPhoneVerCode() {
    this.loginService.getPhoneVerCode(this.signupForm.value);
  }

  getResetPhoneVerCode() {
    this.loginService.getResetPwdPhoneVerCode(this.resetPwdForm.value);
  }

  /*========================================Component methods=====================================================*/

  adjustmentValidationRules(userType: string): void {
    const realnameCtrl = this.signupForm.get('realname');

    if (userType === 'REGISTER_COMPANY_USER') {
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
    // if (haveAuthPassed) {
    //   this.navCtrl.setRoot('TabsPage').then(() => {
    //   });
    // } else {
    //   this.navCtrl.push('CertificationPage').then(() => {
    //   });
    // }
    this.navCtrl.push('CertificationPage').then(() => {
    });
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
