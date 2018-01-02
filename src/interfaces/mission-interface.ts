import { WorkFlow } from './response-interface';

export interface MissionListItem {
    title: string;
    requester: string;
    isRequester: boolean; // whether current user is requester.
    createTime: string;
    taskId: number;
    selected: boolean;
    id: number;
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
    attendanceModifyPage = 'attendanceModifyPage'
}

export interface WorkFlowUnit {
    count: number;
    list: WorkFlow[];
}