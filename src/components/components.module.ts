import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MultiPickerModule } from 'ion-multi-picker';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../app/shared.modules';
import { AccordionListComponent } from './accordion-list/accordion-list';
import { AddAttendanceCardComponent } from './add-attendance-card/add-attendance-card';
import { AddBankcardComponent } from './add-bankcard/add-bankcard';
import { AddEducationComponent } from './add-education/add-education';
import { AddLocationCardComponent } from './add-location-card/add-location-card';
import { AddTeamComponent } from './add-team/add-team';
import { AddWorkCertificateComponent } from './add-work-certificate/add-work-certificate';
import { AddWorkExperienceComponent } from './add-work-experience/add-work-experience';
import { AddressSelectComponent } from './address-select/address-select';
import { AttachListComponent } from './attach-list/attach-list';
import { AttendanceListComponent } from './attendance-list/attendance-list';
import { AttendanceMessageComponent } from './attendance-message/attendance-message';
import { AttendanceTimeChartComponent } from './attendance-time-chart/attendance-time-chart';
import { BasicInformationComponent } from './basic-information/basic-information';
import { CalendarComponent } from './calendar/calendar';
import { CertificationComponent } from './certification/certification';
import { CutDownComponent } from './cut-down/cut-down';
import { EducationComponent } from './education/education';
import { FaceImageComponent } from './face-image/face-image';
import { FamilyInformationComponent } from './family-information/family-information';
import { FlashCardComponent } from './flash-card/flash-card';
import { FuzzySearchComponent } from './fuzzy-search/fuzzy-search';
import { HistoryLocationComponent } from './history-location/history-location';
import { HistoryTrajectoryWorkersComponent } from './history-trajectory-workers/history-trajectory-workers';
import { HistoryTrajectoryComponent } from './history-trajectory/history-trajectory';
import { IconBarComponent } from './icon-bar/icon-bar';
import { ImageVerificationComponent } from './image-verification/image-verification';
import { MessageListComponent } from './message-list/message-list';
import { MissionListComponent } from './mission-list/mission-list';
import { PieceCompleteChartComponent } from './piece-complete-chart/piece-complete-chart';
import { PlatformWorkExperienceComponent } from './platform-work-experience/platform-work-experience';
import { PrimaryContractMessageComponent } from './primary-contract-message/primary-contract-message';
import { ProjectListComponent } from './project-list/project-list';
import { ResetPasswordComponent } from './reset-password/reset-password';
import { RevisableAttendanceListComponent } from './revisable-attendance-list/revisable-attendance-list';
import { SalaryCardMessageComponent } from './salary-card-message/salary-card-message';
import { SalaryMessageComponent } from './salary-message/salary-message';
import { SubcontractMessageComponent } from './subcontract-message/subcontract-message';
import { TakePhotoComponent } from './take-photo/take-photo';
import { TimelineComponent, TimelineItemComponent, TimelineTimeComponent } from './timeline/timeline';
import { UpdateFamilyInformationComponent } from './update-family-information/update-family-information';
import { WorkExperienceComponent } from './work-experience/work-experience';
import { WorkFlowAttachComponent } from './work-flow-attach/work-flow-attach';
import { WorkFlowAuditComponent } from './work-flow-audit/work-flow-audit';
import { WorkFlowMessageComponent } from './work-flow-message/work-flow-message';
import { WorkFlowTimeLineComponent } from './work-flow-time-line/work-flow-time-line';
import { WorkPieceAxisComponent } from './work-piece-axis/work-piece-axis';
import { WorkTypeSelectComponent } from './work-type-select/work-type-select';
import { WorkerContractMessageComponent } from './worker-contract-message/worker-contract-message';
import { WorkerSelectComponent } from './worker-select/worker-select';

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
        AttachListComponent,
        UpdateFamilyInformationComponent,
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
        AttachListComponent,
        UpdateFamilyInformationComponent,
    ],
})
export class ComponentsModule {
}
