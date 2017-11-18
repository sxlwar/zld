//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendancePage } from './attendance';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { AttendanceEffect } from '../../effects/attendance-effect';
//endregion

@NgModule({
  declarations: [
    AttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendancePage),
    TranslateModule,
    EffectsModule.forRoot([AttendanceEffect])
  ],
  exports: [
    AttendancePage,
  ]
})
export class AttendancePageModule {
}
