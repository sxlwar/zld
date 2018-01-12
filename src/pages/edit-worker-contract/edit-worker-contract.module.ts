import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditWorkerContractPage } from './edit-worker-contract';

@NgModule({
  declarations: [
    EditWorkerContractPage,
  ],
  imports: [
    IonicPageModule.forChild(EditWorkerContractPage),
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class EditWorkerContractPageModule {}
