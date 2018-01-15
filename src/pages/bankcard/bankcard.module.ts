import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
