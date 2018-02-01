import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { AttendanceMachineRecordPage } from './attendance-machine-record';

@NgModule({
    declarations: [
        AttendanceMachineRecordPage,
    ],
    imports: [
        IonicPageModule.forChild(AttendanceMachineRecordPage),
        TranslateModule,
        SharedModule,
    ],
})
export class AttendanceMachineRecordPageModule { }
