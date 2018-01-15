
export interface WorkerItem {
    id: number;
    name: string;
}

export interface DistinguishableWorkerItem {
    id: number;
    name: string;
    teamName: string;
    workType: string;
    selected: boolean;
}