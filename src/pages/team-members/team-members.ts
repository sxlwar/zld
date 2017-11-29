import { personalPage } from './../pages';
import { Subscription } from 'rxjs/Subscription';
import { WorkerContractListResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { WorkerService } from './../../services/business/worker-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public worker: WorkerService
  ) {
    this.team = this.navParams.get('team');
  }

  ionViewDidLoad() {
    this.worker.resetPage();

    this.getWorkerContractList();

    const response = this.worker.getWorkerContractResponse().skip(1);

    this.getWorkerList(response);

    this.monitorComplete(response);

    this.workerCount = response.map(res => res.count);
  }

  getWorkerContractList() {
    const teamId = Observable.of({ team_id: this.team.id });

    const status = this.worker.getCompleteStatusOption();

    const expire = this.worker.getUnexpiredOption();

    const option = teamId.zip(status, expire, (teamId, status, expire) => ({ ...teamId, ...status, ...expire }));

    this.worker.getWorkerContracts(option);
  }

  getWorkerList(source: Observable<WorkerContractListResponse>): void {
    this.list = source.map(res => res.worker_contract)
      .mergeMap(result => Observable.from(result)
        .map(item => ({ name: item.worker__employee__realname, workType: item.worktype__name, id: item.worker_id }))
        .reduce((acc, cur) => {
          acc.push(cur);
          return acc;
        }, [])
      )
      .scan((acc, cur) => acc.concat(cur), []);
  }

  monitorComplete(source: Observable<WorkerContractListResponse>): void {
    this.haveMoreData = source.map(res => !!res.worker_contract.length);
  }

  getNextPage(infiniteScroll) {
    this.worker.incrementPage();

    this.getWorkerContractList();

    this.pageSubscription && this.pageSubscription.unsubscribe();

    this.pageSubscription = this.worker.getWorkerContractResponse()
      .subscribe(_ => infiniteScroll.complete());
  }

  goToNextPage(data?: WorkerItem) {
    const userId = data ? data.id : this.team.qualityClerkId;
    
    this.navCtrl.push(personalPage, { userId }).then(_ => { });
  }

}
