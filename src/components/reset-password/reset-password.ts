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
export class ResetPasswordComponent implements OnInit, OnDestroy{

  @Input() reset: Observable<null>;

  @Input() account: string;

  @Input() errorColor = 'white';

  @Input() buttonColor = 'light';

  resetPwd$: Observable<ResetPasswordResponse>;

  resetPwdForm: FormGroup;

  reset$$: Subscription;

  constructor(
    public fb: FormBuilder,
    public loginService: LoginService
  ) {
    this.initialForm();
  }

  ngOnInit() {
    this.resetPwd$ = this.loginService.getResetPasswordInfo();

    if (this.reset) {
      this.reset$$ = this.reset.subscribe(_ => this.resetPwdForm.reset());
    }
  }

  ngOnDestroy() {
    this.reset$$ && this.reset$$.unsubscribe();
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

  resetPwd() {
    this.loginService.resetPwd(this.resetPwdForm.value);
  }

  getResetPhoneVerCode() {
    this.loginService.getResetPwdPhoneVerCode(this.resetPwdForm.value);
  }

  updateVerificationImage() {
    this.loginService.updateVerificationImageUrl();
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
