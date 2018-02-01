import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { WorkCertificatePage } from './work-certificate';

@NgModule({
    declarations: [
        WorkCertificatePage,
    ],
    imports: [
        IonicPageModule.forChild(WorkCertificatePage),
        TranslateModule,
        ComponentsModule,
        SharedModule,
    ],
})
export class WorkCertificatePageModule { }
