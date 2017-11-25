//region
import {Injectable} from '@angular/core';
import {AppState, selectWorkTypeList, getWorkType} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {WorkType} from '../../interfaces/response-interface';
import {WorkerService} from './worker-service';
import {ProcessorService} from '../api/processor-service';
import {ErrorService} from '../errors/error-service';
import {Subscription} from 'rxjs/Subscription';
//endregion

@Injectable()
export class CraftService {

  subscriptions: Subscription[] = [];
  craft$$: Subscription;

  constructor(public store: Store<AppState>,
              public processor: ProcessorService,
              public errorService: ErrorService,
              public workerService: WorkerService) {
    this.handleError();
  }

  getWorkTypeList(): Observable<WorkType[]> {
    return this.store.select(selectWorkTypeList).do(list => !list.length &&  this.processor.workTypeListProcessor());
  }

  getOwnWorkType(): Observable<WorkType[]> {
    return this.workerService.getOwnContract()
      .filter(value => !!value)
      .pluck('worktype_id')
      .mergeMap(id => this.getWorkTypeList()
        .map(data => data.filter(workType => workType.id === id))
      );
  }

  private handleError(){
    this.craft$$ = this.errorService.handleErrorInSpecific(this.store.select(getWorkType), '');
  }

  unSubscribe() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
