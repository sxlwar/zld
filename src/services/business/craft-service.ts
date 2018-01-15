import { UpdateSelectedWorkTypesAction } from './../../actions/action/craft-action';
import { Injectable } from '@angular/core';
import { AppState, selectWorkTypeList, selectSelectedWorkTypes, selectWorkTypeResponse } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { WorkType } from '../../interfaces/response-interface';
import { WorkerService } from './worker-service';
import { ProcessorService } from '../api/processor-service';
import { ErrorService } from '../errors/error-service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class CraftService {

    constructor(
        public store: Store<AppState>,
        public processor: ProcessorService,
        public errorService: ErrorService,
        public workerService: WorkerService
    ) {
        processor.workTypeListProcessor();
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
        return this.errorService.handleErrorInSpecific(this.store.select(selectWorkTypeResponse), 'API_ERROR');
    }
}
