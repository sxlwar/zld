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
import { RecordOptionService } from './record-option-service';

@Injectable()
export class OvertimeService extends RecordOptionService {

    constructor(
        public store: Store<AppState>,
        public error: ErrorService,
        public userInfo: UserService,
        public processor: ProcessorService
    ) {
        super();
    }

    getOvertimeRecords(): Observable<Overtime[]> {
        return this.store.select(selectOvertimeRecord);
    }

    getOvertimeRecordList(option: Observable<RequestOption>): Subscription {
        return this.processor.workOvertimeRecordListProcessor(option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid })));
    }

    getOvertimeCount(): Observable<number> {
        return this.store.select(selectOvertimeRecordCount);
    }

    handleError() {
        return this.error.handleErrorInSpecific(this.store.select(selectOvertimeRecordResponse), 'API_ERROR');
    }
}
