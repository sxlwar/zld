import {LoginPage} from './login';
import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from '@ngx-translate/core';
import {LoginService} from '../../serveices/business/login-service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(LoginPage),
    TranslateModule.forChild()
  ],
  exports: [
    LoginPage
  ],
  providers: [
    LoginService
  ]
})

export class LoginPageModule {
}
