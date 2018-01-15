import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
