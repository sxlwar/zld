import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers/index-reducer';
import {Subject} from 'rxjs/Subject';
import {Actions} from '../actions/index-action';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/partition';
import {Observable} from 'rxjs/Observable';
import {WsResponse} from './api/websocket-service';

@Injectable()
export class StoreService {
  public subject: Subject<Actions | WsResponse> = new Subject();
  private uiRequest$: Observable<Actions> = this.subject.filter((action: Actions) => !!action.type) as Observable<Actions>;

  constructor(public store: Store<AppState>) {
    this.handleUiRequest();
  }

  handleUiRequest() {
    this.uiRequest$.subscribe((action: Actions) => this.store.dispatch(action))
  }

  handleServerResponse(action: Actions, selectFn): Observable<any> {
    this.store.dispatch(action);
    return this.store.select(selectFn);
  }
}
