import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
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
export class AccountChangePageModule { }
