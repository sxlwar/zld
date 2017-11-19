import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS } from '../../effects/effect-import';

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
    TabsPage
  ]
})
export class TabsPageModule { }
