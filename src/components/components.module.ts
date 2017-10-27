import {NgModule} from '@angular/core';
import {ImageVerificationComponent} from './image-verification/image-verification';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CutDownComponent} from './cut-down/cut-down';
import {IonicModule} from 'ionic-angular';
import {FuzzySearchComponent} from './fuzzy-search/fuzzy-search';

@NgModule({
  declarations: [
    ImageVerificationComponent,
    CutDownComponent,
    FuzzySearchComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule
  ],
  exports: [
    ImageVerificationComponent,
    CutDownComponent,
    FuzzySearchComponent
  ]
})
export class ComponentsModule {
}
