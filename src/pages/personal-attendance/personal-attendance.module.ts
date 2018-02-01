import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { PersonalAttendancePage } from './personal-attendance';

@NgModule({
    declarations: [
        PersonalAttendancePage,
    ],
    imports: [
        IonicPageModule.forChild(PersonalAttendancePage),
        ComponentsModule,
        TranslateModule,
    ],
    exports: [
        PersonalAttendancePage,
    ],
})
export class PersonalAttendancePageModule { }
