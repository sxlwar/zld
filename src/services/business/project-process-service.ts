import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SelectProjectPayProcessStatus } from '../../actions/action/pay-bill-action';
import { putInArray } from '../utils/util';
import { PayProcessStatus, ProjectPayProcess } from './../../interfaces/response-interface';
import {
    AppState,
    selectProjectProcessList,
    selectProjectProcessResponse,
    selectProjectProcessSelectedStatus,
} from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { ProjectService } from './project-service';
import { UserService } from './user-service';

@Injectable()
export class ProjectProcessService {
    constructor(
        private store: Store<AppState>,
        private userInfo: UserService,
        private error: ErrorService,
        private project: ProjectService,
        private process: ProcessorService
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
        return this.error.handleApiRequestError(this.store.select(selectProjectProcessResponse));
    }
}
