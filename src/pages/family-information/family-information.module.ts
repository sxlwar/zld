import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { FamilyInformationPage } from './family-information';

@NgModule({
    declarations: [
        FamilyInformationPage,
    ],
    imports: [
        IonicPageModule.forChild(FamilyInformationPage),
        SharedModule,
        TranslateModule,
        ComponentsModule,
    ],
})
export class FamilyInformationPageModule { }
