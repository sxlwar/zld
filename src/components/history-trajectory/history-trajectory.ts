import { Map } from '../../interfaces/amap-interface';
import { AmapService } from './../../services/business/amap-service';
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
import { ViewController, NavParams } from 'ionic-angular';
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

  date: string;

  today: string;

  workerResponse: Observable<WorkerContractListResponse>;

  trajectoryForm: FormGroup;

  canQueryOther: Observable<boolean>; // Wether need to show the worker select list;

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
    public project: ProjectService,
    public mapService: AmapService,
    public navParams: NavParams
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

  launch(): void {
    this.getTimeOptions();

    this.getWorkers();

    this.getRestWorkerList();

    this.getEnableScroll();
  }

  /**
   * @description Get the time related options.
   */
  getTimeOptions(): void {
    const subscription = this.location.getTrajectoryOptions().subscribe(value => {
      const { date, startTime, endTime } = value;

      this.date = date;

      this.trajectoryForm = this.fb.group({
        startTime: [startTime, Validators.required],
        endTime: [endTime, Validators.required]
      });
    });

    this.subscriptions.push(subscription);
  }

  /* =============================================Worker related=============================================================== */

  getWorkers(): void {
    this.workers = this.canQueryOther
      .mergeMapTo(this.worker.getWorkerItems(this.options.map(option => option.userIds)));
  }

  getRestWorkerList(): void {
    const subscription = this.worker.getRestWorkerList(this.canQueryOther
      .mergeMapTo(this.getOption())
    );

    this.subscriptions.push(subscription);
  }

  getOption(): Observable<RequestOption> {
    return this.worker.getCompleteStatusOption().zip(this.worker.getUnexpiredOption(), this.project.getProjectId(), (option1, option2, project_id) => ({ ...option1, ...option2, project_id }));
  }

  /**
   * @description Update workers that user want to query.
   */
  updateSelectedWorker(worker: WorkerItem): void {
    const { id, selected } = worker;

    this.location.updateTrajectorySelectedWorker({ id, selected });
  }

  /**
   * @param infiniteScroll - ionic's infiniteScroll instance;
   */
  getNextPage(infiniteScroll): void {
    this.workers$$ && this.workers$$.unsubscribe();

    this.workers$$ = this.worker.getNextPage(infiniteScroll);
  }

  getEnableScroll(): void {
    this.enableScroll = this.worker.getEnableScroll().share();
  }

  /* ===================================================Update options methods================================================= */

  /**
   * @description We need to update the date and end time when user select a date.
   */
  updateDate(date: string): void {
    this.location.updateTrajectoryOption({ date });

    this.location.updateMaxEndTimeOfTrajectory(date);
  }

  /**
   * @description When user select a start time, update the start time in store first.
   * At the same time we need to  set the available hours and minutes of the
   * end time to prevent user select an invalid one, if there is a value of end time had been selected, we
   * need to clear that because it may be an invalid value;
   */
  updateStartTime(startTime: string): void {
    const [hour, minute] = startTime.split(':');

    const h = parseInt(hour);

    const m = parseInt(minute);

    this.availableHourValues = range(h, 24);

    this.availableMinuteValues = range(m, 60);

    this.location.updateTrajectoryOption({ startTime });

    this.location.resetTrajectoryEndTime();
  }

  updateEndTime(endTime: string): void {
    this.location.updateTrajectoryOption({ endTime });
  }

  /* ==================================================Methods executed before modal dismiss=========================================== */

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  /**
   * @description Clear polyline on current map and notify the location
   * service that the condition has been changed when user clicked the confirm button;
   */
  execution(): void {
    this.location.updateCondition().next(true);

    this.clearPolyline();

    this.dismiss();
  }

  clearPolyline(): void {
    const map: Map = this.navParams.get('map');

    const subscription = this.mapService.clearPolyline(map);

    this.subscriptions.push(subscription);
  }

  /* =========================================================== Shortcut methods for template ======================================= */

  get startTime() {
    return this.trajectoryForm.get('startTime');
  }

  get endTime() {
    return this.trajectoryForm.get('endTime');
  }
}
