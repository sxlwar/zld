import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestOption } from 'interfaces/request-interface';
import { InfiniteScroll, ViewController } from 'ionic-angular';
import { range } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DistinguishableWorkerItem } from '../../interfaces/worker-interface';
import { LocationOptions } from './../../interfaces/location-interface';
import { CraftService } from './../../services/business/craft-service';
import { LocationService } from './../../services/business/location-service';
import { ProjectService } from './../../services/business/project-service';
import { TeamService } from './../../services/business/team-service';
import { WorkerService } from './../../services/business/worker-service';
import { TimeService } from './../../services/utils/time-service';

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
    templateUrl: 'history-location.html',
})
export class HistoryLocationComponent implements OnInit, OnDestroy {
    today: string;

    isTimeSlot: boolean;

    date: string;

    teams: Observable<TeamItem[]>;

    workTypes: Observable<WorkTypeItem[]>;

    workers: Observable<DistinguishableWorkerItem[]>;

    workers$$: Subscription;

    enableScroll: Observable<boolean>;

    locationForm: FormGroup;

    availableHourValues: number[];

    availableMinuteValues: number[];

    selectedTeams: string;

    options: Observable<LocationOptions>;

    subscriptions: Subscription[] = [];

    loading = false;

    selectedWorkTypes: WorkTypeItem[];

    constructor(
        private viewCtrl: ViewController,
        private worker: WorkerService,
        private timeService: TimeService,
        private teamService: TeamService,
        private fb: FormBuilder,
        private project: ProjectService,
        private location: LocationService,
        private workType: CraftService
    ) {
        this.today = this.timeService.getDate(new Date, true);

        worker.resetPage();
    }

    ngOnInit() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.options = this.location.getHistoryLocationOptions();

        this.teams = this.getTeams();

        this.workTypes = this.getWorkTypes();

        this.workers = this.worker.getWorkerItems(this.options.map(option => option.userIds));

        this.enableScroll = this.worker.getEnableScroll().share();
    }

    launch(): void {
        this.subscriptions = [
            this.worker.getWorkerContracts(this.getOption()),

            this.getRestWorkerList(),

            this.getTimeRelatedOptions(),

            this.worker.handleError(),

            this.workType.handleError(),
        ];
    }

    getOption(): Observable<RequestOption> {
        return this.worker.getCompleteStatusOption().zip(this.project.getProjectId(), (option, project_id) => ({ ...option, project_id }));
    }

    getTeams(): Observable<TeamItem[]> {
        return this.teamService.getOwnTeams().map(teams => teams.map(({ id, name }) => ({ id, name, selected: false })))
            .combineLatest(this.options.map(option => option.teamIds))
            .map(([teams, selectedIds]) => teams.map(item => ({ ...item, selected: selectedIds.indexOf(item.id) !== -1 })));
    }

    getWorkTypes(): Observable<WorkTypeItem[]> {
        return this.workType.getWorkTypeList().map(list => list.map(({ id, name }) => ({ id, name, selected: false })))
            .combineLatest(this.options.map(option => option.workTypeIds))
            .map(([types, selectedIds]) => types.map(type => ({ ...type, selected: selectedIds.indexOf(type.id) !== -1 })));
    }

    /* ============================================================Launch methods================================================ */

    getRestWorkerList(): Subscription {
        return this.worker.getWorkerContracts(this.worker.haveRestWorkers().mergeMapTo(this.getOption()));
    }

    getTimeRelatedOptions(): Subscription {
        return this.options
            .subscribe(option => {
                const { time, startTime, endTime, isTimeSlot } = option;

                this.date = option.date;

                this.isTimeSlot = isTimeSlot;

                const form = isTimeSlot
                    ? {
                        startTime: [startTime, Validators.required],
                        endTime: [endTime, Validators.required],
                        time: time,
                    }
                    : {
                        startTime,
                        endTime,
                        time: [time, Validators.required],

                    }

                this.locationForm = this.fb.group(form);
            });
    }

    /* ============================================================Update option methods================================================ */

    updateMaxEndTime($event): void {
        const [hour, minute] = $event.split(':');

        const h = parseInt(hour);

        const m = parseInt(minute);

        this.availableHourValues = [h, h + 1];

        this.availableMinuteValues = range(m, 60);

        this.updateStartTime($event);
    }

    updateIsTimeSlot(isTimeSlot): void {
        this.location.updateHistoryLocationOption({ isTimeSlot });
    }

    updateStartTime(startTime): void {
        this.location.updateHistoryLocationOption({ startTime });

        this.location.resetHistoryLocationEndTime();
    }

    updateEndTime(endTime): void {
        this.location.updateHistoryLocationOption({ endTime });
    }

    updateTime(time): void {
        this.location.updateHistoryLocationOption({ time });
    }

    updateTeams(teams): void {
        const teamIds = teams.map(item => item.id);

        this.location.updateHistoryLocationOption({ teamIds });
    }

    updateWorkType(workTypes): void {
        const workTypeIds = workTypes.map(item => item.id);

        this.location.updateHistoryLocationOption({ workTypeIds });
    }

    updateSelectedWorker(worker: DistinguishableWorkerItem): void {
        const { id, selected } = worker;

        this.location.updateSelectedWorker({ id, selected });
    }

    updateDate(date): void {
        this.location.updateHistoryLocationOption({ date });
    }

    /* ============================================================================================================= */
    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.workers$$ && this.workers$$.unsubscribe();

        this.workers$$ = this.worker.getNextPage(infiniteScroll);
    }

    execution(): void {
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
