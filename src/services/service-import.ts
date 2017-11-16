
import { Command } from './api/command'
import { HttpService } from './api/http-service';
import { MapperService } from './api/mapper-service';
import { ProcessorService } from './api/processor-service';
import { UploadService } from './api/upload-service';
import { WebsocketService } from './api/websocket-service';
import { AttendanceService } from './business/attendance-service';
import { AttendanceRecordService } from './business/attendance-record-service';
import { CertificateService } from './business/certificate-service';
import { CraftService } from './business/craft-service';
import { IconService } from './business/icon-service';
import { LoginService } from './business/login-service';
import { OvertimeService } from './business/overtime-service';
import { PayBillService } from './business/pay-bill-service';
import { TeamService } from './business/team-service';
import { TutorialService } from './business/tutorial-service';
import { UserService } from './business/user-service';
import { WorkPieceService } from './business/work-piece-service';
import { WorkerService } from './business/worker-service';
import { ConfigService } from './config/config-service';
import { PermissionService } from './config/permission-service';
import { TimeService } from './utils/time-service';
import { ErrorService } from './errors/error-service';
import { TipService } from './tip-service';


export const API_SERVICES = [
    Command,
    HttpService,
    MapperService,
    ProcessorService,
    UploadService,
    WebsocketService,
]


export const BUSINESS_SERVICES = [
    AttendanceService,
    AttendanceRecordService,
    CertificateService,
    CraftService,
    IconService,
    LoginService,
    OvertimeService,
    PayBillService,
    TeamService,
    TutorialService,
    UserService,
    WorkPieceService,
    WorkerService,
]


export const CONFIG_SERVICE = [
    ConfigService,
    PermissionService
]

export const UTIL_SERVICES = [
    TimeService,
    ErrorService,
    TipService
]