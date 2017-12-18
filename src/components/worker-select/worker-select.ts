import { Subject } from 'rxjs/Subject';
import { RequestOption } from 'interfaces/request-interface';
import { ViewController } from 'ionic-angular';
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

  // @Input() selectedWorkers: number[]; // userIds

  // @Output() selectWorker: EventEmitter<WorkerItem> = new EventEmitter();

  workerSubject: Subject<WorkerItem[]> = new BehaviorSubject([])

  subscriptions: Subscription[] = [];

  workers$$: Subscription;

  canQueryOther: Observable<boolean>;

  enableScroll: Observable<boolean>;

  selectedWorkers: Observable<number[]>;

  constructor(
    public worker: WorkerService,
    public permission: PermissionService,
    public project: ProjectService,
    public viewCtrl: ViewController
  ) {
    worker.resetPage();
  }

  ngOnInit() {
    this.canQueryOther = this.permission.specialOptionValidate(workerContractList)
      .map(result => !result['self'])
      .take(1)
      .filter(value => !!value);

    this.enableScroll = this.worker.getEnableScroll().share();

    this.worker.getWorkerContracts(this.getOption());

    this.launch();
  }

  launch() {
    this.subscriptions = [
      this.getWorkers(),
      this.getRestWorkerList()
    ];
  }

  getWorkers(): Subscription {
    return this.canQueryOther
      .mergeMapTo(this.worker.getWorkerItems(this.worker.getSelectedWorkers().take(1)))
      .subscribe(this.workerSubject)
  }

  getRestWorkerList(): Subscription {
    return this.worker.haveRestWorkers().subscribe(_ => this.worker.getWorkerContracts(this.canQueryOther.mergeMapTo(this.getOption())));
  }

  getOption(): Observable<RequestOption> {
    return this.worker.getCompleteStatusOption()
      .zip(this.worker.getUnexpiredOption(), this.project.getProjectId(), (option1, option2, project_id) => ({ ...option1, ...option2, project_id }))
  }

  getNextPage(infiniteScroll): void {
    this.workers$$ && this.workers$$.unsubscribe();

    this.workers$$ = this.worker.getNextPage(infiniteScroll);
  }

  updateSelectedWorkers(): void {
    const subscription =  this.workerSubject.take(1).subscribe(workers => {
      this.worker.updateSelectedWorkers(workers.filter(item => item.selected).map(item => item.id));

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
