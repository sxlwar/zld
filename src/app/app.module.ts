import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { QRScanner } from '@ionic-native/qr-scanner';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AddTeamComponent } from '../components/add-team/add-team';
import { ComponentsModule } from '../components/components.module';
import { HistoryLocationComponent } from '../components/history-location/history-location';
import { ProjectListComponent } from '../components/project-list/project-list';
import { reducers } from '../reducers/index-reducer';
import { API_SERVICES, BUSINESS_SERVICES, CONFIG_SERVICES, UTIL_SERVICES } from '../services/service-import';
import { dayNames, dayShortNames, monthNames, monthShortNames } from '../services/utils/time-service';
import { AddAttendanceCardComponent } from './../components/add-attendance-card/add-attendance-card';
import { AddBankcardComponent } from './../components/add-bankcard/add-bankcard';
import { AddEducationComponent } from './../components/add-education/add-education';
import { AddLocationCardComponent } from './../components/add-location-card/add-location-card';
import { AddWorkCertificateComponent } from './../components/add-work-certificate/add-work-certificate';
import { AddWorkExperienceComponent } from './../components/add-work-experience/add-work-experience';
import { FaceImageComponent } from './../components/face-image/face-image';
import { HistoryTrajectoryWorkersComponent } from './../components/history-trajectory-workers/history-trajectory-workers';
import { HistoryTrajectoryComponent } from './../components/history-trajectory/history-trajectory';
import { RevisableAttendanceListComponent } from './../components/revisable-attendance-list/revisable-attendance-list';
import { UpdateFamilyInformationComponent } from './../components/update-family-information/update-family-information';
import { WorkFlowAuditComponent } from './../components/work-flow-audit/work-flow-audit';
import { WorkPieceAxisComponent } from './../components/work-piece-axis/work-piece-axis';
import { WorkTypeSelectComponent } from './../components/work-type-select/work-type-select';
import { WorkerSelectComponent } from './../components/worker-select/worker-select';
import { MyApp } from './app.component';
import { SharedModule } from './shared.modules';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
                deps: [Http],
            },
        }),
        IonicModule.forRoot(MyApp, {
            scrollAssist: false,    // Valid options appear to be [true, false]
            scrollPadding: false,
            autoFocusAssist: false,
            monthNames,
            monthShortNames,
            dayNames,
            dayShortNames,
            iconMode: 'ios',
            mode: 'ios',
        }),
        IonicStorageModule.forRoot(),
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 20,
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
        AddEducationComponent,
        AddWorkExperienceComponent,
        AddBankcardComponent,
        AddWorkCertificateComponent,
        WorkFlowAuditComponent,
        RevisableAttendanceListComponent,
        UpdateFamilyInformationComponent,
    ],
    providers: [
        Camera,
        ImagePicker,
        Network,
        Device,
        File,
        FileTransfer,
        SplashScreen,
        StatusBar,
        Keyboard,
        Store,
        // Keep this to enable Ionic's runtime error handling during development
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        API_SERVICES,
        BUSINESS_SERVICES,
        CONFIG_SERVICES,
        UTIL_SERVICES,
        { provide: LOCALE_ID, useValue: 'ZH-CN' },
        QRScanner,
    ],
})
export class AppModule { }
