import {Injectable} from '@angular/core';
import {CommandService} from './command-service';
import {LoginOptions} from './operate-service';
import {ApiService} from './api-service';
import {StoreService} from '../store-service';

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

/**
 * @description This service is used to generate final parameters for server.
 * */
@Injectable()
export class ParameterService {
  constructor(private command: CommandService,
              private apiService: ApiService,
              private storeService: StoreService) {
    this.handleMessage();
    this.apiService.connectionStatus.subscribe(status => console.log(status));
  }

  login(parameters: LoginOptions) {
    const command = {path: this.command.login};
    this.apiService.send({parameters, command});
  }

  handleMessage(){
    this.apiService.messages.map((message: WsResponse) => {
      message.isError = message.code > 2000;
      return message;
    }).subscribe(this.storeService.subject);
  }
}
