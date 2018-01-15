import { selectLocationAttendanceOptions } from './../../reducers/index-reducer';
import { selectAttendanceRecordMaxDate } from './../../reducers/index-reducer';
import { SetLocationAttendanceRecordStartDateAction, SetLocationAttendanceRecordEndDateAction, SetLocationAttendanceRecordUsersAction } from './../../actions/action/attendance-record-action';
import { Injectable } from '@angular/core';
import { AppState, selectAttendanceRecordInstant, selectAttendanceRecordPage, selectAttendanceRecordLimit, selectAttendanceRecordResponse } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ProcessorService } from '..//api/processor-service';
import { ErrorService } from '..//errors/error-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { AttendanceInstant, AttendanceInstantListResponse } from '../../interfaces/response-interface';
import { RequestOption, AttendanceInstantListOptions } from '../../interfaces/request-interface';
import { UserService } from '..//business/user-service';
import { IncreaseRecordPageAction, ResetRecordPageAction } from '../../actions/action/attendance-record-action';

@Injectable()
export class AttendanceRecordService {

    constructor(
        public store: Store<AppState>,
        public process: ProcessorService,
        public error: ErrorService,
        public userInfo: UserService
    ) {
    }

    /* ===========================================================Data acquisition================================================== */

    getAttendanceRecord(): Observable<AttendanceInstant[]> {
        return this.store.select(selectAttendanceRecordInstant).filter(value => !!value.length);
    }

    getAttendanceRecordResponse(): Observable<AttendanceInstantListResponse> {
        return this.store.select(selectAttendanceRecordResponse);
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

    /* ===========================================================API request ======================================================== */

    getAttendanceInstantList(option: Observable<RequestOption>): Subscription {
        return this.process.attendanceRecordListProcessor(
            option.combineLatest(
                this.userInfo.getSid(),
                this.store.select(selectAttendanceRecordPage),
                this.store.select(selectAttendanceRecordLimit),
                (option, sid, page, limit) => ({ sid, page, limit, ...option })
            ) as Observable<AttendanceInstantListOptions>
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

    /* =========================================================Error handle ============================================================ */

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectAttendanceRecordResponse), 'APP_ERROR');
    }
}
