import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveDetailPage } from './leave-detail';

@NgModule({
  declarations: [
    LeaveDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveDetailPage),
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class LeaveDetailPageModule {}
