import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
