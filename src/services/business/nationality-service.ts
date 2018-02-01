import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { putInArray } from '../utils/util';
import { AppState, selectNationalityResponse } from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';

@Injectable()
export class NationalityService {
    constructor(
        private store: Store<AppState>,
        private processor: ProcessorService,
        private error: ErrorService
    ) {
        this.getNationality();
    }

    getNationalities(): Observable<string[]> {
        return this.store.select(selectNationalityResponse)
            .filter(value => !!value)
            .mergeMap(res => Observable.from(res.nationalityChoices)
                .map(item => item[1])
                .reduce(putInArray, [])
            );
    }

    getNationality(): void {
        this.processor.nationalityProcessor();
    }

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectNationalityResponse), 'API_ERROR');
    }
}
