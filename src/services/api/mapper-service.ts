import { TeamAddOptions, ResetPasswordOptions, RegisterOptions, CertificateOptions, LoginOptions, TeamUpdateOptions, AttendanceCardAddOptions } from './../../interfaces/request-interface';
import { Injectable } from '@angular/core';


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

export interface AddTeamFormModel {
  teamName: string;
  foreman: {
    name: string;
    id: number;
  };
  qualityClerk: {
    name: string;
    id: number;
  }
}

export interface AddAttendanceCardFormModel {
  userId: number;
  cardNumber: number;
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
    };
  }

  resetPwdForm(form: ResetPwdFormModel): ResetPasswordOptions {
    return {
      username: form.mobilePhone,
      password: form.passwordInfo.password,
      code: form.phoneVerification,
      captcha_code: form.imageVerification
    };
  }

  certificateForm(form: CertificateFormModel): CertificateOptions {
    return {
      realname: form.realname,
      num: form.personalId,
      sid: '',
      imageface: form.personalIdPhoto.front,
      imageback: form.personalIdPhoto.back
    };
  }

  addTeamForm(form: AddTeamFormModel): TeamAddOptions {
    return {
      sid: '',
      project_id: 0,
      leader_id: form.foreman.id,
      quality_manage_id: form.qualityClerk.id,
      name: form.teamName
    };
  }

  updateTeamForm(form: AddTeamFormModel, team_id: number): TeamUpdateOptions {
    return Object.assign({}, this.addTeamForm(form), { team_id });
  }

  addAttendanceCardForm(form: AddAttendanceCardFormModel): AttendanceCardAddOptions {
    return {
      sid: '',
      attendance_card_form: {
        user_id: form.userId,
        ic_card_num: form.cardNumber
      }
    };
  }
}
