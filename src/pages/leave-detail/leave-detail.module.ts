import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { LeaveDetailPage } from './leave-detail';

@NgModule({
    declarations: [
        LeaveDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(LeaveDetailPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class LeaveDetailPageModule { }
