import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers/index-reducer';
import {Subject} from 'rxjs/Subject';
import {WsResponse} from './api/exchange-service';
import {Actions} from '../actions/index-action';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/partition';
import {Observable} from 'rxjs/Observable';
import {LoginFailAction, LoginSuccessAction} from '../actions/userInfo-action';
import {UserInfo} from '../interfaces/response-interface';
import {last} from 'lodash'

@Injectable()
export class StoreService {
  public subject: Subject<Actions | WsResponse> = new Subject();
  private serverResponse$: Observable<WsResponse> = this.subject.filter((message: WsResponse) => !!message.command) as Observable<WsResponse>;
  private uiRequest$: Observable<Actions> = this.subject.filter((action: Actions) => !!action.type) as Observable<Actions>;

  constructor(public store: Store<AppState>) {
    this.handleServerResponse();
    this.handleUiRequest();
  }

  private handleUiRequest() {
    this.uiRequest$.subscribe((action: Actions) => this.store.dispatch(action))
  }

  private handleServerResponse() {
    this.serverResponse$.subscribe((res: WsResponse) => {
      const path: string = res.command.path;
      const methodName = last(path.split('.')).toLowerCase();

      this[methodName](res);
    });
  }

  private login(res: WsResponse) {
    if (res.isError) {
      this.store.dispatch(new LoginFailAction(res.data as UserInfo));
    } else {
      this.store.dispatch(new LoginSuccessAction(res.data as UserInfo))
    }
  }
}
