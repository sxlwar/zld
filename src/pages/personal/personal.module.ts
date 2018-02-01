import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from './../../components/components.module';
import { PersonalPage } from './personal';

@NgModule({
    declarations: [
        PersonalPage,
    ],
    imports: [
        IonicPageModule.forChild(PersonalPage),
        TranslateModule,
        ComponentsModule,
    ],
})
export class PersonalPageModule { }
