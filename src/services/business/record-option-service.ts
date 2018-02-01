import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestOption } from './../../interfaces/request-interface';

@Injectable()
export class RecordOptionService {
    constructor() {

    }

    getRecordOptions(id: number, status: string, needHistory = true): Observable<RequestOption> {
        return Observable.of({
            history_view: needHistory,
            request_id: id,
            request_status: status,
        });
    }
}
