//region
import {Observable} from 'rxjs/Observable';
import {IconState} from '../../reducers/reducer/icons-reducer';
import {AppState, getIconsState} from '../../reducers/index-reducer';
import {createSelector, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {AddIconsBarAction} from '../../actions/action/icons-action';
import {Subscription} from 'rxjs/Subscription';
import {Permission} from '../../interfaces/permission-interface';
import {PermissionService} from '../config/permission-service';
import {CW, EME, LM, MM, PA, PM, PME, QW, SW, TL, UW} from '../config/character';
import * as pages from '../../pages/pages';
//endregion

//region
export interface IconItem {
  text: string;
  icon: string;
  color: string;
  permission: Permission;
  page: string
}

export const attendance: IconItem = {
  text: 'ATTENDANCE_CHAR',
  icon: 'attendance',
  color: 'primary',
  permission: {
    view: [PME, PM, LM],
    opt: [TL]
  },
  page: pages.attendancePage
};

export const payroll: IconItem = {
  text: 'PAYROLL',
  icon: 'payroll',
  color: 'economics',
  permission: {
    view: [PME, EME, MM, PM, LM, TL],
    opt: []
  },
  page: ''
};

export const organization: IconItem = {
  text: 'ORGANIZATION',
  icon: 'organization',
  color: 'advanced',
  permission: {
    view: [PME, EME, MM, LM, TL, QW],
    opt: [PM]
  },
  page: ''
};

export const workerManager: IconItem = {
  text: 'WORKER_MANAGER',
  icon: 'worker-manager',
  color: 'advanced',
  permission: {
    view: [PME, EME, MM, PM, CW, QW],
    opt: [LM, TL]
  },
  page: ''
};
export const workPiece: IconItem = {
  text: 'WORK_PIECE',
  icon: 'work-piece',
  color: 'piece',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW],
    opt: []
  },
  page: ''
};
export const location: IconItem = {
  text: 'WORKER_LOCATION',
  icon: 'location',
  color: 'location',
  permission: {
    view: [PME, EME, MM, PM, LM, TL],
    opt: []
  },
  page: ''
};
export const trajectory: IconItem = {
  text: 'WORKER_TRAJECTORY',
  icon: 'trajectory',
  color: 'location',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW],
    opt: []
  },
  page: ''
};
export const attendanceMachine: IconItem = {
  text: 'ATTENDANCE_MACHINE',
  icon: 'attendance-machine',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, PM, LM, TL],
    opt: []
  },
  page: ''
};
export const locationCard: IconItem = {
  text: 'IC_LOCATION_CARD',
  icon: 'location-card',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, LM, TL],
    opt: [PM]
  },
  page: ''
};
export const attendanceCard: IconItem = {
  text: 'ATTENDANCE_CARD',
  icon: 'attendance-card',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM]
  },
  page: ''
};

