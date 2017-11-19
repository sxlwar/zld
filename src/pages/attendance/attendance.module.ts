//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendancePage } from './attendance';
import { TranslateModule } from '@ngx-translate/core';
//endregion

@NgModule({
  declarations: [
    AttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(AttendancePage),
    TranslateModule,
  ],
  exports: [
    AttendancePage,
  ]
})
export class AttendancePageModule {
}
