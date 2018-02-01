import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ModalController, NavController, NavParams, Slides, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { Company, LoginResponse, PhoneVerCodeResponse, RegisterResponse } from '../../interfaces/response-interface';
import { LoginService } from '../../services/business/login-service';
import {
    mobilePhoneValidator,
    passwordMatchValidator,
    passwordValidator,
    realNameValidator,
} from '../../validators/validators';
import { LoginFormModel, SignUpFormModel } from './../../services/api/mapper-service';
import { certificationPage, tabsPage } from './../pages';

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

    readonly backgroundImage = 'assets/img/background/login-background.png';

    readonly direction = 'vertical';

    loginForm: FormGroup;

    signUpForm: FormGroup;

    getActiveIndexOfInnerSlides$$: Subscription;

    getActiveIndexOfSlides$$: Subscription;

    slide$$: Subscription;

    subscriptions: Subscription[] = [];

    loginInfo$: Observable<LoginResponse>;

    register$: Observable<RegisterResponse>;

    signUpImageVerification$: Observable<PhoneVerCodeResponse>;

    resetPwdImageVerification$: Observable<PhoneVerCodeResponse>;

    loginVerificationImage$: Observable<string>;

    selectedCompany$: Observable<Company>;

    @ViewChild('slider') slider: Slides;

    @ViewChild('innerSlider') innerSlider: Slides;

    reset$: Subject<null> = new Subject();

    updateImage$: Subject<boolean> = new Subject();

    login$: Subject<LoginFormModel> = new Subject();

    signUp$: Subject<SignUpFormModel> = new Subject();

    phoneVerCode$: Subject<boolean> = new Subject();

    constructor(
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
        this.slide$$ = this.viewCtrl.willEnter.subscribe(() => {

            this.loginService.changeSlidesActive(this.navParams.get('index'));

            this.getActiveIndexOfSlides$$ = this.loginService.getActiveIndexOfSlides()
                .subscribe(index => this.slider.slideTo(index));

            this.getActiveIndexOfInnerSlides$$ = this.loginService.getActiveIndexOfInnerSlides()
                .subscribe(index => this.innerSlider.slideTo(index));
        });
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.loginInfo$ = this.loginService.getLoginInfo();

        this.register$ = this.loginService.getRegisterInfo();

        this.selectedCompany$ = this.loginService.getSelectedCompany();

        this.signUpImageVerification$ = this.loginService.getSignUpPhoneVer();

        this.resetPwdImageVerification$ = this.loginService.getResetPwdPhoneVer();

        this.loginVerificationImage$ = this.loginService.getVerificationImageUrl();
    }

    launch(): void {
        this.subscriptions = [
            this.loginService.updateVerificationImageUrl(this.updateImage$),

            this.loginService.login(this.login$.map(_ => this.loginForm.value)),

            this.loginService.signUp(this.signUp$.map(_ => this.signUpForm.value)),

            this.loginService.getPhoneVerCode(this.phoneVerCode$.map(_ => this.signUpForm.value)),

            this.loginInfo$.subscribe(userInfo => userInfo.sid && this.goToNextPage(userInfo.auth_pass)),

            this.loginService.handleLoginError(),

            this.loginService.handleRegisterError(),

            this.loginService.handleSignPhoneVerCodeError(),
        ];
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
                confirmPassword: ['', passwordValidator],
            }, { validator: passwordMatchValidator }),
        });
    }

    /*=============================================UI state change===================================================*/

    changeSlidesActive(index) {
        this.loginService.changeSlidesActive(index);
    }

    changeInnerSlidesActive(index) {
        this.loginService.changeInnerSlidesActive(index);
    }

    getCompany() {
        this.modalCtrl.create('SearchCompanyPage').present().then(() => { });
    }

    adjustmentValidationRules(userType: string): void {
        const realNameCtrl = this.signUpForm.get('realName');

        if (userType === '1') {
            realNameCtrl.setValidators([Validators.required, realNameValidator])
        } else {
            realNameCtrl.clearValidators();
        }

        realNameCtrl.updateValueAndValidity();
    }

    goToNextPage(haveAuthPassed) {
        if (haveAuthPassed) {
            this.navCtrl.setRoot(tabsPage).then(() => { });
        } else {
            this.navCtrl.push(certificationPage).then(() => { });
        }
    }

    /*=============================================Refuse cleaning====================================================*/

    ionViewWillUnload() {
        this.getActiveIndexOfSlides$$.unsubscribe();

        this.getActiveIndexOfInnerSlides$$.unsubscribe();

        this.slide$$.unsubscribe();

        this.loginService.resetErrorResponse();

        this.subscriptions.forEach(item => item.unsubscribe());
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
