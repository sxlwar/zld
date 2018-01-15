import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyLeavePage } from './apply-leave';

@NgModule({
    declarations: [
        ApplyLeavePage,
    ],
    imports: [
        IonicPageModule.forChild(ApplyLeavePage),
        TranslateModule,
        ComponentsModule,
        SharedModule,
    ],
})
export class ApplyLeavePageModule { }
