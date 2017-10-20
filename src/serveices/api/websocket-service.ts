import {Injectable} from '@angular/core';
import {Parameter, WsResponse} from './parameter-service';
import {ENV} from '@app/env';
import {QueueingSubject} from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

/**
 * @description This service is used for interacting with server.
 * */
@Injectable()
export class WesocketService {
  private url = `ws://${ENV.DOMAIN}/wsapi`;
  private inputStream: QueueingSubject<string>;
  public messages: Observable<WsResponse>;
  public connectionStatus: Observable<number>;
  private logger = [];

  constructor() {
    this.inputStream = new QueueingSubject<string>();
    this.connect();
    this.monitor();
  }

  public send(parameter: Parameter): void {
    this.inputStream.next(JSON.stringify(parameter));
  }

  private connect() {
    const {messages, connectionStatus} = websocketConnect(this.url, this.inputStream);
    this.messages = messages.map((msg: string): WsResponse => JSON.parse(msg)).share();
    this.connectionStatus = connectionStatus;
  }

  /**
   * @description Keep watch on the message observable and restart the connection whenever it is broken.
   * */
  private monitor() {
    this.messages
      .retryWhen(errors => errors.delay(1000))
      .do(errors => this.logger.push(errors))
      .subscribe(() => this.connect());
  }
}

