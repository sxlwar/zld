import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { LaunchResponse } from '../../reducers/reducer/launch-reducer';
import { RevisableAttendanceListComponent } from './../../components/revisable-attendance-list/revisable-attendance-list';
import { AttendanceResult } from './../../interfaces/response-interface';
import { AttendanceModifyFormModel } from './../../services/api/mapper-service';
import { AttendanceService } from './../../services/business/attendance-service';
import { LaunchService } from './../../services/business/launch-service';
import { ConfigService } from './../../services/config/config-service';

@IonicPage()
@Component({
    selector: 'page-apply-attendance-modify',
    templateUrl: 'apply-attendance-modify.html',
})
export class ApplyAttendanceModifyPage implements BusinessPageModel{

    form: FormGroup;

    subscriptions: Subscription[] = [];

    attachList: string[] = [];

    modify$: Subject<AttendanceModifyFormModel> = new Subject();

    attendances: Observable<AttendanceResult[]>;

    constructor(
        private attendanceService: AttendanceService,
        private launchService: LaunchService,
        private fb: FormBuilder,
        private modalCtrl: ModalController,
        private config: ConfigService
    ) {
        this.initialForm();
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();

        this.config.hideTabBar();
    }

    initialModel(): void {
        this.attendances = this.attendanceService.getAttendancesToModify();
    }

    launch(): void {
        this.subscriptions = [
            this.launchService.createAttendanceModify(this.modify$.map(_ => ({ ...this.form.value, attach: this.attachList }))),

            this.attendances.subscribe(attendances => this.form.patchValue({ attendanceIds: attendances.map(item => item.id) })),

            this.launchService.getSuccessResponseOfAttendanceModify().subscribe(_ => this.attendanceService.resetAttendancesToModify()),

            this.launchService.uploadAttendanceModifyAttach(),

            this.launchService.handleAttendanceModifyError(),
        ];
    }

    initialForm() {
        this.form = this.fb.group({
            reason: '',
            attendanceIds: ['', Validators.required],
            onDutyTime: '',
            offDutyTime: '',
        });
    }

    resetOffDuty(): void {
        this.form.patchValue({ offDutyTime: '' });
    }

    searchAttendance(): void {
        this.modalCtrl.create(RevisableAttendanceListComponent).present();
    }

    removeAttendance(attendance: AttendanceResult): void {
        this.attendanceService.removeAttendanceFromReadyToModify(attendance.id);
    }

    getAttach(attach: string[]): void {
        this.attachList = attach;
    }

    ionViewWillUnload() {
        this.launchService.resetResponse(LaunchResponse.attendanceModify);

        this.subscriptions.forEach(item => item.unsubscribe());

        this.attendanceService.resetAttendancesToModify();

        this.config.showTabBar();
    }

    get reason() {
        return this.form.get('reason');
    }

    get attendanceIds() {
        return this.form.get('attendanceIds');
    }

    get onDutyTime() {
        return this.form.get('onDutyTime');
    }

    get offDutyTime() {
        return this.form.get('offDutyTime');
    }
}
