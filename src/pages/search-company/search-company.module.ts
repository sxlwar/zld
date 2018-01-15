import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchCompanyPage } from './search-company';
import { ComponentsModule } from '../../components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { SearchCompanyEffect } from '../../effects/search-company-effect';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        SearchCompanyPage,
    ],
    imports: [
        IonicPageModule.forChild(SearchCompanyPage),
        ComponentsModule,
        EffectsModule.forRoot([SearchCompanyEffect]),
        TranslateModule
    ],
    exports: [
        SearchCompanyPage,
    ]
})
export class SearchCompanyPageModule { }
