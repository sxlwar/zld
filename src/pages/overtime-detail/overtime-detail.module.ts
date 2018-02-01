import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { OvertimeDetailPage } from './overtime-detail';

@NgModule({
    declarations: [
        OvertimeDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(OvertimeDetailPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class OvertimeDetailPageModule { }
