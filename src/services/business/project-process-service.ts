import { putInArray } from '../utils/util';
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
    constructor(
        public store: Store<AppState>,
        public userInfo: UserService,
        public error: ErrorService,
        public project: ProjectService,
        public process: ProcessorService
    ) {
    }

    getProjectPayProcess(): Observable<ProjectPayProcess[]> {
        return this.store.select(selectProjectProcessList);
    }

    getListOfSelectedStatus(): Observable<ProjectPayProcess[]> {
        return this.getProjectPayProcess()
            .combineLatest(this.store.select(selectProjectProcessSelectedStatus))
            .mergeMap(([processes, status]) => Observable.from(processes)
                .filter(process => process.status === PayProcessStatus[status])
                .reduce(putInArray, [])
            );
    }

    getProcessList(): Subscription {
        return this.process.projectPayProcessProcessor(
            this.project.getProjectId()
                .withLatestFrom(
                this.userInfo.getSid(),
                (project_id, sid) => ({ sid, project_id })
                )
        );
    }

    getSelectedStatus(): Observable<string> {
        return this.store.select(selectProjectProcessSelectedStatus);
    }

    setSelectedStatus(status: string): void {
        this.store.dispatch(new SelectProjectPayProcessStatus(status));
    }

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectProjectProcessResponse), 'API_ERROR');
    }
}