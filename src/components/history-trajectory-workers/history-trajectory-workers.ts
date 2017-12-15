import { Subscription } from 'rxjs/Subscription';
import { LocationService } from './../../services/business/location-service';
import { ViewController } from 'ionic-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

interface WorkerItem {
  id: number;
  name: string;
  selected: boolean;
}
@Component({
  selector: 'history-trajectory-workers',
  templateUrl: 'history-trajectory-workers.html'
})
export class HistoryTrajectoryWorkersComponent implements OnInit, OnDestroy {

  workers: ReplaySubject<WorkerItem[]> = new ReplaySubject();

  subscriptions: Subscription[] = [];

  constructor(
    public viewCtrl: ViewController,
    public location: LocationService
  ) {
  }

  ngOnInit() {
    this.getWorkers();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe);
  }

  getWorkers() {
    const subscription = this.location.getHistoryLocationResponse()
      .zip(this.location.getTrajectoryPlayWorkers())
      .map(([response, userIds]) => response.data_loc_list.filter(item => item && item.loc_list.length)
        .map(item => ({ id: item.user_id, name: item.uname, selected: userIds.indexOf(item.user_id) !== -1 }))
      )
      .subscribe(this.workers);
    
    this.subscriptions.push(subscription);
  }

  updateSelectedWorker() {
    const subscription = this.workers
      .map(workers => workers.filter(item => item.selected).map(item => item.id))
      .subscribe(workers => this.location.updatePlayWorkers(workers));

    this.subscriptions.push(subscription);

    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
