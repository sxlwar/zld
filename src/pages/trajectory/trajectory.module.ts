import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { TrajectoryPage } from './trajectory';

@NgModule({
    declarations: [
        TrajectoryPage,
    ],
    imports: [
        IonicPageModule.forChild(TrajectoryPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class TrajectoryPageModule { }
