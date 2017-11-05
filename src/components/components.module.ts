import {NgModule} from '@angular/core';
import {ImageVerificationComponent} from './image-verification/image-verification';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CutDownComponent} from './cut-down/cut-down';
import {IonicModule} from 'ionic-angular';
import {FuzzySearchComponent} from './fuzzy-search/fuzzy-search';
import {TakePhotoComponent} from './take-photo/take-photo';
import {TakePhotoService} from './take-photo/take-photo-service';
import {IconBarComponent} from './icon-bar/icon-bar';

@NgModule({
  declarations: [
    ImageVerificationComponent,
    CutDownComponent,
    FuzzySearchComponent,
    TakePhotoComponent,
    IconBarComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule
  ],
  exports: [
    ImageVerificationComponent,
    CutDownComponent,
    FuzzySearchComponent,
    TakePhotoComponent,
    IconBarComponent,
  ],
  providers: [
    TakePhotoService
  ]
})
export class ComponentsModule {
}
