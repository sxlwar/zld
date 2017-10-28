import {Injectable} from '@angular/core';
import {ENV} from '@app/env';
import {QueueingSubject} from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromEvent';
import {Subscription} from 'rxjs/Subscription';
import {WsRequest} from '../../interfaces/request-interface';
import {WsResponse} from '../../interfaces/response-interface';
import * as _ from 'lodash';

interface ErrorTipUnit {
  message: string;
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
  public connectionStatusSubscription: Subscription;

  constructor() {
    this.connect();
  }

  /**
   * @description
   * Sending data to the server and returning a stream for the requester to use.
   * The requester can get the data needed from this stream.
   * */
  send(parameter: WsRequest) {
    this.inputStream.next(JSON.stringify(parameter));
    return this.messages.filter(res => res.command.path === parameter.command.path);
  }

  /**
   * @description
   * Create a socket connection to generate a multicast observable for service.
   * Reinitiate the connection every 2 seconds when there is an error in the observable.
   * */
  connect() {

    if (this.messages) return;

    const {messages, connectionStatus} = websocketConnect(this.url, this.inputStream = new QueueingSubject<string>());

    this.messages = messages
      .map((msg: string): WsResponse => {
        let response = JSON.parse(msg);
        response.data = this.handleDataStructure(response.data);
        response.isError = response.code > 2000;
        if(response.isError) response.data.errorMessage = this.handleError(response);
        return response;
      })
      .retryWhen(errors => errors.delay(2000))
      .share();

    this.connectionStatus = connectionStatus;

    this.connectionStatusSubscription = connectionStatus.subscribe(numberConnected => {
      console.log('number of connected sockets:', numberConnected)
    });
  }

  /**
   * @description
   * Deal with the problem of uncertain data structure.
   * */
  private handleDataStructure(data: any): object {
    if(typeof data === 'object') return data;
    if(typeof data === 'string') return {information: data};
    return {};
  }

  /**
   * @description
   * Get all error information from server.
   * */
  private handleError(data: WsResponse): string {
    const message = this.arrangeErrorInfo(data.detail);
    return _.isObject(data.detail) ? _.find([message, data.msg], _.identity) : data.msg;
  }

  /**
   * @description
   * Use depth first to recurse the attributes of the object and record the traversal path.
   * */
  private createErrorSheet(item, record = {}) {
    if (_.isArray(item)) return _.map(item, this.curry2Right(_.assign)(record));
    return _.map(_.toPairs(item), ele => {
      let key = _.isArray(ele[1]) ? "key" : "form";
      record[key] = ele[0];
      return this.createErrorSheet(ele[1], record);
    });
  }

  /**
   * @description
   * Iterate attribute of an object.
   * */
  private arrangeErrorInfo(data: string | object): string {
    return _.isString(data) ? data : _.chain(data)
      .map(item => this.createErrorSheet(item))
      .flattenDeep()
      .map((msg: ErrorTipUnit, index) => `${msg.message}\n`)
      .value()
      .join('');
  }

  private curry2Right(fn) {
    return (value1) => (value2) => fn.call(fn, value1, value2);
  }
}

