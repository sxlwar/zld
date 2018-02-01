import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { SearchWorkerPage } from './search-worker';

@NgModule({
    declarations: [
        SearchWorkerPage,
    ],
    imports: [
        IonicPageModule.forChild(SearchWorkerPage),
        TranslateModule,
        ComponentsModule,
        SharedModule,
    ],
})
export class SearchWorkerPageModule { }
