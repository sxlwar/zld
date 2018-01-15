import { RevisableAttendanceListComponent } from './../../components/revisable-attendance-list/revisable-attendance-list';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './../../services/config/config-service';
import { AttendanceResult } from './../../interfaces/response-interface';
import { Subject } from 'rxjs/Subject';
import { AttendanceModifyFormModel } from './../../services/api/mapper-service';
import { Subscription } from 'rxjs/Subscription';
import { PermissionService } from './../../services/config/permission-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LaunchService } from './../../services/business/launch-service';
import { AttendanceService } from './../../services/business/attendance-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LaunchResponse } from '../../reducers/reducer/launch-reducer';

@IonicPage()
@Component({
    selector: 'page-apply-attendance-modify',
    templateUrl: 'apply-attendance-modify.html',
})
export class ApplyAttendanceModifyPage {

    form: FormGroup;

    subscriptions: Subscription[] = [];

    attachList: string[] = [];

    modify$: Subject<AttendanceModifyFormModel> = new Subject();

    attendances: Observable<AttendanceResult[]>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public attendanceService: AttendanceService,
        public launchService: LaunchService,
        public fb: FormBuilder,
        public permission: PermissionService,
        public modalCtrl: ModalController,
        public config: ConfigService
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
            this.launchService.handlerAttendanceModifyError()
        ];
    }

    initialForm() {
        this.form = this.fb.group({
            reason: '',
            attendanceIds: ['', Validators.required],
            onDutyTime: '',
            offDutyTime: ''
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