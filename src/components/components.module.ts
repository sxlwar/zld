import { FlashCardComponent } from './flash-card/flash-card';
import { MultiPickerModule } from 'ion-multi-picker';
import { TimelineComponent, TimelineItemComponent, TimelineTimeComponent } from './timeline/timeline';
import { SharedModule } from '../app/shared.modules';
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
import { AddTeamComponent } from './add-team/add-team';
import { BasicInformationComponent } from './basic-information/basic-information';
import { FamilyInformationComponent } from './family-information/family-information';
import { WorkExperienceComponent } from './work-experience/work-experience';
import { PlatformWorkExperienceComponent } from './platform-work-experience/platform-work-experience';
import { CertificationComponent } from './certification/certification';
import { PersonalIdComponent } from './personal-id/personal-id';
import { EducationComponent } from './education/education';
import { FaceImageComponent } from './face-image/face-image';
import { WorkPieceAxisComponent } from './work-piece-axis/work-piece-axis';
import { PieceCompleteChartComponent } from './piece-complete-chart/piece-complete-chart';
import { AddAttendanceCardComponent } from './add-attendance-card/add-attendance-card';
import { AddLocationCardComponent } from './add-location-card/add-location-card';
import { HistoryLocationComponent } from './history-location/history-location';
import { FormsModule } from '@angular/forms';
import { HistoryTrajectoryComponent } from './history-trajectory/history-trajectory';
import { HistoryTrajectoryWorkersComponent } from './history-trajectory-workers/history-trajectory-workers';
import { WorkerSelectComponent } from './worker-select/worker-select';
import { WorkTypeSelectComponent } from './work-type-select/work-type-select';
import { AddressSelectComponent } from './address-select/address-select';
import { AccordionListComponent } from './accordion-list/accordion-list';
import { AddEducationComponent } from './add-education/add-education';
import { AddWorkExperienceComponent } from './add-work-experience/add-work-experience';
import { AddBankcardComponent } from './add-bankcard/add-bankcard';
import { ResetPasswordComponent } from './reset-password/reset-password';
import { AddWorkCertificateComponent } from './add-work-certificate/add-work-certificate';
import { MessageListComponent } from './message-list/message-list';
import { SalaryMessageComponent } from './salary-message/salary-message';
import { PrimaryContractMessageComponent } from './primary-contract-message/primary-contract-message';
import { SubcontractMessageComponent } from './subcontract-message/subcontract-message';
import { WorkerContractMessageComponent } from './worker-contract-message/worker-contract-message';
import { SalaryCardMessageComponent } from './salary-card-message/salary-card-message';
import { WorkFlowMessageComponent } from './work-flow-message/work-flow-message';
import { AttendanceMessageComponent } from './attendance-message/attendance-message';
import { MissionListComponent } from './mission-list/mission-list';
import { WorkFlowAuditComponent } from './work-flow-audit/work-flow-audit';
import { WorkFlowTimeLineComponent } from './work-flow-time-line/work-flow-time-line';
import { WorkFlowAttachComponent } from './work-flow-attach/work-flow-attach';
import { AttendanceListComponent } from './attendance-list/attendance-list';
import { RevisableAttendanceListComponent } from './revisable-attendance-list/revisable-attendance-list';

@NgModule({
  declarations: [
    AccordionListComponent,
    AddAttendanceCardComponent,
    AddBankcardComponent,
    AddEducationComponent,
    AddLocationCardComponent,
    AddTeamComponent,
    AddWorkCertificateComponent,
    AddWorkExperienceComponent,
    AddressSelectComponent,
    AttendanceTimeChartComponent,
    BasicInformationComponent,
    CalendarComponent,
    CertificationComponent,
    CutDownComponent,
    EducationComponent,
    FaceImageComponent,
    FamilyInformationComponent,
    FlashCardComponent,
    FuzzySearchComponent,
    HistoryLocationComponent,
    HistoryTrajectoryComponent,
    HistoryTrajectoryWorkersComponent,
    IconBarComponent,
    ImageVerificationComponent,
    PersonalIdComponent,
    PieceCompleteChartComponent,
    PlatformWorkExperienceComponent,
    ProjectListComponent,
    ResetPasswordComponent,
    TakePhotoComponent,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    WorkExperienceComponent,
    WorkPieceAxisComponent,
    WorkTypeSelectComponent,
    WorkerSelectComponent,
    MessageListComponent,
    SalaryMessageComponent,
    PrimaryContractMessageComponent,
    SubcontractMessageComponent,
    WorkerContractMessageComponent,
    SalaryCardMessageComponent,
    WorkFlowMessageComponent,
    AttendanceMessageComponent,
    MissionListComponent,
    WorkFlowAuditComponent,
    WorkFlowTimeLineComponent,
    WorkFlowAttachComponent,
    AttendanceListComponent,
    RevisableAttendanceListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultiPickerModule,
    SharedModule,
    TranslateModule,
  ],
  exports: [
    AccordionListComponent,
    AddAttendanceCardComponent,
    AddBankcardComponent,
    AddEducationComponent,
    AddLocationCardComponent,
    AddTeamComponent,
    AddWorkCertificateComponent,
    AddWorkExperienceComponent,
    AddressSelectComponent,
    AttendanceTimeChartComponent,
    BasicInformationComponent,
    CalendarComponent,
    CertificationComponent,
    CutDownComponent,
    EducationComponent,
    FaceImageComponent,
    FamilyInformationComponent,
    FlashCardComponent,
    FuzzySearchComponent,
    HistoryLocationComponent,
    HistoryTrajectoryComponent,
    HistoryTrajectoryWorkersComponent,
    IconBarComponent,
    ImageVerificationComponent,
    PersonalIdComponent,
    PieceCompleteChartComponent,
    PlatformWorkExperienceComponent,
    ProjectListComponent,
    ResetPasswordComponent,
    TakePhotoComponent,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    WorkExperienceComponent,
    WorkPieceAxisComponent,
    WorkTypeSelectComponent,
    WorkerSelectComponent,
    MessageListComponent,
    SalaryMessageComponent,
    PrimaryContractMessageComponent,
    SubcontractMessageComponent,
    WorkerContractMessageComponent,
    SalaryCardMessageComponent,
    WorkFlowMessageComponent,
    AttendanceMessageComponent,
    MissionListComponent,
    WorkFlowAuditComponent,
    WorkFlowTimeLineComponent,
    WorkFlowAttachComponent,
    AttendanceListComponent,
    RevisableAttendanceListComponent,
  ]
})
export class ComponentsModule {
}
