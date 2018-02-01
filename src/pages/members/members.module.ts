import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { MembersPage } from './members';

@NgModule({
    declarations: [
        MembersPage,
    ],
    imports: [
        IonicPageModule.forChild(MembersPage),
        TranslateModule,
        SharedModule,
    ],
})
export class MembersPageModule { }
