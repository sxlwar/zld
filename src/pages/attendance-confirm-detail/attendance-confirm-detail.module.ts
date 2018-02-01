import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { AttendanceConfirmDetailPage } from './attendance-confirm-detail';

@NgModule({
    declarations: [
        AttendanceConfirmDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(AttendanceConfirmDetailPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class AttendanceConfirmDetailPageModule { }
