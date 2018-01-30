import { WorkerSelectComponent } from './../../components/worker-select/worker-select';
import { ConfigService } from './../../services/config/config-service';
import { WorkerService } from './../../services/business/worker-service';
import { LaunchService } from './../../services/business/launch-service';
import { WorkerContractModifyFormModel } from './../../services/api/mapper-service';
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
    selector: 'page-apply-worker-contract-modify',
    templateUrl: 'apply-worker-contract-modify.html',
})
export class ApplyWorkerContractModifyPage {

    subscriptions: Subscription[] = [];

    workers: Observable<WorkerItem[]>;

    names: Observable<string>;

    form: FormGroup;

    attachList: string[] = [];

    apply$: Subject<WorkerContractModifyFormModel> = new Subject();

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
            date: '',
            contractId: ['', Validators.required]
        });
    }

    launch(): void {
        this.subscriptions = [
            this.launchService.createWorkerContractModify(this.apply$.mergeMap(_ => Observable.from(this.form.get('contractId').value).map((contractId: number) => ({ contractId, date: this.form.get('date').value, attach: this.attachList })))),
            
            this.launchService.uploadWorkerContractModifyAttach(),
            
            this.workers.map(workers => workers.map(item => item.id)).subscribe(ids => this.form.patchValue({ contractId: !!ids.length ? ids : '' })),

            this.launchService.getSuccessResponseOfWorkerContractModify().subscribe(_ => this.worker.resetSelectedWorkers()),

            this.launchService.handleWorkerContractModifyError(),
            
            this.worker.handleError(),
        ];
    }

    getAttach(attach: string[]): void {
        this.attachList = attach;
    }

    /**
     * @description None parameters passed to the component here, so multi select would be used.
     * These values will eventually be passed to the service in turn in the pipeline.
     */
    openWorkerSelect() {
        this.modalCtrl.create(WorkerSelectComponent, null, { cssClass: 'inset-modal' }).present();
    }

    ionViewWillUnload() {
        this.launchService.resetResponse(LaunchResponse.workerContractModify);

        this.subscriptions.forEach(item => item.unsubscribe());

        this.config.showTabBar();
    }

    get date() {
        return this.form.get('date');
    }

    get contractId() {
        return this.form.get('contractId');
    }


}
