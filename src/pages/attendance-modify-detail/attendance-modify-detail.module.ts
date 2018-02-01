import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { AttendanceModifyDetailPage } from './attendance-modify-detail';

@NgModule({
    declarations: [
        AttendanceModifyDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(AttendanceModifyDetailPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class AttendanceModifyDetailPageModule { }
