import { SharedModule } from './../../app/shared.modules';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceRecordPage } from './attendance-record';
import { TranslateModule } from '@ngx-translate/core';
import { Actions } from '@ngrx/effects';

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
        AttendanceRecordPage
    ],
    providers: [
        Actions
    ]
})
export class AttendanceRecordPageModule { }
