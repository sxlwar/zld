import {Component, ViewChild} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Config, Nav, Platform} from 'ionic-angular';

import {FirstRunPage} from '../pages/pages';
import {Settings} from '../providers/providers';
import {Store} from '@ngrx/store';
import {ConfigService} from '../serveices/config/config-service';

import * as fromRoot from '../reducers/index-reducer';

@Component({
  templateUrl: './app.component.html'
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Map', component: 'MapPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' }
  ];

  constructor(private platform: Platform,
              settings: Settings,
              private config: Config,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private configService: ConfigService,
              private store: Store<fromRoot.AppState>) {
    this.configService.init();
    this.store.select(fromRoot.selectButtonText).subscribe(text => this.config.set('backButtonText', text));
  }

  /**
   * @ionViewDidLoad
   * Ionic lifecycle event, ionic implements 8 lifecycle hooks. 6 about them are run time related, the other are permission related.
   * */
  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    // noinspection JSIgnoredPromiseFromCall
    this.nav.setRoot(page.component);
  }
}
