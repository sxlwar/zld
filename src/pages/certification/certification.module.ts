import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CertificationPage} from './certification';
import {TranslateModule} from '@ngx-translate/core';
import {CertificateService} from '../../serveices/business/certificate-service';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {UploadEffect} from '../../effects/upload-effect';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    CertificationPage,
  ],
  imports: [
    IonicPageModule.forChild(CertificationPage),
    TranslateModule.forChild(),
    ReactiveFormsModule,
    EffectsModule.forRoot([UploadEffect]),
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
