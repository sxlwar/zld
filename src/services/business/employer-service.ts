import { putInArray } from '../utils/util';
import { Employer } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { ProjectService } from './project-service';
import { AppState, selectCompanyUserResponse, selectCompanyUsers, selectSelectedForemen, selectSelectedQualityClerks } from './../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { UserService } from './user-service';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';
import { SetSelectedQualityClerkAction, SetSelectedForemanAction } from '../../actions/action/employer-action';
import { QW, TL } from '../../services/config/character';

@Injectable()
export class EmployerService {
    constructor(
        public store: Store<AppState>,
        public userInfo: UserService,
        public project: ProjectService,
        public process: ProcessorService,
        public error: ErrorService
    ) {
    }

    /* ==============================================================Data acquisition===================================================== */

    getCompanyUsers(): Observable<Employer[]> {
        return this.store.select(selectCompanyUsers);
    }

    // unused
    getSelectedForemen(): Observable<number[]> {
        return this.store.select(selectSelectedForemen);
    }

    // unused
    getSelectedQualityClerks(): Observable<number[]> {
        return this.store.select(selectSelectedQualityClerks);
    }

    getSpecificRoles(role: string): Observable<Employer[]> {
        return this.getCompanyUsers()
            .mergeMap(employers => Observable.from(employers)
                .filter(employer => employer.user__groups__name === role)
                .reduce(putInArray, [])
            );
    }
    
    /* ==============================================================API request=========================================================== */

    getCompanyUserList(): Subscription {
        return this.process.companyUserListProcessor(
            this.project.getProjectPrimeCompanyId().map(id => ([id]))
                .withLatestFrom(this.userInfo.getSid(), (company_id, sid) => ({ company_id, sid }))
        );
    }

    /* ==============================================================Local state change=========================================================== */

    // unused
    setSelectedEmployer(id: number[], type: string): void {
        if (type === TL) this.store.dispatch(new SetSelectedForemanAction(id));

        if (type === QW) this.store.dispatch(new SetSelectedQualityClerkAction(id));
    }

    /* ==============================================================Error handle===================================================== */

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectCompanyUserResponse), 'API_ERROR');
    }
}