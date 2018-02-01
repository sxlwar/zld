import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { WorkType } from '../../interfaces/response-interface';
import { AppState, selectSelectedWorkTypes, selectWorkTypeList, selectWorkTypeResponse } from '../../reducers/index-reducer';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import { UpdateSelectedWorkTypesAction } from './../../actions/action/craft-action';
import { WorkerService } from './worker-service';

@Injectable()
export class CraftService {

    constructor(
        private store: Store<AppState>,
        private processor: ProcessorService,
        private errorService: ErrorService,
        private workerService: WorkerService
    ) {
        this.processor.workTypeListProcessor();
    }

    getWorkTypeList(): Observable<WorkType[]> {
        return this.store.select(selectWorkTypeList);
    }

    getOwnWorkType(): Observable<WorkType[]> {
        return this.workerService.getOwnContract()
            .filter(value => !!value)
            .pluck('worktype_id')
            .mergeMap(id => this.getWorkTypeList()
                .map(data => data.filter(workType => workType.id === id))
            );
    }

    updateSelectedTypes(ids: number[]): void {
        this.store.dispatch(new UpdateSelectedWorkTypesAction(ids));
    }

    getSelectedTypes(): Observable<number[]> {
        return this.store.select(selectSelectedWorkTypes);
    }

    handleError(): Subscription {
        return this.errorService.handleApiRequestError(this.store.select(selectWorkTypeResponse));
    }
}
