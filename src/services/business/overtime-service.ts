import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ErrorService } from '..//errors/error-service';
import { UserService } from '..//business/user-service';
import { ProcessorService } from '..//api/processor-service';
import { AppState, selectOvertimeRecordResponse, selectOvertimeRecord, selectOvertimeRecordCount } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RequestOption } from '../../interfaces/request-interface';
import { Overtime } from '../../interfaces/response-interface';

@Injectable()
export class OvertimeService {
    subscriptions: Subscription[] = [];

    constructor(
        public store: Store<AppState>,
        public error: ErrorService,
        public userInfo: UserService,
        public processor: ProcessorService
    ) {
        this.handleError();
    }

    getOvertimeRecord(option: Observable<RequestOption> = Observable.empty()): Observable<Overtime[]> {
        this.getOvertimeRecordList(option);

        return this.store.select(selectOvertimeRecord);
    }

    getOvertimeRecordList(option: Observable<RequestOption>): void {
        const sid = this.userInfo.getSid();

        const params = sid.zip( option, (sid, option) => ({sid, ...option}));

        const subscription = this.processor.workOvertimeRecordListProcessor(params);

        this.subscriptions.push(subscription);
    }

    getOvertimeCount(): Observable<number> {
        return this.store.select(selectOvertimeRecordCount);
    }

    private handleError() {
        const error = this.store.select(selectOvertimeRecordResponse);

        const subscription = this.error.handleErrorInSpecific(error, 'API_ERROR')

        this.subscriptions.push(subscription);
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
