import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
