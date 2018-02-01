import { NgModule } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { VersionPage } from './version';

@NgModule({
    declarations: [
        VersionPage,
    ],
    imports: [
        IonicPageModule.forChild(VersionPage),
        TranslateModule,
    ],
    providers: [
        AppVersion,
    ],
})
export class VersionPageModule { }
