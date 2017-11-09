import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsPage } from './tabs';
import {EffectsModule} from '@ngrx/effects';
import {ProjectEffect} from '../../effects/project-effect';
import {WorkerEffect} from '../../effects/worker-effect';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    TranslateModule.forChild(),
    EffectsModule.forRoot([ProjectEffect, WorkerEffect]),
  ],
  exports: [
    TabsPage
  ]
})
export class TabsPageModule { }
