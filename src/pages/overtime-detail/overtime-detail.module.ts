import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OvertimeDetailPage } from './overtime-detail';

@NgModule({
  declarations: [
    OvertimeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OvertimeDetailPage),
    TranslateModule,
    SharedModule,
    ComponentsModule
  ],
})
export class OvertimeDetailPageModule {}
