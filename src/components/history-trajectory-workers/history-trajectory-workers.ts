import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ReplaySubject, Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { BusinessComponentModel } from '../../interfaces/core-interface';
import { LocationService } from './../../services/business/location-service';

interface WorkerItem {
    id: number;
    name: string;
    selected: boolean;
}
@Component({
    selector: 'history-trajectory-workers',
    templateUrl: 'history-trajectory-workers.html',
})
export class HistoryTrajectoryWorkersComponent implements BusinessComponentModel {

    workers: ReplaySubject<WorkerItem[]> = new ReplaySubject();

    subscriptions: Subscription[] = [];

    update$: Subject<boolean> = new Subject();

    constructor(
        private viewCtrl: ViewController,
        private location: LocationService
    ) {
    }

    ngOnInit() {
        this.launch();
    }

    launch(): void {
        this.subscriptions = [
            this.getWorkers(),

            this.update$.mergeMapTo(this.workers.map(workers => workers.filter(item => item.selected).map(item => item.id)))
                .subscribe(workers => this.location.updatePlayWorkers(workers)),
        ]
    }

    initialModel(): void {

    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe);
    }

    getWorkers(): Subscription {
        return this.location.getHistoryLocationResponse()
            .zip(this.location.getTrajectoryPlayWorkers())
            .map(([response, userIds]) => response.data_loc_list.filter(item => item && item.loc_list.length)
                .map(item => ({ id: item.user_id, name: item.uname, selected: userIds.indexOf(item.user_id) !== -1 }))
            )
            .subscribe(this.workers);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
