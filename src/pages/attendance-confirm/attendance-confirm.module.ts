import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { AttendanceConfirmPage } from './attendance-confirm';

@NgModule({
    declarations: [
        AttendanceConfirmPage,
    ],
    imports: [
        IonicPageModule.forChild(AttendanceConfirmPage),
        TranslateModule,
        SharedModule,
    ],
})
export class AttendanceConfirmPageModule { }
