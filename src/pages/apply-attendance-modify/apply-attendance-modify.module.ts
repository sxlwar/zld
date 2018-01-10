import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyAttendanceModifyPage } from './apply-attendance-modify';

@NgModule({
  declarations: [
    ApplyAttendanceModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyAttendanceModifyPage),
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class ApplyAttendanceModifyPageModule {}
