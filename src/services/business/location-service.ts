import { Subject } from 'rxjs/Subject';
import { LocationOptions } from './../../interfaces/location-interface';
import { UpdateMaxEndTimeAction, UpdateHistoryLocationOptionAction, UpdateSelectedWorkerId } from './../../actions/action/location-action';
import { TimeService } from './../utils/time-service';
import { RequestOption } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { HistoryLocationListResponse, ProjectAreaListResponse } from './../../interfaces/response-interface';
import { Subscription } from 'rxjs/Subscription';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';
import { ProjectService } from './project-service';
import { AppState, selectHistoryLocationResponse, selectProjectAreaResponse, selectHistoryLocationOptions, selectMaxEndTimeOptions } from './../../reducers/index-reducer';
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

    getMaxEndTime(): Observable<string> {
        return this.store.select(selectMaxEndTimeOptions);
    }

    getHistoryLocationOptions(): Observable<LocationOptions> {
        return this.store.select(selectHistoryLocationOptions);
    }
    
    /* ==================================================Condition update operate================================================ */

    updateMaxEndTime(startTime: string): void {
        const maxEndTime = this.timeService.addTime(startTime);

        this.store.dispatch(new UpdateMaxEndTimeAction(maxEndTime));
    }

    updateHistoryLocationOption(option: { [key: string]: string | number[] }): void {
        this.store.dispatch(new UpdateHistoryLocationOptionAction(option));
    }

    updateSelectedWorker(data: { id: number, selected: boolean }): void {
        this.store.dispatch(new UpdateSelectedWorkerId(data));
    }

    /* ==================================================API request operate================================================ */

    getHistoryLocationList(options: Observable<RequestOption>): Subscription {
        const sid = this.userInfo.getSid();

        const projectId = this.project.getProjectId();

        const option = sid.combineLatest(projectId, options, ((sid, project_id, options) => ({ sid, project_id, ...options })));

        return this.processor.historyLocationListProcessor(option);
    }

    getProjectAreaList(): Subscription {
        const sid = this.userInfo.getSid();

        const projectId = this.project.getProjectId();

        const option = sid.zip(projectId, (sid, project_id) => ({ sid, project_id }));

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