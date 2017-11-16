import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CertificationPage} from './certification';
import {TranslateModule} from '@ngx-translate/core';
import {CertificateService} from '../../services/business/certificate-service';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {CertificateEffect} from '../../effects/certificate-effect';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    CertificationPage,
  ],
  imports: [
    IonicPageModule.forChild(CertificationPage),
    TranslateModule.forChild(),
    ReactiveFormsModule,
    EffectsModule.forRoot([CertificateEffect]),
    ComponentsModule
  ],
  exports: [
    CertificationPage,
  ],
  providers: [
    CertificateService
  ]
})
export class CertificationPageModule {
}
