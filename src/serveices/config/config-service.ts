import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {SetBackButtonText} from '../../actions/config-action';
import {SetPlatformDirection} from '../../actions/tutorial-action';
import {Platform} from 'ionic-angular';

@Injectable()
export class ConfigService {
  constructor(private translate: TranslateService,
              private store: Store<any>,
              private platform: Platform) {
  }

  public init() {
    this.initLanguage();
    this.initBackButtonText();
    this.initPlatformDirection();
  }

  private initBackButtonText() {
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.store.dispatch(new SetBackButtonText(values.BACK_BUTTON_TEXT));
    });
  }

  private initPlatformDirection() {
    this.store.dispatch(new SetPlatformDirection(this.platform.dir()));
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
