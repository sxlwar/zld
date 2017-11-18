//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectPage } from './project';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { PositiveIntegerPipe } from '../../pipes/positive-integer-pipe';
//endregion

@NgModule({
  declarations: [
    ProjectPage,
    PositiveIntegerPipe,
  ],
  imports: [
    IonicPageModule.forChild(ProjectPage),
    TranslateModule.forChild(),
    ComponentsModule,
  ],
  exports: [
    ProjectPage,
  ]
})
export class ProjectPageModule { }
