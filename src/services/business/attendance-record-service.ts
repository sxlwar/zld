import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { InfiniteScroll } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IncreaseRecordPageAction, ResetRecordPageAction } from '../../actions/action/attendance-record-action';
import { AttendanceInstantListOptions, RequestOption } from '../../interfaces/request-interface';
import { AttendanceInstant, AttendanceInstantListResponse } from '../../interfaces/response-interface';
import {
    AppState,
    selectAttendanceRecordLimit,
    selectAttendanceRecordPage,
    selectAttendanceRecordResponse,
} from '../../reducers/index-reducer';
import { ProcessorService } from '..//api/processor-service';
import { UserService } from '..//business/user-service';
import { ErrorService } from '..//errors/error-service';
import {
    ResetRecordResponseAction,
    SetLocationAttendanceRecordEndDateAction,
    SetLocationAttendanceRecordStartDateAction,
    SetLocationAttendanceRecordUsersAction,
} from './../../actions/action/attendance-record-action';
import { selectAttendanceRecordMaxDate, selectLocationAttendanceOptions } from './../../reducers/index-reducer';

@Injectable()
export class AttendanceRecordService {

    constructor(
        private store: Store<AppState>,
        private process: ProcessorService,
        private error: ErrorService,
        private userInfo: UserService
    ) {
    }

    /* ===========================================================Data acquisition================================================== */

    getAttendanceRecord(): Observable<AttendanceInstant[]> {
        return this.getAttendanceRecordResponse().map(res => res.attendance_instants);
    }

    getAttendanceRecordResponse(): Observable<AttendanceInstantListResponse> {
        return this.store.select(selectAttendanceRecordResponse).filter(value => !!value);
    }

    getOptions(): Observable<RequestOption> {
        return this.store.select(selectLocationAttendanceOptions)
            .filter(option => !!option.endDate && !!option.startDate && !!option.userIds.length)
            .map(({ userIds, startDate, endDate }) => ({ start_day: startDate, end_day: endDate, user_id: userIds }));
    }

    getMaxDate(): Observable<Date> {
        return this.store.select(selectAttendanceRecordMaxDate);
    }

    getHaveMoreData(): Observable<boolean> {
        return this.getAttendanceRecordResponse()
            .map(res => res.count)
            .combineLatest(
            this.store.select(selectAttendanceRecordPage),
            this.store.select(selectAttendanceRecordLimit),
            (count, page, limit) => limit * page < count
            );
    }

    getRecordCount(): Observable<number> {
        return this.getAttendanceRecordResponse().map(res => res.count);
    }

    getAttendanceRecordPage(): Observable<number> {
        return this.store.select(selectAttendanceRecordPage);
    }

    getNextPage(infiniteScroll: InfiniteScroll): Subscription {
        this.increasePage();

        return this.getAttendanceRecordResponse().skip(1).subscribe(_ => infiniteScroll.complete());
    }

    /* ===========================================================API request ======================================================== */

    getAttendanceInstantList(option: Observable<RequestOption>): Subscription {
        return this.process.attendanceRecordListProcessor(
            option.combineLatest(
                this.userInfo.getSid(),
                this.store.select(selectAttendanceRecordPage),
                this.store.select(selectAttendanceRecordLimit),
                (option, sid, page, limit) => ({ sid, page, limit, ...option } as AttendanceInstantListOptions)
            )
                .distinctUntilChanged((pre, cur) => cur.page === 1 && pre.start_day === cur.start_day)
        );
    }

    /* ==========================================================Local state change==================================================== */

    increasePage(): void {
        this.store.dispatch(new IncreaseRecordPageAction());
    }

    resetPage(): void {
        this.store.dispatch(new ResetRecordPageAction());
    }

    updateLocationAttendanceRecordDate(date: string, type: string): void {
        if (type === 'start') {
            this.store.dispatch(new SetLocationAttendanceRecordStartDateAction(date));
        } else {
            this.store.dispatch(new SetLocationAttendanceRecordEndDateAction(date));
        }
    }

    updateLocationAttendanceRecordUserIds(userIds: number[]): void {
        this.store.dispatch(new SetLocationAttendanceRecordUsersAction(userIds));
    }

    resetRecordResponse(): void {
        this.store.dispatch(new ResetRecordResponseAction());
    }
    /* =========================================================Error handle ============================================================ */

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectAttendanceRecordResponse), 'APP_ERROR');
    }
}
