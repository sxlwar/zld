import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {SetBackButtonText} from '../../actions/config-action';

@Injectable()
export class ConfigService {
  constructor(private translate: TranslateService,
              private store: Store<any>) {
  }

  public init() {
    this.initLanguage();
    this.initBackButtonText();
  }

  private initBackButtonText() {
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.store.dispatch(new SetBackButtonText(values.BACK_BUTTON_TEXT));
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
