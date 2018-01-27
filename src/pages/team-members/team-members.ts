import { putInArray } from '../../services/utils/util';
import { personalPage } from './../pages';
import { Subscription } from 'rxjs/Subscription';
import { WorkerContractListResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { WorkerService } from './../../services/business/worker-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { TeamItem } from '../organization/organization';

export interface WorkerItem {
    name: string;
    workType: string;
    id: number;
    workTypeId: number;
}

@IonicPage()
@Component({
    selector: 'page-team-members',
    templateUrl: 'team-members.html',
})
export class TeamMembersPage {
    team: TeamItem;

    list: Observable<WorkerItem[]>;

    haveMoreData: Observable<boolean>;

    workerCount: Observable<number>;

    pageSubscription: Subscription;

    subscriptions: Subscription[] = [];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private worker: WorkerService
    ) {
        this.team = this.navParams.get('team');

        this.worker.resetPage();
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        const response = this.worker.getWorkerContractResponse().skip(1);

        this.list = this.getWorkerList(response);

        this.haveMoreData = response.map(res => !!res.worker_contract.length);

        this.workerCount = response.map(res => res.count).startWith(0);
    }

    launch(): void {
        this.subscriptions = [
            this.getWorkerContractList(),
            
            this.worker.handleError(),
        ];
    }

    /**
     * 这就是后台坑的地方的了，参数怎么传根本不care，传null都可以拿到值，真心垃圾，一点规范也没有。
     * 新加的班组，由于数据是从本地拿到的，后台又没有在添加成功后返回班组的id，所新加的班组时不能让数据发出去。
     * */
    getWorkerContractList(): Subscription {
        return this.worker.getWorkerContracts(
            Observable.of(this.team.id)
                .filter(value => !!value)
                .map(team_id => ({ team_id }))
                .zip(
                this.worker.getCompleteStatusOption(),
                this.worker.getUnexpiredOption(),
                (teamId, status, expire) => ({ ...teamId, ...status, ...expire })
                )
        );
    }

    getWorkerList(source: Observable<WorkerContractListResponse>): Observable<WorkerItem[]> {
        return source.map(res => res.worker_contract)
            .mergeMap(result => Observable.from(result)
                .map(item => ({ name: item.worker__employee__realname, workType: item.worktype__name, id: item.worker_id, workTypeId: item.worktype_id }))
                .reduce(putInArray, [])
            )
            .scan((acc, cur) => acc.concat(cur), []);
    }

    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.pageSubscription && this.pageSubscription.unsubscribe();

        this.pageSubscription = this.worker.getNextPage(infiniteScroll);
    }

    goToNextPage(data?: WorkerItem) {
        const userId = data ? data.id : this.team.foremanId;

        this.navCtrl.push(personalPage, { userId }).then(_ => { });
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());

        this.pageSubscription && this.pageSubscription.unsubscribe();
    }

}
