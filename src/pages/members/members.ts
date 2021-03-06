import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessPageModel } from '../../interfaces/core-interface';
import { ContractType, RequestOption } from './../../interfaces/request-interface';
import { Team } from './../../interfaces/response-interface';
import { Command } from './../../services/api/command';
import { LaunchService } from './../../services/business/launch-service';
import { TeamService } from './../../services/business/team-service';
import { WorkerService } from './../../services/business/worker-service';
import { PermissionService } from './../../services/config/permission-service';
import { memberStatisticsPage, workerContractPage } from './../pages';

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
export class MembersPage implements BusinessPageModel{
    selectedTeams: Team[];

    type = ContractType[1];

    timers: Observable<WorkerItem[]>;

    piecers: Observable<WorkerItem[]>;

    timersCount: Observable<number>;

    piecersCount: Observable<number>;

    haveMoreTimer: Observable<boolean>;

    haveMorePiecer: Observable<boolean>;

    subscriptions: Subscription[] = [];

    type$: Subject<string> = new Subject();

    haveStatisticsPermission: Observable<boolean>;

    setTeam$: Subject<Team[]> = new Subject();

    teams: Observable<Team[]>;

    nextPage$: Subject<InfiniteScroll> = new Subject();

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private worker: WorkerService,
        private permission: PermissionService,
        private command: Command,
        private teamService: TeamService,
        private launchService: LaunchService
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
        this.timers = this.getWorkers(ContractType.timer);

        this.piecers = this.getWorkers(ContractType.piecer);

        // TODO: 这个数量在选择班组后表示的是不准确的,它表示的是所有的计时或计件工人的数量。目前采用的是查所有工人，再根据用户需要筛选的办法，
        // 这样导致即使把筛选后的数量展示给用户，它依然是不准确的，因为数据是分页拉回来的。还可以在查数据时带上班组去查，这样查到的数据是准确的，但
        // 由于接口是的team_id是int，没法展示多班组。哪种方式都无所谓，关键是TMD接口能不能不耦合。
        this.timersCount = this.worker.getWorkersCountByPayType(ContractType.timer);

        this.piecersCount = this.worker.getWorkersCountByPayType(ContractType.piecer);

        this.haveMoreTimer = this.worker.haveMoreDataOfSpecificPayTypeContract(ContractType.timer);

        this.haveMorePiecer = this.worker.haveMoreDataOfSpecificPayTypeContract(ContractType.piecer);

        this.haveStatisticsPermission = this.permission.apiPermissionValidate(this.command.realTimeStatistics).map(res => res.view);

        this.teams = this.teamService.getOwnTeamsContainsSelectedProp();
    }

    launch(): void {
        this.subscriptions = [
            this.worker.getWorkerContracts(this.getOption()),

            this.teamService.setSelectTeams(this.setTeam$.map(teams => teams.map(item => item.id))),

            this.worker.setWorkersCountDistinctByPayType(this.type$.startWith(ContractType[1])),

            this.worker.terminateWorkerContract(this.launchService.getSuccessResponseOfWorkerContractTermination()),

            ...this.worker.getNextPage(this.nextPage$, this.type$.startWith(this.type).map(type => ContractType[type])),

            this.worker.handleError(),
        ];
    }

    getWorkers(type: number): Observable<WorkerItem[]> {
        return this.worker.getWorkersByPayType(type)
            .combineLatest(
            this.teamService.getSelectedTeams(),
            (workers, ids) => !ids.length ? workers : workers.filter(worker => ids.indexOf(worker.team_id) !== -1)
            )
            .map(res => res.map(item => ({
                name: item.worker__employee__realname,
                workType: item.worktype__name,
                contractId: item.id,
                workTypeId: item.worktype_id,
            })));
    }

    getOption(): Observable<RequestOption> {
        const type = this.type$.startWith(this.type);

        return type
            .switchMap(type => this.worker.getManagementPage(type))
            .withLatestFrom(
            this.worker.getContractTypeOption(type),
            this.worker.getCompleteStatusOption(),
            this.worker.getUnexpiredOption(),
            (option1, option2, option3, option4) => ({ ...option1, ...option2, ...option3, ...option4 })
            )
    }

    goToNextPage(item: WorkerItem): void {
        this.navCtrl.push(workerContractPage, { contractId: item.contractId }).then(_ => { });
    }

    goToStatisticsPage(): void {
        this.navCtrl.push(memberStatisticsPage).then(_ => { });
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
