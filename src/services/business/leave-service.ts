import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RequestOption } from 'interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { LeaveRecordListOptions } from './../../interfaces/request-interface';
import { Leave, LeaveRecordListResponse } from './../../interfaces/response-interface';
import { AppState, selectLeaveRecordListResponse } from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { RecordOptionService } from './record-option-service';
import { UserService } from './user-service';

@Injectable()
export class LeaveService extends RecordOptionService {
    constructor(
        private store: Store<AppState>,
        private userInfo: UserService,
        private error: ErrorService,
        private processor: ProcessorService
    ) {
        super();
    }

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
        return this.processor.leaveRecordListProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
            ) as Observable<LeaveRecordListOptions>);
    }

    handleError(): Subscription {
        return this.error.handleApiRequestError(this.getLeaveRecordListResponse());
    }
}
