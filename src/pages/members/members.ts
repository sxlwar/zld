import { Command } from './../../services/api/command';
import { PermissionService } from './../../services/config/permission-service';
import { Subject } from 'rxjs/Subject';
import { workerContractPage, memberStatisticsPage } from './../pages';
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

    type$: Subject<string> = new Subject();

    haveStatisticsPermission: Observable<boolean>;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private worker: WorkerService,
        private permission: PermissionService,
        private command: Command
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

        this.haveStatisticsPermission = this.permission.apiPermissionValidate(this.command.realTimeStatistics).map(res => res.view);
    }

    launch(): void {
        this.subscriptions = [
            this.worker.getWorkerContracts(this.getOption(ContractType[1])),

            this.worker.getWorkerContracts(this.type$.filter(value => value === ContractType[2]).take(1).mergeMap(type => this.getOption(type))),

            this.worker.setWorkersCountDistinctByPayType(this.type$.startWith(ContractType[1])),

            this.worker.handleError(),
        ];
    }

    getOption(type: string): Observable<RequestOption> {
        return this.worker.getManagementPage(type)
            .withLatestFrom(
            this.worker.getContractTypeOption(Observable.of(type)),
            this.worker.getCompleteStatusOption(),
            this.worker.getUnexpiredOption(),
            (option1, option2, option3, option4) => ({ ...option1, ...option2, ...option3, ...option4 })
            );
    }

    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.page$$ && this.page$$.unsubscribe();

        this.page$$ = this.worker.getNextPage(infiniteScroll, ContractType[this.type]);
    }

    transformData(item: WorkerContract): WorkerItem {
        return {
            name: item.worker__employee__realname,
            workType: item.worktype__name,
            contractId: item.id,
            workTypeId: item.worktype_id
        };
    }

    goToNextPage(item: WorkerItem): void {
        this.navCtrl.push(workerContractPage, { contractId: item.contractId }).then(_ => { });
    }

    goToStatisticsPage(): void {
        this.navCtrl.push(memberStatisticsPage).then(_ => { });
    }

    ionViewWillUnload() {
        this.page$$ && this.page$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
