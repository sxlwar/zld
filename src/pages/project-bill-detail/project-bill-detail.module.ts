import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProjectBillDetailPage } from './project-bill-detail';

@NgModule({
    declarations: [
        ProjectBillDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(ProjectBillDetailPage),
        TranslateModule,
    ],
})
export class ProjectBillDetailPageModule { }
