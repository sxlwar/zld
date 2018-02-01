import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { EducationExperiencePage } from './education-experience';

@NgModule({
    declarations: [
        EducationExperiencePage,
    ],
    imports: [
        IonicPageModule.forChild(EducationExperiencePage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class EducationExperiencePageModule { }
