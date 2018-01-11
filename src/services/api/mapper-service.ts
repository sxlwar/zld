import { Family, CustomWorkExperience, PlatformExperience, Certification, Edu } from './../../interfaces/personal-interface';
import { Home, WorkExperience, PlatformWorkExperience, Education, Certificate, WorkType } from './../../interfaces/response-interface';
import { TeamAddOptions, ResetPasswordOptions, RegisterOptions, CertificateOptions, LoginOptions, TeamUpdateOptions, AttendanceCardAddOptions, HomeInfoUpdateOptions, EducationAddOptions, WorkExperienceAddOptions, WorkerBankNoAddOptions, CertificateAddOptions, CreateWorkerContractOptions, LaunchWorkerContractOptions, CreateAttendanceModifyOptions, CreateLeaveOptions, CreatePieceAuditOptions, CreateOvertimeOptions } from './../../interfaces/request-interface';
import { Injectable } from '@angular/core';
import { Education as EducationUI } from './../../interfaces/personal-interface';


export interface LoginFormModel {
  mobilePhone: string;
  password: string;
  imageVerification: string;
}

export interface SignUpFormModel {
  userType: string;
  mobilePhone: string;
  phoneVerification: string;
  passwordInfo: {
    password: string;
    confirmPassword: string
  }
  imageVerification?: string;
  company?: string;
  realName?: string;
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
  realName: string;
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

export interface EducationAddFormModel {
  startDate: string;
  endDate: string;
  major: string;
  degree: number;
  school: string;
}

export interface WorkExperienceFormModel {
  startDate: string;
  endDate: string;
  company: string;
  project: string;
  job: string;
}

export interface AddBankcardFormModel {
  cardNumber: string;
  phoneNumber: string;
  cardType: string;
  isMaster: boolean;
}

export interface AddCertificateFormModel {
  workTypeId: number;
  certificateNumber: string;
  firstGetDate: string;
  availableStartDate: string;
  availableEndDate: string;
  education: string;
  mechanism: string;
  imageFace?: string;
  imageBack?: string;
}

export interface WorkerContractFormModel {
  formType: string;
  teamId: number;
  workTypeId: number;
  startDay: string;
  endDay: string;
  payDay: number;
  morningOnDuty: string;
  morningOffDuty: string;
  comment: string;
  afternoonOnDuty: string;
  afternoonOffDuty: string;
  workerIds: number[];
  attach: string[];
}

export interface TimeTypeWorkerContractFormModel extends WorkerContractFormModel {
  hourlyWage: number;
  overtimeHourlyWage: number;
  content: string;
  // timeUnit: string;
}

export interface PieceTypeFormModel {
  name: string;
  location: string;
  pieceWage: number;
  num: number;
  standard?: string;
}

export interface PieceTypeWorkerContractFormModel extends WorkerContractFormModel {
  pieces: PieceTypeFormModel[];
}

export interface AttendanceModifyFormModel {
  reason: string;
  attendanceIds: number[];
  onDutyTime: string;
  offDutyTime: string;
  attach: string[];
}

export interface LeaveFormModel {
  leaveType: string;
  startDay: string;
  endDay: string;
  reason: string;
  contractIds: number[];
  attach: string[];
}

export interface OvertimeFormModel {
  payType: string;
  day: string;
  startTime: string;
  endTime: string;
  reason: string;
  contractIds: number[];
  attach: string[];
}

export interface PieceAuditFormModel {
  num: number;
  finishDate: string;
  comment: string;
  qualityPercent: number;
  piecePayId: number;
  attach: string[];
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

  signUpFormMap(form: SignUpFormModel): RegisterOptions {
    return {
      username: form.mobilePhone,
      password: form.passwordInfo.password,
      code: form.phoneVerification,
      real_name: form.realName,
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
      realname: form.realName,
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
      expire: source.start + '--' + source.finish,
      project: source.project_name,
      company: source.company_name,
      job: source.job,
      id: source.id
    }
  }

  transformPlatformWorkExperience(source: PlatformWorkExperience): PlatformExperience {
    return {
      expire: source.start_day + '--' + source.finish_day,
      workType: source.worktype__name,
      project: source.team__project__name,
      team: source.team__name
    }
  }

