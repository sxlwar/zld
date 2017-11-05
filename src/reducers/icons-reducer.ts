import {PermissionResult} from '../serveices/config/permission-service';
import * as actions from '../actions/icons-action';

export interface IconState {
  text: string;
  icon: string;
  color: string;
  permission: PermissionResult
}

export interface State {
  [name: string]: IconState[]
}

export const attendance: IconState = {
  text: 'ATTENDANCE_CHAR',
  icon: 'attendance',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};

export const payroll: IconState = {
  text: 'PAYROLL',
  icon: 'payroll',
  color: 'economics',
  permission: {
    view: false,
    opt: false
  }
};

export const organization: IconState = {
  text: 'ORGANIZATION',
  icon: 'organization',
  color: 'advanced',
  permission: {
    view: false,
    opt: false
  }
};

export const workerManager: IconState = {
  text: 'WORKER_MANAGER',
  icon: 'worker-manager',
  color: 'advanced',
  permission: {
    view: false,
    opt: false
  }
};
export const workPiece: IconState = {
  text: 'WORK_PIECE',
  icon: 'work-piece',
  color: 'piece',
  permission: {
    view: false,
    opt: false
  }
};
export const location: IconState = {
  text: 'WORKER_LOCATION',
  icon: 'location',
  color: 'location',
  permission: {
    view: false,
    opt: false
  }
};
export const trajectory: IconState = {
  text: 'WORKER_TRAJECTORY',
  icon: 'trajectory',
  color: 'location',
  permission: {
    view: false,
    opt: false
  }
};
export const attendanceMachine: IconState = {
  text: 'ATTENDANCE_MACHINE',
  icon: 'attendance-machine',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};
export const locationCard: IconState = {
  text: 'IC_LOCATION_CARD',
  icon: 'location-card',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};
export const attendanceCard: IconState = {
  text: 'ATTENDANCE_CARD',
  icon: 'attendance-card',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};

export const attendanceConfirm: IconState = {
  text: 'ATTENDANCE_CONFIRM',
  icon: 'attendance-confirm',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};
export const payrollAudit: IconState = {
  text: 'PAYROLL_AUDIT',
  icon: 'payroll-audit',
  color: 'economics',
  permission: {
    view: false,
    opt: false
  }
};
export const leave: IconState = {
  text: 'LEAVE_APPLY',
  icon: 'leave',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};
export const overtime: IconState = {
  text: 'LEAVE_APPLY',
  icon: 'overtime',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};
export const pieceAudit: IconState = {
  text: 'PIECE_AUDIT',
  icon: 'piece-audit',
  color: 'piece',
  permission: {
    view: false,
    opt: false
  }
};
export const modifyAttendance: IconState = {
  text: 'MODIFY_ATTENDANCE',
  icon: 'modify-attendance',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};
export const workContract: IconState = {
  text: 'WORK_CONTRACT',
  icon: 'work-contract',
  color: 'contract',
  permission: {
    view: false,
    opt: false
  }
};
export const primeContract: IconState = {
  text: 'PRIME_CONTRACT',
  icon: 'prime-contract',
  color: 'contract',
  permission: {
    view: false,
    opt: false
  }
};
export const subContract: IconState = {
  text: 'SUB_CONTRACT',
  icon: 'sub-contract',
  color: 'contract',
  permission: {
    view: false,
    opt: false
  }
};
export const modifyDuty: IconState = {
  text: 'MODIFY_DUTY',
  icon: 'modify-duty',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};
export const workContractModify: IconState = {
  text: 'MODIFY_WORK_CONTRACT',
  icon: 'work-contract-modify',
  color: 'contract',
  permission: {
    view: false,
    opt: false
  }
};
export const myAudited: IconState = {
  text: 'MY_AUDIT',
  icon: 'my-audited',
  color: 'related',
  permission: {
    view: false,
    opt: false
  }
};
export const myLaunch: IconState = {
  text: 'MY_APPLY',
  icon: 'my-launch',
  color: 'related',
  permission: {
    view: false,
    opt: false
  }
};

export const myAttendance: IconState = {
  text: 'MY_ATTENDANCE',
  icon: 'my-attendance',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};
export const salary: IconState = {
  text: 'MY_SALARY',
  icon: 'salary',
  color: 'economics',
  permission: {
    view: false,
    opt: false
  }
};
export const bankCard: IconState = {
  text: 'MY_BANK_CARD',
  icon: 'bank-card',
  color: 'primary',
  permission: {
    view: false,
    opt: false
  }
};
export const certificate: IconState = {
  text: 'MY_CERTIFICATE',
  icon: 'certificate',
  color: 'contract',
  permission: {
    view: false,
    opt: false
  }
};

export const apply: IconState = {
  text: 'LAUNCH_APPLY',
  icon: 'apply',
  color: 'secondary',
  permission: {
    view: false,
    opt: false
  }
};

export const project = [
  attendance,
  payroll,
  organization,
  workerManager,
  workPiece,
  location,
  trajectory,
  attendanceMachine,
  locationCard,
  attendanceCard
];

export const mission = [
  attendanceConfirm,
  payrollAudit,
  leave,
  overtime,
  pieceAudit,
  modifyAttendance,
  workContract,
  primeContract,
  subContract,
  modifyDuty,
  workContractModify,
  myLaunch,
  myAudited
];

export const mine = [
  myAttendance,
  salary,
  bankCard,
  certificate,
  workContract,
  apply,
  trajectory,
  workContractModify
];

export const initialState: State = {};

export function resetIconPermission(arg: IconState): IconState {
  const result = {...arg};
  result.permission = {view: false, opt: false};
  return result;
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type){
    case actions.ADD_ICONS_BAR:
      return {...state, ...action.payload};

    default:
      return state;
  }
}


export const getSpecificState = (state: State) => state
