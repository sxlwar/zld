import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountChangePage } from './account-change';

@NgModule({
  declarations: [
    AccountChangePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountChangePage),
    TranslateModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class AccountChangePageModule {}
