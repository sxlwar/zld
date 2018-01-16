import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
