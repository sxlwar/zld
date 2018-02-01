import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { ApplyAttendanceModifyPage } from './apply-attendance-modify';

@NgModule({
    declarations: [
        ApplyAttendanceModifyPage,
    ],
    imports: [
        IonicPageModule.forChild(ApplyAttendanceModifyPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class ApplyAttendanceModifyPageModule { }
