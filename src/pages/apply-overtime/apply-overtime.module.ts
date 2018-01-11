import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyOvertimePage } from './apply-overtime';

@NgModule({
  declarations: [
    ApplyOvertimePage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyOvertimePage),
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class ApplyOvertimePageModule {}
