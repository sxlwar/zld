//region
import { SharedModule } from './../app/shared.modules';
import { NgModule } from '@angular/core';
import { ImageVerificationComponent } from './image-verification/image-verification';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CutDownComponent } from './cut-down/cut-down';
import { IonicModule } from 'ionic-angular';
import { FuzzySearchComponent } from './fuzzy-search/fuzzy-search';
import { TakePhotoComponent } from './take-photo/take-photo';
import { IconBarComponent } from './icon-bar/icon-bar';
import { ProjectListComponent } from './project-list/project-list';
import { CalendarComponent } from './calendar/calendar';
import { AttendanceTimeChartComponent } from './attendance-time-chart/attendance-time-chart';
//endregion

@NgModule({
  declarations: [
    ImageVerificationComponent,
    CutDownComponent,
    FuzzySearchComponent,
    TakePhotoComponent,
    IconBarComponent,
    ProjectListComponent,
    CalendarComponent,
    AttendanceTimeChartComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    SharedModule,
  ],
  exports: [
    ImageVerificationComponent,
    CutDownComponent,
    FuzzySearchComponent,
    TakePhotoComponent,
    IconBarComponent,
    ProjectListComponent,
    CalendarComponent,
    AttendanceTimeChartComponent,
  ]
})
export class ComponentsModule {
}
