import {Injectable} from '@angular/core';
import {AppState} from '../../reducers/index-reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {AlertController, ToastController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {ErrorMessage, ErrorResponse} from '../../interfaces/response-interface';
import 'rxjs/add/operator/do';

export interface ErrorInfo {
  title: string;
  msg: ErrorMessage;
  buttons: string[];
}

@Injectable()
export class ErrorService {
  constructor(public store: Store<AppState>,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public translate: TranslateService) {
  }

  /**
   * @description
   * Handle errors from server.
   * */
  private handleResponseError(obs: Observable<ErrorInfo>): Subscription {
    return obs
      .filter(info => !!info.msg.errorMessage)
      .map(info => this.alertCtrl.create({
        title: info.title,
        subTitle: info.msg.errorMessage,
        buttons: info.buttons
      }))
      .subscribe(alert => alert.present().then(() => {
      }));
  }

  /**
   * @description
   * Handle errors from UI.
   * */
  handleUIError(msgKey: string) {
    this.translate.get(msgKey).subscribe(message => {
      this.toastCtrl.create({
        message,
        duration: 3000,
        position: 'top'
      })
    });
  }

  /**
   * @description
   * Used to handle the errors on the specified stream. The stream should be  a request stream.
   * */
  handleErrorInSpecific(obs: Observable<ErrorResponse>, title: string) {

    const button = 'CONFIRM_BUTTON';

    const lang$ = this.translate.get([title, button])
      .map(lang => ({title: lang[title], buttons: [lang[button]]}));

    const error$: Observable<ErrorInfo> = obs.withLatestFrom(lang$)
      .map(res => Object.assign({msg: res[0]}, res[1]) as ErrorInfo);

    return this.handleResponseError(error$);

  }
}
