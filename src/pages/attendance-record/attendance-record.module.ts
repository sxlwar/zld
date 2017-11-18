//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceRecordPage } from './attendance-record';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects/src/effects_module';
import { AttendanceEffect } from '../../effects/attendance-effect';
//endregion

@NgModule({
  declarations: [
    AttendanceRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceRecordPage),
    TranslateModule,
    EffectsModule.forRoot([AttendanceEffect]),
  ],
  exports: [
    AttendanceRecordPage
  ]
})
export class AttendanceRecordPageModule {}
