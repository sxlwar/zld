import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AttendanceMachinePage } from './attendance-machine';

@NgModule({
    declarations: [
        AttendanceMachinePage,
    ],
    imports: [
        IonicPageModule.forChild(AttendanceMachinePage),
        TranslateModule,
    ],
})
export class AttendanceMachinePageModule { }
