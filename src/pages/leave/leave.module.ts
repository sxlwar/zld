import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeavePage } from './leave';

@NgModule({
    declarations: [
        LeavePage,
    ],
    imports: [
        IonicPageModule.forChild(LeavePage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class LeavePageModule { }
