import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProjectBillPage } from './project-bill';

@NgModule({
    declarations: [
        ProjectBillPage,
    ],
    imports: [
        IonicPageModule.forChild(ProjectBillPage),
        TranslateModule,
    ],
})
export class ProjectBillPageModule { }
