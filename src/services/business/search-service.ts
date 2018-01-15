import { SearchItem } from './../../interfaces/search-interface';
import { QueryWorkerBy } from './../../reducers/reducer/search-worker-reducer';
import { SetQueryWorkerConditionAction, AddSelectedWorkerAction, RemoveSelectedWorkerAction } from './../../actions/action/search-worker-action';
import { UserService } from './user-service';
import { Subscription } from 'rxjs/Subscription';
import { SearchCompanyOptions } from './../../interfaces/request-interface';
import { SelectCompanyAction } from './../../actions/action/search-company-action';
import { Company, SearchWorkerResponse, WorkerInfo } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { AppState, selectSearchQuery, selectSearchLoading, selectSearchWorkerResponse, selectSearchCompanyResponse, selectSearchWorkerCondition, selectSearchWorkerContent, selectSelectedWorkersFromSearch } from './../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

    constructor(
        public store: Store<AppState>,
        public process: ProcessorService,
        public error: ErrorService,
        public userInfo: UserService
    ) {

    }

    /* =====================================================Search Company handle ========================================== */

    getSearchTargetOfCompany(): Observable<string> {
        return this.store.select(selectSearchQuery);
    }

    getSearchResultOfCompany(): Observable<Company[]> {
        return this.store.select(selectSearchCompanyResponse)
            .filter(value => !!value)
            .map(res => res.companies);
    }

    getLoadingState(): Observable<boolean> {
        return this.store.select(selectSearchLoading);
    }

    searchCompany(option: Observable<SearchCompanyOptions>): Subscription {
        return this.process.searchCompanyProcessor(option);
    }

    setSelectedCompany(id: number): void {
        this.store.dispatch(new SelectCompanyAction(id));
    }

    /* =====================================================Search Worker handle ========================================== */

    getSearchWorkerResponse(): Observable<SearchWorkerResponse> {
        return this.store.select(selectSearchWorkerResponse)
            .filter(value => !!value);
    }

    getSearchResultOfWorker(): Observable<WorkerInfo[]> {
        return this.getSearchWorkerResponse()
            .map(res => res.workers);
    }

    getSearchCondition(): Observable<string> {
        return this.store.select(selectSearchWorkerCondition);
    }

    getSelectedWorkersId(): Observable<number[]> {
        return this.getSelectedWorkers()
            .map(source => source.map(item => item.user_id));
    }

    getSelectedWorkers(): Observable<WorkerInfo[]> {
        return this.store.select(selectSelectedWorkersFromSearch);
    }

    getQueryContent(): Observable<string> {
        return this.store.select(selectSearchWorkerContent);
    }

    searchWorker(option: Observable<string>): Subscription {
        return this.process.searchWorkerProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                this.getSearchCondition(),
                (query, sid, condition) => condition === QueryWorkerBy.name ? { realname: query, sid } : { username: query, sid }
            )
        );
    }

    setSearchWorkerCondition(condition: string): void {
        this.store.dispatch(new SetQueryWorkerConditionAction(condition));
    }

    toggleSelectedWorker(source: Observable<SearchItem>): Subscription {
        return source.subscribe(worker => worker.selected ? this.store.dispatch(new AddSelectedWorkerAction(worker.id)) : this.store.dispatch(new RemoveSelectedWorkerAction(worker.id)));
    }

    /* =====================================================Error handle ========================================== */

    handleCompanyError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectSearchCompanyResponse), 'API_ERROR');
    }

    handleWorkerError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectSearchWorkerResponse), 'API_ERROR');
    }
}