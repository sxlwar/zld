import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberStatisticsPage } from './member-statistics';

@NgModule({
  declarations: [
    MemberStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberStatisticsPage),
    SharedModule,
    ComponentsModule,
    TranslateModule,
  ],
})
export class MemberStatisticsPageModule {}
