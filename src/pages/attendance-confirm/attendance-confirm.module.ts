import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceConfirmPage } from './attendance-confirm';

@NgModule({
  declarations: [
    AttendanceConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceConfirmPage),
    TranslateModule
  ],
})
export class AttendanceConfirmPageModule {}
