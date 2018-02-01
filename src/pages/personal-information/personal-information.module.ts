import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MultiPickerModule } from 'ion-multi-picker';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { PersonalInformationPage } from './personal-information';

@NgModule({
    declarations: [
        PersonalInformationPage,
    ],
    imports: [
        IonicPageModule.forChild(PersonalInformationPage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
        MultiPickerModule, // Use to create address select at this time, but it can do more than this;
    ],
})
export class PersonalInformationPageModule { }
