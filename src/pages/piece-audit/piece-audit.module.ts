import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
export class PieceAuditPageModule {}
