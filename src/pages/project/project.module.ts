import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProjectPage} from './project';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../components/components.module';
import {IconService} from '../../serveices/business/icon-service';
import {ProjectService} from '../../serveices/business/project-service';
import {ProjectEffect} from '../../effects/project-effect';
import {EffectsModule} from '@ngrx/effects';
import {WorkerService} from '../../serveices/business/worker-service';
import {WorkerEffect} from '../../effects/worker-effect';
import {PositiveIntegerPipe} from '../../pipes/positive-integer-pipe';

@NgModule({
  declarations: [
    ProjectPage,
    PositiveIntegerPipe,
  ],
  imports: [
    IonicPageModule.forChild(ProjectPage),
    TranslateModule.forChild(),
    EffectsModule.forRoot([ProjectEffect, WorkerEffect]),
    ComponentsModule,
  ],
  providers: [
    IconService,
    ProjectService,
    WorkerService,
  ],
})
export class ProjectPageModule {}
