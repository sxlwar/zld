import { WorkFlowAggregation } from './../../interfaces/response-interface';
import { MineRoot, MissionRoot } from './../../pages/pages';
import { putInArray } from '../utils/util';
import { Observable } from 'rxjs/Observable';
import { IconState } from '../../reducers/reducer/icons-reducer';
import { AppState, getIconsState, selectWorkFlowStatisticsResponse } from '../../reducers/index-reducer';
import { createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AddIconsBarAction, AddBadgeForRootModuleAction } from '../../actions/action/icons-action';
import { Subscription } from 'rxjs/Subscription';
import { PermissionService } from '../config/permission-service';
import { CW, EME, LM, MM, PA, PM, PME, QW, SW, TL, UW } from '../config/character';
import * as pages from '../../pages/pages';
import { IconItem } from '../../interfaces/icon-interface';

/**
 * @description These constants are icon names used in application.
 */
export const applyIcon = 'apply';
export const attendanceCardIcon = 'attendance-card';
export const attendanceConfirmIcon = 'attendance-confirm';
export const attendanceIcon = 'attendance';
export const attendanceMachineIcon = 'attendance-machine';
export const bankCardIcon = 'bank-card';
export const certificateIcon = 'certificate';
export const educationInfoIcon = 'education-info';
export const familyInfoIcon = 'family-info';
export const leaveIcon = 'leave';
export const locationCardIcon = 'location-card';
export const locationIcon = 'location';
export const modifyAttendanceIcon = 'modify-attendance';
export const modifyDutyIcon = 'modify-duty';
export const myAttendanceIcon = 'my-attendance';
export const myAuditedIcon = 'my-audited';
export const myLaunchIcon = 'my-launch';
export const organizationIcon = 'organization';
export const overtimeIcon = 'overtime';
export const payrollAuditIcon = 'payroll-audit';
export const payrollIcon = 'payroll';
export const personalInfoIcon = 'personal-info';
export const pieceAuditIcon = 'piece-audit';
export const primeContractIcon = 'prime-contract';
export const salaryIcon = 'salary';
export const subContractIcon = 'sub-contract';
export const trajectoryIcon = 'trajectory';
export const workContractIcon = 'work-contract';
export const workContractModifyIcon = 'work-contract-modify';
export const workInfoIcon = 'work-info';
export const workPieceIcon = 'work-piece';
export const workerManagerIcon = 'worker-manager';

/**
 * @description Icon badge's statistics field mapper.
 */
export const workFlowMap = new Map([
  [payrollAuditIcon, 'project_payflow_apply'],
  [leaveIcon, 'leave_apply'],
  [overtimeIcon, 'workovertime_apply'],
  [pieceAuditIcon, 'workpiece_finish'],
  [modifyAttendanceIcon, 'amend_worker_attend'],
  [workContractIcon, 'sign_worker_contract'],
  [primeContractIcon, 'prime_contract_time_change'],
  [subContractIcon, 'sub_contract_time_change'],
  [modifyDutyIcon, 'timeduty_apply'],
  [workContractModifyIcon, 'worker_contract_time_change']
]);

/* ================================================================Icon model START================================================================ */

export const attendance: IconItem = {
  text: 'ATTENDANCE_CHAR',
  icon: attendanceIcon,
  color: 'primary',
  permission: {
    view: [PME, PM, LM],
    opt: [TL]
  },
  page: pages.attendancePage
};

export const payroll: IconItem = {
  text: 'PAYROLL',
  icon: payrollIcon,
  color: 'economics',
  permission: {
    view: [PME, EME, MM, PM, LM, TL],
    opt: []
  },
  page: pages.projectBillPage
};

export const organization: IconItem = {
  text: 'ORGANIZATION',
  icon: organizationIcon,
  color: 'advanced',
  permission: {
    view: [PME, EME, MM, LM, TL, QW],
    opt: [PM]
  },
  page: pages.organizationPage
};

export const workerManager: IconItem = {
  text: 'WORKER_MANAGER',
  icon: workerManagerIcon,
  color: 'advanced',
  permission: {
    view: [PME, EME, MM, PM, CW, QW],
    opt: [LM, TL]
  },
  page: pages.membersPage
};

export const workPiece: IconItem = {
  text: 'WORK_PIECE',
  icon: workPieceIcon,
  color: 'piece',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW],
    opt: []
  },
  page: pages.workPiecePage
};

