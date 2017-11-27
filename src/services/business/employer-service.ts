//region
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
//endregion

@Injectable()
export class EmployerService {
    subscriptions: Subscription[] = [];

    companyUserList$$: Subscription;

    constructor(
        public store: Store<AppState>,
        public userInfo: UserService,
        public project: ProjectService,
        public process: ProcessorService,
        public error: ErrorService
    ) {
        this.handleError();
    }

    getCompanyUsers(): Observable<Employer[]> {
        return this.store.select(selectCompanyUsers);
    }

    getCompanyUserList(): void {
        const sid = this.userInfo.getSid();

        const companyId = this.project.getProjectPrimeCompanyId().map(id => ([id]));

        const option = sid.zip(
            companyId,
            (sid, company_id) => ({ sid, company_id })
        );

        const subscription = this.process.companyUserListProcessor(option);

        this.subscriptions.push(subscription);
    }

    getSpecificRoles(role: string): Observable<Employer[]> {
        return this.getCompanyUsers()
            .mergeMap(employers => Observable.from(employers)
                .filter(employer => employer.user__groups__name === role) 
                .reduce((acc, cur) => {
                    acc.push(cur);
                    return acc;
                }, [])
            );
    }

    /**
     * @description 以下三个方法暂时没有用到，功能已经写好了。
     */
    getSelectedForemen(): Observable<number[]> {
        return this.store.select(selectSelectedForemen);
    }

    getSelectedQualityClerks(): Observable<number[]> {
        return this.store.select(selectSelectedQualityClerks);
    }

    setSelectedEmployer(id: number[], type: string): void {
        if(type === TL) this.store.dispatch(new SetSelectedForemanAction(id)); 

        if(type === QW) this.store.dispatch(new SetSelectedQualityClerkAction(id));
    }

    /* ==========================================Error handle and refuse clean============================================= */

    handleError() {
        const error = this.store.select(selectCompanyUserResponse);

        this.companyUserList$$ = this.error.handleErrorInSpecific(error, 'API_ERROR');
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}