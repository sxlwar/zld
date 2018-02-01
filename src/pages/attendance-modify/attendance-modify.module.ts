import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { AttendanceModifyPage } from './attendance-modify';

@NgModule({
    declarations: [
        AttendanceModifyPage,
    ],
    imports: [
        IonicPageModule.forChild(AttendanceModifyPage),
        SharedModule,
        ComponentsModule,
        TranslateModule,
    ],
})
export class AttendanceModifyPageModule { }
