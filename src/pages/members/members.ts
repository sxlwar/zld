import { workerContractPage } from './../pages';
import { Subscription } from 'rxjs/Subscription';
import { WorkerContract } from './../../interfaces/response-interface';
import { ContractType, RequestOption } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { WorkerService } from './../../services/business/worker-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export interface WorkerItem {
    name: string;
    contractId: number;
    workType: string;
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

    haveMoreTimer = true;

    haveMorePiecer = true;

    timers$$: Subscription;

    piecers$$: Subscription;

    subscriptions: Subscription[] = [];

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
    }

    launch(): void {
        this.subscriptions = [
            this.worker.getWorkerContracts(this.getOption()),
            this.setWorkersCountDistinctByPayType(),
            this.worker.handleError()
        ];
    }

    setWorkersCountDistinctByPayType(): Subscription {
        const source = this.worker.getWorkerContractResponse().map(res => res.count);

        return this.worker.setWorkersCountDistinctByPayType(source, ContractType[this.type]);
    }

    getOption(): Observable<RequestOption> {
        return this.worker.getUnexpiredOption()
            .zip(
            this.worker.getContractTypeOption(this.type),
            this.worker.getCompleteStatusOption(),
            this.worker.getManagementPage(ContractType[this.type]),
            (option1, option2, option3, option4) => ({ ...option1, ...option2, ...option3, ...option4 })
            );
    }

    getNextPage(infiniteScroll) {

        this.worker.incrementPage(ContractType[this.type]);

        const isTimers = this.type === ContractType[1];

        if (isTimers) {
            this.timers$$ && this.timers$$.unsubscribe();
        } else {
            this.piecers$$ && this.piecers$$.unsubscribe();
        }

        const subscription = this.worker.getWorkerContractResponse().subscribe(res => {
            const haveMoreData = !!res.worker_contract.length;

            if (isTimers) {
                this.haveMoreTimer = haveMoreData;
            } else {
                this.haveMorePiecer = haveMoreData;
            }

            infiniteScroll.complete();
        });

        if (isTimers) {
            this.timers$$ = subscription;
        } else {
            this.piecers$$ = subscription;
        }
    }

    transformData(item: WorkerContract): WorkerItem {
        return {
            name: item.worker__employee__realname,
            workType: item.worktype__name,
            contractId: item.id
        }
    }

    goToNextPage(item: WorkerItem): void {
        const { contractId } = item;

        this.navCtrl.push(workerContractPage, { contractId }).then(_ => { });
    }

    ionViewWillUnload() {
        this.timers$$ && this.timers$$.unsubscribe();

        this.piecers$$ && this.piecers$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
