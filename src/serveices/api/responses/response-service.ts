import {Injectable} from '@angular/core';
import 'rxjs/add/observable/from';
import {StoreService} from '../../store-service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import * as fromRoot from '../../../reducers/index-reducer';
import {AppState} from '../../../reducers/index-reducer';
import {WebsocketService, WsResponse} from '../websocket-service';
import {Observable} from 'rxjs/Observable';
import {LoginFailAction} from '../../../actions/response-action';
import {ResetUserInfo, UpdateUserInfo} from '../../../actions/userInfo-action';
import {Store} from '@ngrx/store';
import {LoginState} from '../../../reducers/response-reducer';

@Injectable()
export class ResponseService {

  constructor(private storeService: StoreService,
              private wsService: WebsocketService,
              private store: Store<AppState>) {
  };

  private getCurrent(path: string): Observable<WsResponse> {
    return this.wsService.messages
      .filter(res => res.command.path === path);
  }

  loginSuccess(res) {
    const action = new UpdateUserInfo(res.data);
    this.store.dispatch(action);
  }

  loginFail(res) {
    const action = new LoginFailAction(res.data.captcha);
    const reset = new ResetUserInfo({});
    this.store.dispatch(action);
    this.store.dispatch(reset);
  }

  getLoginDataObservable(path): Observable<LoginState> {
    return this.getCurrent(path)
      .switchMap(res => {
      if(res.isError){
        this.loginFail(res)
      }else {
        this.loginSuccess(res);
      }
      console.log('****');
      return this.store.select(fromRoot.selectLoginState);
    })

  }

  registerProcessor(path) {
    // return this.getCurrent(path)
    //   .switchMap(res => res.isError ? this.registerFail(res) : this.registerSuccess(res))
  }

  registerSuccess(res) {

  }

  registerFail(res) {

  }

}
