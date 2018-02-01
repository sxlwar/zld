import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { OvertimePage } from './overtime';

@NgModule({
    declarations: [
        OvertimePage,
    ],
    imports: [
        IonicPageModule.forChild(OvertimePage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class OvertimePageModule { }
