import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { MessageContentPage } from './message-content';

@NgModule({
    declarations: [
        MessageContentPage,
    ],
    imports: [
        IonicPageModule.forChild(MessageContentPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class MessageContentPageModule { }
