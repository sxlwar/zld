import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { AttendancePage } from './attendance';

@NgModule({
    declarations: [
        AttendancePage,
    ],
    imports: [
        IonicPageModule.forChild(AttendancePage),
        TranslateModule,
        ComponentsModule,
        SharedModule,
    ],
    exports: [
        AttendancePage,
    ],
})
export class AttendancePageModule {
}
