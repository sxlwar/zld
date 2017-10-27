import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchCompanyPage } from './search-company';
import {ComponentsModule} from '../../components/components.module';
import {Effect, EffectsModule} from '@ngrx/effects';
import {SearchEffect} from '../../effects/search-effect';
import {Command} from '../../serveices/api/command';
import {TranslateModule} from '@ngx-translate/core';

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
  providers: [
    Command
  ]
})
export class SearchCompanyPageModule {}
