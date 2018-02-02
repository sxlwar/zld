import { Component } from '@angular/core';
import { RequestOption } from 'interfaces/request-interface';
import { InfiniteScroll, NavParams, ViewController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { BusinessComponentModel } from '../../interfaces/core-interface';
import { DistinguishableWorkerItem } from './../../interfaces/worker-interface';
import { workerContractList } from './../../services/api/command';
import { ProjectService } from './../../services/business/project-service';
import { WorkerService } from './../../services/business/worker-service';
import { PermissionService } from './../../services/config/permission-service';

@Component({
    selector: 'worker-select',
    templateUrl: 'worker-select.html',
})
export class WorkerSelectComponent implements BusinessComponentModel {

    workerSubject: Subject<DistinguishableWorkerItem[]> = new BehaviorSubject([]);

    subscriptions: Subscription[] = [];

    canQueryOther: Observable<boolean>;

    haveMoreData: Observable<boolean>;

    selectedWorkers: Observable<number[]>;

    selectedWorker: DistinguishableWorkerItem;

    single = false;

    nextPage$: Subject<InfiniteScroll> = new Subject();

    update$: Subject<boolean> = new Subject();

    constructor(
        private worker: WorkerService,
        private permission: PermissionService,
        private project: ProjectService,
        private viewCtrl: ViewController,
        private navParams: NavParams
    ) {
        this.single = !!this.navParams.get('single');

        worker.resetPage();
    }

    ngOnInit() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.canQueryOther = this.permission.specialOptionValidate(workerContractList)
            .map(result => !result['self'])
            .take(1)
            .filter(value => !!value);

        this.haveMoreData = this.worker.haveMoreData();
    }

    launch(): void {
        this.subscriptions = [
            this.getWorkers(),

            this.worker.getWorkerContracts(this.getOption()),

            ...this.worker.getNextPage(this.nextPage$),

            this.updateSelectedWorkers(),

            this.worker.handleError(),
        ];
    }

    getWorkers(): Subscription {
        return this.canQueryOther
            .mergeMapTo(this.worker.getWorkerItems(this.worker.getSelectedWorkers().take(1)))
            .subscribe(this.workerSubject)
    }

    getRestWorkerList(): Subscription {
        return this.worker.getWorkerContracts(
            this.worker.haveRestWorkers()
                .combineLatest(this.canQueryOther, (haveRest, canQuery) => haveRest && canQuery)
                .mergeMapTo(this.getOption())
        );

    }

    getOption(): Observable<RequestOption> {
        return this.worker.getCompleteStatusOption()
            .zip(
            this.worker.getUnexpiredOption(),
            this.project.getProjectId(),
            (option1, option2, project_id) => ({ ...option1, ...option2, project_id })
            )
            .map(option => {
                const passedInOption: RequestOption = this.navParams.get('option');

                if (!!passedInOption) {
                    return { ...option, ...passedInOption };
                } else {
                    return option;
                }
            });
    }

    updateSelectedWorkers(): Subscription {
        return this.update$.mergeMapTo(this.workerSubject.take(1))
            .subscribe(workers => {
                if (!this.single) {
                    this.worker.updateSelectedWorkers(workers.filter(item => item.selected).map(item => item.id));
                } else {
                    this.worker.updateSelectedWorkers([this.selectedWorker.id]);
                }

                this.dismiss()
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
