import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { BankcardPage } from './bankcard';

@NgModule({
    declarations: [
        BankcardPage,
    ],
    imports: [
        IonicPageModule.forChild(BankcardPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class BankcardPageModule { }
