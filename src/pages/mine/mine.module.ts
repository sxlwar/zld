//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';
import { ComponentsModule } from '../../components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { CraftEffect } from '../../effects/craft-effect';
//endregion

@NgModule({
  declarations: [
    MinePage,
  ],
  imports: [
    IonicPageModule.forChild(MinePage),
    ComponentsModule,
    TranslateModule,
    EffectsModule.forRoot([CraftEffect])
  ],
  exports: [
   MinePage, 
  ]
})
export class MinePageModule { }
