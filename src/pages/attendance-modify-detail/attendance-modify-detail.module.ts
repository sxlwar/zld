import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceModifyDetailPage } from './attendance-modify-detail';

@NgModule({
  declarations: [
    AttendanceModifyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceModifyDetailPage),
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class AttendanceModifyDetailPageModule {}
