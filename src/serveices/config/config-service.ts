import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {SetBackButtonTextAction, SetPlatformDirectionAction} from '../../actions/config-action';
import {Platform} from 'ionic-angular';

@Injectable()
export class ConfigService {
  constructor(private translate: TranslateService,
              private store: Store<any>,
              private platform: Platform) {
  }

  public init() {
    this.initLanguage();
    this.initConfig();
  }

  private initConfig() {
    this.store.dispatch(new SetPlatformDirectionAction(this.platform.dir()));
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.store.dispatch(new SetBackButtonTextAction(values.BACK_BUTTON_TEXT));
    });
  }

  private initLanguage() {
    this.translate.setDefaultLang('zh');
    const browserLanguage = this.translate.getBrowserLang();
    if (browserLanguage !== undefined) {
      this.translate.use(browserLanguage);
    } else {
      this.translate.use('zh');
    }
  }
}
