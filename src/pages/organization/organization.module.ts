import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from './../../components/components.module';
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
