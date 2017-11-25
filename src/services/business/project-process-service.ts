import { Observable } from 'rxjs/Observable';
import { ProjectPayProcess, PayProcessStatus } from './../../interfaces/response-interface';
import { ProjectService } from './project-service';
import { Subscription } from 'rxjs/Subscription';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';
import { AppState, selectProjectProcessResponse, selectProjectProcessList, selectProjectProcessSelectedStatus } from './../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { SelectProjectPayProcessStatus } from '../../actions/action/pay-bill-action';

@Injectable()
export class ProjectProcessService {
    subscriptions: Subscription[] = [];
    projectProcess$$: Subscription;

    constructor(
        public store: Store<AppState>,
        public userInfo: UserService,
        public error: ErrorService,
        public project: ProjectService,
        public process: ProcessorService
    ) {
        this.handleError();
    }

    getProjectPayProcess(): Observable<ProjectPayProcess[]> {
        return this.store.select(selectProjectProcessList);
    }

    getListOfSelectedStatus(): Observable<ProjectPayProcess[]> {
        return this.getProjectPayProcess()
            .combineLatest(this.store.select(selectProjectProcessSelectedStatus))
            .mergeMap(([processes, status]) => Observable.from(processes)
                .filter(process => process.status === PayProcessStatus[status])
                .reduce((acc, cur) => {
                    acc.push(cur);
                    return acc;
                }, [])
            );
    }

    getProcessList(): void {
        const sid = this.userInfo.getSid();

        const projectId = this.project.getProjectId();

        const option = sid.zip(projectId, (sid, project_id) => ({ sid, project_id }));

        const subscription = this.process.projectPayProcessProcessor(option);

        this.subscriptions.push(subscription);
    }

    getSelectedStatus(): Observable<string> {
        return this.store.select(selectProjectProcessSelectedStatus);
    }

    setSelectedStatus(status: string): void {
        this.store.dispatch(new SelectProjectPayProcessStatus(status));
    }

    private handleError() {
        const error = this.store.select(selectProjectProcessResponse);

        this.projectProcess$$ = this.error.handleErrorInSpecific(error, 'API_ERROR');
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}