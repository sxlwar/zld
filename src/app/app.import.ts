import { directives } from '../directives/directives-import';
import { AttendanceStateIconPipe, AttendanceStatePipe } from './../pipes/attendance-pipe';
import { BadgePipe } from './../pipes/badge-pipe';
import { BatteryPipe, IsLowPowerPipe, PercentBatteryPipe } from './../pipes/battery-pipe';
import { EveryMonthPipe } from './../pipes/every-month-pipe';
import { InOutPipe } from './../pipes/inOut-pipe';
import { JoinPipe } from './../pipes/join-pipe';
import { LocationCardStatusPipe } from './../pipes/location-card-status-pipe';
import { MessageIconPipe, MessageParsePipe, MessageSplitPipe } from './../pipes/message-pipe';
import { DegreePipe, WorkTypePipe } from './../pipes/personal-pipe';
import { PositiveIntegerPipe } from './../pipes/positive-integer-pipe';
import { PriceUnitPipe } from './../pipes/price-unit-pipe';
import { SexPipe } from './../pipes/sex-pipe';
import { CaptchaSrcPipe, ImageSrcPipe } from './../pipes/url-pipe';
import { NamesPipe, OvertimePayPipe, TaskStatusColorPipe, TaskStatusPipe } from './../pipes/work-flow-pipe';
import { WorkerContractTypePipe } from './../pipes/worker-contract-pipe';

export const PIPES = [
    AttendanceStateIconPipe,
    AttendanceStatePipe,
    BadgePipe,
    BatteryPipe,
    CaptchaSrcPipe,
    DegreePipe,
    EveryMonthPipe,
    ImageSrcPipe,
    InOutPipe,
    IsLowPowerPipe,
    JoinPipe,
    LocationCardStatusPipe,
    MessageIconPipe,
    MessageParsePipe,
    MessageSplitPipe,
    NamesPipe,
    OvertimePayPipe,
    PercentBatteryPipe,
    PositiveIntegerPipe,
    PriceUnitPipe,
    SexPipe,
    TaskStatusColorPipe,
    TaskStatusPipe,
    WorkTypePipe,
    WorkerContractTypePipe,
];

export const DIRECTIVES = directives;
