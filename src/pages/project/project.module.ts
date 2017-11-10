//region
import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProjectPage} from './project';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../components/components.module';
import {IconService} from '../../serveices/business/icon-service';
import {ProjectService} from '../../serveices/business/project-service';
import {WorkerService} from '../../serveices/business/worker-service';
import {PositiveIntegerPipe} from '../../pipes/positive-integer-pipe';
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
  providers: [
    IconService,
    ProjectService,
    WorkerService,
  ],
})
export class ProjectPageModule {}
