import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { LocationCardPage } from './location-card';

@NgModule({
    declarations: [
        LocationCardPage,
    ],
    imports: [
        IonicPageModule.forChild(LocationCardPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class LocationCardPageModule { }
