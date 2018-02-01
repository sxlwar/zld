import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { ApplyPieceAuditPage } from './apply-piece-audit';

@NgModule({
    declarations: [
        ApplyPieceAuditPage,
    ],
    imports: [
        IonicPageModule.forChild(ApplyPieceAuditPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class ApplyPieceAuditPageModule { }
