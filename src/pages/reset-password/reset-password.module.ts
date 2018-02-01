import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { ResetPasswordPage } from './reset-password';

@NgModule({
    declarations: [
        ResetPasswordPage,
    ],
    imports: [
        IonicPageModule.forChild(ResetPasswordPage),
        SharedModule,
        TranslateModule,
        ComponentsModule,
    ],
})
export class ResetPasswordPageModule { }