export const attendanceConfirm: IconItem = {
  text: 'ATTENDANCE_CONFIRM',
  icon: 'attendance-confirm',
  color: 'primary',
  permission: {
    view: [PME, EME],
    opt: [TL]
  },
  page: ''
};
export const payrollAudit: IconItem = {
  text: 'PAYROLL_AUDIT',
  icon: 'payroll-audit',
  color: 'economics',
  permission: {
    view: [PME, EME, MM],
    opt: [PM, LM, TL]
  },
  page: ''
};
export const leave: IconItem = {
  text: 'LEAVE_APPLY',
  icon: 'leave',
  color: 'primary',
  permission: {
    view: [PME, EME, MM],
    opt: [PM, LM]
  },
  page: ''
};
export const overtime: IconItem = {
  text: 'LEAVE_APPLY',
  icon: 'overtime',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM]
  },
  page: ''
};
export const pieceAudit: IconItem = {
  text: 'PIECE_AUDIT',
  icon: 'piece-audit',
  color: 'piece',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM, QW]
  },
  page: ''
};
export const modifyAttendance: IconItem = {
  text: 'MODIFY_ATTENDANCE',
  icon: 'modify-attendance',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM, LM]
  },
  page: ''
};
export const workContract: IconItem = {
  text: 'WORK_CONTRACT',
  icon: 'work-contract',
  color: 'contract',
  permission: {
    view: [],
    opt: [PM, LM, TL, SW, UW]
  },
  page: ''
};
export const primeContract: IconItem = {
  text: 'PRIME_CONTRACT',
  icon: 'prime-contract',
  color: 'contract',
  permission: {
    view: [],
    opt: [PME, MM, PM]
  },
  page: ''
};
export const subContract: IconItem = {
  text: 'SUB_CONTRACT',
  icon: 'sub-contract',
  color: 'contract',
  permission: {
    view: [],
    opt: [PME, MM, PM]
  },
  page: ''
};
export const modifyDuty: IconItem = {
  text: 'MODIFY_DUTY',
  icon: 'modify-duty',
  color: 'primary',
  permission: {
    view: [],
    opt: [PM, TL]
  },
  page: ''
};
export const workContractModify: IconItem = {
  text: 'MODIFY_WORK_CONTRACT',
  icon: 'work-contract-modify',
  color: 'contract',
  permission: {
    view: [],
    opt: [PM, LM]
  },
  page: ''
};
export const myAudited: IconItem = {
  text: 'MY_AUDIT',
  icon: 'my-audited',
  color: 'related',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW, SW, UW],
    opt: []
  },
  page: ''
};
export const myLaunch: IconItem = {
  text: 'MY_APPLY',
  icon: 'my-launch',
  color: 'related',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW],
    opt: []
  },
  page: ''
};

export const myAttendance: IconItem = {
  text: 'MY_ATTENDANCE',
  icon: 'my-attendance',
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW],
    opt: []
  },
  page: ''
};
export const salary: IconItem = {
  text: 'MY_SALARY',
  icon: 'salary',
  color: 'economics',
  permission: {
    view: [SW, UW],
    opt: []
  },
  page: ''
};
export const bankCard: IconItem = {
  text: 'MY_BANK_CARD',
  icon: 'bank-card',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: []
  },
  page: ''
};
export const certificate: IconItem = {
  text: 'MY_CERTIFICATE',
  icon: 'certificate',
  color: 'contract',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: []
  },
  page: ''
};

export const apply: IconItem = {
  text: 'LAUNCH_APPLY',
  icon: 'apply',
  color: 'secondary',
  permission: {
    view: [],
    opt: [TL, PM]
  },
  page: ''
};

export const personalInfo: IconItem = {
  text: 'PERSONAL_INFO',
  icon: 'personal-info',
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: ''
};

export const familyInfo: IconItem = {
  text: 'FAMILY_INFO',
  icon: 'family-info',
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: ''
};

export const workInfo: IconItem = {
  text: 'WORK_EXPERIENCE',
  icon: 'work-info',
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: ''
};

export const educationInfo: IconItem = {
  text: 'EDUCATION_EXPERIENCE',
  icon: 'education-info',
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: [],
  },
  page: ''
};
//endregion

@Injectable()
export class IconService {

  subscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>,
              public permission: PermissionService) {
  }

  getIcons(name: string, icons: IconItem[]): Observable<IconState[]> {
    const icons$ = Observable.from(icons);

    const permissionIcons$ = this.addPermissionToIcons(icons$);

    const subscription = this.addIcons(name, permissionIcons$);

    this.subscriptions.push(subscription);

    return this.store.select(createSelector(getIconsState, this.select(name)));
  }

  private addPermissionToIcons(icons: Observable<IconItem>): Observable<IconState[]> {
    return this.permission
      .functionalPermissionValidate(icons.map(icon => icon.permission))
      .zip(icons, (permission, item) => {
        const {text, icon, color, page} = item;
        return {text, icon, color, page, permission};
      })
      .map(item => {
        const {view, opt} = item.permission;
        if (!view && !opt) item.color = '';
        return item;
      })
      .reduce((acc, cur) => {
        acc.push(cur);
        return acc;
      }, []);
  }

  private addIcons(name: string, icons: Observable<IconState[]>): Subscription {
    return icons.subscribe(icons => {
      const target = {};
      target[name] = icons;
      this.store.dispatch(new AddIconsBarAction(target));
    });
  }

  private select(name: string) {
    return state => state[name];
  }

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
