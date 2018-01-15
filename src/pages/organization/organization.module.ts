import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizationPage } from './organization';

@NgModule({
    declarations: [
        OrganizationPage,
    ],
    imports: [
        IonicPageModule.forChild(OrganizationPage),
        TranslateModule,
        ComponentsModule,
    ],
})
export class OrganizationPageModule { }
