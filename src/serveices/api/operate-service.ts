
import {pickBy} from 'lodash';
import {Injectable} from '@angular/core';
import {ParameterService} from './parameter-service';

export interface LoginOptions {
  username: string;
  password: string;
  captcha_code?: string;
  rand_captcha_key?: string;
}

/**
 * @description This service used for adding, delete, update and query.
 * All logic of these actions related should be handled here.
 * */
@Injectable()
export class ApiOperateService {
  constructor(private paramService: ParameterService){}

  login(options: LoginOptions) {
    const params = pickBy(options,(value,key) => !!value) as LoginOptions;
    this.paramService.login(params);
  }
}
