import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsPage } from './tabs';
import {EffectsModule} from '@ngrx/effects';
import {ProjectEffect} from '../../effects/project-effect';
import {WorkerEffect} from '../../effects/worker-effect';
import {TeamEffect} from '../../effects/team-effect';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    TranslateModule.forChild(),
    EffectsModule.forRoot([ProjectEffect, WorkerEffect, TeamEffect]),
  ],
  exports: [
    TabsPage
  ]
})
export class TabsPageModule { }
