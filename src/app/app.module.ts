import {ErrorHandler, NgModule} from '@angular/core';
import {Http, HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {Camera} from '@ionic-native/camera';
import {GoogleMaps} from '@ionic-native/google-maps';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {Items} from '../mocks/providers/items';
import {Settings, User} from '../providers/providers';
import {MyApp} from './app.component';
import {Api} from '../providers/api/api';
import {ActionReducer, MetaReducer, Store, StoreModule} from '@ngrx/store';
import {reducers} from '../reducers/index-reducer';
import {ConfigService} from '../serveices/config/config-service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ENV} from '@app/env';
import {DataService} from '../serveices/api/data-service';
import {WebsocketService} from '../serveices/api/websocket-service';
import {StoreService} from '../serveices/store-service';
import {HttpService} from '../serveices/api/http-service';
import {ResponseService} from '../serveices/api/responses/response-service';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}
//
// export function getMetaReducers(reducer: ActionReducer<any>): ActionReducer<any> {
//   return function (state, action) {
//     return reducer(state, action)
//   }
// }
//
// export const metaReducers: MetaReducer<any>[] = [getMetaReducers];

export function debug1(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    return reducer(state, action);
  }
}
export function debug2(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('action', action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<any>[] = [debug1, debug2];

console.log(ENV.DOMAIN);

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 15
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    Store,
    {provide: Settings, useFactory: provideSettings, deps: [Storage]},
    // Keep this to enable Ionic's runtime error handling during development
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigService,
    DataService,
    WebsocketService,
    HttpService,
    StoreService,
    ResponseService
  ]
})
export class AppModule { }
