import { NgModule } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { AttendanceRecordPage } from './attendance-record';

@NgModule({
    declarations: [
        AttendanceRecordPage,
    ],
    imports: [
        IonicPageModule.forChild(AttendanceRecordPage),
        TranslateModule,
        SharedModule,
    ],
    exports: [
        AttendanceRecordPage,
    ],
    providers: [
        Actions,
    ],
})
export class AttendanceRecordPageModule { }
