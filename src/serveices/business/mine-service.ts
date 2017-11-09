import {Injectable} from '@angular/core';
import {AppState} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {ProcessorService} from '../api/processor-service';

@Injectable()
export class MineService {
  constructor(public store: Store<AppState>,
              public processor: ProcessorService) {
  }

}