export const location: IconItem = {
  text: 'WORKER_LOCATION',
  icon: locationIcon,
  color: 'location',
  permission: {
    view: [PME, EME, MM, PM, LM, TL],
    opt: []
  },
  page: pages.locationPage
};

export const trajectory: IconItem = {
  text: 'WORKER_TRAJECTORY',
  icon: trajectoryIcon,
  color: 'location',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW],
    opt: []
  },
  page: pages.trajectoryPage
};

export const attendanceMachine: IconItem = {
  text: 'ATTENDANCE_MACHINE',
  icon: attendanceMachineIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, QW],
    opt: []
  },
  page: pages.attendanceMachinePage
};

export const locationCard: IconItem = {
  text: 'IC_LOCATION_CARD',
  icon: locationCardIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM, LM, TL],
    opt: [PM]
  },
  page: pages.locationCardPage
};

export const attendanceCard: IconItem = {
  text: 'ATTENDANCE_CARD',
  icon: attendanceCardIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM]
  },
  page: pages.attendanceCardPage
};

export const locationAttendanceRecord: IconItem = {
  text: 'LOCATION_ATTENDANCE',
  icon: locationCardIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW],
    opt: []
  },
  page: pages.locationAttendanceRecordPage

}

export const attendanceConfirm: IconItem = {
  text: 'ATTENDANCE_CONFIRM',
  icon: attendanceConfirmIcon,
  color: 'primary',
  permission: {
    view: [PME, EME],
    opt: [TL]
  },
  page: pages.attendanceConfirmPage
};

export const payrollAudit: IconItem = {
  text: 'PAYROLL_AUDIT',
  icon: payrollAuditIcon,
  color: 'economics',
  permission: {
    view: [PME, EME, MM],
    opt: [PM, LM, TL]
  },
  page: ''
};

export const leave: IconItem = {
  text: 'LEAVE_APPLY',
  icon: leaveIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM],
    opt: [PM, LM]
  },
  page: pages.leavePage
};

export const overtime: IconItem = {
  text: 'OVERTIME_APPLY',
  icon: overtimeIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM]
  },
  page: pages.overtimePage
};

export const pieceAudit: IconItem = {
  text: 'PIECE_AUDIT',
  icon: pieceAuditIcon,
  color: 'piece',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM, QW]
  },
  page: pages.pieceAuditPage
};

export const modifyAttendance: IconItem = {
  text: 'MODIFY_ATTENDANCE',
  icon: modifyAttendanceIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM, LM]
  },
  page: pages.attendanceModifyPage
};

export const workerContract: IconItem = {
  text: 'WORK_CONTRACT',
  icon: workContractIcon,
  color: 'contract',
  permission: {
    view: [SW, UW],
    opt: [PM, LM, TL, SW, UW]
  },
  page: pages.workerContractPage
};

// export const primeContract: IconItem = {
//   text: 'PRIME_CONTRACT',
//   icon: primeContractIcon,
//   color: 'contract',
//   permission: {
//     view: [],
//     opt: [PME, MM, PM]
//   },
//   page: ''
// };

// export const subContract: IconItem = {
//   text: 'SUB_CONTRACT',
//   icon: subContractIcon,
//   color: 'contract',
//   permission: {
//     view: [],
//     opt: [PME, MM, PM]
//   },
//   page: ''
// };

// export const modifyDuty: IconItem = {
//   text: 'MODIFY_DUTY',
//   icon: modifyDutyIcon,
//   color: 'primary',
//   permission: {
//     view: [],
//     opt: [PM, TL]
//   },
//   page: ''
// };

export const workContractModify: IconItem = {
  text: 'MODIFY_WORK_CONTRACT',
  icon: workContractModifyIcon,
  color: 'contract',
  permission: {
    view: [],
    opt: [PM, LM]
  },
  page: ''
};

export const myAudited: IconItem = {
  text: 'MY_AUDIT',
  icon: myAuditedIcon,
  color: 'related',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW, SW, UW],
    opt: []
  },
  page: ''
};

export const myLaunch: IconItem = {
  text: 'MY_APPLY',
  icon: myLaunchIcon,
  color: 'related',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW],
    opt: []
  },
  page: ''
};

export const myAttendance: IconItem = {
  text: 'MY_ATTENDANCE',
  icon: myAttendanceIcon,
  color: 'primary',
  permission: {
    view: [SW],
    opt: []
  },
  page: pages.personalAttendancePage
};

