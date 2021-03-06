import { TakePhotoService } from './../components/take-photo/take-photo-service';
import { Command } from './api/command';
import { HttpService } from './api/http-service';
import { MapperService } from './api/mapper-service';
import { ProcessorService } from './api/processor-service';
import { WebsocketService } from './api/websocket-service';
import { AccountChangeService } from './business/account-change-service';
import { AmapService } from './business/amap-service';
import { AttendanceCardService } from './business/attendance-card-service';
import { AttendanceMachineService } from './business/attendance-machine-service';
import { AttendanceRecordService } from './business/attendance-record-service';
import { AttendanceService } from './business/attendance-service';
import { BankcardService } from './business/bank-card-service';
import { CertificateService } from './business/certificate-service';
import { CraftService } from './business/craft-service';
import { EmployerService } from './business/employer-service';
import { GroupListService } from './business/group-list-service';
import { IconService } from './business/icon-service';
import { LaunchService } from './business/launch-service';
import { LeaveService } from './business/leave-service';
import { LocationCardService } from './business/location-card-service';
import { LocationService } from './business/location-service';
import { LoginService } from './business/login-service';
import { LogoutService } from './business/logout-service';
import { MessageService } from './business/message-service';
import { NationalityService } from './business/nationality-service';
import { OvertimeService } from './business/overtime-service';
import { PayBillService } from './business/pay-bill-service';
import { PayProcessService } from './business/pay-process-service';
import { PersonalService } from './business/personal-service';
import { ProjectBillService } from './business/project-bill-service';
import { ProjectProcessService } from './business/project-process-service';
import { ProjectService } from './business/project-service';
import { QRLoginService } from './business/qr-login-service';
import { RecordOptionService } from './business/record-option-service';
import { SearchService } from './business/search-service';
import { StatisticsService } from './business/statistics-service';
import { TeamService } from './business/team-service';
import { TutorialService } from './business/tutorial-service';
import { UserService } from './business/user-service';
import { WorkCertificateService } from './business/work-certificate-service';
import { WorkFlowService } from './business/work-flow-service';
import { WorkPieceService } from './business/work-piece-service';
import { WorkerService } from './business/worker-service';
import { ConfigService } from './config/config-service';
import { PermissionService } from './config/permission-service';
import { ErrorService } from './errors/error-service';
import { TipService } from './tip-service';
import { AddressService } from './utils/address-service';
import { ChartService } from './utils/chart-service';
import { LayoutService } from './utils/layout-service';
import { TimeService } from './utils/time-service';

export const API_SERVICES = [
    Command,
    HttpService,
    MapperService,
    ProcessorService,
    WebsocketService,
]

export const BUSINESS_SERVICES = [
    AccountChangeService,
    AddressService,
    AmapService,
    AttendanceCardService,
    AttendanceMachineService,
    AttendanceRecordService,
    AttendanceService,
    BankcardService,
    CertificateService,
    CraftService,
    EmployerService,
    GroupListService,
    IconService,
    LayoutService,
    LaunchService,
    LeaveService,
    LocationService,
    LocationCardService,
    LoginService,
    LogoutService,
    MessageService,
    NationalityService,
    OvertimeService,
    PayBillService,
    PayProcessService,
    PersonalService,
    ProjectBillService,
    ProjectProcessService,
    ProjectService,
    QRLoginService,
    RecordOptionService,
    SearchService,
    StatisticsService,
    TakePhotoService,
    TeamService,
    TutorialService,
    UserService,
    WorkFlowService,
    WorkPieceService,
    WorkerService,
    WorkCertificateService,
]


export const CONFIG_SERVICES = [
    ConfigService,
    PermissionService,
];

export const UTIL_SERVICES = [
    TimeService,
    ErrorService,
    TipService,
    ChartService,
];
