import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { WorkExperiencePage } from './work-experience';

@NgModule({
    declarations: [
        WorkExperiencePage,
    ],
    imports: [
        IonicPageModule.forChild(WorkExperiencePage),
        TranslateModule,
        ComponentsModule,
        SharedModule,
    ],
})
export class WorkExperiencePageModule { }
