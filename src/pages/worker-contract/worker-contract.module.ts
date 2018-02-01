import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
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
export class WorkerContractPageModule { }
