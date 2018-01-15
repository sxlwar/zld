import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OvertimePage } from './overtime';

@NgModule({
    declarations: [
        OvertimePage,
    ],
    imports: [
        IonicPageModule.forChild(OvertimePage),
        TranslateModule,
        SharedModule,
        ComponentsModule,
    ],
})
export class OvertimePageModule { }
