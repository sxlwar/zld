import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../app/shared.modules';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchWorkerPage } from './search-worker';

@NgModule({
  declarations: [
    SearchWorkerPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchWorkerPage),
    TranslateModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class SearchWorkerPageModule {}
