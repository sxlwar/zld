//region
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';
import { ComponentsModule } from '../../components/components.module';
import { IconService } from '../../services/business/icon-service';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../services/business/user-service';
import { EffectsModule } from '@ngrx/effects';
import { CraftEffect } from '../../effects/craft-effect';
import { CraftService } from '../../services/business/craft-service';
import { TeamService } from '../../services/business/team-service';
import { ProjectService } from '../../services/business/project-service';
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
  providers: [
    IconService,
    UserService,
    CraftService,
    TeamService,
    ProjectService,
  ]
})
export class MinePageModule { }
