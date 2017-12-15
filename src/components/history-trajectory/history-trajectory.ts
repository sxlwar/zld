import { RequestOption } from './../../interfaces/request-interface';
import { ProjectService } from './../../services/business/project-service';
import { WorkerContractListResponse } from './../../interfaces/response-interface';
import { TrajectoryOptions } from './../../interfaces/location-interface';
import { PermissionService } from './../../services/config/permission-service';
import { workerContractList } from './../../services/api/command';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from './../../services/business/location-service';
import { TimeService } from './../../services/utils/time-service';
import { ViewController } from 'ionic-angular';
import { WorkerService } from './../../services/business/worker-service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { range } from 'lodash';

interface WorkerItem {
  id: number;
  name: string;
  teamName: string;
  workType: string;
  selected: boolean;
}

@Component({
  selector: 'history-trajectory',
  templateUrl: 'history-trajectory.html'
})
export class HistoryTrajectoryComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  canSelectWork = true;

  date: string;

  today: string;

  workerResponse: Observable<WorkerContractListResponse>;

  trajectoryForm: FormGroup;

  canQueryOther: Observable<boolean>;

  workers: Observable<WorkerItem[]>;

  options: Observable<TrajectoryOptions>;

  workers$$: Subscription;

  availableHourValues: number[];

  availableMinuteValues: number[];

  enableScroll: Observable<boolean>;

  constructor(
    public worker: WorkerService,
    public viewCtrl: ViewController,
    public timeService: TimeService,
    public location: LocationService,
    public fb: FormBuilder,
    public permission: PermissionService,
    public project: ProjectService
  ) {
    this.today = this.timeService.getDate(new Date, true);
    worker.resetPage();
  }

  ngOnInit() {
    this.canQueryOther = this.permission.specialOptionValidate(workerContractList)
      .map(result => !result['self'])
      .take(1)
      .filter(value => !!value);

    this.options = this.location.getTrajectoryOptions();

    this.launch();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  launch() {
    this.getTimeOptions();

    this.getWorkers();

    this.getRestWorkerList();

    this.getEnableScroll();
  }

  getWorkers() {
    this.workers = this.canQueryOther
      .mergeMapTo(this.worker.getWorkerItems(this.options.map(option => option.userIds)));
  }

  getRestWorkerList() {
    const subscription = this.worker.getRestWorkerList(this.canQueryOther
      .mergeMapTo(this.getOption())
    );

    this.subscriptions.push(subscription);
  }

  getOption(): Observable<RequestOption> {
    return this.worker.getCompleteStatusOption().zip(this.worker.getUnexpiredOption(), this.project.getProjectId(), (option1, option2, project_id) => ({ ...option1, ...option2, project_id }));
  }

  updateSelectedWorker(worker: WorkerItem) {
    const { id, selected } = worker;

    this.location.updateTrajectorySelectedWorker({ id, selected });
  }

  getTimeOptions() {
    const subscription = this.location.getTrajectoryOptions().subscribe(value => {
      const { date, startTime, endTime } = value;

      this.date = date;

      this.trajectoryForm = this.fb.group({
        date,
        startTime: [startTime, Validators.required],
        endTime: [endTime, Validators.required]
      });
    });

    this.subscriptions.push(subscription);
  }

  /* ===================================================Update options methods================================================= */

  updateDate(date) {
    this.location.updateTrajectoryOption({ date });
    this.location.updateMaxEndTimeOfTrajectory(date);
  }

  updateStartTime(startTime) {
    const [hour, minute] = startTime.split(':');

    const h = parseInt(hour);

    const m = parseInt(minute);

    this.availableHourValues = range(h, 24);

    this.availableMinuteValues = range(m, 60);

    this.location.updateTrajectoryOption({ startTime });

    this.location.resetTrajectoryEndTime();
  }

  updateEndTime(endTime) {
    this.location.updateTrajectoryOption({ endTime });
  }

  getNextPage(infiniteScroll) {
    this.workers$$ && this.workers$$.unsubscribe();

    this.workers$$ = this.worker.getNextPage(infiniteScroll);
  }

  getEnableScroll() {
    this.enableScroll = this.worker.getEnableScroll().share();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  execution() {
    this.location.updateCondition().next(true);

    this.dismiss();
  }

  get startTime() {
    return this.trajectoryForm.get('startTime');
  }

  get endTime() {
    return this.trajectoryForm.get('endTime');
  }
}
