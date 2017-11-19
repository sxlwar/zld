//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalAttendancePage } from './personal-attendance';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
//endregion

@NgModule({
  declarations: [
    PersonalAttendancePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalAttendancePage),
    ComponentsModule,
    TranslateModule,
  ],
  exports: [
    PersonalAttendancePage,
  ]
})
export class PersonalAttendancePageModule { }
