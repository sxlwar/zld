import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { IStartedPage } from './i-started';

@NgModule({
    declarations: [
        IStartedPage,
    ],
    imports: [
        IonicPageModule.forChild(IStartedPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class IStartedPageModule { }
