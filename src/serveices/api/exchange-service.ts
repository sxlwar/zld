import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket-service';
import {StoreService} from '../store-service';
import {HttpService} from './http-service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/map';
import {Command, Processor} from './command';

export interface Parameter {
  command: { path: string };
  parameters: object;
}

export interface WsResponse {
  code: number;
  command: { path: string };
  data: object | string;
  msg: string;
  detail?: string | object;
  isError?: boolean
}

export interface HttpResponse {
  code: number;
  command: string | { path: string };
  msg: string;
  data: string | object
}

/**
 * @description This service is used to generate final parameters for server.
 * */
@Injectable()
export class ExchangeService extends Command {
  response$: Observable<WsResponse>;

  constructor(private wsService: WebsocketService,
              private httpService: HttpService,
              private storeService: StoreService) {
    super();
    this.handleMessage();
    this.response$ = wsService.messages.map(msg => this.isValidResponse(msg));
    this.wsService.connectionStatus.subscribe(status => console.log(status));
  }

  handleWebsocketRequest(parameter: Parameter) {
    this.wsService.send(parameter);
  }

  handleHttpRequest(parameter: any) {

  }

  handleMessage(){
    this.wsService.messages.map(this.isValidResponse).subscribe(this.storeService.subject);
  }

  private isValidResponse(msg: WsResponse): WsResponse {
    msg.isError = msg.code > 2000;
    return msg;
  }

  loginProcessor() {
    return this.response$.filter((response: WsResponse) => response.command.path === this.login.operates.get(Processor.login)[0])
  }

  registerProcessor() {

  }

  companyProcessor() {

  }

  resetPwdProcessor() {

  }
}
