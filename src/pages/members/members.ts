import { Subject } from 'rxjs/Subject';
import { workerContractPage } from './../pages';
import { Subscription } from 'rxjs/Subscription';
import { WorkerContract } from './../../interfaces/response-interface';
import { ContractType, RequestOption } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { WorkerService } from './../../services/business/worker-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';

export interface WorkerItem {
    name: string;
    contractId: number;
    workType: string;
    workTypeId: number;
}

@IonicPage()
@Component({
    selector: 'page-members',
    templateUrl: 'members.html',
})
export class MembersPage {

    type = ContractType[1];

    timers: Observable<WorkerItem[]>;

    piecers: Observable<WorkerItem[]>;

    timersCount: Observable<number>;

    piecersCount: Observable<number>;

    haveMoreTimer: Observable<boolean>;

    haveMorePiecer: Observable<boolean>;

    page$$: Subscription;

    subscriptions: Subscription[] = [];

    type$: Subject<number> = new Subject();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public worker: WorkerService
    ) {
        this.worker.resetPage(ContractType[this.type]);

        this.worker.resetWorkContracts();
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.timers = this.worker.getWorkersByPayType(ContractType.timer).map(res => res.map(this.transformData));

        this.piecers = this.worker.getWorkersByPayType(ContractType.piecer).map(res => res.map(this.transformData));

        this.timersCount = this.worker.getWorkersCountByPayType(ContractType.timer);

        this.piecersCount = this.worker.getWorkersCountByPayType(ContractType.piecer);

        this.haveMoreTimer = this.worker.haveMoreDataOfSpecificPayTypeContract(ContractType.timer);

        this.haveMorePiecer = this.worker.haveMoreDataOfSpecificPayTypeContract(ContractType.piecer);
    }

    launch(): void {
        this.subscriptions = [
            this.worker.getWorkerContracts(this.getOption()),
            this.worker.setWorkersCountDistinctByPayType(this.worker.getWorkerCount(), this.type$.startWith(ContractType.timer)),
            this.worker.handleError()
        ];
    }

    getOption(): Observable<RequestOption> {
        return this.worker.getUnexpiredOption()
            .combineLatest(
            this.worker.getContractTypeOption(this.type),
            this.worker.getCompleteStatusOption(),
            this.worker.getManagementPage(ContractType[this.type]),
            (option1, option2, option3, option4) => ({ ...option1, ...option2, ...option3, ...option4 })
            );
    }

    getNextPage(infiniteScroll: InfiniteScroll) {
        this.worker.incrementPage(ContractType[this.type]);

        this.page$$ && this.page$$.unsubscribe();

        this.page$$ = this.worker.getWorkerContractResponse().subscribe(_ => infiniteScroll.complete());
    }

    transformData(item: WorkerContract): WorkerItem {
        return {
            name: item.worker__employee__realname,
            workType: item.worktype__name,
            contractId: item.id,
            workTypeId: item.worktype_id
        }
    }

    goToNextPage(item: WorkerItem): void {
        const { contractId } = item;

        this.navCtrl.push(workerContractPage, { contractId }).then(_ => { });
    }

    ionViewWillUnload() {
        this.page$$ && this.page$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
