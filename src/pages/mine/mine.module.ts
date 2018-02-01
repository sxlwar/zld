import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { MinePage } from './mine';

@NgModule({
    declarations: [
        MinePage,
    ],
    imports: [
        IonicPageModule.forChild(MinePage),
        ComponentsModule,
        TranslateModule,
    ],
    exports: [
        MinePage,
    ],
})
export class MinePageModule { }
