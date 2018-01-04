import { RequestOption } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class RecordOptionService {
    constructor() {

    }

    getRecordOptions(id: number, status: string, needHistory = true): Observable<RequestOption> {
        return Observable.of({
            history_view: needHistory,
            request_id: id,
            request_status: status
        });
    }
}