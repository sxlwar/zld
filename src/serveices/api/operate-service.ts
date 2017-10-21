import {isEqual, pickBy} from 'lodash';
import {Injectable} from '@angular/core';
import {ExchangeService, Parameter} from './exchange-service';
import {Command, Operate} from './command';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import {LoginOptions, Options, RegisterOptions} from '../../interfaces/request-interface';

export interface ApiOperate<T> {
  parameter: T;
  operation: string;
  processorName: string;
}

export interface Param<T> {
  commands: string[];
  parameters: T;
}

/**
 * @description This service used for adding, delete, update and query.
 * Each processor knows how to handle the data for the corresponding operation,
 * and knows which way to communicate with the server.
 * */
@Injectable()
export class OperateService extends Command {
  public subject: Subject<ApiOperate<any>> = new Subject();
  public parameters$: Observable<Param<object>>;

  constructor(private excService: ExchangeService) {
    super();
    this.parameters$ = this.subject
      .map(this.getFullParameter.bind(this))
      .share() as Observable<Param<Options>>;
    this.addProcessors();
  }

  public getFullParameter<T>(opt: ApiOperate<T>): Param<T> {
    const commands: string[] = this.getPath(opt);
    const parameters: T = opt.parameter;
    return {commands, parameters};
  }

  private addProcessors() {
    const prototype = Object.getPrototypeOf(this);
    const keys = Object.keys(prototype);
    Observable.from(keys)
      .filter(item => /processor$/i.test(item))
      .subscribe(key => {
        prototype[key].bind(this)();
      });
  }

  loginProcessor() {
    this.parameters$
      .filter((param: Param<Options>) => isEqual(this.login.operates.get(Operate.querying), param.commands))
      .subscribe((param: Param<LoginOptions>) => {
        const parameters = pickBy(param.parameters, (value, key) => !!value) as LoginOptions;
        const path = param.commands[0];
        this.excService.handleWebsocketRequest({command: {path}, parameters});
      });
  }

  registerProcessor() {
    console.log('this is register processor');
    this.parameters$
      .filter((param: Param<Options>) => isEqual(this.register.operates.get(Operate.addition), param.commands))
      .subscribe((param: Param<RegisterOptions>) => {
        const path = param.parameters.company_id ? param.commands[0] : param.commands[1];
        this.excService.handleWebsocketRequest({command: {path}, parameters: param.parameters});
      });
  }

  resetPwdProcessor() {
    console.log('this is reset password processor');
  }

  companyProcessor() {

  }
}
