

import {Injectable} from '@angular/core';
import {RouterState} from '../../interfaces/router-interface';
import {Store} from '@ngrx/store';

@Injectable()
export class WelcomeService {
  constructor(public store: Store<RouterState>){}
}
