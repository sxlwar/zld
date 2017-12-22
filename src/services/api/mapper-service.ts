import { Family, CustomWorkExperience, PlatformExperience, Certification, Edu } from './../../interfaces/personal-interface';
import { Home, WorkExperience, PlatformWorkExperience, Education, Certificate, WorkType } from './../../interfaces/response-interface';
import { TeamAddOptions, ResetPasswordOptions, RegisterOptions, CertificateOptions, LoginOptions, TeamUpdateOptions, AttendanceCardAddOptions, HomeInfoUpdateOptions } from './../../interfaces/request-interface';
import { Injectable } from '@angular/core';
import { Education as EducationUI } from './../../interfaces/personal-interface';


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
  cardNumber: string;
  userId?: number;
  userName?: string;
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
        ic_card_num: form.cardNumber,
        userName: form.userName
      }
    };
  }

  transformCertification(cer: Certificate, types: WorkType[]): Certification {
    const target = types.find(item => item.id === cer.worktype_id);

    const workType = target.name;

    const expire = cer.usestart_date + '-' + cer.usefinish_date;

    const { education, mechanism } = cer;

    return {
        workType,
        expire,
        mechanism,
        education: Edu[education],
        identifier: cer.num,
        imageFace: cer.imageface,
        imageBack: cer.imageback
    }
}

transformEducation(source: Education): EducationUI {
    const { degree, major } = source;

    const education = Edu[degree];

    const school = source.school__name;

    const expire = source.start_date + '-' + source.finish_date;

    return { expire, school, education, major }
}

  transformFamily(source: Home): Family {
    return {
        marriage: Number(source.marriage),
        marryDay: source.marryday,
        children: source.childnum,
        emergencyName: source.emergency_contact_name,
        emergencyPhone: source.emergency_contact_tel,
        emergencyRelation: source.emergency_contact_relation,
        addressArea: source.homeaddr__province + ' ' + source.homeaddr__city + ' ' + source.homeaddr__dist,
        addressDetail: source.homeaddr__street + ' ' + source.homeaddr__detail
    }
}

transformFamilyOptions(source: Family): HomeInfoUpdateOptions {
    const [province, city, dist] = source.addressArea.split(' ');

    return {
        emergency_contact_name: source.emergencyName,
        emergency_contact_tel: source.emergencyPhone,
        emergency_contact_relation: source.emergencyRelation,
        marriage: source.marriage,
        childnum: source.children,
        province: province,
        city: city,
        dist: dist,
        street: '',
        detail: source.addressDetail,
        marryday: source.marryDay
    } as HomeInfoUpdateOptions  // no sid;
}

transformWorkExperience(source: WorkExperience): CustomWorkExperience {
    return {
        expire: source.start + '-' + source.finish,
        project: source.project_name,
        company: source.company_name,
        job: source.job
    }
}

transformPlatformWorkExperience(source: PlatformWorkExperience): PlatformExperience {
    return {
        expire: source.start_day + '-' + source.finish_day,
        workType: source.worktype__name,
        project: source.team__project__name,
        team: source.team__name
    }
}
}
