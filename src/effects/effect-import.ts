import { WorkerEffect } from './worker-effect';
import { WorkPieceEffect } from './work-piece-effect';
import { TeamEffect } from './team-effect';
import { ProjectEffect } from './project-effect';
import { PayBillEffect } from './pay-bill-effect';
import { OvertimeEffect } from './overtime-effect';
import { CraftEffect } from './craft-effect';
import { AttendanceEffect } from './attendance-effect';
import { WorkFlowEffect } from './work-flow-effect';

export const EFFECTS = [
    AttendanceEffect,
    CraftEffect,
    OvertimeEffect,
    PayBillEffect,
    ProjectEffect,
    TeamEffect,
    WorkPieceEffect,
    WorkerEffect,
    WorkFlowEffect
]