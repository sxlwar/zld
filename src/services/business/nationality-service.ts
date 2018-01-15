import { Subscription } from 'rxjs/Subscription';
import { putInArray } from '../utils/util';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, selectNationalityResponse } from './../../reducers/index-reducer';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { Injectable } from '@angular/core';

@Injectable()
export class NationalityService {
    constructor(
        public store: Store<AppState>,
        public processor: ProcessorService,
        public error: ErrorService
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