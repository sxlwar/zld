import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryDetailPage } from './salary-detail';

@NgModule({
    declarations: [
        SalaryDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(SalaryDetailPage),
        TranslateModule,
    ],
})
export class SalaryDetailPageModule { }
