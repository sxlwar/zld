import { MessageIconPipe, MessageSplitPipe, MessageParsePipe } from './../pipes/message-pipe';
import { DegreePipe } from './../pipes/personal-pipe';
import { LocationCardStatusPipe } from './../pipes/location-card-status-pipe';
import { InOutPipe } from './../pipes/inOut-pipe';
import { EveryMonthPipe } from './../pipes/every-month-pipe';
import { SexPipe } from './../pipes/sex-pipe';
import { BadgePipe } from './../pipes/badge-pipe';
import { PositiveIntegerPipe } from './../pipes/positive-integer-pipe';
import { JoinPipe } from './../pipes/join-pipe';
import { PriceUnitPipe } from './../pipes/price-unit-pipe';
import { BatteryPipe, PercentBatteryPipe, IsLowPowerPipe } from './../pipes/battery-pipe';



export const PIPES = [
    BadgePipe,
    EveryMonthPipe,
    InOutPipe,
    JoinPipe,
    PositiveIntegerPipe,
    PriceUnitPipe,
    SexPipe,
    LocationCardStatusPipe,
    BatteryPipe,
    PercentBatteryPipe,
    IsLowPowerPipe,
    DegreePipe,
    MessageIconPipe,
    MessageSplitPipe,
    MessageParsePipe,
]