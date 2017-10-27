import {Injectable} from '@angular/core';
import {LoginOptions, PhoneVerificationCodeOptions, RegisterOptions} from '../../interfaces/request-interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index-reducer';
import {GetPhoneVerCodeAction, LoginAction, RegisterAction} from '../../actions/login-action';
import {Observable} from 'rxjs/Observable';
import {ErrorService} from '../errors/error-service';
import {Subscription} from 'rxjs/Subscription';

interface ProcessorFn {
  (obs: Observable<any>): Subscription;
}

@Injectable()
export class ProcessorService {

  constructor(public store: Store<AppState>,
              public errorService: ErrorService) {
  }

  loginProcessor(option$: Observable<LoginOptions>): Subscription {
    return option$.subscribe(option => this.store.dispatch(new LoginAction(option)));
  }

  phoneVerificationProcessor(option$: Observable<PhoneVerificationCodeOptions>): Subscription {
    return option$.subscribe(option => {
      if (option.captcha_code === '') {
        this.errorService.handleUIError('LOGIN_INPUT_IMAGE_VERIFICATION_TIP');
      } else {
        this.store.dispatch(new GetPhoneVerCodeAction(option));
      }
    })
  }

  registerProcessor(option$: Observable<RegisterOptions>): Subscription {
    return option$.subscribe(option => {
      this.store.dispatch(new RegisterAction(option));
    });
  }

  resetPwdProcessor() {

  }

}
