import { WorkerSelectComponent } from './../../components/worker-select/worker-select';
import { ConfigService } from './../../services/config/config-service';
import { WorkerService } from './../../services/business/worker-service';
import { LaunchService } from './../../services/business/launch-service';
import { OvertimeFormModel } from './../../services/api/mapper-service';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkerItem } from './../../interfaces/worker-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { LaunchResponse } from '../../reducers/reducer/launch-reducer';

@IonicPage()
@Component({
    selector: 'page-apply-overtime',
    templateUrl: 'apply-overtime.html',
})
export class ApplyOvertimePage {

    subscriptions: Subscription[] = [];

    workers: Observable<WorkerItem[]>;

    names: Observable<string>;

    form: FormGroup;

    attachList: string[] = [];

    apply$: Subject<OvertimeFormModel> = new Subject();

    type: string;

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
            payType: '',
            day: '',
            startTime: '',
            endTime: '',
            reason: '',
            contractIds: ['', Validators.required]
        });
    }

    launch(): void {
        this.subscriptions = [
            this.launchService.createOvertime(this.apply$.map(_ => ({ ...this.form.value, attach: this.attachList }))),
            this.launchService.uploadOvertimeAttach(),
            this.workers.map(workers => workers.map(item => item.id)).subscribe(ids => this.form.patchValue({ contractIds: !!ids.length ? ids : '' })),
            this.launchService.getSuccessResponseOfOvertime().subscribe(_ => this.worker.resetSelectedWorkers()),
            this.launchService.handlerOvertimeError(),
            this.worker.handleError(),
        ];
    }

    getAttach(attach: string[]): void {
        this.attachList = attach;
    }

    openWorkerSelect(): void {
        this.modalCtrl.create(WorkerSelectComponent, null, { cssClass: 'inset-modal' }).present();
    }

    resetEndTime(time: string): void {
        this.form.patchValue({ endTime: '' });
    }

    ionViewWillUnload() {
        this.launchService.resetResponse(LaunchResponse.overtime);

        this.subscriptions.forEach(item => item.unsubscribe());

        this.config.showTabBar();
    }

    get payType() {
        return this.form.get('payType');
    }

    get day() {
        return this.form.get('day');
    }

    get startTime() {
        return this.form.get('startTime');
    }

    get endTime() {
        return this.form.get('endTime');
    }

    get reason() {
        return this.form.get('reason');
    }

    get contractIds() {
        return this.form.get('contractIds');
    }
}
