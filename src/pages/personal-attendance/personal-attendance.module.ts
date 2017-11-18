//region
import { WorkerEffect } from './../../effects/worker-effect';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalAttendancePage } from './personal-attendance';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { PayBillEffect } from '../../effects/pay-bill-effect';
import { AttendanceEffect } from '../../effects/attendance-effect';
//endregion

@NgModule({
  declarations: [
    PersonalAttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalAttendancePage),
    ComponentsModule,
    TranslateModule,
    EffectsModule.forRoot([PayBillEffect, WorkerEffect, AttendanceEffect])
  ],
  exports: [
    PersonalAttendancePage,
  ]
})
export class PersonalAttendancePageModule { }
