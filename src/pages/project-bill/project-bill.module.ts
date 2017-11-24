import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectBillPage } from './project-bill';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProjectBillPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectBillPage),
    TranslateModule,
  ],
})
export class ProjectBillPageModule {}
