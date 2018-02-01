import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { LeavePage } from './leave';

@NgModule({
    declarations: [
        LeavePage,
    ],
    imports: [
        IonicPageModule.forChild(LeavePage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class LeavePageModule { }
