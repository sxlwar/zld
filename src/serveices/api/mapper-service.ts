import {Injectable} from '@angular/core';
import {LoginOptions, RegisterOptions, ResetPasswordOptions} from '../../interfaces/request-interface';

export interface LoginFormModel {
  mobilePhone: string;
  password: string;
  imageVerification: string;
}

export interface SignupFormModel {
  userType: string;
  mobilePhone: string;
  phoneVerification: string;
  passwordInfo: {
    password: string;
    confirmPassword: string
  }
  imageVerification?: string;
  company?: string;
  realname?: string;
}

export interface ResetPwdFormModel {
  mobilePhone: string;
  phoneVerification: string;
  passwordInfo: {
    password: string;
    confirmPassword: string
  }
  imageVerification?: string;
}

@Injectable()
export class MapperService {
  constructor() {
  }

  loginFormMap(form: LoginFormModel): LoginOptions {
    return {
      username: form.mobilePhone,
      password: form.password,
      captcha_code: form.imageVerification
    };
  }

  signupFormMap(form: SignupFormModel): RegisterOptions {
    return {
      username: form.mobilePhone,
      password: form.passwordInfo.password,
      code: form.phoneVerification,
      real_name: form.realname,
      captcha_code: form.imageVerification
    }
  }

  resetPwdForm(form: ResetPwdFormModel): ResetPasswordOptions {
    return {
      username: form.mobilePhone,
      password: form.passwordInfo.password,
      code: form.phoneVerification,
      captcha_code: form.imageVerification
    }
  }
}
