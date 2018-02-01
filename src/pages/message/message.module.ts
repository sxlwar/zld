import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { MessagePage } from './message';

@NgModule({
    declarations: [
        MessagePage,
    ],
    imports: [
        IonicPageModule.forChild(MessagePage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
    exports: [
        MessagePage,
    ],
})
export class MessagePageModule { }
