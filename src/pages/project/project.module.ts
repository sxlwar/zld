import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProjectPage} from './project';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../components/components.module';
import {IconService} from '../../serveices/business/iconService';

@NgModule({
  declarations: [
    ProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  providers: [
    IconService
  ]
})
export class ProjectPageModule {}
