import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalPage } from './personal';

@NgModule({
    declarations: [
        PersonalPage,
    ],
    imports: [
        IonicPageModule.forChild(PersonalPage),
        TranslateModule,
        ComponentsModule
    ],
})
export class PersonalPageModule { }
