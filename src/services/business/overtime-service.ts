import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { RequestOption } from '../../interfaces/request-interface';
import { Overtime } from '../../interfaces/response-interface';
import {
    AppState,
    selectOvertimeRecord,
    selectOvertimeRecordCount,
    selectOvertimeRecordResponse,
} from '../../reducers/index-reducer';
import { ProcessorService } from '..//api/processor-service';
import { UserService } from '..//business/user-service';
import { ErrorService } from '..//errors/error-service';
import { RecordOptionService } from './record-option-service';

@Injectable()
export class OvertimeService extends RecordOptionService {

    constructor(
        private store: Store<AppState>,
        private error: ErrorService,
        private userInfo: UserService,
        private processor: ProcessorService
    ) {
        super();
    }

    getOvertimeRecords(): Observable<Overtime[]> {
        return this.store.select(selectOvertimeRecord);
    }

    getOvertimeRecordList(option: Observable<RequestOption>): Subscription {
        return this.processor.workOvertimeRecordListProcessor(
            option.withLatestFrom(
                this.userInfo.getSid(),
                (option, sid) => ({ ...option, sid })
            )
        );
    }

    getOvertimeCount(): Observable<number> {
        return this.store.select(selectOvertimeRecordCount);
    }

    handleError() {
        return this.error.handleApiRequestError(this.store.select(selectOvertimeRecordResponse));
    }
}
