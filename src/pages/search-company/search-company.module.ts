//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchCompanyPage } from './search-company';
import { ComponentsModule } from '../../components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffect } from '../../effects/search-effect';
import { TranslateModule } from '@ngx-translate/core';
//endregion

@NgModule({
  declarations: [
    SearchCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchCompanyPage),
    ComponentsModule,
    EffectsModule.forRoot([SearchEffect]),
    TranslateModule
  ],
  exports: [
    SearchCompanyPage,
  ]
})
export class SearchCompanyPageModule { }
