import {Injectable} from '@angular/core';
import {ExchangeService} from '../exchange-service';
import {ResponseHandler} from './response';

@Injectable()
export class LoginResponse extends ResponseHandler {
  constructor(private exchangeService: ExchangeService) {
    super();
    this.exchangeService.loginProcessor().subscribe(value => console.log(value));
  }

  handleSuccess() {

  }

  handleFail() {

  }

}
