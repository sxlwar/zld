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
import { ViewController, NavParams, InfiniteScroll } from 'ionic-angular';
import { WorkerService } from './../../services/business/worker-service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { range } from 'lodash';
import { DistinguishableWorkerItem } from '../../interfaces/worker-interface';

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

    workers: Observable<DistinguishableWorkerItem[]>;

    options: Observable<TrajectoryOptions>;

    workers$$: Subscription;

    availableHourValues: number[];

    availableMinuteValues: number[];

    enableScroll: Observable<boolean>;

    constructor(
        private worker: WorkerService,
        private viewCtrl: ViewController,
        private timeService: TimeService,
        private location: LocationService,
        private fb: FormBuilder,
        private permission: PermissionService,
        private project: ProjectService,
        private mapService: AmapService,
        private navParams: NavParams
    ) {
        this.today = this.timeService.getDate(new Date, true);
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

        this.options = this.location.getTrajectoryOptions();

        this.workers = this.canQueryOther.mergeMapTo(this.worker.getWorkerItems(this.options.map(option => option.userIds)));

        this.enableScroll = this.worker.getEnableScroll().share();
    }

    launch(): void {
        this.subscriptions = [
            this.worker.getWorkerContracts(this.getOption()),
            this.getTimeOptions(),
            this.getRestWorkerList(),
            this.worker.handleError()
        ];
    }

    /**
     * @description Get the time related options.
     */
    getTimeOptions(): Subscription {
        return this.location.getTrajectoryOptions().subscribe(value => {
            const { date, startTime, endTime } = value;

            this.date = date;

            this.trajectoryForm = this.fb.group({
                startTime: [startTime, Validators.required],
                endTime: [endTime, Validators.required]
            });
        });
    }

    /* =============================================Worker related=============================================================== */

    getRestWorkerList(): Subscription {
        return this.worker.getWorkerContracts(
            this.worker.haveRestWorkers()
                .combineLatest(this.canQueryOther, (haveRest, canQuery) => haveRest && canQuery)
                .mergeMapTo(this.getOption())
        );
    }

    getOption(): Observable<RequestOption> {
        return this.worker.getCompleteStatusOption().zip(this.worker.getUnexpiredOption(), this.project.getProjectId(), (option1, option2, project_id) => ({ ...option1, ...option2, project_id }));
    }

    /**
     * @description Update workers that user want to query.
     */
    updateSelectedWorker(worker: DistinguishableWorkerItem): void {
        const { id, selected } = worker;

        this.location.updateTrajectorySelectedWorker({ id, selected });
    }

    /**
     * @param infiniteScroll - ionic's infiniteScroll instance;
     */
    getNextPage(infiniteScroll: InfiniteScroll): void {
        this.workers$$ && this.workers$$.unsubscribe();

        this.workers$$ = this.worker.getNextPage(infiniteScroll);
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

    ngOnDestroy() {
        this.subscriptions.forEach(item => item.unsubscribe());

        this.workers$$ && this.workers$$.unsubscribe();
    }

    /* =========================================================== Shortcut methods for template ======================================= */

    get startTime() {
        return this.trajectoryForm.get('startTime');
    }

    get endTime() {
        return this.trajectoryForm.get('endTime');
    }
}
