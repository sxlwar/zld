import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { MemberStatisticsPage } from './member-statistics';

@NgModule({
    declarations: [
        MemberStatisticsPage,
    ],
    imports: [
        IonicPageModule.forChild(MemberStatisticsPage),
        SharedModule,
        ComponentsModule,
        TranslateModule,
    ],
})
export class MemberStatisticsPageModule { }
