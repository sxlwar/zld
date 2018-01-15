import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
