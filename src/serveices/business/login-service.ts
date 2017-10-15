import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../reducers/login-reducer';
import {ShowSpecificInnerSlide, ShowSpecificSlide} from '../../actions/login-action';

@Injectable()
export class LoginService {

  constructor(public store: Store<State>) {
  }

  changeSlidesActive(index: number) {
    this.store.dispatch(new ShowSpecificSlide(index));
  }

  changeInnerSlidesActive(index: number) {
    this.store.dispatch(new ShowSpecificInnerSlide(index));
  }
}
