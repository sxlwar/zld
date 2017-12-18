import { RequestOption } from 'interfaces/request-interface';
import { LocationOptions } from './../../interfaces/location-interface';
import { ProjectService } from './../../services/business/project-service';
import { CraftService } from './../../services/business/craft-service';
import { LocationService } from './../../services/business/location-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from './../../services/business/team-service';
import { TimeService } from './../../services/utils/time-service';
import { WorkerService, WorkerItem } from './../../services/business/worker-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ViewController } from 'ionic-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { range } from 'lodash';

interface TeamItem {
  id: number;
  name: string;
  selected: boolean;
}

interface WorkTypeItem {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'history-location',
  templateUrl: 'history-location.html'
})
export class HistoryLocationComponent implements OnInit, OnDestroy {
  today: string;

  isTimeSlot: boolean;

  date: string;

  teams: Observable<TeamItem[]>;

  workTypes: Observable<WorkTypeItem[]>;

  workers: Observable<WorkerItem[]>;

  workers$$: Subscription;

  enableScroll: Observable<boolean>;

  locationForm: FormGroup;

  availableHourValues: number[];

  availableMinuteValues: number[];
  
  selectedTeams: string;

  options: Observable<LocationOptions>;

  subscriptions: Subscription[] = [];

  loading = false;

  constructor(
    public viewCtrl: ViewController,
    public worker: WorkerService,
    public timeService: TimeService,
    public teamService: TeamService,
    public fb: FormBuilder,
    public project: ProjectService,
    public location: LocationService,
    public workType: CraftService
  ) {
    this.today = this.timeService.getDate(new Date, true);
    worker.resetPage();
  }

  ngOnInit() {

    this.options = this.location.getHistoryLocationOptions();

    this.worker.getWorkerContracts(this.getOption());

    this.getRestWorkerList();

    this.getTeams();

    this.getWorkTypes();

    this.getWorkers();

    this.getTimeRelatedOptions();

    this.getEnableScroll();
  }

  getWorkers() {
    this.workers = this.worker.getWorkerItems(this.options.map(option => option.userIds));
  }

  getRestWorkerList() {
    const subscription = this.worker.haveRestWorkers().subscribe(_ => this.worker.getWorkerContracts(this.getOption()));

    this.subscriptions.push(subscription);
  }

  getOption(): Observable<RequestOption> {
    return this.worker.getCompleteStatusOption().zip(this.project.getProjectId(), (option, project_id) => ({ ...option, project_id }));
  }

  getTeams(): void {
    this.teams = this.teamService.getOwnTeams().map(teams => teams.map(({ id, name }) => ({ id, name, selected: false })))
      .combineLatest(this.options.map(option => option.teamIds))
      .map(([teams, selectedIds]) => teams.map(item => {
        item.selected = selectedIds.indexOf(item.id) !== -1;

        return item;
      }));
  }

  getWorkTypes(): void {
    this.workTypes = this.workType.getWorkTypeList().map(list => list.map(({ id, name }) => ({ id, name, selected: false })))
      .combineLatest(this.options.map(option => option.workTypeIds))
      .map(([types, selectedIds]) => types.map(type => {
        type.selected = selectedIds.indexOf(type.id) !== -1;

        return type;
      }));
  }

  /* ============================================================Get option methods================================================ */

  getTimeRelatedOptions() {
    const subscription = this.options
      .subscribe(option => {
        const { time, startTime, endTime, isTimeSlot } = option;

        this.date = option.date;

        this.isTimeSlot = isTimeSlot;

        const form = isTimeSlot ? {
          startTime: [startTime, Validators.required],
          endTime: [endTime, Validators.required],
          time: time
        } : {
            startTime,
            endTime,
            time: [time, Validators.required]

          }

        this.locationForm = this.fb.group(form);
      });

    this.subscriptions.push(subscription);
  }

  /* ============================================================Update option methods================================================ */

  updateMaxEndTime($event) {
    const [hour, minute] = $event.split(':');

    const h = parseInt(hour);

    const m = parseInt(minute);

    this.availableHourValues = [h, h + 1];

    this.availableMinuteValues = range(m, 60);

    this.updateStartTime($event);
  }

  updateIsTimeSlot(isTimeSlot) {
    this.location.updateHistoryLocationOption({ isTimeSlot });
  }

  updateStartTime(startTime) {
    this.location.updateHistoryLocationOption({ startTime });
    this.location.resetHistoryLocationEndTime();
  }

  updateEndTime(endTime) {
    this.location.updateHistoryLocationOption({ endTime });
  }

  updateTime(time) {
    this.location.updateHistoryLocationOption({ time });
  }

  updateTeams(teams) {
    const teamIds = teams.map(item => item.id);

    this.location.updateHistoryLocationOption({ teamIds });
  }

  updateWorkType(workTypes) {
    const workTypeIds = workTypes.map(item => item.id);

    this.location.updateHistoryLocationOption({ workTypeIds });
  }

  updateSelectedWorker(worker: WorkerItem) {
    const { id, selected } = worker;

    this.location.updateSelectedWorker({ id, selected });
  }

  updateDate(date) {
    this.location.updateHistoryLocationOption({ date });
  }

  /* ============================================================================================================= */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  getEnableScroll() {
    this.enableScroll = this.worker.getEnableScroll().share();
  }

  getNextPage(infiniteScroll) {
    this.workers$$ && this.workers$$.unsubscribe();

    this.workers$$ = this.worker.getNextPage(infiniteScroll);
  }

  execution() {
    this.location.updateCondition().next(true);

    this.dismiss();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  get time() {
    return this.locationForm.get('time');
  }

  get startTime() {
    return this.locationForm.get('startTime');
  }

  get endTime() {
    return this.locationForm.get('endTime');
  }
}
