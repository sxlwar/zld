import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceRecordPage } from './attendance-record';
import { TranslateModule } from '@ngx-translate/core';
import { AttendanceService } from '../../services/business/attendance-service';
import { AttendanceRecordService } from '../../services/business/attendance-record-service';
import { EffectsModule } from '@ngrx/effects/src/effects_module';
import { AttendanceRecordEffect } from '../../effects/attendance-record-effect';
import { UserService } from '../../services/business/user-service';

@NgModule({
  declarations: [
    AttendanceRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceRecordPage),
    TranslateModule,
    EffectsModule.forRoot([AttendanceRecordEffect]),
  ],
  providers: [
    AttendanceService,
    AttendanceRecordService,
    UserService,
  ]
})
export class AttendanceRecordPageModule {}
