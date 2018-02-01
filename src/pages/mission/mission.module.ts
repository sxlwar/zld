import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { MissionPage } from './mission';

@NgModule({
    declarations: [
        MissionPage,
    ],
    imports: [
        IonicPageModule.forChild(MissionPage),
        ComponentsModule,
        TranslateModule,
    ],
    exports: [
        MissionPage,
    ],
})
export class MissionPageModule { }
