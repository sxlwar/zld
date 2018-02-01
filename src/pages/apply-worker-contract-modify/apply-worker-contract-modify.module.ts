import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
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
export class ApplyWorkerContractModifyPageModule { }
