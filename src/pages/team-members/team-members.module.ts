import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { TeamMembersPage } from './team-members';

@NgModule({
    declarations: [
        TeamMembersPage,
    ],
    imports: [
        IonicPageModule.forChild(TeamMembersPage),
        TranslateModule,
        SharedModule,
    ],
})
export class TeamMembersPageModule { }
