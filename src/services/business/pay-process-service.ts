import { Observable } from 'rxjs/Observable';
import { AppState, selectPayProcessResponse, selectPayProcessList } from './../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';
import { ProcessorService } from './../api/processor-service';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from "@angular/core";
import { PayProcess } from 'interfaces/response-interface';

@Injectable()
export class PayProcessService {
    constructor(
        public store: Store<AppState>,
        public process: ProcessorService,
        public userInfo: UserService,
        public error: ErrorService
    ) {
    }

    getPayProcesses(): Observable<PayProcess[]> {
        return this.store.select(selectPayProcessList);
    }

    getPayProcessList(): Subscription {
        return this.process.payProcessProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectPayProcessResponse), 'APP_ERROR');
    }
}