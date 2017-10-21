

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {

  response$: Observable<any>;

  constructor(){}
}
