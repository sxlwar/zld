import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../app/shared.modules';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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