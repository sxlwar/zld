import {Injectable} from '@angular/core';
import {ENV} from '@app/env';
import {QueueingSubject} from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

export interface WsResponse {
  code: number;
  command: { path: string };
  data: any;
  msg: string;
  isError: boolean
  detail?: any;
}

export interface Parameter {
  command: { path: string };
  parameters: object;
}

/**
 * @description This service is used for interacting with server.
 * */
@Injectable()
export class WebsocketService {
  private url = `ws://${ENV.DOMAIN}/wsapi`;
  private inputStream: QueueingSubject<string>;
  public messages: Observable<WsResponse>;
  public connectionStatus: Observable<number>;
  private logger = [];

  constructor() {
  }

  public send(parameter: Parameter) {
    this.inputStream.next(JSON.stringify(parameter));
  }

  connect() {
    if (this.messages) return;
    const {messages, connectionStatus} = websocketConnect(this.url, this.inputStream = new QueueingSubject<string>());
    this.messages = messages
      .map((msg: string): WsResponse => {
        let response = JSON.parse(msg);
        response.isError = response.code > 2000;
        return response;
      })
      .share()
      .do(value => console.log(value))
    this.connectionStatus = connectionStatus;
    this.monitor();
  }

  /**
   * @description Keep watch on the message observable and restart the connection whenever it is broken.
   * */
  monitor() {
    this.messages
      .retryWhen(errors => errors.delay(1000))
      .do(errors => this.logger.push(errors))
      .subscribe(() => this.connect());
  }
}

