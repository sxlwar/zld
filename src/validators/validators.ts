import {FormControl, FormGroup} from '@angular/forms';

export const mobilePhone = /^1\d{10}$/;

export function mobilePhoneValidator(mobile: FormControl): { [key: string]: any } {
  const valid: boolean = mobilePhone.test(mobile.value);

  return valid ? null : {mobilePhoneFormat: 'LOGIN_ACCOUNT_INVALID_ERROR'}
}

export const passwordFormat = /^\w{6,16}$/;

export function passwordValidator(pwd: FormControl): { [key: string]: any } {
  const valid: boolean = passwordFormat.test(pwd.value);

  return valid ? null : {pwdFormat: 'LOGIN_PASSWORD_INVALID_ERROR'}
}


export function passwordMatchValidator(info: FormGroup): { [key: string]: any } {
  const password: FormControl = info.get('password') as FormControl;
  const confirmPassword: FormControl = info.get('confirmPassword') as FormControl;
  const valid: boolean = password.value === confirmPassword.value;

  return valid ? null : {mismatch: 'LOGIN_PASSWORD_MISMATCH_ERROR'};
}

export const realnameFormat = /^[\u4E00-\u9FA5]{2,5}$/;

export function realnameValidator(name: FormControl): {[key: string]: any} {
  const valid: boolean = realnameFormat.test(name.value);

  return valid ? null: {nameFormat: 'LOGIN_NAME_INVALID_ERROR'};
}
