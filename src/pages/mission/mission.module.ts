import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissionPage } from './mission';
import {ComponentsModule} from '../../components/components.module';
import {IconService} from '../../serveices/business/icon-service';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    MissionPage,
  ],
  imports: [
    IonicPageModule.forChild(MissionPage),
    ComponentsModule,
    TranslateModule
  ],
  providers: [
    IconService,
  ]
})
export class MissionPageModule {}
