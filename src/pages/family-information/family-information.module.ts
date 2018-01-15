import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../app/shared.modules';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
