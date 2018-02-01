import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { PieceAuditPage } from './piece-audit';

@NgModule({
    declarations: [
        PieceAuditPage,
    ],
    imports: [
        IonicPageModule.forChild(PieceAuditPage),
        ComponentsModule,
        SharedModule,
        TranslateModule,
    ],
})
export class PieceAuditPageModule { }
