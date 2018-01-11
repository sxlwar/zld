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
    public navCtrl: NavController,
    public navParams: NavParams,
    public worker: WorkerService
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

    this.workerCount = response.map(res => res.count);
  }

  launch(): void {
    this.subscriptions = [
      this.getWorkerContractList(),
      this.worker.handleError(),
    ];
  }

  getWorkerContractList(): Subscription {
    return this.worker.getWorkerContracts(
      Observable.of({ team_id: this.team.id })
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
        .map(item => ({ name: item.worker__employee__realname, workType: item.worktype__name, id: item.worker_id }))
        .reduce(putInArray, [])
      )
      .scan((acc, cur) => acc.concat(cur), []);
  }

  getNextPage(infiniteScroll: InfiniteScroll): void {
    this.pageSubscription && this.pageSubscription.unsubscribe();

    this.pageSubscription = this.worker.getNextPage(infiniteScroll);
  }

  goToNextPage(data?: WorkerItem) {
    const userId = data ? data.id : this.team.qualityClerkId;

    this.navCtrl.push(personalPage, { userId }).then(_ => { });
  }

  ionViewWillUnload(){
    this.subscriptions.forEach(item => item.unsubscribe());

    this.pageSubscription && this.pageSubscription.unsubscribe();
  }

}
