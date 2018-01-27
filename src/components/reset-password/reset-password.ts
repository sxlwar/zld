import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { LoginService } from './../../services/business/login-service';
import { ResetPasswordResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnDestroy } from '@angular/core';
import { mobilePhoneValidator, passwordValidator, passwordMatchValidator } from '../../validators/validators';

@Component({
    selector: 'reset-password',
    templateUrl: 'reset-password.html'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

    @Input() reset: Observable<null>;

    @Input() account: string;

    @Input() errorColor = 'white';

    @Input() buttonColor = 'light';

    resetPwd$: Observable<ResetPasswordResponse>;

    resetPwdForm: FormGroup;

    reset$$: Subscription;

    updateImage$: Subject<boolean> = new Subject();

    subscriptions: Subscription[] = [];

    phoneVerCode$: Subject<boolean> = new Subject();

    reset$: Subject<boolean> = new Subject();

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService
    ) {
        this.initialForm();
    }

    ngOnInit() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.resetPwd$ = this.loginService.getResetPasswordInfo();
    }

    launch(): void {
        this.subscriptions = [
            this.loginService.updateVerificationImageUrl(this.updateImage$),
            this.loginService.getResetPwdPhoneVerCode(this.phoneVerCode$.map(_ => this.resetPwdForm.value)),
            this.loginService.resetPwd(this.reset$.map(_ => this.resetPwdForm.value)),
            this.loginService.handleResetPassWordInfoError(),
            this.loginService.handleResetPhoneVerCodeError(),
        ];

        if (this.reset) {
            this.subscriptions.push(this.reset.subscribe(_ => this.resetPwdForm.reset()));
        }
    }

    initialForm(): void {
        this.resetPwdForm = this.fb.group({
            mobilePhone: ['', mobilePhoneValidator],
            imageVerification: '',
            phoneVerification: '',
            passwordInfo: this.fb.group({
                password: ['', passwordValidator],
                confirmPassword: ['', passwordValidator]
            }, { validator: passwordMatchValidator }),
        });
    }

    ngOnDestroy() {
        this.loginService.resetResetPasswordResponse();
        
        this.subscriptions.forEach(item => item.unsubscribe());
    }

    get mobilePhone() {
        return this.resetPwdForm.get('mobilePhone');
    }

    get phoneVerification() {
        return this.resetPwdForm.get('phoneVerification');
    }

    get imageVerification() {
        return this.resetPwdForm.get('imageVerification');
    }

    get password() {
        return this.resetPwdForm.get('passwordInfo.password');
    }

    get confirmPassword() {
        return this.resetPwdForm.get('passwordInfo.confirmPassword');
    }
}
