import { PiecePay } from './../../interfaces/response-interface';
import { ContractType } from './../../interfaces/request-interface';
import { WorkerSelectComponent } from './../../components/worker-select/worker-select';
import { ConfigService } from './../../services/config/config-service';
import { WorkerService } from './../../services/business/worker-service';
import { LaunchService } from './../../services/business/launch-service';
import { PieceAuditFormModel } from './../../services/api/mapper-service';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkerItem } from './../../interfaces/worker-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LaunchResponse } from '../../reducers/reducer/launch-reducer';

@IonicPage()
@Component({
    selector: 'page-apply-piece-audit',
    templateUrl: 'apply-piece-audit.html',
})
export class ApplyPieceAuditPage {

    subscriptions: Subscription[] = [];

    workers: Observable<WorkerItem[]>;

    names: Observable<string>;

    form: FormGroup;

    attachList: string[] = [];

    apply$: Subject<PieceAuditFormModel> = new Subject();

    pieces: Observable<PiecePay[]>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public launchService: LaunchService,
        public worker: WorkerService,
        public fb: FormBuilder,
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
        this.workers = this.worker.getSelectWorkersContainsContractId();

        this.names = this.workers.map(workers => workers.map(item => item.name).join(','));

        this.pieces = this.worker.getContractById(this.workers.mergeMap(workers => Observable.from(workers).map(item => item.id)))
            .map(contract => contract.work_piece_pay)
            .defaultIfEmpty([]);
    }

    initialForm(): void {
        this.form = this.fb.group({
            num: '',
            finishDate: '',
            comment: '',
            qualityPercent: ['', [Validators.max(100), Validators.min(1)]],
            piecePayId: '',
        });
    }

    launch(): void {
        this.subscriptions = [
            this.launchService.createPieceAudit(this.apply$.map(_ => ({ ...this.form.value, attach: this.attachList }))),
            this.launchService.uploadPieceAuditAttach(),
            this.launchService.getSuccessResponseOfPieceAudit().subscribe(_ => this.form.patchValue({ piecePayId: '' })),
            this.launchService.handlerPieceAuditError(),
            this.worker.handleError(),
        ];
    }

    getAttach(attach: string[]): void {
        this.attachList = attach;
    }

    openWorkerSelect() {
        this.modalCtrl.create(WorkerSelectComponent, { option: { contract_type: ContractType.piecer }, single: true }, { cssClass: 'inset-modal' }).present();
    }

    ionViewWillUnload() {
        this.launchService.resetResponse(LaunchResponse.pieceAudit);
        
        this.subscriptions.forEach(item => item.unsubscribe());

        this.config.showTabBar();
    }

    get num() {
        return this.form.get('num');
    }

    get finishDate() {
        return this.form.get('finishDate');
    }

    get comment() {
        return this.form.get('comment');
    }

    get qualityPercent() {
        return this.form.get('qualityPercent');
    }

    get piecePayId() {
        return this.form.get('piecePayId');
    }
}
