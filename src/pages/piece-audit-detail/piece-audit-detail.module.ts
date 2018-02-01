import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { PieceAuditDetailPage } from './piece-audit-detail';

@NgModule({
    declarations: [
        PieceAuditDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(PieceAuditDetailPage),
        SharedModule,
        TranslateModule,
        ComponentsModule,
    ],
})
export class PieceAuditDetailPageModule { }
