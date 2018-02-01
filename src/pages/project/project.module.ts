import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { ProjectPage } from './project';

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
    ],
})
export class ProjectPageModule { }
