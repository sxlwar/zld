import { getGroupListResponse } from '../../reducers/index-reducer';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from './../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { UserService } from './user-service';
import { GroupsListResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupListService {
    constructor(
       public userInfo: UserService,
       public store: Store<AppState>,
       public process: ProcessorService,
       public error: ErrorService
    ) { }

    getGroupListResponse(): Observable<GroupsListResponse> {
        return this.store.select(getGroupListResponse);
    }
    
    attemptLogin(): Subscription {
        return this.process.groupListProcessor(
            this.userInfo.getAuthPass()
                .filter(value => value)
                .mergeMapTo(this.userInfo.getSid().map(sid => ({ sid })))
        );
    }

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.getGroupListResponse(), 'API_ERROR');
    }
}