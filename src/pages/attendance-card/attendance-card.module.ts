import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceCardPage } from './attendance-card';

@NgModule({
  declarations: [
    AttendanceCardPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceCardPage),
    TranslateModule,
  ],
})
export class AttendanceCardPageModule {}
