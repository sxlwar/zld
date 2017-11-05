import {Injectable} from '@angular/core';
import {
  CertificateOptions, LoginOptions, ProjectListOptions, RegisterOptions,
  ResetPasswordOptions, WorkerContractOptions
} from '../../interfaces/request-interface';

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

export interface CertificateFormModel {
  realname: string;
  personalId: string;
  personalIdPhoto: {
    front: string;
    back: string;
  }
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

  certificateForm(form: CertificateFormModel): CertificateOptions {
    return {
      realname: form.realname,
      num: form.personalId,
      sid: '',
      imageface: form.personalIdPhoto.front,
      imageback: form.personalIdPhoto.back
    }
  }

  // workerContractForm(form: WorkerContractFormModel): WorkerContractOptions {
  //   return {
  //     sid: ''
  //   }
  // }
  //
  // projectForm(form: ProjectFormModel): ProjectListOptions{
  //   return {
  //     sid: '',
  //     project_name: form.name,
  //     prime_contract_status: fomr
  //   }
  // }
}
