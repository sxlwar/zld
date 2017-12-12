import { RequestOption } from 'interfaces/request-interface';
import { uniqBy } from 'lodash';
import { LocationOptions } from './../../interfaces/location-interface';
import { ProjectService } from './../../services/business/project-service';
import { CraftService } from './../../services/business/craft-service';
import { LocationService } from './../../services/business/location-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from './../../services/business/team-service';
import { TimeService } from './../../services/utils/time-service';
import { WorkerService } from './../../services/business/worker-service';
import { Subscription } from 'rxjs/Subscription';
import { WorkerContractListResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { ViewController } from 'ionic-angular';
import { Component, OnInit, OnDestroy } from '@angular/core';

interface TeamItem {
  id: number;
  name: string;
  selected: boolean;
}

interface WorkerItem {
  id: number;
  name: string;
  selected: boolean;
}

interface WorkTypeItem {
  id: number;
  name: string;
  teamName: string;
  workType: string;
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

  enableScroll = true;

  workerResponse: Observable<WorkerContractListResponse>;

  locationForm: FormGroup;

  availableHourValues: string;

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

    this.workerResponse = this.worker.getWorkerContractResponse();

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
    this.workers = this.workerResponse
      .map(res => res.worker_contract.map(item => ({ id: item.worker_id, name: item.worker__employee__realname, teamName: item.team__name, workType: item.worktype__name, selected: false })))
      .scan((acc, cur) => acc.concat(cur))
      .combineLatest(this.options.map(option => option.userIds))
      .map(([workers, selectedUserIds]) => {
        const result = workers.map(item => ({ ...item, selected: selectedUserIds.indexOf(item.id) !== -1 }));

        return uniqBy(result, 'id');
      });
  }

  getRestWorkerList() {
    const getRestData = this.worker.getCurrentPage()
      .skip(1)
      .distinctUntilChanged()
      .combineLatest(this.worker.getLimit(), this.workerResponse.map(item => item.count).distinctUntilChanged())
      .filter(([page, limit, count]) => Math.ceil(count / limit) + 1 >= page);

    const subscription = getRestData
      .subscribe(_ => this.worker.getWorkerContracts(this.getOption()));

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
    const start = $event.split(':');

    const h = parseInt(start);

    this.availableHourValues = start[0] + ',' + this.timeService.toTwo(String(h + 1));

    this.updateStartTime($event);
  }

  updateIsTimeSlot(isTimeSlot) {
    this.location.updateHistoryLocationOption({ isTimeSlot });
  }

  updateStartTime(startTime) {
    this.location.updateHistoryLocationOption({ startTime });
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
    const subscription = this.workerResponse
      .skip(1)
      .filter(response => !response.worker_contract.length)
      .subscribe(_ => this.enableScroll = false)

    this.subscriptions.push(subscription);
  }

  getNextPage(infiniteScroll) {
    if (this.loading) return;

    this.loading = true;

    this.worker.incrementPage();

    this.workers$$ && this.workers$$.unsubscribe();

    this.workers$$ = this.workerResponse.subscribe(response => {
      this.loading = false;
      infiniteScroll.complete();
    });
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
