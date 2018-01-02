import { LeaveRecordListOptions } from './../../interfaces/request-interface';
import { RequestOption } from 'interfaces/request-interface';
import { LeaveRecordListResponse, Leave } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppState, selectLeaveRecordListResponse } from './../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';
import { Injectable } from '@angular/core';

@Injectable()
export class LeaveService {
    constructor(
        public store: Store<AppState>,
        public userInfo: UserService,
        public error: ErrorService,
        public processor: ProcessorService
    ) { }

    getLeaveRecordListResponse(): Observable<LeaveRecordListResponse> {
        return this.store.select(selectLeaveRecordListResponse)
            .filter(value => !!value);
    }

    getLeaveRecordLists(): Observable<Leave[]> {
        return this.getLeaveRecordListResponse()
            .filter(value => !!value && !!value.leaves.length)
            .map(res => res.leaves);
    }

    getLeaveRecord(option: Observable<RequestOption>): Subscription {
        return this.processor.leaveRecordListProcessor(option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid })) as Observable<LeaveRecordListOptions>);
    }

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectLeaveRecordListResponse), 'API_ERROR');
    }
}