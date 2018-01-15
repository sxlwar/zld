import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
