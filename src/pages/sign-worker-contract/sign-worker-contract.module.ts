import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { SignWorkerContractPage } from './sign-worker-contract';

@NgModule({
    declarations: [
        SignWorkerContractPage,
    ],
    imports: [
        IonicPageModule.forChild(SignWorkerContractPage),
        TranslateModule,
        ComponentsModule,
        SharedModule,
    ],
})
export class SignWorkerContractPageModule { }
