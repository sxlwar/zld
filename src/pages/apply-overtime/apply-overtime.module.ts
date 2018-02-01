import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { ApplyOvertimePage } from './apply-overtime';

@NgModule({
    declarations: [
        ApplyOvertimePage,
    ],
    imports: [
        IonicPageModule.forChild(ApplyOvertimePage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class ApplyOvertimePageModule { }
