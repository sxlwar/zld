import { Observable } from 'rxjs/Observable';

export interface WorkerItem {
    id: number;
    name: string;
}

export interface DistinguishableWorkerItem {
    id: number;
    name: string;
    teamName: string;
    workType: string;
    workTypeId: number;
    selected: boolean;
}

export interface FindFn<U,T> {
    (type: U, source: T[]): T
}

export interface TransformToObservableFn<T> {
    (source: T) : Observable<T>
}
