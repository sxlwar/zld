import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../reducers/login-reducer';
import {ShowSpecificInnerSlide, ShowSpecificSlide} from '../../actions/login-action';
import {OperateService} from '../api/operate-service';
import {LoginFormModel} from '../../pages/login/login';
import {StoreService} from '../store-service';
import {Operate, Processor} from '../api/command';
import {LoginOptions} from '../../interfaces/request-interface';

@Injectable()
export class LoginService {

  constructor(
    public store: Store<State>,
    public optService: OperateService,
    public storeService: StoreService) {
  }

  changeSlidesActive(index: number) {
    // this.store.dispatch(new ShowSpecificSlide(index));
    this.storeService.subject.next(new ShowSpecificSlide(index));
  }

  changeInnerSlidesActive(index: number) {
    this.store.dispatch(new ShowSpecificInnerSlide(index));
  }

  login(source: LoginFormModel, randomCaptchaKey: string = '') {
    const parameter: LoginOptions = {
      username: source.mobilePhone,
      password: source.password,
      captcha_code: source.imageVerification,
      rand_captcha_key: randomCaptchaKey
    };
    const loginOpt = {operation: Operate.querying, processorName: Processor.login, parameter};
    this.optService.subject.next(loginOpt);
  }
}
