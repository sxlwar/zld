import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { getGroupListResponse } from '../../reducers/index-reducer';
import { GroupsListResponse } from './../../interfaces/response-interface';
import { AppState } from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';

@Injectable()
export class GroupListService {
    constructor(
        private userInfo: UserService,
        private store: Store<AppState>,
        private process: ProcessorService,
        private error: ErrorService
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
