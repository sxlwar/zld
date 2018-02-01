import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';

import { SetPlatformDirectionAction } from '../../actions/action/config-action';
import { AppState } from './../../reducers/index-reducer';

@Injectable()
export class ConfigService {
    constructor(
        private translate: TranslateService,
        private store: Store<AppState>,
        private platform: Platform
    ) {
    }

    init(): void {
        this.initLanguage();

        this.initConfig();
    }

    showTabBar(): void {
        this.toggleTabBar('flex');
    }

    hideTabBar(): void {
        this.toggleTabBar('none');
    }

    private toggleTabBar(type: string) {
        const elements = document.querySelectorAll('.tabbar');

        elements && Object.keys(elements).map(key => elements[key].style.display = type);
    }

    private initConfig() {
        this.store.dispatch(new SetPlatformDirectionAction(this.platform.dir()));
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
