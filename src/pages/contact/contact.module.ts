import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';

@NgModule({
    declarations: [
        ContactPage,
    ],
    imports: [
        IonicPageModule.forChild(ContactPage),
        TranslateModule,
    ],
})
export class ContactPageModule { }
