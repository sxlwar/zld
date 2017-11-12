import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendancePage } from './attendance';
import {TranslateModule} from '@ngx-translate/core';
import { AttendanceService } from '../../serveices/business/attendance-service';
import {TeamService} from '../../serveices/business/team-service';
import {UserService} from '../../serveices/business/user-service';

@NgModule({
  declarations: [
    AttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendancePage),
    TranslateModule,
  ],
  providers: [
    AttendanceService,
    UserService,
    TeamService
  ]
})
export class AttendancePageModule {}
