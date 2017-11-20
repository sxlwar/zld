import { SharedModule } from './../../app/shared.modules';
//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectPage } from './project';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
//endregion

@NgModule({
  declarations: [
    ProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectPage),
    TranslateModule.forChild(),
    ComponentsModule,
    SharedModule,
  ],
  exports: [
    ProjectPage,
  ]
})
export class ProjectPageModule { }
