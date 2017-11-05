import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissionPage } from './mission';
import {ComponentsModule} from '../../components/components.module';
import {IconService} from '../../serveices/business/iconService';

@NgModule({
  declarations: [
    MissionPage,
  ],
  imports: [
    IonicPageModule.forChild(MissionPage),
    ComponentsModule,
  ],
  providers: [
    IconService,
  ]
})
export class MissionPageModule {}
