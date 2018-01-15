import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendancePage } from './attendance';
import { TranslateModule } from '@ngx-translate/core';
//endregion

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
    ]
})
export class AttendancePageModule {
}
