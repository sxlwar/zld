import { AppState } from './../../reducers/index-reducer';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { SetBackButtonTextAction, SetPlatformDirectionAction } from '../../actions/action/config-action';
import { Platform } from 'ionic-angular';

@Injectable()
export class ConfigService {
  constructor(
    private translate: TranslateService,
    private store: Store<AppState>,
    private platform: Platform
  ) {
  }

  public init() {
    this.initLanguage();
    this.initConfig();
  }

  public showTabBar() {
    this.toggleTabBar('flex');
  }

  public hideTabBar() {
    this.toggleTabBar('none');
  }

  private toggleTabBar(type: string) {
    const elements = document.querySelectorAll('.tabbar');

    if(elements) {
      Object.keys(elements).map(key => {
        elements[key].style.display = type;
      });
    }
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
