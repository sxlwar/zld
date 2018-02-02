import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { WorkerItem } from '../../interfaces/worker-interface';
import { LaunchResponse } from '../../reducers/reducer/launch-reducer';
import { WorkerSelectComponent } from './../../components/worker-select/worker-select';
import { LeaveFormModel } from './../../services/api/mapper-service';
import { LaunchService } from './../../services/business/launch-service';
import { WorkerService } from './../../services/business/worker-service';
import { ConfigService } from './../../services/config/config-service';

export const leaveTypes = [
    'SICK_LEAVE',
    'ABSENCE_LEAVE',
    'ANNUAL_LEAVE',
    'MATERNITY_LEAVE',
    'FUNERAL_LEAVE',
    'MARRIAGE_LEAVE',
    'WORK_RELATED_LEAVE',
];

@IonicPage()
@Component({
    selector: 'page-apply-leave',
    templateUrl: 'apply-leave.html',
})
export class ApplyLeavePage implements BusinessPageModel{

    subscriptions: Subscription[] = [];

    workers: Observable<WorkerItem[]>;

    names: Observable<string>;

    form: FormGroup;

    attachList: string[] = [];

    apply$: Subject<LeaveFormModel> = new Subject();

    leaveTypes = leaveTypes;

    vacation: string;

    constructor(
        private launchService: LaunchService,
        private worker: WorkerService,
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
        this.workers = this.worker.getSelectWorkersContainsContractId();

        this.names = this.workers.map(workers => workers.map(item => item.name).join(','));
    }

    initialForm(): void {
        this.form = this.fb.group({
            leaveType: '',
            startDay: '',
            endDay: '',
            reason: '',
            contractIds: ['', Validators.required],
        });
    }

    launch(): void {
        this.subscriptions = [
            this.launchService.createLeave(this.apply$.map(_ => ({ ...this.form.value, attach: this.attachList }))),

            this.launchService.uploadLeaveAttach(),

            this.workers.map(workers => workers.map(item => item.id)).subscribe(ids => this.form.patchValue({ contractIds: !!ids.length ? ids : '' })),

            this.launchService.getSuccessResponseOfLeave().subscribe(_ => this.worker.resetSelectedWorkers()),

            this.launchService.handleLeaveError(),
            
            this.worker.handleError(),
        ];
    }

    getAttach(attach: string[]): void {
        this.attachList = attach.filter(attach => !!attach);
    }

    updateExpireDate(start: string): void {
        this.form.patchValue({ endDay: '' });
    }

    openWorkerSelect() {
        this.modalCtrl.create(WorkerSelectComponent, null, { cssClass: 'inset-modal' }).present();
    }

    ionViewWillUnload() {
        this.launchService.resetResponse(LaunchResponse.leave);

        this.subscriptions.forEach(item => item.unsubscribe());

        this.config.showTabBar();
    }

    get leaveType() {
        return this.form.get('leaveType');
    }

    get startDay() {
        return this.form.get('startDay');
    }

    get endDay() {
        return this.form.get('endDay');
    }

    get reason() {
        return this.form.get('reason');
    }

    get contractIds() {
        return this.form.get('contractIds');
    }
}
