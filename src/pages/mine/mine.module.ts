import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';
import {ComponentsModule} from '../../components/components.module';
import {IconService} from '../../serveices/business/iconService';

@NgModule({
  declarations: [
    MinePage,
  ],
  imports: [
    IonicPageModule.forChild(MinePage),
    ComponentsModule,
  ],
  providers: [
    IconService,
  ]
})
export class MinePageModule {}
