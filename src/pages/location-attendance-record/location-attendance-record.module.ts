import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationAttendanceRecordPage } from './location-attendance-record';

@NgModule({
  declarations: [
    LocationAttendanceRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationAttendanceRecordPage),
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class LocationAttendanceRecordPageModule {}
