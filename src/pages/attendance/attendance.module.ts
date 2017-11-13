//region
import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AttendancePage} from './attendance';
import {TranslateModule} from '@ngx-translate/core';
import {AttendanceService} from '../../serveices/business/attendance-service';
import {TeamService} from '../../serveices/business/team-service';
import {UserService} from '../../serveices/business/user-service';
import {EffectsModule} from '@ngrx/effects';
import {AttendanceEffect} from '../../effects/attendance-effect';
import { Actions } from '@ngrx/effects/src/actions';
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
