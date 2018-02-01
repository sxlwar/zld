import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { WorkPiecePage } from './work-piece';

@NgModule({
    declarations: [
        WorkPiecePage,
    ],
    imports: [
        IonicPageModule.forChild(WorkPiecePage),
        TranslateModule,
        SharedModule,
    ],
})
export class WorkPiecePageModule { }