  transformEducationExperience(source: EducationAddFormModel): EducationAddOptions {
    return {
      start_date: source.startDate,
      finish_date: source.endDate,
      school__name: source.school,
      degree: source.degree,
      major: source.major,
      sid: ''
    }
  }

  transformWorkExperienceOptions(source: WorkExperienceFormModel): WorkExperienceAddOptions {
    return {
      sid: '',
      start: source.startDate,
      finish: source.endDate,
      company_name: source.company,
      project_name: source.project,
      job: source.job
    }
  }

  transformAddBankcard(source: AddBankcardFormModel): WorkerBankNoAddOptions {
    return {
      sid: '',
      num: source.cardNumber,
      phone_num: source.phoneNumber,
      is_master: source.isMaster,
      user_id: NaN
    }
  }

  transformAddCertificate(source: AddCertificateFormModel): CertificateAddOptions {
    return {
      sid: '',
      usefinish_date: source.availableEndDate,
      usestart_date: source.availableStartDate,
      num: source.certificateNumber,
      firstget_date: source.firstGetDate,
      education: source.education,
      worktype_id: source.workTypeId,
      mechanism: source.mechanism,
      imageface: source.imageFace,
      imageback: source.imageBack
    }
  }

  private getWorkerContractCommonPart(source: WorkerContractFormModel): LaunchWorkerContractOptions {
    return {
      team_id: source.teamId,
      worktype_id: source.workTypeId,
      start_day: source.startDay,
      finish_day: source.endDay,
      pay_day: source.payDay,
      morning_time_on_duty: source.morningOnDuty,
      morning_time_off_duty: source.morningOffDuty,
      afternoon_time_off_duty: source.afternoonOnDuty,
      afternoon_time_on_duty: source.afternoonOffDuty,
      worker_id: source.workerIds,
      additional_content: source.comment,
      attach: source.attach,
      formType: source.formType
    }
  }
  private transformTimeTypeWorkerContractForm(source: TimeTypeWorkerContractFormModel): CreateWorkerContractOptions {
    return {
      sid: '',
      worker_contract: this.getWorkerContractCommonPart(source),
      work_time_pay: [{
        pay_mount: source.hourlyWage,
        overtime_pay_mount: source.overtimeHourlyWage,
        content: source.content,
        time_unit: '小时'
      }]
    }
  }

  private transformPieceTypeWorkerContractForm(source: PieceTypeWorkerContractFormModel): CreateWorkerContractOptions {
    return {
      sid: '',
      worker_contract: this.getWorkerContractCommonPart(source),
      work_piece_pay: source.pieces.map(({ name, pieceWage, location, num, standard }) => ({ name, location, num, pay_mount: pieceWage, standard }))
    }
  }

  transformWorkerContractForm(source: WorkerContractFormModel): CreateWorkerContractOptions {
    return source.formType === '1' ? this.transformTimeTypeWorkerContractForm(source as TimeTypeWorkerContractFormModel) : this.transformPieceTypeWorkerContractForm(source as PieceTypeWorkerContractFormModel);
  }

  transformAttendanceModifyForm(source: AttendanceModifyFormModel): CreateAttendanceModifyOptions {
    return {
      sid: '',
      attend_amend: {
        reason: source.reason,
        result_id: source.attendanceIds,
        on_duty: source.onDutyTime,
        off_duty: source.offDutyTime,
        attach: source.attach
      }
    }
  }

  transformLeaveForm(source: LeaveFormModel): CreateLeaveOptions {
    return {
      sid: '',
      leave: {
        reason: source.reason,
        type: source.leaveType,
        start: source.startDay,
        finish: source.endDay,
        contracts_id: source.contractIds,
        attach: source.attach
      }
    }
  }

  transformOvertimeForm(source: OvertimeFormModel): CreateOvertimeOptions {
    return {
      sid: '',
      work_over_time: {
        type: source.payType,
        day: source.day,
        start: source.startTime,
        finish: source.endTime,
        reason: source.reason,
        contracts_id: source.contractIds,
        attach: source.attach
      }
    }
  }

  transformPieceAuditForm(source: PieceAuditFormModel): CreatePieceAuditOptions {
    return {
      sid: '',
      work_piece_finish_flow: {
        num: source.num,
        quality_percent: source.qualityPercent,
        comment: source.comment,
        finish_date: source.finishDate,
        work_piece_pay_id: source.piecePayId,
        attach: source.attach
      }
    }
  }

}