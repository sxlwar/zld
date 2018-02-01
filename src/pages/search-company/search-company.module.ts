import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { SearchCompanyEffect } from '../../effects/search-company-effect';
import { SearchCompanyPage } from './search-company';

@NgModule({
    declarations: [
        SearchCompanyPage,
    ],
    imports: [
        IonicPageModule.forChild(SearchCompanyPage),
        ComponentsModule,
        EffectsModule.forRoot([SearchCompanyEffect]),
        TranslateModule,
    ],
    exports: [
        SearchCompanyPage,
    ],
})
export class SearchCompanyPageModule { }
