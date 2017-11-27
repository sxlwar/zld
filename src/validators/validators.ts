import {FormControl, FormGroup} from '@angular/forms';

export const mobilePhone = /^1\d{10}$/;

export function mobilePhoneValidator(mobile: FormControl): { [key: string]: any } {
  const valid: boolean = mobilePhone.test(mobile.value);

  return valid ? null : {mobilePhoneFormat: 'ACCOUNT_INVALID_ERROR'}
}

export const passwordFormat = /^\w{6,16}$/;

export function passwordValidator(pwd: FormControl): { [key: string]: any } {
  const valid: boolean = passwordFormat.test(pwd.value);

  return valid ? null : {pwdFormat: 'PASSWORD_INVALID_ERROR'}
}


export function passwordMatchValidator(info: FormGroup): { [key: string]: any } {
  const password: FormControl = info.get('password') as FormControl;
  const confirmPassword: FormControl = info.get('confirmPassword') as FormControl;
  const valid: boolean = password.value === confirmPassword.value;

  return valid ? null : {mismatch: 'PASSWORD_MISMATCH_ERROR'};
}

export const realnameFormat = /^[\u4E00-\u9FA5]{2,5}$/;

export function realnameValidator(name: FormControl): {[key: string]: any} {
  const valid: boolean = realnameFormat.test(name.value);

  return valid ? null: {nameFormat: 'NAME_INVALID_ERROR'};
}


export const personalIdFormat = /^[1-9]\d{5}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|x)$/i;

export function personalIdValidator(name: FormControl): {[key: string]: any} {
  const valid: boolean = personalIdFormat.test(name.value);

  return valid ? null : {personalIdFormat: 'PERSONAL_ID_ERROR_TIP'};
}

export const teamNameFormat = /^[\u4E00-\u9FA5\w]{2,10}$/;

export function teamNameValidator(name: FormControl): {[key: string]: any} {
  const valid: boolean = teamNameFormat.test(name.value);

  return valid ? null: {teamNameFormat: 'TEAM_NAME_ERROR'};
}