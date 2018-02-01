import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
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
export class EditWorkerContractPageModule { }
