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
    subscriptions: Subscription[] = [];
    payProcess$$: Subscription;

    constructor(
        public store: Store<AppState>,
        public process: ProcessorService,
        public userInfo: UserService,
        public error: ErrorService
    ) {
        this.handleError();
    }

    getPayProcesses(): Observable<PayProcess[]> {
        const result = this.store.select(selectPayProcessList);

        const subscription = result.subscribe(value => !value.length && this.getPayProcessList());

        this.subscriptions.push(subscription);

        return result;
    }

    getPayProcessList(): void {
        const sid = this.userInfo.getSid();

        const option = sid.map(sid => ({ sid }));

        const subscription = this.process.payProcessProcessor(option);

        this.subscriptions.push(subscription);
    }

    handleError() {
        const error = this.store.select(selectPayProcessResponse);

        this.payProcess$$ = this.error.handleErrorInSpecific(error, 'APP_ERROR');
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}