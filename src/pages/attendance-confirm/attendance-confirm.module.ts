import { SharedModule } from './../../app/shared.modules';
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
    TranslateModule,
    SharedModule,
  ],
})
export class AttendanceConfirmPageModule {}
