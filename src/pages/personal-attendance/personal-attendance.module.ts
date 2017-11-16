import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalAttendancePage } from './personal-attendance';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule , Actions} from '@ngrx/effects';
import { PayBillEffect } from '../../effects/pay-bill-effect';
import { OvertimeEffect } from '../../effects/overtime-effect';
import { AttendanceRecordService } from '../../services/business/attendance-record-service';
import { AttendanceService } from '../../services/business/attendance-service';
import { OvertimeService } from '../../services/business/overtime-service';
import { PayBillService } from '../../services/business/pay-bill-service';
import { WorkerService } from '../../services/business/worker-service';
import { Store } from '@ngrx/store/src/store';
import { UserService } from '../../services/business/user-service';

@NgModule({
  declarations: [
    PersonalAttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalAttendancePage),
    ComponentsModule,
    TranslateModule,
    EffectsModule.forRoot([OvertimeEffect, PayBillEffect])
  ],
  providers: [
    AttendanceRecordService,
    AttendanceService,
    OvertimeService,
    PayBillService,
    WorkerService,
    UserService,
    Store,
    Actions,
  ]
})
export class PersonalAttendancePageModule {}
