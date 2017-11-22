import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectBillPage } from './project-bill';

@NgModule({
  declarations: [
    ProjectBillPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectBillPage),
  ],
})
export class ProjectBillPageModule {}
