import { WorkTypeSelectComponent } from './../components/work-type-select/work-type-select';
import { WorkerSelectComponent } from './../components/worker-select/worker-select';
import { HistoryTrajectoryWorkersComponent } from './../components/history-trajectory-workers/history-trajectory-workers';
import { HistoryTrajectoryComponent } from './../components/history-trajectory/history-trajectory';
import { AddLocationCardComponent } from './../components/add-location-card/add-location-card';
import { AddAttendanceCardComponent } from './../components/add-attendance-card/add-attendance-card';
import { WorkPieceAxisComponent } from './../components/work-piece-axis/work-piece-axis';
import { SharedModule } from './shared.modules';
import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Items } from '../mocks/providers/items';
import { Settings, User } from '../providers/providers';
import { MyApp } from './app.component';
import { Api } from '../providers/api/api';
import { ActionReducer, MetaReducer, Store, StoreModule } from '@ngrx/store';
import { reducers } from '../reducers/index-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { Keyboard } from '@ionic-native/keyboard';
import { dayNames, dayShortNames, monthNames, monthShortNames } from '../services/utils/time-service';
import { ComponentsModule } from '../components/components.module';
import { ProjectListComponent } from '../components/project-list/project-list';
import { AddTeamComponent } from '../components/add-team/add-team';
import { FaceImageComponent } from './../components/face-image/face-image';
import { API_SERVICES, BUSINESS_SERVICES, CONFIG_SERVICES, UTIL_SERVICES } from '../services/service-import';
import { LOCALE_ID } from '@angular/core';
import { HistoryLocationComponent } from '../components/history-location/history-location';

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

export function debug1(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    return reducer(state, action);
  }
}
export function debug2(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('action', action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<any>[] = [debug1, debug2];

@NgModule({
  declarations: [
    MyApp,
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
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,    // Valid options appear to be [true, false]
      scrollPadding: false,
      autoFocusAssist: false,
      monthNames,
      monthShortNames,
      dayNames,
      dayShortNames,
    }),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 20
    }),
    ComponentsModule,
    SharedModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProjectListComponent,
    AddTeamComponent,
    FaceImageComponent,
    WorkPieceAxisComponent,
    AddAttendanceCardComponent,
    AddLocationCardComponent,
    HistoryLocationComponent,
    HistoryTrajectoryComponent,
    HistoryTrajectoryWorkersComponent,
    WorkerSelectComponent,
    WorkTypeSelectComponent,
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    ImagePicker,
    File,
    FileTransfer,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    Keyboard,
    Store,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    API_SERVICES,
    BUSINESS_SERVICES,
    CONFIG_SERVICES,
    UTIL_SERVICES,
    { provide: LOCALE_ID, useValue: 'ZH-CN' }
  ]
})
export class AppModule { }