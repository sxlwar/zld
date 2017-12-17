import { Map } from '../../interfaces/amap-interface';
import { Subject } from 'rxjs/Subject';
import { LocationOptions, TrajectoryOptions, Trajectory, TrajectoryInfo } from './../../interfaces/location-interface';
import { UpdateMaxEndTimeAction, UpdateHistoryLocationOptionAction, UpdateSelectedWorkerId, UpdateTrajectoryOptionAction, UpdateMaxEndTimeOfTrajectoryAction, UpdateTrajectorySelectedWorkerAction, ResetHistoryLocationEndTimeAction, ResetTrajectoryEndTimeAction, UpdatePlayWorkersAction, UpdateTrajectoryAction, UpdatePlayStateAction, UpdateRateStateAction, UpdateMapAction } from './../../actions/action/location-action';
import { TimeService } from './../utils/time-service';
import { RequestOption } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { HistoryLocationListResponse, ProjectAreaListResponse } from './../../interfaces/response-interface';
import { Subscription } from 'rxjs/Subscription';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';
import { ProjectService } from './project-service';
import { AppState, selectHistoryLocationResponse, selectProjectAreaResponse, selectHistoryLocationOptions, selectMaxEndTimeOptions, selectTrajectoryOptions, selectTrajectoryMaxEndTimeOption, selectTrajectoryPlayWorkers, selectTrajectories, selectTrajectoryIndexes, selectTrajectoryRateState, selectTrajectoryPlayState } from './../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {
    updateMapSubject: Subject<boolean> = new Subject();

    constructor(
        public store: Store<AppState>,
        public project: ProjectService,
        public userInfo: UserService,
        public error: ErrorService,
        public processor: ProcessorService,
        public timeService: TimeService
    ) { }

    /* ==================================================Data acquisition================================================ */

    getHistoryLocationResponse(): Observable<HistoryLocationListResponse> {
        return this.store.select(selectHistoryLocationResponse).filter(res => !!res && !!res.data_loc_list);
    }

    getProjectAreaResponse(): Observable<ProjectAreaListResponse> {
        return this.store.select(selectProjectAreaResponse).filter(res => !!res);
    }

    getAvailableOptions(): Observable<RequestOption> {
        return this.getHistoryLocationOptions()
            .map(options => {
                const { isTimeSlot, date, startTime, endTime, time, userIds, devIds, teamIds, workTypeIds } = options;

                const ids = { user_id: userIds, team_ids: teamIds, dev_ids: devIds, worktype_ids: workTypeIds };

                if (isTimeSlot) {
                    return { ...ids, start_time: [date, startTime].join(' '), end_time: [date, endTime].join(' ') };
                } else {
                    return { time: [date, time].join(' '), ...ids };
                }
            });
    }

    getTrajectoryAvailableOptions(): Observable<RequestOption> {
        return this.getTrajectoryOptions()
            .withLatestFrom(this.userInfo.getUserId())
            .map(([option, userId]) => {
                const { date, startTime, endTime, userIds } = option;

                return { start_time: [date, startTime].join(' '), end_time: [date, endTime].join(' '), user_id: userIds || [userId] }
            });
    }

    getMaxEndTime(): Observable<string> {
        return this.store.select(selectMaxEndTimeOptions);
    }

    getHistoryLocationOptions(): Observable<LocationOptions> {
        return this.store.select(selectHistoryLocationOptions);
    }

    getTrajectoryOptions(): Observable<TrajectoryOptions> {
        return this.store.select(selectTrajectoryOptions);
    }

    getTrajectoryMaxEndTime(): Observable<string> {
        return this.store.select(selectTrajectoryMaxEndTimeOption);
    }

    getTrajectoryPlayWorkers(): Observable<number[]> {
        return this.store.select(selectTrajectoryPlayWorkers);
    }

    getTrajectories(): Observable<Trajectory[]> {
        return this.store.select(selectTrajectories)
            .combineLatest(this.store.select(selectTrajectoryIndexes))
            .map(([trajectories, indexes]) => trajectories.filter((_, index) => indexes.indexOf(index) !== -1));
    }

    getPlayRate(): Observable<number> {
        return this.store.select(selectTrajectoryRateState);
    }

    getPlayState(): Observable<number> {
        return this.store.select(selectTrajectoryPlayState);
    }

    getTrajectoryInformation(): Observable<TrajectoryInfo> {
        const name: Observable<string> = this.getTrajectoryPlayWorkers()
            .combineLatest(
            this.getHistoryLocationResponse().map(res => res.data_loc_list.filter(item => !!item.loc_list.length)),
            (userIds, list) => list.filter(item => userIds.indexOf(item.user_id) !== -1).map(item => item.uname).join(',')
            );

        return this.getTrajectoryOptions()
            .map(option => option.date + ' ' + option.startTime + '-' + option.endTime)
            .combineLatest(name, (time, name) => ({ time, name }));
    }

    /* ==================================================Condition update operate================================================ */

    updateMaxEndTime(startTime: string): void {
        const maxEndTime = this.timeService.addTime(startTime);

        this.store.dispatch(new UpdateMaxEndTimeAction(maxEndTime));
    }

    updateHistoryLocationOption(option: { [key: string]: string | number[] }): void {
        this.store.dispatch(new UpdateHistoryLocationOptionAction(option));
    }

    resetHistoryLocationEndTime(): void {
        this.store.dispatch(new ResetHistoryLocationEndTimeAction());
    }

    updateSelectedWorker(data: { id: number, selected: boolean }): void {
        this.store.dispatch(new UpdateSelectedWorkerId(data));
    }

    updateTrajectoryOption(option: { [key: string]: string | number[] }): void {
        this.store.dispatch(new UpdateTrajectoryOptionAction(option));
    }

    resetTrajectoryEndTime() {
        this.store.dispatch(new ResetTrajectoryEndTimeAction());
    }

    updateMaxEndTimeOfTrajectory(date) {
        const isToday = this.timeService.isToday(date);

        const time = isToday ? this.timeService.getTime(false) : '23: 59: 59';

        this.store.dispatch(new UpdateMaxEndTimeOfTrajectoryAction(time));
    }

    /* ==================================================Play related operate ============================================== */

    updateMap(map: Map): void {
        this.store.dispatch(new UpdateMapAction(map));
    }

    updateTrajectorySelectedWorker(data: { id: number, selected: boolean }): void {
        this.store.dispatch(new UpdateTrajectorySelectedWorkerAction(data));
    }

    updatePlayWorkers(data: number[]): void {
        this.store.dispatch(new UpdatePlayWorkersAction(data));
    }

    updateTrajectory(trajectories: Trajectory[]): void {
        this.store.dispatch(new UpdateTrajectoryAction(trajectories));
    }

    toggleTrajectoryDisplayState(): Subscription {
        return this.store.select(selectTrajectories)
            .combineLatest(this.store.select(selectTrajectoryIndexes))
            .subscribe(([trajectories, indexes]) => {
                trajectories.forEach((item, index) => {
                    if (indexes.indexOf(index) !== -1) {
                        item.endMarker.show();
                        item.startMarker.show();
                        item.polyline.show();
                    } else {
                        item.endMarker.hide();
                        item.startMarker.hide();
                        item.polyline.hide();
                    }
                })
            });
    }

    updatePlayState(state: Observable<number>): Subscription {
        return state.subscribe(state => this.store.dispatch(new UpdatePlayStateAction(state)));
    }

    updateRateState(state: Observable<number>): Subscription {
        return state.subscribe(state => this.store.dispatch(new UpdateRateStateAction(state)));
    }

    /* ==================================================API request operate================================================ */

    getHistoryLocationList(options: Observable<RequestOption>): Subscription {
        const option = this.userInfo.getSid().combineLatest(this.project.getProjectId(), options, ((sid, project_id, options) => ({ sid, project_id, ...options })));

        return this.processor.historyLocationListProcessor(option);
    }

    getProjectAreaList(): Subscription {
        const option = this.userInfo.getSid().zip(this.project.getProjectId(), (sid, project_id) => ({ sid, project_id }));

        return this.processor.projectAreaListProcessor(option);
    }

    updateCondition(): Subject<boolean> {
        return this.updateMapSubject;
    }

    /* ==================================================Error handle================================================ */

    handleError(): Subscription[] {
        return [this.handleHistoryLocationError(), this.handleProjectAreaError()];
    }

    handleHistoryLocationError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectHistoryLocationResponse), 'API_ERROR');
    }

    handleProjectAreaError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectProjectAreaResponse), 'APP_ERROR');
    }
}