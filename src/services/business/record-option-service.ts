import { WorkFlowStatus, RequestOption } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class RecordOptionService {
    constructor() {

    }

    getProcessingRecordOptions(id: number): Observable<RequestOption> {
        return Observable.of({
            history_view: true,
            request_id: id,
            request_status: WorkFlowStatus.processing
        });
    }
}