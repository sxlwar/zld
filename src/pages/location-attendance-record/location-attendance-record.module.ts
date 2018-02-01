import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { LocationAttendanceRecordPage } from './location-attendance-record';

@NgModule({
    declarations: [
        LocationAttendanceRecordPage,
    ],
    imports: [
        IonicPageModule.forChild(LocationAttendanceRecordPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class LocationAttendanceRecordPageModule { }
