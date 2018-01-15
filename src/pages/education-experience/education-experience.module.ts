import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
