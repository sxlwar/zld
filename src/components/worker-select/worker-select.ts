import { Subject } from 'rxjs/Subject';
import { RequestOption } from 'interfaces/request-interface';
import { ViewController, InfiniteScroll, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ProjectService } from './../../services/business/project-service';
import { workerContractList } from './../../services/api/command';
import { Observable } from 'rxjs/Observable';
import { PermissionService } from './../../services/config/permission-service';
import { WorkerService } from './../../services/business/worker-service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface WorkerItem {
    id: number;
    name: string;
    teamName: string;
    workType: string;
    selected: boolean;
}

@Component({
    selector: 'worker-select',
    templateUrl: 'worker-select.html'
})
export class WorkerSelectComponent implements OnInit, OnDestroy {

    workerSubject: Subject<WorkerItem[]> = new BehaviorSubject([])

    subscriptions: Subscription[] = [];

    workers$$: Subscription;

    canQueryOther: Observable<boolean>;

    haveMoreData: Observable<boolean>;

    selectedWorkers: Observable<number[]>;

    selectedWorker: WorkerItem;
    
    single = false;

    constructor(
        public worker: WorkerService,
        public permission: PermissionService,
        public project: ProjectService,
        public viewCtrl: ViewController,
        public navParams: NavParams
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

        this.haveMoreData = this.worker.getHaveMoreData();
    }

    launch(): void {
        this.subscriptions = [
            this.getWorkers(),
            this.worker.getWorkerContracts(this.getOption()),
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
            .zip(this.worker.getUnexpiredOption(), this.project.getProjectId(), (option1, option2, project_id) => ({ ...option1, ...option2, project_id }))
            .map(option => {
                const passedInOption: RequestOption = this.navParams.get('option');

                if (!!passedInOption) {
                    return { ...option, ...passedInOption };
                } else {
                    return option;
                }
            });
    }

    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.workers$$ && this.workers$$.unsubscribe();

        this.workers$$ = this.worker.getNextPage(infiniteScroll);
    }

    updateSelectedWorkers(): void {
        const subscription = this.workerSubject.take(1).subscribe(workers => {
            if(!this.single) {
                this.worker.updateSelectedWorkers(workers.filter(item => item.selected).map(item => item.id));
            }else {
                this.worker.updateSelectedWorkers([this.selectedWorker.id]);
            }

            this.dismiss();
        });

        this.subscriptions.push(subscription);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnDestroy() {
        this.workers$$ && this.workers$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
