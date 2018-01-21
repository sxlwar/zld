import { UpdateFamilyInformationComponent } from './../components/update-family-information/update-family-information';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { RevisableAttendanceListComponent } from './../components/revisable-attendance-list/revisable-attendance-list';
import { WorkFlowAuditComponent } from './../components/work-flow-audit/work-flow-audit';
import { AddWorkCertificateComponent } from './../components/add-work-certificate/add-work-certificate';
import { QRScanner } from '@ionic-native/qr-scanner';
import { AddBankcardComponent } from './../components/add-bankcard/add-bankcard';
import { AddWorkExperienceComponent } from './../components/add-work-experience/add-work-experience';
import { AddEducationComponent } from './../components/add-education/add-education';
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
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Store, StoreModule } from '@ngrx/store';
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
            iconMode: 'ios',
            mode: 'ios',
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
    ]
})
export class AppModule { }