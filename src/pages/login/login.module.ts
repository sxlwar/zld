import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';
import { LoginEffect } from '../../effects/login-effect';
import { LoginPage } from './login';

@NgModule({
    declarations: [
        LoginPage,
    ],
    imports: [
        ReactiveFormsModule,
        IonicPageModule.forChild(LoginPage),
        TranslateModule.forChild(),
        EffectsModule.forRoot([LoginEffect]),
        ComponentsModule,
    ],
    exports: [
        LoginPage,
    ],
})

export class LoginPageModule {
}
