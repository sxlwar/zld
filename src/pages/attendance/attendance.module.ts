//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendancePage } from './attendance';
import { TranslateModule } from '@ngx-translate/core';
import { AttendanceService } from '../../services/business/attendance-service';
import { TeamService } from '../../services/business/team-service';
import { UserService } from '../../services/business/user-service';
import { EffectsModule } from '@ngrx/effects';
import { AttendanceEffect } from '../../effects/attendance-effect';
import { Actions } from '@ngrx/effects';
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
  providers: [
    AttendanceService,
    UserService,
    TeamService,
    Actions
  ]
})
export class AttendancePageModule {
}
