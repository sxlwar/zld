import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ShowSpecificInnerSlide, ShowSpecificSlide} from '../../actions/login-action';
import {DataService} from '../api/data-service';
import {LoginFormModel} from '../../pages/login/login';
import {LoginOptions} from '../../interfaces/request-interface';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../reducers/index-reducer';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class LoginService {

  login$: Observable<any>;

  constructor(public store: Store<fromRoot.AppState>,
              public dataService: DataService) {
  }

  changeSlidesActive(index: number) {
    this.store.dispatch(new ShowSpecificSlide(index));
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
    this.dataService.loginProcessor(option);
  }

  getLoginObservable() {
    if (!this.login$) {
      this.login$ = this.dataService.getLoginDataObservable();
    }
    return this.login$;
  }

  getActiveIndexOfSlides() {
    return this.store.select(fromRoot.selectActiveIndexOfSlides);
  }

  getActiveIndexOfInnerSlides() {
    return this.store.select(fromRoot.selectActiveIndexOfInnerSlides).distinctUntilChanged();
  }
}
