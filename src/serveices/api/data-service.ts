import {Injectable} from '@angular/core';
import {Command, Operate} from './command';
import {Observable} from 'rxjs/Observable';
import {LoginOptions} from '../../interfaces/request-interface';
import {pickBy} from 'lodash';
import {ResponseService} from './responses/response-service';
import {WebsocketService} from './websocket-service';
import {LoginState} from '../../reducers/response-reducer';

@Injectable()
export class DataService extends Command {
  loginData$: Observable<LoginState>;

  constructor(private responseService: ResponseService,
              private wsService: WebsocketService) {
    super();
    this.wsService.connect();
  }

  loginProcessor(option: LoginOptions) {
    const path = this.login.operates.get(Operate.querying)[0];
    const parameters = pickBy(option, value => !!value);
    this.wsService.send(this.getFullParameter(path, parameters));
  }

  registerProcessor() {
  }

  resetPwdProcessor() {

  }

  companyProcessor() {

  }

  getLoginDataObservable() {
    if (!this.loginData$) {
      const path = this.login.operates.get(Operate.querying)[0];
      this.loginData$ = this.responseService.getLoginDataObservable(path);
    }
    return this.loginData$;
  }
}
