import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PayProcess } from 'interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppState, selectPayProcessList, selectPayProcessResponse } from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';

@Injectable()
export class PayProcessService {
    constructor(
        private store: Store<AppState>,
        private process: ProcessorService,
        private userInfo: UserService,
        private error: ErrorService
    ) {
    }

    getPayProcesses(): Observable<PayProcess[]> {
        return this.store.select(selectPayProcessList);
    }

    getPayProcessList(): Subscription {
        return this.process.payProcessProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    handleError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectPayProcessResponse));
    }
}
