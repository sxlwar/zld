import { Actions as accountChange } from './action/account-change-action';
import { Actions as attendance } from './action/attendance-action';
import { Actions as attendanceCard } from './action/attendance-card-action';
import { Actions as machine } from './action/attendance-machine-action';
import { Actions as attendanceRecord } from './action/attendance-record-action';
import { Actions as bankCard } from './action/bank-card-action';
import { Actions as config } from './action/config-action';
import { Actions as workType } from './action/craft-action';
import { Actions as deleteImages } from './action/delete-images-action';
import { Actions as employer } from './action/employer-action';
import { Actions as group } from './action/group-list-action';
import { Actions as icons } from './action/icons-action';
import { Actions as launch } from './action/launch-action';
import { Actions as leave } from './action/leave-action';
import { Actions as location } from './action/location-action';
import { Actions as locationCard } from './action/location-card-action';
import { Actions as login } from './action/login-action';
import { Actions as logout } from './action/logout-action';
import { Actions as message } from './action/message-action';
import { Actions as nationality } from './action/nationality-action';
import { Actions as overtime } from './action/overtime-action';
import { Actions as payBill } from './action/pay-bill-action';
import { Actions as personal } from './action/personal-action';
import { Actions as project } from './action/project-action';
import { Actions as qrLogin } from './action/qr-scan-login-action';
import { Actions as searchCompany } from './action/search-company-action';
import { Actions as searchWorker } from './action/search-worker-action';
import { Actions as statistics } from './action/statistics-action';
import { Actions as team } from './action/team-action';
import { Actions as tutorial } from './action/tutorial-action';
import { Actions as certificate } from './action/work-certificate-action';
import { Actions as workFlow } from './action/work-flow-action';
import { Actions as piece } from './action/work-piece-action';
import { Actions as worker } from './action/worker-action';

export type Actions = config
    | accountChange
    | attendance
    | attendanceRecord
    | attendanceCard
    | bankCard
    | certificate
    | deleteImages
    | employer
    | group
    | icons
    | launch
    | leave
    | location
    | locationCard
    | login
    | logout
    | machine
    | message
    | nationality
    | overtime
    | payBill
    | personal
    | piece
    | project
    | qrLogin
    | searchCompany
    | searchWorker
    | statistics
    | team
    | tutorial
    | workFlow
    | workType
    | worker;
