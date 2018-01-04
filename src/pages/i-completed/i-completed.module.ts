import { SharedModule } from './../../app/shared.modules';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ICompletedPage } from './i-completed';

@NgModule({
  declarations: [
    ICompletedPage,
  ],
  imports: [
    IonicPageModule.forChild(ICompletedPage),
    ComponentsModule,
    TranslateModule,
    SharedModule,
  ],
})
export class ICompletedPageModule {}
