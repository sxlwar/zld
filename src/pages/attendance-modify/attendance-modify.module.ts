import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
