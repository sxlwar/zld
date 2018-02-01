import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SelectProjectAction } from '../../actions/action/project-action';
import { Project } from '../../interfaces/response-interface';
import { AppState, selectProjectListResponse, selectSelectedProject } from '../../reducers/index-reducer';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import { TimeService } from '../utils/time-service';
import { UserService } from './user-service';

@Injectable()
export class ProjectService {

    constructor(
        private store: Store<AppState>,
        private processor: ProcessorService,
        private error: ErrorService,
        private userInfo: UserService,
        private timeService: TimeService
    ) {
    }

    /*====================================The main methods provided by the service===================================*/

    getCurrentProject(): Observable<Project> {
        return this.store.select(selectSelectedProject)
            .do(value => !value && this.getProjectList())
            .filter(value => !!value);
    }

    private getProjectList(): Subscription {
        return this.processor.projectListProcessor(
            this.userInfo.getSid()
                .withLatestFrom(
                Observable.of({ prime_contract_status: '完成' }),
                (sid, state) => ({ sid, ...state })
                )
        );
    }

    getUserAllProject(): Observable<Project[]> {
        return this.store.select(selectProjectListResponse)
            .filter(value => !!value)
            .map(res => res.projects);
    }

    getProjectName(): Observable<string> {
        return this.store.select(selectSelectedProject)
            .do(project => !project && this.getProjectList())
            .filter(value => !!value)
            .map(project => project.name);
    }

    getProjectAddress(project: Project): string {
        return project.address__province + project.address__city + project.address__dist + project.address__detail;
    }

    getProjectExpiringDate(project: Project): number {
        return this.cutDownDays(project.prime_contract__plan_finish_day);
    }


    getProjectId(): Observable<number> {
        return this.getCurrentProject().map(project => project.id);
    }

    switchProject(id: number) {
        this.store.dispatch(new SelectProjectAction(id));
    }

    getProjectPrimeCompanyId() {
        return this.getCurrentProject().map(project => project.prime_contract__first_contracting_id);
    }

    /*================================================error handle===============================================*/

    handleError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectProjectListResponse));
    }

    private cutDownDays(date: string): number {
        if (!date) return NaN;
        const end = new Date(date);
        const now = new Date();
        return this.timeService.countDownDays(now, end);
    }

}
