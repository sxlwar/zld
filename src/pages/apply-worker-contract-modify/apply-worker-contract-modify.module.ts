import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyWorkerContractModifyPage } from './apply-worker-contract-modify';

@NgModule({
  declarations: [
    ApplyWorkerContractModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyWorkerContractModifyPage),
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class ApplyWorkerContractModifyPageModule {}
