import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { LocationPage } from './location';

@NgModule({
    declarations: [
        LocationPage,
    ],
    imports: [
        IonicPageModule.forChild(LocationPage),
        TranslateModule,
    ],
})
export class LocationPageModule { }
