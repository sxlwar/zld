import { AccountChangeEffect } from './account-change-effect';
import { AttendanceCardEffect } from './attendance-card-effect';
import { AttendanceEffect } from './attendance-effect';
import { AttendanceMachineEffect } from './attendance-machine-effect';
import { BankCardEffect } from './bank-card-effect';
import { CraftEffect } from './craft-effect';
import { EmployerEffect } from './employer-effect';
import { GroupsListEffect } from './group-list-effect';
import { LaunchEffect } from './launch-effect';
import { LeaveEffect } from './leave-effect';
import { LocationCardEffect } from './location-card-effect';
import { LocationEffect } from './location-effect';
import { LogoutEffect } from './logout-effect';
import { MessageEffect } from './message-effect';
import { NationalityEffect } from './nationality-effect';
import { OvertimeEffect } from './overtime-effect';
import { PayBillEffect } from './pay-bill-effect';
import { PersonalEffect } from './personal-effect';
import { ProjectEffect } from './project-effect';
import { QRLoginEffect } from './qr-scan-login-effect';
import { SearchWorkerEffect } from './search-worker-effect';
import { TeamEffect } from './team-effect';
import { WorkCertificateEffect } from './work-certificate-effect';
import { WorkFlowEffect } from './work-flow-effect';
import { WorkPieceEffect } from './work-piece-effect';
import { WorkerEffect } from './worker-effect';

/**
 * @description These are all needed after the user enters the APP,
 *  and the effects before entering the APP are only referenced when they are used.
 */
export const EFFECTS = [
    AccountChangeEffect,
    AttendanceCardEffect,
    AttendanceEffect,
    AttendanceMachineEffect,
    BankCardEffect,
    CraftEffect,
    EmployerEffect,
    GroupsListEffect,
    LaunchEffect,
    LeaveEffect,
    LogoutEffect,
    LocationEffect,
    LocationCardEffect,
    MessageEffect,
    NationalityEffect,
    OvertimeEffect,
    PayBillEffect,
    PersonalEffect,
    ProjectEffect,
    QRLoginEffect,
    SearchWorkerEffect,
    TeamEffect,
    WorkFlowEffect,
    WorkPieceEffect,
    WorkerEffect,
    WorkCertificateEffect,
];
