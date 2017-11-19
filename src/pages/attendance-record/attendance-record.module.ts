//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceRecordPage } from './attendance-record';
import { TranslateModule } from '@ngx-translate/core';
import { Actions } from '@ngrx/effects';
//endregion

@NgModule({
  declarations: [
    AttendanceRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceRecordPage),
    TranslateModule,
  ],
  exports: [
    AttendanceRecordPage
  ],
  providers: [
    Actions
  ]
})
export class AttendanceRecordPageModule {}
