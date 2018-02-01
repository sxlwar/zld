import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { CertificateEffect } from '../../effects/certificate-effect';
import { CertificationPage } from './certification';

@NgModule({
    declarations: [
        CertificationPage,
    ],
    imports: [
        IonicPageModule.forChild(CertificationPage),
        TranslateModule.forChild(),
        ReactiveFormsModule,
        EffectsModule.forRoot([CertificateEffect]),
        ComponentsModule,
    ],
    exports: [
        CertificationPage,
    ],
})
export class CertificationPageModule {
}
