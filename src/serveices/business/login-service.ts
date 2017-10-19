import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../reducers/login-reducer';
import {ShowSpecificInnerSlide, ShowSpecificSlide} from '../../actions/login-action';
import {ApiOperateService, LoginOptions} from '../api/operate-service';
import {LoginFormModel} from '../../pages/login/login';
import {StoreService} from '../store-service';

@Injectable()
export class LoginService {

  constructor(
    public store: Store<State>,
    public apiOptService: ApiOperateService,
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
    const option: LoginOptions = {
      username: source.mobilePhone,
      password: source.password,
      captcha_code: source.imageVerification,
      rand_captcha_key: randomCaptchaKey
    };
    this.apiOptService.login(option);
  }
}
