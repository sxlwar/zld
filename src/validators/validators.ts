import { FormControl, FormGroup } from '@angular/forms';

export interface ValidatorResult {
    [key: string]: any;
}

export const mobilePhone = /^1\d{10}$/;

export function mobilePhoneValidator(mobile: FormControl): ValidatorResult {
    const valid: boolean = mobilePhone.test(mobile.value);

    return valid ? null : { mobilePhoneFormat: 'ACCOUNT_INVALID_ERROR' };
}

export const passwordFormat = /^\w{6,16}$/;

export function passwordValidator(pwd: FormControl): ValidatorResult {
    const valid: boolean = passwordFormat.test(pwd.value);

    return valid ? null : { pwdFormat: 'PASSWORD_INVALID_ERROR' };
}


export function passwordMatchValidator(info: FormGroup): ValidatorResult {
    const password: FormControl = info.get('password') as FormControl;

    const confirmPassword: FormControl = info.get('confirmPassword') as FormControl;

    const valid: boolean = password.value === confirmPassword.value;

    return valid ? null : { mismatch: 'PASSWORD_MISMATCH_ERROR' };
}

export const realNameFormat = /^[\u4E00-\u9FA5]{2,5}$/;

export function realNameValidator(name: FormControl): ValidatorResult {
    const valid: boolean = realNameFormat.test(name.value);

    return valid ? null : { nameFormat: 'NAME_INVALID_ERROR' };
}


export const personalIdFormat = /^[1-9]\d{5}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|x)$/i;

export function personalIdValidator(name: FormControl): ValidatorResult {
    const valid: boolean = personalIdFormat.test(name.value);

    return valid ? null : { personalIdFormat: 'PERSONAL_ID_ERROR_TIP' };
}

export const teamNameFormat = /^[\u4E00-\u9FA5\w]{2,10}$/;

export function teamNameValidator(name: FormControl): ValidatorResult {
    const valid: boolean = teamNameFormat.test(name.value);

    return valid ? null : { teamNameFormat: 'TEAM_NAME_ERROR' };
}

export const cardNumberFormat = /^\d{6,10}$/;

export function cardNumberValidator(num: FormControl): ValidatorResult {
    const valid: boolean = cardNumberFormat.test(num.value);

    return valid ? null : { cardNumberFormat: 'CARD_NUMBER_ERROR' };
}

export const addressAreaFormat = /\d{2}\s\d{4}\s\d{6}/;

export const mustBeChineseFormat = /^[\u4E00-\u9FA5]+$/;

export function mustBeChineseValidator(target: FormControl): ValidatorResult {
    const valid: boolean = mustBeChineseFormat.test(target.value);

    return valid ? null : { mustBeChineseFormat: 'MUST_INPUT_CHINESE_ERROR' };
}

export const creditCardFormat = /信用卡/;

export function creditCardValidator(card: FormControl): ValidatorResult {
    const valid: boolean = !creditCardFormat.test(card.value);

    return valid ? null : { creditCardFormat: 'CREDIT_CARD_NOT_ALLOWED_ERROR' };
}

export const bankcardFormat = /^\d{1,30}$/;;

export function bankcardNumberValidator(cardNumber: FormControl): ValidatorResult {
    const valid: boolean = bankcardFormat.test(cardNumber.value);

    return valid ? null : { bankcardNumberFormat: 'BANK_CARD_ERROR' };
}
