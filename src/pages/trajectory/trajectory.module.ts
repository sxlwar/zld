import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrajectoryPage } from './trajectory';

@NgModule({
  declarations: [
    TrajectoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TrajectoryPage),
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class TrajectoryPageModule {}
