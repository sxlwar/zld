import {
  CW,
  EME,
  LM,
  MM,
  PA,
  Permission,
  PermissionService,
  PM,
  PME,
  QW,
  SW,
  TL,
  UW
} from '../config/permission-service';
import {Observable} from 'rxjs/Observable';
import {IconState} from '../../reducers/icons-reducer';
import {AppState, getIconsState} from '../../reducers/index-reducer';
import {createSelector, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {AddIconsBarAction} from '../../actions/icons-action';
import {Subscription} from 'rxjs/Subscription';

export interface IconItem {
  text: string;
  icon: string;
  color: string;
  permission: Permission
}

export const attendance: IconItem = {
  text: 'ATTENDANCE_CHAR',
  icon: 'attendance',
  color: 'primary',
  permission: {
    view: [PME, PM, LM],
    opt: [TL]
  }
};

export const payroll: IconItem = {
  text: 'PAYROLL',
  icon: 'payroll',
  color: 'economics',
  permission: {
    view: [PME, EME, MM, PM, LM, TL],
    opt: []
  }
};

export const organization: IconItem = {
  text: 'ORGANIZATION',
  icon: 'organization',
  color: 'advanced',
  permission: {
    view: [PME, EME, MM, LM, TL, QW],
    opt: [PM]
  }
};

export const workerManager: IconItem = {
  text: 'WORKER_MANAGER',
  icon: 'worker-manager',
  color: 'advanced',
  permission: {
    view: [PME, EME, MM, PM, CW, QW],
    opt: [LM, TL]
  }
};
export const workPiece: IconItem = {
  text: 'WORK_PIECE',
  icon: 'work-piece',
  color: 'piece',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW],
    opt: []
  }
};
export const location: IconItem = {
  text: 'WORKER_LOCATION',
  icon: 'location',
  color: 'location',
  permission: {
    view: [PME, EME, MM, PM, LM, TL],
    opt: []
  }
};
export const trajectory: IconItem = {
  text: 'WORKER_TRAJECTORY',
  icon: 'trajectory',
  color: 'location',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW],
    opt: []
  }
};
export const attendanceMachine: IconItem = {
  text: 'ATTENDANCE_MACHINE',
  icon: 'attendance-machine',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, PM, LM, TL],
    opt: []
  }
};
export const locationCard: IconItem = {
  text: 'IC_LOCATION_CARD',
  icon: 'location-card',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, LM, TL],
    opt: [PM]
  }
};
export const attendanceCard: IconItem = {
  text: 'ATTENDANCE_CARD',
  icon: 'attendance-card',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM]
  }
};

export const attendanceConfirm: IconItem = {
  text: 'ATTENDANCE_CONFIRM',
  icon: 'attendance-confirm',
  color: 'primary',
  permission: {
    view: [PME, EME],
    opt: [TL]
  }
};
export const payrollAudit: IconItem = {
  text: 'PAYROLL_AUDIT',
  icon: 'payroll-audit',
  color: 'economics',
  permission: {
    view: [PME, EME, MM],
    opt: [PM, LM, TL]
  }
};
export const leave: IconItem = {
  text: 'LEAVE_APPLY',
  icon: 'leave',
  color: 'primary',
  permission: {
    view: [PME, EME, MM],
    opt: [PM, LM]
  }
};
export const overtime: IconItem = {
  text: 'LEAVE_APPLY',
  icon: 'overtime',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM]
  }
};
export const pieceAudit: IconItem = {
  text: 'PIECE_AUDIT',
  icon: 'piece-audit',
  color: 'piece',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM, QW]
  }
};
export const modifyAttendance: IconItem = {
  text: 'MODIFY_ATTENDANCE',
  icon: 'modify-attendance',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, TL],
    opt: [PM, LM]
  }
};
export const workContract: IconItem = {
  text: 'WORK_CONTRACT',
  icon: 'work-contract',
  color: 'contract',
  permission: {
    view: [],
    opt: [PM, LM, TL, SW, UW]
  }
};
export const primeContract: IconItem = {
  text: 'PRIME_CONTRACT',
  icon: 'prime-contract',
  color: 'contract',
  permission: {
    view: [],
    opt: [PME, MM, PM]
  }
};
export const subContract: IconItem = {
  text: 'SUB_CONTRACT',
  icon: 'sub-contract',
  color: 'contract',
  permission: {
    view: [],
    opt: [PME, MM, PM]
  }
};
export const modifyDuty: IconItem = {
  text: 'MODIFY_DUTY',
  icon: 'modify-duty',
  color: 'primary',
  permission: {
    view: [],
    opt: [PM, TL]
  }
};
export const workContractModify: IconItem = {
  text: 'MODIFY_WORK_CONTRACT',
  icon: 'work-contract-modify',
  color: 'contract',
  permission: {
    view: [],
    opt: [PM, LM]
  }
};
export const myAudited: IconItem = {
  text: 'MY_AUDIT',
  icon: 'my-audited',
  color: 'related',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW, SW, UW],
    opt: []
  }
};
export const myLaunch: IconItem = {
  text: 'MY_APPLY',
  icon: 'my-launch',
  color: 'related',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, QW],
    opt: []
  }
};

export const myAttendance: IconItem = {
  text: 'MY_ATTENDANCE',
  icon: 'my-attendance',
  color: 'primary',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW],
    opt: []
  }
};
export const salary: IconItem = {
  text: 'MY_SALARY',
  icon: 'salary',
  color: 'economics',
  permission: {
    view: [SW, UW],
    opt: []
  }
};
export const bankCard: IconItem = {
  text: 'MY_BANK_CARD',
  icon: 'bank-card',
  color: 'primary',
  permission: {
    view: [PME, EME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: []
  }
};
export const certificate: IconItem = {
  text: 'MY_CERTIFICATE',
  icon: 'certificate',
  color: 'contract',
  permission: {
    view: [PME, MM, PM, LM, TL, CW, QW, SW, UW, PA],
    opt: []
  }
};

export const apply: IconItem = {
  text: 'LAUNCH_APPLY',
  icon: 'apply',
  color: 'secondary',
  permission: {
    view: [],
    opt: [TL, PM]
  }
};

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
      .permissionValidate(icons.map(icon => icon.permission))
      .zip(icons, (permission, item) => {
        const {text, icon, color} = item;
        return {text, icon, color, permission};
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

  clean() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
