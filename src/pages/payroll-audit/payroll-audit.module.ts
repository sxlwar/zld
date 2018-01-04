import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayrollAuditPage } from './payroll-audit';

@NgModule({
  declarations: [
    PayrollAuditPage,
  ],
  imports: [
    IonicPageModule.forChild(PayrollAuditPage),
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class PayrollAuditPageModule {}
