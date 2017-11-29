import { Actions as login } from './action/login-action';
import { Actions as config } from './action/config-action';
import { Actions as tutorial } from './action/tutorial-action';
import { Actions as search } from './action/search-action';
import { Actions as icons } from './action/icons-action';
import { Actions as project } from './action/project-action';
import { Actions as worker } from './action/worker-action';
import { Actions as workType } from './action/craft-action';
import { Actions as team } from './action/team-action';
import { Actions as attendance } from './action/attendance-action';
import { Actions as attendanceRecord } from './action/attendance-record-action';
import { Actions as payBill } from './action/pay-bill-action';
import { Actions as overtime } from './action/overtime-action';
import { Actions as piece } from './action/work-piece-action';
import { Actions as statistics } from './action/statistics-action';
import { Actions as employer } from './action/employer-action';
import { Actions as personal } from './action/personal-action';

export type Actions = config
  | attendance
  | attendanceRecord
  | employer
  | icons
  | login
  | overtime
  | payBill
  | personal
  | piece
  | project
  | search
  | statistics
  | team
  | tutorial
  | workType
  | worker;
