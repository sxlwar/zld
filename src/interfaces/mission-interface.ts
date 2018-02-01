import { attendanceModifyDetailPage, leaveDetailPage, overtimeDetailPage, pieceAuditDetailPage } from './../pages/pages';
import { ProcessIdOptions } from './request-interface';
import { WorkFlow } from './response-interface';

export interface MissionListItem {
    title: string;
    requester: string;
    isRequester: boolean; // whether current user is requester.
    createTime: string;
    taskId: number;
    selected: boolean;
    id: number;
    processId: string;
    status: string;
    icon: string;
}

export interface AuditTarget {
    approve: boolean;
    ids: number[];
    comment: string;
}

export enum WorkFlowPageType {
    leavePage = 'leavePage',
    overtimePage = 'overtimePage',
    pieceAuditPage = 'pieceAuditPage',
    attendanceModifyPage = 'attendanceModifyPage',
    iStartedPage = 'iStartedPage',
    iCompletedPage = 'iCompletedPage',
}

export const processIdToPage = {
    sign_worker_contract: '',
    worker_contract_time_change: '',
    amend_worker_attend: attendanceModifyDetailPage,
    workpiece_finish: pieceAuditDetailPage,
    leave_apply: leaveDetailPage,
    workovertime_apply: overtimeDetailPage,
    project_payflow_apply: '',
    attendanceConfirm: '',
}

export const screeningConditions = [
    { text: 'ALL', processId: '' },
    { text: 'LEAVE_APPLY', processId: ProcessIdOptions.leave },
    { text: 'OVERTIME_APPLY', processId: ProcessIdOptions.overtime },
    { text: 'PIECE_AUDIT', processId: ProcessIdOptions.pieceAudit },
    { text: 'MODIFY_ATTENDANCE', processId: ProcessIdOptions.attendanceModify },
    { text: 'WORK_CONTRACT', processId: ProcessIdOptions.workerContract },
    { text: 'MODIFY_WORK_CONTRACT', processId: ProcessIdOptions.workerContractExpire },
];

export interface ScreeningCondition {
    text: string;
    processId: string;
}

export interface WorkFlowUnit {
    count: number;
    list: WorkFlow[];
}
