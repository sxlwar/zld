import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { EFFECTS } from '../../effects/effect-import';
import { TabsPage } from './tabs';

@NgModule({
    declarations: [
        TabsPage,
    ],
    imports: [
        IonicPageModule.forChild(TabsPage),
        TranslateModule.forChild(),
        EffectsModule.forRoot(EFFECTS),
    ],
    exports: [
        TabsPage,
    ],
})
export class TabsPageModule { }
