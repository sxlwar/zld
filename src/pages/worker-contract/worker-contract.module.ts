import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerContractPage } from './worker-contract';

@NgModule({
  declarations: [
    WorkerContractPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerContractPage),
    TranslateModule,
    SharedModule,
  ],
})
export class WorkerContractPageModule {}