export const salary: IconItem = {
  text: 'MY_SALARY',
  icon: salaryIcon,
  color: 'economics',
  permission: {
    view: [SW, UW],
    opt: []
  },
  page: pages.salaryPage
};

export const bankCard: IconItem = {
  text: 'MY_BANK_CARD',
  icon: bankCardIcon,
  color: 'primary',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: []
  },
  page: pages.bankcardPage
};

export const certificate: IconItem = {
  text: 'CERTIFICATE',
  icon: certificateIcon,
  color: 'contract',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: []
  },
  page: pages.workCertificatePage
};

export const apply: IconItem = {
  text: 'LAUNCH_APPLY',
  icon: applyIcon,
  color: 'secondary',
  permission: {
    view: [],
    opt: [TL, PM]
  },
  page: ''
};

export const personalInfo: IconItem = {
  text: 'PERSONAL_INFO',
  icon: personalInfoIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: pages.personalInformationPage
};

export const familyInfo: IconItem = {
  text: 'FAMILY_INFO',
  icon: familyInfoIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: pages.familyInformationPage
};

export const workInfo: IconItem = {
  text: 'WORK_EXPERIENCE',
  icon: workInfoIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: pages.workExperiencePage
};

export const educationInfo: IconItem = {
  text: 'EDUCATION_EXPERIENCE',
  icon: educationInfoIcon,
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: pages.educationExperiencePage
};

/* ================================================================Icon model EDN================================================================= */

export const processIdToIcon = {
  sign_worker_contract: workerContract.icon,
  worker_contract_time_change: workContractModify.icon,
  amend_worker_attend: modifyAttendance.icon,
  workpiece_finish: pieceAudit.icon,
  leave_apply: leave.icon,
  workovertime_apply: overtime.icon,
  project_payflow_apply: payrollAudit.icon,
  attendanceConfirm: attendanceConfirm.icon
}

@Injectable()
export class IconService {

  constructor(
    public store: Store<AppState>,
    public permission: PermissionService
  ) {
  }

  getIcons(name: string, icons: IconItem[]): Observable<IconState[]> {
    return this.addPermissionToIcons(icons)
      .do(icons => this.addIcons(name, icons))
      .switchMapTo(this.selectIcons(name));
  }

  selectIcons(rootName: string): Observable<IconState[]> {
    return this.store.select(createSelector(getIconsState, this.select(rootName)))
  }

  getIcon(rootName: string, iconName: string): Observable<IconState> {
    return this.selectIcons(rootName)
      .mergeMap(icons => Observable.from(icons).filter(item => item.icon === iconName));
  }

  addMissionBadge(attendanceConfirmNumber: Observable<number>): Subscription {
    const attendance: Observable<WorkFlowAggregation> = attendanceConfirmNumber.map(count => ({ process_id: 'attendanceConfirm', process_id__count: count }));

    return this.store.select(selectWorkFlowStatisticsResponse)
      .filter(value => !!value && !!value.request_aggregation && !!value.request_aggregation.length)
      .mergeMap(res => Observable.from(res.request_aggregation))
      .merge(attendance)
      .subscribe(({ process_id, process_id__count }) => {
        if (processIdToIcon[process_id]) {
          this.store.dispatch(new AddBadgeForRootModuleAction({ count: process_id__count, rootName: MissionRoot, iconName: processIdToIcon[process_id] }))
        }
      })
  }

  private addPermissionToIcons(icons: IconItem[]): Observable<IconState[]> {
    return this.permission
      .functionalPermissionValidate(Observable.from(icons).map(icon => icon.permission))
      .zip(Observable.from(icons), (permission, item) => {
        const { text, icon, color, page } = item;
        return { text, icon, color, page, permission };
      })
      .map(item => {
        const { view, opt } = item.permission;
        if (!view && !opt) item.color = '';
        return item;
      })
      .reduce(putInArray, []);
  }

  private addIcons(name: string, icons: IconState[]): void {
    const target = {};

    if (name === MineRoot) {
      const target = icons.find(icon => icon.text === 'WORK_CONTRACT');

      if (!target.permission.view || !target.permission.opt) target.color = '';
    }

    target[name] = icons;

    this.store.dispatch(new AddIconsBarAction(target));
  }

  private select(name: string) {
    return state => state[name];
  }
}
