import {LoginPage} from './login';
import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TranslateModule} from '@ngx-translate/core';
import {LoginService} from '../../serveices/business/login-service';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
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
